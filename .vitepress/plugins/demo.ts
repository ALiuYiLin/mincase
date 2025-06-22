import path from "path";
import fs from "fs";
import type { MarkdownRenderer } from "vitepress";
const docRoot = path.resolve(__dirname, "..", "..");
interface ContainerOpts {
  marker?: string | undefined;
  validate?(params: string): boolean;
  render?: MarkdownRenderer["renderer"]["rules"]["container"];
}

function createDemoContainer(md: MarkdownRenderer): ContainerOpts {
  return {
    validate: params => !!params.trim().match(/^demo\s*(.*)$/),
    render: (tokens, idx) => {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if(tokens[idx].nesting === 1){
        const description = m && m.length > 1 ? m[1] : ''
        let isShow = tokens[idx + 2].content.split(' ')[1] === 'false'?false:true
        
        const sourceFileToken = tokens[idx + 2]
        let source = ''
        const sourceFile = sourceFileToken.children?.[0].content.split(" ")[0] ?? ''
        
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(path.resolve(docRoot,'src/examples', `${sourceFile}.vue`),'utf-8')
        }
        
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        return `<Demo :show="${isShow}" source="${encodeURIComponent(md.render(`\`\`\` vue\n${source}\`\`\``))}" path="${sourceFile}" raw-source="${encodeURIComponent(source)}" description="${encodeURIComponent(md.render(description))}"><template #source><ep-${sourceFile.replaceAll("/", "-")}/></template>`;
      } 
      else{
        return "</Demo>\n";
      }
    }
  };
}

export default createDemoContainer;
