import { PB_URL, PB_USER, PB_PASS, RS_KEY } from '$env/static/private'
import { type TypedPocketBase } from "$lib/pocketbase-types"
import PocketBase from 'pocketbase'
import { Resend } from 'resend'
import { error } from '@sveltejs/kit'

export const handle = async ({ event, resolve }) => {
  
  // user pocketbase instance
  event.locals.pb = new PocketBase(PB_URL) as TypedPocketBase
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

  try {
    if(event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection('users').authRefresh()
      event.locals.user = event.locals.pb.authStore.model
    }
  }
  catch (_) {
    event.locals.pb.authStore.clear()
    event.locals.user = undefined
  }


  if (event.url.pathname.startsWith('/admin') && (!event.locals.user || event.locals.user.admin == false)) {
    return error(403, 'Forbidden')
  }

  // admin pocketbase instance
  // if (event.locals.user) {
  //   event.locals.apb = new PocketBase(PB_URL)

  //   try {
  //     await event.locals.apb.admins.authWithPassword(PB_USER, PB_PASS)
  //   }
  //   catch (_) {
  //     event.locals.apb = undefined
  //   }
  // }


  // resend instance
  // event.locals.rs = new Resend(RS_KEY);



  const response = await resolve(event)
  response.headers.append('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))
  return response
}