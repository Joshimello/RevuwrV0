export const load = async ({ locals, params }) => {
  const records = await locals.pb.collection('applications').getOne(params.slug)
  console.log(records)

  // const { username, email, admin } = locals.user
  // return {
  //   records: records,
  //   username: username,
  //   email: email,
  //   admin: admin,
  // }
}