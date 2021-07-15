import { CSS, HTML } from "../abstract/index.mjs"
import { SSPage } from "../ss-page/ss-page.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SSPageListItem extends SSPage {
  static TAG_NAME = "ss-page-list-item"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #mainImage = this.$(".main-image")
  #title = this.$(".title")
  #subtitle = this.$(".subtitle")
  #years = this.$(".years")

  #contentBox = this.$(".content")

  async init({image, title, subtitle, years, ...args} = {}) {
    await super.init(args)
    this.#mainImage.src = `/content/${image}`
    this.#title.innerHTML = title.replace("[","<span>(").replace("]",")</span>")
    this.#subtitle.innerHTML = subtitle ?? ""
    this.#years.innerHTML = years ?? ""
  }

  #scroll = () => {
    this.#contentBox.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener("route", this.#scroll, { passive: true })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener("route", this.#scroll)
  }
}