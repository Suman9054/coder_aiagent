import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { SendHorizontal } from 'lucide-react'
import z from 'zod'

export const Route = createFileRoute('/workspace/$id')({
  component: RouteComponent,
})

const messageSchema = z.object({
  id: z.string(),
  author: z.string(),
  mesage: z.string()
})

type Message = z.infer<typeof messageSchema>



function RouteComponent() {
  const quaryclient = useQueryClient();

  const messages = quaryclient.getQueryData<Message[]>(['mesages']) ?? [];

 

  

  return( 
       <div className='flex'>
       
          <Card className='w-screen max-w-sm  m-3 h-screen bg-gray-700'>
             
             <CardContent>
              {messages.map((m) => (
            <div key={m.id} className='text-sm text-gray-200'>
              <text className="font-semibold">{m.author}: </text>
              <text>{m.mesage}</text>
              <span className=''/>
            </div>
             ))}
             </CardContent>
              <form className='flex '>
                <Input placeholder='creat anything'/>
             <CardFooter>
             <Button variant={'link'} size={'icon'} ><SendHorizontal className="w-5 h-5" /></Button>
             </CardFooter>
             </form>
          </Card>
          <Card className='w-screen h-screen m-3 bg-gray-700'>
            <CardContent>
              <pre className='text-sm text-gray-200'>{}</pre>
            </CardContent>
          </Card>
      
        </div>
  )
}
