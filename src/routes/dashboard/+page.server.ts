export const load = async ({ locals, params }) => {
  const { username, email, admin, id: userid } = locals.user

  const records = await locals.pb.collection('applications').getFullList({
    fields: 'id,name,start,end,idprefix'
  })

  let applications = []
  for(const { id } of records){
    try {
      const list = await locals.pb.collection(id).getFullList({
        filter: 'responder ~ "'+userid+'"',
        expand: 'status'
      })
      applications = [...applications, ...list]
    }
    catch(err) {

    }
  }

  return {
    records: records,
    applications: applications,
    user: { username, email, admin, userid }
  }
}