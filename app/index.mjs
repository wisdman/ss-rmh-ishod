
import { SSError, SSPage, SSBack } from "/components/index.mjs"

const SS_ID = window.location.pathname.split("/").filter(id => !!id).shift()
const SS_URL = `/content/${SS_ID}.json`

async function fetchSSData(url = SS_URL) {
  try {
    const response =  await fetch(url)
    if (response.status !== 200) throw new Error(`${response.status}: ${response.statusText}`)
    return await response.json()
  } catch (error) {
    new SSError(`Incorrect SS data by path "${window.location.origin}${url}"!\n${error}`)
  }
  return undefined
}

window.location.hash = ""
const {backMinLevel, ...ssData} = await fetchSSData() ?? {}

document.title = `SS[${SS_ID}; ${SS_URL}] - ${ssData.title.replace("&nbsp;"," ") ?? "Undefined"}`

await (async function addPage({ type, ...pageData } = {}, path = "") {
  const pageNode = document.createElement(`ss-page-${type}`)
  await pageNode.init({ ...pageData, path : path = `${path}/${pageData.id}` })
  document.body.appendChild(pageNode)
  const { children = [] } = pageData
  for (const child of children) await addPage(child, path)
})(ssData)

document.body.appendChild(new SSBack({ minLevel: backMinLevel }))
window.dispatchEvent(new Event("route"))

let timeout
  window.addEventListener(
    "pointerdown",
    () => timeout = timeout && clearTimeout(timeout) || setTimeout(window.location.reload, 5 * 60 * 1000), // 5m
    { passive: true }
  )
