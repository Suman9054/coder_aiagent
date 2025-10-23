import { Post } from '@/lib/fetch';
import { Workspacereturnschema } from '@/types/types';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/creatWorkspcae/$userId')({
    server: {
    handlers: {
        POST: async ({params, request}) => {
         
        try {
            const {userId} = params;
           
        }catch (error) {
            return Response.json({error: 'Internal Server Error',err:error}, {status: 500});
        }
      
    }
    }}})


