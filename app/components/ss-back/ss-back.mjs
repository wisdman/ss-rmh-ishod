import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const TEMPLATE = await HTML(import.meta.url)

export class SSBack extends AbstractComponent {
  static TAG_NAME = "ss-back"

  static STYLES = STYLE
  static TEMPLATE = TEMPLATE

  #minLevel = 1

  constructor({ minLevel = 1 } = {}) {
    super()
    this.#minLevel = minLevel + 1
  }

  update = () => {
    const { pathname } = window.location
    const path = pathname.split("/")
    requestAnimationFrame(() => {
      if (path.length <= this.#minLevel) this.classList.add("hide")
     else this.classList.remove("hide")
    })
  }

  back = () => {
    const { pathname, origin } = window.location
    const path = pathname.split("/")
    if (path.length <= this.#minLevel) return this.update()
    path.pop()
    const url = origin + path.join("/")
    window.history.pushState({}, "", url)
    window.dispatchEvent(new Event("route"))
  }

  #onClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    this.back()
  }

  connectedCallback() {
    this.addEventListener("click", this.#onClick, { capture: true })
    window.addEventListener("route", this.update, { passive: true })
    this.update()
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.#onClick, { capture: true })
    window.removeEventListener("route", this.update)
  }
}