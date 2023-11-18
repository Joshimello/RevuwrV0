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

  if(answer.status != 'review_______st'){
    throw error(404, 'Not Found')
  }

  return {
    user: locals.user,
    question: question,
    answer: answer,
  }
}

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData();
    data.append('responder', locals.user.id)
    data.append('status', 'pending______st')

    try {
      await locals.pb.collection(params.slug).update(params.resp, data)
      throw redirect(302, '')
    }
    catch (err) {
      if(err?.status == 302){
        throw redirect(302, '/application/'+params.slug+'/success')
      }
      // console.log(err)
      return fail(400, { status: 'Failed to submit response' });
    }

  },
};