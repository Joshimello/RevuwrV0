import { writable } from 'svelte/store';

// form title
export let title = writable<string>('');

// form description
export let description = writable<string>('');

// form start date
export let start = writable<string>('');

// form end date
export let end = writable<string>('');

// form schema and properties
export let schema = writable<{ [key: string]: any }>({});
