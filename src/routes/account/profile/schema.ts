import { z } from "zod"

export const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  year: z.string(),
  department: z.string()
})

export type FormSchema = typeof formSchema