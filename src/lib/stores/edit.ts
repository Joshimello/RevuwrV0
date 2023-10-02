import { writable } from 'svelte/store';

// form title
export let title = writable<string>('');

// form description
export let description = writable<string>('');

// form schema and properties
export let schema = writable<{ [key: string]: any }>({});
