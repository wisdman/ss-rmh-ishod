import { AbstractComponent, CSS, HTML } from "../abstract/index.mjs"

const STYLE = CSS(import.meta.url)

export class SSErrorLog extends AbstractComponent {
  static TAG_NAME = "ss-error-log"

  static STYLES = STYLE
  static TEMPLATE = "<slot></slot>"
  static _instance = undefined

  constructor() {
    return SSErrorLog._instance = SSErrorLog._instance ?? (super(), this)
  }

  push = errorNode => {
    this.push = errorNode => {
      this.appendChild(errorNode)
      console.error(errorNode.message)
    }
    this.push(errorNode)
    document.body.appendChild(this)
  }
}

export class SSError extends AbstractComponent {
  static TAG_NAME = "ss-error"

  static STYLES = STYLE

  #log = new SSErrorLog()

  #error = undefined
  get message() { return this.#error?.message || "Undefined error" }

  constructor(message) {
    super()
    this.#error = new Error(message)
    for (const text of message.split(/[\n\r]+/)) {
      const spanNode = document.createElement("span")
      spanNode.innerText = text
      this.root.appendChild(spanNode)
    }
    this.#log.push(this)
  }
}

