import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import fg from 'fast-glob'
import sharp from 'sharp'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CLIENT_ROOT = path.resolve(__dirname, '..')

const SOURCE_DIR = path.join(CLIENT_ROOT, 'assets/photos/original')
const LEGACY_SOURCE_DIR = path.join(CLIENT_ROOT, 'public/images')
const OUTPUT_DIR = path.join(CLIENT_ROOT, 'public/images/optimized')
const DATA_FILE = path.join(CLIENT_ROOT, 'src/data/gallery-images.json')
const MANIFEST_FILE = path.join(CLIENT_ROOT, 'photos.manifest.json')

const RESPONSIVE_WIDTHS = [400, 2000]
const QUALITY = {
  avif: 55,
  webp: 80
}

const CONFIG_VERSION = 'v2'
const CONFIG_FINGERPRINT = JSON.stringify({
  CONFIG_VERSION,
  RESPONSIVE_WIDTHS,
  QUALITY
})

const LEGACY_EXCLUDED_FILES = new Set(['mwarren-profile-photo.png'])

const normalizePath = (value) => value.split(path.sep).join('/')

const getExtensionTag = (ext) => ext.replace(/^\./, '').toLowerCase()

const getStableImageId = (relativePath) => normalizePath(relativePath).replace(/[/.]/g, '-')

const makeTitle = (filenameWithoutExt) => {
  return filenameWithoutExt
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const exists = async (targetPath) => {
  try {
    await fs.access(targetPath)
    return true
  } catch {
    return false
  }
}

const readManifest = async () => {
  if (!(await exists(MANIFEST_FILE))) {
    return { version: 1, entries: {} }
  }

  try {
    const content = await fs.readFile(MANIFEST_FILE, 'utf8')
    const parsed = JSON.parse(content)

    if (!parsed || typeof parsed !== 'object' || !parsed.entries) {
      return { version: 1, entries: {} }
    }

    return parsed
  } catch {
    return { version: 1, entries: {} }
  }
}

const hashFileWithConfig = async (filePath) => {
  const fileBuffer = await fs.readFile(filePath)
  const hash = createHash('sha256')
  hash.update(fileBuffer)
  hash.update(CONFIG_FINGERPRINT)
  return hash.digest('hex')
}

const ensureDirectories = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.mkdir(SOURCE_DIR, { recursive: true })
}

const discoverSourceFiles = async () => {
  const sourceFiles = await fg('**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    cwd: SOURCE_DIR,
    absolute: true,
    onlyFiles: true
  })

  if (sourceFiles.length > 0) {
    return {
      rootDir: SOURCE_DIR,
      mode: 'primary',
      files: sourceFiles
    }
  }

  const legacyFiles = await fg('**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    cwd: LEGACY_SOURCE_DIR,
    absolute: true,
    onlyFiles: true,
    ignore: ['optimized/**']
  })

  const filteredLegacy = legacyFiles.filter((filePath) => {
    const baseName = path.basename(filePath)
    if (baseName.startsWith('.')) return false
    return !LEGACY_EXCLUDED_FILES.has(baseName)
  })

  return {
    rootDir: LEGACY_SOURCE_DIR,
    mode: 'legacy-fallback',
    files: filteredLegacy
  }
}

const getVariantWidths = (sourceWidth) => {
  const widths = RESPONSIVE_WIDTHS.filter((width) => width <= sourceWidth)

  if (widths.length === 0) {
    return [sourceWidth]
  }

  return [...new Set(widths)].sort((first, second) => first - second)
}

const createVariantObject = (relativeDir, baseName, width, format) => {
  const outputRelativePath = normalizePath(path.posix.join(relativeDir, `${baseName}@${width}w.${format}`))
  return {
    width,
    url: `images/optimized/${outputRelativePath}`,
    file: outputRelativePath
  }
}

const buildMetadataItem = ({
  relativePath,
  parsedPath,
  outputBaseName,
  width,
  height,
  widths
}) => {
  const normalizedDir = parsedPath.dir ? normalizePath(parsedPath.dir) : ''
  const baseName = parsedPath.name
  const title = makeTitle(baseName)

  const avif = widths.map((variantWidth) => createVariantObject(normalizedDir, outputBaseName, variantWidth, 'avif'))
  const webp = widths.map((variantWidth) => createVariantObject(normalizedDir, outputBaseName, variantWidth, 'webp'))

  return {
    id: getStableImageId(relativePath),
    relativePath: normalizePath(relativePath),
    title,
    description: 'Professional project by M.WARREN CONSTRUCTION',
    alt: title,
    width,
    height,
    avif,
    webp,
    lightbox: webp[webp.length - 1]
  }
}

const generateVariants = async ({ sourcePath, parsedPath, outputBaseName, widths }) => {
  const relativeDir = parsedPath.dir ? normalizePath(parsedPath.dir) : ''
  const outputFolder = path.join(OUTPUT_DIR, relativeDir)
  await fs.mkdir(outputFolder, { recursive: true })

  const generatedFiles = []

  for (const variantWidth of widths) {
    const outputBase = path.join(outputFolder, `${outputBaseName}@${variantWidth}w`)

    const avifPath = `${outputBase}.avif`
    await sharp(sourcePath)
      .rotate()
      .resize({ width: variantWidth, withoutEnlargement: true })
      .avif({ quality: QUALITY.avif })
      .toFile(avifPath)
    generatedFiles.push(normalizePath(path.relative(OUTPUT_DIR, avifPath)))

    const webpPath = `${outputBase}.webp`
    await sharp(sourcePath)
      .rotate()
      .resize({ width: variantWidth, withoutEnlargement: true })
      .webp({ quality: QUALITY.webp })
      .toFile(webpPath)
    generatedFiles.push(normalizePath(path.relative(OUTPUT_DIR, webpPath)))
  }

  return generatedFiles
}

