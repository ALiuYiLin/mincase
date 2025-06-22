import { MarkdownRenderer } from "vitepress";
import mdContainer from 'markdown-it-container'
import createDemoContainer from "./demo";



export const mdPlugin = (md:MarkdownRenderer) =>{
  md.use(mdContainer,'demo',createDemoContainer(md))
}