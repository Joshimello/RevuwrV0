export const load = async ({ locals, params }) => {
  const records = await locals.pb.collection('applications').getFullList({
    fields: 'id,name,start,end'
  })

  const { username, email, admin } = locals.user
  return {
    records: records,
    username: username,
    email: email,
    admin: admin,
  }
}