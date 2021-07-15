import { CSS, HTML } from "../abstract/index.mjs"
import { SSPage } from "../ss-page/ss-page.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

const TRACEHOLD = 1000

export class SSPageGaaoso extends SSPage {
  static TAG_NAME = "ss-page-gaaoso"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #backBtn = this.$(".back")

  #initGallery = (start, end) => {
    const firstElement = this.root.firstElementChild
    for (let i = start; i <= end; i++) {
      const div = document.createElement("div")
      div.classList.add("item")

      const img = document.createElement("img")
      img.classList.add("item-img")
      img.src = `/content/ss-6/images/gaasoo${i}.webp`
      div.appendChild(img)

      div.dataset.id = i
      div.addEventListener("pointerup", event => this.#onPointeruUp(event, div), { passive: true })

      this.root.insertBefore(div, firstElement)
    }
  }

  #onPointeruUp(event, item) {
    event.stopPropagation()
    item.scrollIntoView({behavior: "smooth"})
  }

  async init({range, ...args} = {}) {
    await super.init(args)
    this.#initGallery(...range)
  }

  back = () => {
    const { pathname, origin } = window.location
    const path = pathname.split("/")
    path.pop()
    const url = origin + path.join("/")
    window.history.pushState({}, "", url)
    window.dispatchEvent(new Event("route"))
  }

  #onBackClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.back()
  }

  #intersectionObserver = undefined

  #intersectionObserverCallback = (entries) => {
    const target = entries.find(({intersectionRatio}) => intersectionRatio ===  1)?.target
    if (!target) return
    const otherNodes = Array.from(target.parentNode.querySelectorAll(".item")).filter(node => node !== target)
    requestAnimationFrame(() => {
      otherNodes.forEach(i => i.classList.remove("active"))
      target.classList.add("active")
    })
  }

  connectedCallback() {
    super.connectedCallback()
    this.#backBtn.addEventListener("click", this.#onBackClick, { capture: true })

    this.#intersectionObserver = new IntersectionObserver(this.#intersectionObserverCallback, { threshold: 1 })
    this.$$(".item").forEach(item => this.#intersectionObserver.observe(item))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.#backBtn.removeEventListener("click", this.#onBackClick, { capture: true })
    this.$$(".item").forEach(item => this.#intersectionObserver.unobserve(item))
  }
}



  

