import { CSS, HTML } from "../abstract/index.mjs"
import { SSPage } from "../ss-page/ss-page.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SSPageList extends SSPage {
  static TAG_NAME = "ss-page-list"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #pageWrapper = this.$(".page-wrapper")

  #initLinks = (links = []) => {
    for (const { href, title, subtitle } of links) {
      const a = document.createElement("a")
      a.href = href
      a.innerHTML = (subtitle ? `<h2>${subtitle}</h2>` : ``)
                  + `<h1>${title.replace("[","<span>(").replace("]",")</span>")}</h1>`
      a.classList.add("item-link")
      this.#pageWrapper.appendChild(a)
    }
  }

  async init({image, ...args} = {}) {
    await super.init(args)
    this.style.setProperty("--page-image", `url("/content/${image}")`)
    const { path } = args
    this.#initLinks(args.children.map(({ id, title, subtitle }) => ({ href: `${path}/${id}`, title, subtitle }) ))
  }
}