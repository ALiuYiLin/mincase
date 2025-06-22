import markdown from 'markdown-it'

import mdContainer from 'markdown-it-container'


const md = markdown()
let exampleFilePaths:string[] = []
md.use(mdContainer,'demo',{
    validate: params => !!params.trim().match(/^demo\s*(.*)$/),
    render: (tokens, idx) => {
      if(tokens[idx].nesting === 1){
        const sourceFileToken = tokens[idx + 2]
        const sourceFile = sourceFileToken.children?.[0].content.split(" ")[0] ?? ''
        exampleFilePaths.push(sourceFile)
      }
    }
  }
)


export const getExampleFilePaths = (code:string)=>{
  exampleFilePaths = []
  md.render(code)
  //去重
  exampleFilePaths = [...new Set(exampleFilePaths)]
  return exampleFilePaths
}


