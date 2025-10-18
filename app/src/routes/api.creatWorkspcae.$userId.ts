import { Post } from '@/lib/fetch';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/creatWorkspcae/$userId')({
    server: {
    handlers: {
        POST: async ({params, request}) => {

        try {
            const { userId } = params;
            const body = await request.json();
            const {image} = body;
            console.log("image",image);
            if(!image) {
                return Response.json({error: 'Image is required'}, {status: 400});
            }
           const respons = await Post('http://localhost:8088/api/create', {"image":image, "user_id":userId});
             console.log("respons",respons);
              return Response.json(respons);
        }catch (error) {
            return Response.json({error: 'Internal Server Error',err:error}, {status: 500});
        }
    }
      
    }
}})


