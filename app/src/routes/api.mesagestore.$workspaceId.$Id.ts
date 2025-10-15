import { messageSchema, ServerMessage, User } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'


const mesagestore= new Map<User,ServerMessage>()

export const Route = createFileRoute('/api/mesagestore/$workspaceId/$Id')({
  server: {
    handlers: {
      GET: () => {
        const {workspaceId, Id} = Route.useParams();
        console.log(workspaceId, Id);

        const usermessages = mesagestore.get({workspaceId, userId: Id});

        return Response.json(usermessages ?? []);
      },
      POST: async ({ request }) => {
       const {workspaceId, Id} = Route.useParams();
        const body = await request.json();
        const parsed = messageSchema.safeParse(body);
        if(!parsed.success) {
          return Response.json({error: 'Invalid message'}, {status: 400});
        } 
        const mesage = mesagestore.set({workspaceId, userId: Id}, { ...parsed.data, createdAt: new Date() });
       console.log(mesagestore.size);
        return Response.json(mesage)
      },
    },
  },
})
