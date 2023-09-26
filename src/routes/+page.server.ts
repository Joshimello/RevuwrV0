import PocketBase from 'pocketbase'
import { PB_URL, PB_USER, PB_PASS } from '$env/static/private'

export const load = async() => {
  const pb = new PocketBase(PB_URL)
  await pb.admins.authWithPassword(PB_USER, PB_PASS)
  const collections = await pb.collections.getFullList()
  const forms = collections.map(collection => {
    if(collection.name.split(0, 5) == 'form_'){
      return collection
    }
  })
  return {
    body: forms
  }
}