import React from 'react'
import { Tailwind, Button } from "@react-email/components"

const Email = ({ application_id, username, application_url, status }) => {
  return (
    <Tailwind>
      <div className="w-full flex justify-center bg-gray-100">
        <div className="max-w-xl p-6">
          <span className="text-lg font-semibold">NTHU // CTLD</span>
          <div className="mt-6 bg-white p-6 rounded-3xl">
            <span className="text-2xl">
              Hi {username}, <br />
              Your application {application_id} has been {status}! <br />
            </span>
            <Button className="mt-4" href={application_url}>
              View application
            </Button>
          </div>
        </div>
      </div>
    </Tailwind>
  )
}

export default Email