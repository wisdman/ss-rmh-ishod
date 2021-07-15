import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SSSlider extends AbstractComponent {
  static TAG_NAME = "ss-slider"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #backBtn = this.$(".back")
  #intersectionObserver = undefined

  constructor(){
    super()
    this.#intersectionObserver = new IntersectionObserver(this.#intersectionObserverCallback, { threshold: 1 })
  }
 
  #onPointeruUp(event, item) {
    event.stopPropagation()
    item.scrollIntoView({behavior: "smooth"})
  }

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
    this.#backBtn.addEventListener("click", this.hide, { capture: true })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.#backBtn.removeEventListener("click", this.hide, { capture: true })
    this.$$(".item").forEach(item => this.#intersectionObserver.unobserve(item))
  }

  hide = () => requestAnimationFrame(() => this.classList.remove("show"))

  show = id => {
    this.$(`#slide-${id}`).scrollIntoView()
    requestAnimationFrame(() => this.classList.add("show"))
  }

  add = ({ src, alt = "", id }) => {
    const div = document.createElement("div")
    div.classList.add("item")

    const img = document.createElement("img")
    img.classList.add("item-image")
    img.src = src
    div.appendChild(img)

    const p = document.createElement("p")
    p.classList.add("item-alt")
    p.innerHTML = alt
    div.appendChild(p)

    div.id = `slide-${id}`
    div.addEventListener("pointerup", event => this.#onPointeruUp(event, div), { passive: true })

    this.#intersectionObserver.observe(div)

    this.root.insertBefore(div, this.#backBtn)
  }  
}