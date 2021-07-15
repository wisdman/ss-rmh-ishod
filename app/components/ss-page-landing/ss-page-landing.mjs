import { CSS, HTML } from "../abstract/index.mjs"
import { SSPage } from "../ss-page/ss-page.mjs"
import { SSSlider } from "../ss-slider/ss-slider.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SSPageLanding extends SSPage {
  static TAG_NAME = "ss-page-landing"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #mainImage = this.$(".main-image")
  #pageWrapper = this.$(".page-wrapper")

  #initGallery = (images = []) => {
    return images.reduce((slider, {src, cords:[x,y,w,h], alt}, id) => {
      const a = document.createElement("a")
      const fullSrc = `/content/${src}`
      a.dataset.src = fullSrc
      a.dataset.id = id
      a.classList.add("gallery-link")
      a.style.setProperty("--x", x)
      a.style.setProperty("--y", y)
      a.style.setProperty("--w", w)
      a.style.setProperty("--h", h)
      this.#pageWrapper.appendChild(a)
      a.addEventListener("click", event => {
        event.preventDefault()
        event.stopPropagation()
        slider.show(id)
      })
      slider.add({ src: fullSrc, id: id, alt })
      return slider
    }, new SSSlider())
  }

  async init({top, page, images, ...args} = {}) {
    await super.init(args)
    this.style.setProperty("--page-top", `url("/content/${top}")`)
    this.#mainImage.src = `/content/${page}`
    const sliderNode = this.#initGallery(images)
    this.root.appendChild(sliderNode)
  }
}