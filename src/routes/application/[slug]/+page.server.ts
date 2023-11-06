export const load = async ({ locals, params }) => {
  const record = await locals.pb.collection('applications').getOne(params.slug)

  const { username, email, admin } = locals.user
  return {
    record: record,
    username: username,
    email: email,
    admin: admin,
  }
}