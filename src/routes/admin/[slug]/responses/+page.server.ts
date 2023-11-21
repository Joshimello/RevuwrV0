import { redirect, fail } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
  let records, statuses
  try {
    records = await locals.pb.collection(params.slug).getFullList({
      expand: 'responder,status'
    })
    statuses = await locals.pb.collection('statuses').getFullList()
  }
  catch (err) {
    throw redirect(302, '/admin')
  }
  return { records, statuses }
}

export const actions = {
  change: async ({ locals, request, params }) => {
    const data = await request.formData();
    const status = data.get('status')

    // try {
    //   const record = await locals.pb.collection(params.slug).update(params.resp, {
    //     status: status
    //   });
    //   return fail(400, { success: true });
    // }
    // catch (err) {
    //   return fail(400, { success: false });
    // }
  },
  mail: async ({ locals, request, params }) => {
    const data = await request.formData();
    const email = data.get('email')
    const subject = data.get('subject')
    const content = data.get('content');
    const replyto = data.get('replyto');
    const mailas = data.get('mailas')

    // try {
    //   const mailid = await locals.rs.emails.send({
    //     from: mailas,
    //     to: email,
    //     subject: subject,
    //     html: content,
    //     reply_to: replyto
    //   })
    //   return fail(400, { success: true });
    // }
    // catch (err) {
    //   return fail(400, { success: false });
    // }
  }
}