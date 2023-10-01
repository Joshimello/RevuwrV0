import { writable } from 'svelte/store'
export let schema = writable<{[key: string]: any}>({})