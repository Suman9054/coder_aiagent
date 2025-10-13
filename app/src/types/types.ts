import z from "zod"


const messageSchema = z.object({
  id: z.string(),
  author: z.string(),
  mesage: z.string()
})

type Message = z.infer<typeof messageSchema>
export type { Message }