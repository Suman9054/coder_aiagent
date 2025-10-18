import { llm } from '@/lib/ai';
import { useraisystemprompt } from '@/lib/useraiprompt';
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
            const aiResponse = await llm.invoke([
              {role:'system', content:useraisystemprompt()},
              {role:'user',content:prompt}
            ])

            return Response.json({airespons:JSON.stringify(aiResponse)},{status:200})
          } catch (error) {
            return Response.json({error: 'Internal Server Error',err:error}, {status: 500});
          }
        }
    }
}})

