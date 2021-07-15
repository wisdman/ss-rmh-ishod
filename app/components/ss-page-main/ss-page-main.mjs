import { CSS, HTML } from "../abstract/index.mjs"
import { SSPage } from "../ss-page/ss-page.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SSPageMain extends SSPage {
  static TAG_NAME = "ss-page-main"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #mainImage = this.$(".main-image")

  #initLinks = (links = []) => {
    for (const {href, cords:[x,y,w,h]} of links) {
      const a = document.createElement("a")
      a.href = href
      a.classList.add("page-link")
      a.style.setProperty("--x", x)
      a.style.setProperty("--y", y)
      a.style.setProperty("--w", w)
      a.style.setProperty("--h", h)
      this.root.appendChild(a)
    }
  }

  async init({image, ...args} = {}) {
    await super.init(args)
    this.#mainImage.src = `/content/${image}`
    const { path } = args
    this.#initLinks(args.children.map(({id, cords}) => ({ href: `${path}/${id}`, cords }) ))
  }
}