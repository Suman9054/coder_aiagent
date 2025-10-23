import z from "zod"


export const messageSchema = z.object({
  id: z.string(),
  author: z.string(),
  mesage: z.string(),
  key: z.string().optional(),
  urlstring: z.string().optional(),
})

const serverMessageSchema = messageSchema.extend({
  createdAt:z.date().optional().default(new Date()),
 
})

const user = z.object({
  workspaceId: z.string(),
  userId: z.string(),
})

const workspacereturnschema = z.object({
  message: z.string(),
  sandBoxId: z.number().min(0),
  contnerId:z.string(),
  responseUrl: z.string().url(),

});

type Message = z.infer<typeof messageSchema>
type ServerMessage = z.infer<typeof serverMessageSchema>
type User = z.infer<typeof user>
type Workspacereturnschema = z.infer<typeof workspacereturnschema>
export type { Message, ServerMessage, User , Workspacereturnschema}