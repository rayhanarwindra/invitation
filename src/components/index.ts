import { defineAsyncComponent } from 'vue'
import Landing from './Landing.vue'
import Navbar from './Navbar.vue'
import Bottombar from './Bottombar.vue'

export const Event = defineAsyncComponent(() => import('./Event.vue'))
export const Gallery = defineAsyncComponent(() => import('./Gallery.vue'))
export const Gift = defineAsyncComponent(() => import('./Gift.vue'))
export const Message = defineAsyncComponent(() => import('./Message.vue'))
export const BottomBar = defineAsyncComponent(() => import('./Bottombar.vue'))
export const Overlay = defineAsyncComponent(() => import('./Overlay.vue'))

export { Landing, Navbar, Bottombar }
