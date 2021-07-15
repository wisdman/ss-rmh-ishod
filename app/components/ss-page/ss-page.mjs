import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)
const RANDOM = () => Math.round(Math.random()*10**10).toString(16)

const TEMPLATE = (html, root = "/content") => new Function("base", `return \`${html}\``)(root)
const PATHNAME_RX = /\/[^\/]+$/

export class SSPage extends AbstractComponent {
  static STYLES = STYLE

  #applyContent = async (templ, contentNode = this.$("#content")) => {
    if (!templ || !contentNode) return
    const url = new URL(`${window.location.origin}/content/${templ}`)
    const { href, pathname } = url
    const response = await fetch(href)
    contentNode.innerHTML = TEMPLATE(await response.text(), pathname.replace(PATHNAME_RX,""))
  }

  async init({id, path, templ} = {}) {
    this.id = id ?? RANDOM()
    this.dataset.path = path ?? ""
    await this.#applyContent(templ)
  }

  #onRoute = () => {
    const { pathname } = window.location
    requestAnimationFrame(() => {
      if (pathname === this.dataset.path) this.classList.add("active")
      else this.classList.remove("active")
    })
    this.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  #doRoute = (event, href) => {
    event.preventDefault()
    event.stopPropagation()
    window.history.pushState({}, "", href)
    window.dispatchEvent(new Event("route"))
  }

  connectedCallback() {
    this.$$("a[href]").forEach(a => a.addEventListener("click", event => this.#doRoute(event, a.href), { capture: true }))
    window.addEventListener("route", this.#onRoute, { passive: true })
  }

  disconnectedCallback() {
    window.removeEventListener("route", this.#onRoute)
  }
}