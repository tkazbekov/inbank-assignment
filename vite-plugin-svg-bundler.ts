import type { Plugin } from 'vite'
import { resolve } from 'path'
import { readdirSync, readFileSync, watch } from 'fs'

interface SvgSpritePluginOptions {
  srcDir?: string
  outputFileName?: string
}

export default function svgSpritePlugin(options: SvgSpritePluginOptions = {}): Plugin {
  const { srcDir = 'src/assets/svg', outputFileName = 'sprite.svg' } = options

  return {
    name: 'svg-sprite',
    configureServer(server) {
      const generateSprite = () => {
        const svgFiles = readdirSync(resolve(srcDir)).filter((file) => file.endsWith('.svg'))
        const symbols = svgFiles.map((file) => {
          const svgContent = readFileSync(resolve(srcDir, file), 'utf-8')
          const id = file.replace('.svg', '')
          return `<symbol id="${id}">${svgContent}</symbol>`
        })
        const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">${symbols.join('')}</svg>`
        server.middlewares.use((req, res, next) => {
          if (req.url === `/${outputFileName}`) {
            res.setHeader('Content-Type', 'image/svg+xml')
            res.end(spriteContent)
          } else {
            next()
          }
        })
      }

      generateSprite()

      // Watch for changes in the SVG directory and regenerate the sprite
      const watcher = watch(srcDir, () => generateSprite())
      watcher.on('error', (err) => console.error('Error while trying to bundle icons:', err))
    },
    generateBundle() {
      const generateSprite = () => {
        const svgFiles = readdirSync(resolve(srcDir)).filter((file) => file.endsWith('.svg'))
        const symbols = svgFiles.map((file) => {
          const svgContent = readFileSync(resolve(srcDir, file), 'utf-8')
          const id = file.replace('.svg', '')
          return `<symbol id="${id}">${svgContent}</symbol>`
        })
        const spriteContent = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">${symbols.join('')}</svg>`
        this.emitFile({
          fileName: outputFileName,
          type: 'asset',
          source: spriteContent
        })
      }

      generateSprite()
    }
  }
}
