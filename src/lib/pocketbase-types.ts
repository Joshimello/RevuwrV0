/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Applications = "applications",
	Events = "events",
	Files = "files",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ApplicationsRecord<Tresponse = unknown, Tstatus_info = unknown> = {
	application_id?: number
	event?: RecordIdString
	responder?: RecordIdString
	response?: null | Tresponse
	status?: string
	status_info?: null | Tstatus_info
	updated_response?: IsoDateString
}

export type EventsRecord<Tquestions = unknown, Tsettings = unknown> = {
	application_count?: number
	name?: string
	questions?: null | Tquestions
	settings?: null | Tsettings
	updated_questions?: IsoDateString
	updated_settings?: IsoDateString
}

export type FilesRecord = {
	file?: string[]
	user?: RecordIdString
}

export type UsersRecord = {
	admin?: boolean
	avatar?: string
	department?: string
	name?: string
	year?: string
}

// Response types include system fields and match responses from the PocketBase API
export type ApplicationsResponse<Tresponse = unknown, Tstatus_info = unknown, Texpand = unknown> = Required<ApplicationsRecord<Tresponse, Tstatus_info>> & BaseSystemFields<Texpand>
export type EventsResponse<Tquestions = unknown, Tsettings = unknown, Texpand = unknown> = Required<EventsRecord<Tquestions, Tsettings>> & BaseSystemFields<Texpand>
export type FilesResponse<Texpand = unknown> = Required<FilesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	applications: ApplicationsRecord
	events: EventsRecord
	files: FilesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	applications: ApplicationsResponse
	events: EventsResponse
	files: FilesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'applications'): RecordService<ApplicationsResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'files'): RecordService<FilesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