const pruneOutputDirectory = async (keptGeneratedFiles) => {
  const existingFiles = await fg('**/*', {
    cwd: OUTPUT_DIR,
    onlyFiles: true
  })

  const filesToDelete = existingFiles.filter((file) => !keptGeneratedFiles.has(normalizePath(file)))

  await Promise.all(filesToDelete.map((file) => fs.unlink(path.join(OUTPUT_DIR, file))))

  return filesToDelete.length
}

const allGeneratedFilesExist = async (files) => {
  for (const file of files || []) {
    const outputPath = path.join(OUTPUT_DIR, file)
    if (!(await exists(outputPath))) {
      return false
    }
  }
  return true
}

const buildOutputBaseName = (parsedPath, needsDisambiguation) => {
  if (!needsDisambiguation) {
    return parsedPath.name
  }

  return `${parsedPath.name}__${getExtensionTag(parsedPath.ext)}`
}

const main = async () => {
  await ensureDirectories()
  const manifest = await readManifest()
  const nextManifest = {
    version: 1,
    updatedAt: new Date().toISOString(),
    configVersion: CONFIG_VERSION,
    entries: {}
  }

  const { mode, rootDir, files } = await discoverSourceFiles()

  if (files.length === 0) {
    await fs.writeFile(DATA_FILE, '[]\n')
    await fs.writeFile(MANIFEST_FILE, JSON.stringify(nextManifest, null, 2) + '\n')
    console.log('No source images found. Wrote empty gallery metadata.')
    return
  }

  const sortedFiles = files.sort((first, second) => first.localeCompare(second))
  const basenameCounts = new Map()

  for (const sourcePath of sortedFiles) {
    const relativePath = normalizePath(path.relative(rootDir, sourcePath))
    const parsedPath = path.parse(relativePath)
    const collisionKey = `${parsedPath.dir}|${parsedPath.name}`
    basenameCounts.set(collisionKey, (basenameCounts.get(collisionKey) || 0) + 1)
  }

  const galleryItems = []
  const keptGeneratedFiles = new Set()
  let processedCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const sourcePath of sortedFiles) {
    const relativePath = normalizePath(path.relative(rootDir, sourcePath))
    const parsedPath = path.parse(relativePath)
    const collisionKey = `${parsedPath.dir}|${parsedPath.name}`
    const needsDisambiguation = (basenameCounts.get(collisionKey) || 0) > 1
    const outputBaseName = buildOutputBaseName(parsedPath, needsDisambiguation)

    try {
      const fileHash = await hashFileWithConfig(sourcePath)
      const imageMeta = await sharp(sourcePath).metadata()

      if (!imageMeta.width || !imageMeta.height) {
        throw new Error('Unable to read image dimensions')
      }

      const variantWidths = getVariantWidths(imageMeta.width)
      const previousEntry = manifest.entries?.[relativePath]
      const canSkip = Boolean(
        previousEntry &&
        previousEntry.hash === fileHash &&
        await allGeneratedFilesExist(previousEntry.generatedFiles)
      )

      let generatedFiles = previousEntry?.generatedFiles || []

      if (!canSkip) {
        generatedFiles = await generateVariants({
          sourcePath,
          parsedPath,
          outputBaseName,
          widths: variantWidths
        })
        processedCount += 1
      } else {
        skippedCount += 1
      }

      generatedFiles.forEach((file) => keptGeneratedFiles.add(file))

      nextManifest.entries[relativePath] = {
        hash: fileHash,
        width: imageMeta.width,
        height: imageMeta.height,
        variantWidths,
        generatedFiles,
        updatedAt: new Date().toISOString()
      }

      galleryItems.push(
        buildMetadataItem({
          relativePath,
          parsedPath,
          outputBaseName,
          width: imageMeta.width,
          height: imageMeta.height,
          widths: variantWidths
        })
      )
    } catch (error) {
      errorCount += 1
      console.error(`Failed processing ${relativePath}: ${error.message}`)
    }
  }

  galleryItems.sort((first, second) => first.relativePath.localeCompare(second.relativePath))

  const deletedCount = await pruneOutputDirectory(keptGeneratedFiles)

  await fs.writeFile(DATA_FILE, JSON.stringify(galleryItems, null, 2) + '\n')
  await fs.writeFile(MANIFEST_FILE, JSON.stringify(nextManifest, null, 2) + '\n')

  console.log(`Source mode: ${mode}`)
  console.log(`Processed: ${processedCount}`)
  console.log(`Skipped: ${skippedCount}`)
  console.log(`Deleted stale variants: ${deletedCount}`)
  console.log(`Errors: ${errorCount}`)
  console.log(`Metadata: ${path.relative(CLIENT_ROOT, DATA_FILE)}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
