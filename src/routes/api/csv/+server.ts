import { error, json } from '@sveltejs/kit'

const escCSV = (value: string): string => {
  if (typeof value === 'string') {
    value = value.replace(/"/g, '""')
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      value = `"${value}"`
    }
  }
  return value
}

export const GET = async ({ url, locals }) => {
  const eventid = url.searchParams.get('event') as string
  const raw = url.searchParams.get('ids') as string

  if (!eventid) return error(400, '"event" required.')
  if (!raw) return error(400, '"ids" required.')

  try {
    const ids = raw.split(',')

    const idFilter = ids.map(id => `id="${id}"`).join('||')
    const eventFilter = `event="${eventid}"`

    const records = await locals.pb.collection('applications').getFullList({
      filter: `(${idFilter})&&(${eventFilter})`,
      expand: 'responder,event',
    })

    const pRecords = records.map(record => ({
      id: record.expand.responder.username,
      name: record.expand.responder.name,
      email: record.expand.responder.email,
      status: record.status,
      ...Object.fromEntries(
        record.response.map(r => [
          r.question.replace(/<[^>]*>/g, ''), 
          escCSV(JSON.stringify(r.value))
        ])
      ),
    }))

    const keys = [...new Set(pRecords.flatMap(Object.keys))]
    const headerRow = keys.join(',')

    const rows = [headerRow]
    pRecords.forEach(record => {
      const row = keys.map(key => record[key] ?? '').join(',')
      rows.push(row)
    })

    const csv = rows.join('\n')


    const contentType = 'text/csv'

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${eventid}.csv"`,
      }
    })
  }
  catch (err) {
    return error(500, err?.message || JSON.stringify(err))
  }

}