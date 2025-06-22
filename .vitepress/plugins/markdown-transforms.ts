import fs from 'fs'
import path from 'path'
import { camelize } from '@vue/shared'
import { getExampleFilePaths } from './markdown'

import type { Plugin } from 'vite'

type Append = Record<'headers' | 'footers' | 'scriptSetups', string[]>

const scriptSetupRE = /<script\s(.*\s)?setup(\s.*)?>([\s\S]*)<\/script>/

// const demoRE = /:::demo\s*(\S+)?\s*\n\s*(\S+)\s*\n:::$/
const demoRE = /:::demo\s*(\S*)?\s(\S+)\s/gi


export function MarkdownTransform(): Plugin {
  return {
    name: 'whale-ui-md-transform',

    enforce: 'pre',

    async buildStart() {
      
    },

    async transform(code, id) {
      if (!id.endsWith('.md')) return

      const exampleFiles = getExampleFilePaths(code)
      
      

      const append: Append = {
        headers: [],
        footers: [],
        scriptSetups: getExampleImports(exampleFiles),
      }
      
      

      //
      const newCode = code.replace(scriptSetupRE,'')
      const m = code.match(scriptSetupRE)
 
      if( m !== null) append.scriptSetups.push(m[3])
      
      return combineMarkdown(
        newCode,
        [combineScriptSetup(append.scriptSetups), ...append.headers],
        append.footers
      )
    },
  }
}


const combineScriptSetup = (codes: string[]) =>{
  if(codes.length === 0) return ``
  return `\n<script setup>${codes.join('\n')}</script>\n`
}

const combineMarkdown = (
  code: string,
  headers: string[],
  footers: string[]
) => {
  const frontmatterEnds = code.indexOf('---\n\n')
  const firstHeader = code.search(/\n#{1,6}\s.+/)
  const sliceIndex =
    firstHeader < 0
      ? frontmatterEnds < 0
        ? 0
        : frontmatterEnds + 4
      : firstHeader

  if (headers.length > 0)
    code =
      code.slice(0, sliceIndex) + headers.join('\n') + code.slice(sliceIndex)
  code += footers.join('\n')

  return `${code}\n`
}


const getExampleImports = (exampleFiles:string[]) => {
  const imports: string[] = []
  exampleFiles.forEach(exampleFile=>{
    const filePath = path.join(path.resolve(__dirname,"../../src/examples"),exampleFile) + '.vue'
    if (fs.existsSync(filePath)){
      const name = camelize(`Ep-${exampleFile.replaceAll('/','-')}`)
      imports.push(`import ${name} from '/examples/${exampleFile}.vue'`)
    }
  })
  return imports
}
