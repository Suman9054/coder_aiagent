import z from "zod"


export const messageSchema = z.object({
  id: z.string(),
  author: z.string(),
  mesage: z.string(),
  key: z.string().optional(),
})

const serverMessageSchema = messageSchema.extend({
  createdAt:z.date().optional().default(new Date()),
 
})

const user = z.object({
  workspaceId: z.string(),
  userId: z.string(),
})
type Message = z.infer<typeof messageSchema>
type ServerMessage = z.infer<typeof serverMessageSchema>
type User = z.infer<typeof user>
export type { Message, ServerMessage, User }