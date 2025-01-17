import { defineAsyncComponent } from 'vue'

export const Navbar = defineAsyncComponent(() => import('./Navbar.vue'))
export const Landing = defineAsyncComponent(() => import ('./Landing.vue'))
export const Event = defineAsyncComponent(() => import('./Event.vue'))
export const Gallery = defineAsyncComponent(() => import('./Gallery.vue'))
export const Gift = defineAsyncComponent(() => import ('./Gift.vue'))
export const Message = defineAsyncComponent(() => import('./Message.vue'))
export const BottomBar = defineAsyncComponent(() => import('./Bottombar.vue'))