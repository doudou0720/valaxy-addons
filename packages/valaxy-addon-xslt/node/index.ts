import type { Options } from '../types'
import { defineValaxyAddon } from 'valaxy'
import pkg from '../package.json'
import { resolve } from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

export const addonXslt = defineValaxyAddon<Options>(options => ({
  name: pkg.name,
  enable: true,
  options,
  setup(valaxy) {
    valaxy.hook('build:after', async () => {
      const { userRoot } = valaxy.options
      const distPath = resolve(userRoot, 'dist')
      const publicPath = resolve(userRoot, 'public')

      const xsltHref = options?.xsltPath || '/xslt/feed.xsl'
      const xsltInstruction = `<?xml-stylesheet type="text/xsl" href="${xsltHref}"?>`

      const feedFiles = ['feed.xml', 'atom.xml']

      for (const file of feedFiles) {
        await injectXslt(distPath, file, xsltInstruction)
        await injectXslt(publicPath, file, xsltInstruction)
      }
    })
  },
}))

async function injectXslt(basePath: string, fileName: string, instruction: string) {
  const filePath = resolve(basePath, fileName)
  if (existsSync(filePath)) {
    let content = await readFile(filePath, 'utf-8')
    // Inject after <?xml ... ?> declaration
    content = content.replace(/(<\?xml[^?]*\?>)/, `$1\n${instruction}`)
    await writeFile(filePath, content)
  }
}
