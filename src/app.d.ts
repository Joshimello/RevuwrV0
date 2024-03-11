// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { type TypedPocketBase, UsersRecord } from "$lib/pocketbase-types"

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: TypedPocketBase
			user: UsersRecord
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
