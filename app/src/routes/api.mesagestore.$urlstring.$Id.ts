import { messageSchema } from '@/types/types'
import { createFileRoute } from '@tanstack/react-router'
import { createClient } from "redis";






export const Route = createFileRoute('/api/mesagestore/$urlstring/$Id')({
  server: {
    handlers: {
      GET: async ({request,params}) => {
        try {
        const {urlstring, Id} = params;
        const body = request.json();
        const {key} = await body
        const client = await createClient()
        .on("error", (err) => console.log("Redis Client Error", err))
        .connect();
       

        const usermessages = await client.get(`lastMessage:${urlstring}:${Id}:${key}`);
      
        await client.quit();

        return Response.json(usermessages ? JSON.parse(usermessages) : null);
        } catch (error) {
          return Response.json({error: 'Internal Server Error',err:error}, {status: 500});
        }
      },
      POST: async ({ request,params }) => {
       try {
        const client =  await createClient().connect();
        client.on("error", (err) => console.log("Redis Client Error", err));
        const {urlstring, Id} = params ;
        const body = await request.json();
        const parsed = messageSchema.safeParse(body);
        if(!parsed.success) {
          return Response.json({error: 'Invalid message'}, {status: 400});
        } 
       
      const mesage =  await client.set(`lastMessage:${urlstring}:${Id}:${parsed.data.key}`, JSON.stringify({ ...parsed.data, createdAt: new Date() }));
        await client.quit();
       
        return Response.json(mesage)
        } catch (error) {
          return Response.json({error: 'Internal Server Error',err:error}, {status: 500});
        }
      },
    },
  },
})
