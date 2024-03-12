// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import { type TypedPocketBase } from "$lib/pocketbase-types"
import { type AuthModel } from 'pocketbase'
import { type Resend } from 'resend'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: TypedPocketBase
			user: AuthModel | undefined
			rs: Resend
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
