import { llm } from '@/lib/ai';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/useraiagent')({
    server: {
    handlers: {
        POST: async ({request}) => {
          try {
            const body = await request.json();
            const {prompt}= body;
            if(!prompt) {
                return Response.json({error: 'Prompt is required'}, {status: 400});
            }
            const aiResponse = llm.invoke([
              {role:'system', content:'You are a helpful assistant that helps users to create a workspace based on their prompt.'},
            ])
          } catch (error) {
            return Response.json({error: 'Internal Server Error',err:error}, {status: 500});
          }
        }
    }
}})

