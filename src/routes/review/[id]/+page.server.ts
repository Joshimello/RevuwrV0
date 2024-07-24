import { error, redirect } from "@sveltejs/kit"
import { PB_URL, PB_USER, PB_PASS } from "$env/static/private"
import PocketBase from 'pocketbase'

export const load = async ({ params, locals }) => {

  const pb = new PocketBase(PB_URL)

  try {
    await pb.admins.authWithPassword(PB_USER, PB_PASS)
    const record = await pb.collection('reviews').getOne(params.id, {
      expand: 'applications,applications.event'
    })
    return record
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }
}

export const actions = {
  review: async ({ params, locals, request }) => {
    const data = await request.formData()
    const id = data.get('id') as string
    const review = data.get('review') as string

    const pb = new PocketBase(PB_URL)

    try {
      await pb.admins.authWithPassword(PB_USER, PB_PASS)

      const oldRecord = await pb.collection('reviews').getOne(params.id)

      let newReview = {}

      if (!oldRecord.review) {
        newReview = {
          [id]: JSON.parse(review)
        }
      }
      else {
        newReview = {
          ...oldRecord.review,
          [id]: JSON.parse(review)
        }
      }

      const record = await pb.collection('reviews').update(params.id, {
        review: newReview
      })
      return record
    }
    catch (err) {
      return error(500, err?.message || JSON.stringify(err))
    }

  }
}