export { AbstractComponent } from "./abstract/index.mjs"
export * from "./loader/loader.mjs"
export * from "./ss-back/ss-back.mjs"
export * from "./ss-error/ss-error.mjs"
export * from "./ss-page-gaaoso/ss-page-gaaoso.mjs"
export * from "./ss-page-landing/ss-page-landing.mjs"
export * from "./ss-page-list-item/ss-page-list-item.mjs"
export * from "./ss-page-list/ss-page-list.mjs"
export * from "./ss-page-main/ss-page-main.mjs"
export * from "./ss-page/ss-page.mjs"
export * from "./ss-slider/ss-slider.mjs"

import { InitComponents } from "./abstract/index.mjs"
import * as COMPONENTS from "./index.mjs"
await InitComponents(COMPONENTS)