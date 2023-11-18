import { redirect, fail, error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  
  let question, answer
  
  try {
    question = await locals.pb.collection('applications').getOne(params.slug)
    answer = await locals.pb.collection(params.slug).getOne(params.resp)
  }
  catch (err) {
    throw error(404, 'Not Found')
  }

  return {
    user: locals.user,
    question: question,
    answer: answer,
  }
}