import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Message } from '@/types/types'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { SendHorizontal } from 'lucide-react'
import React from 'react'


export const Route = createFileRoute('/workspace/$id')({
  component: RouteComponent,
  ssr: false,
})




function RouteComponent() {
  const quaryclient = useQueryClient();

  const [messagesa, setMessages] = React.useState('');

  const messages = quaryclient.getQueryData<Message[]>(['mesages']) ?? [];

 const onsubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(messagesa.trim() === '') return;
    const newMessage: Message = {
      id: crypto.randomUUID(),
      author: 'User',
      mesage: messagesa.trim()
    };
    quaryclient.setQueryData<Message[]>(['mesages'], [...messages, newMessage]);
    setMessages('');
 }

  

  return( 
       <div className='flex gap-0'>
       
          <Card className='w-screen max-w-sm   h-screen bg-gray-700'>
            <CardTitle className='text-amber-200 text-lg font-bold p-4 border-b border-gray-600'>coder 0</CardTitle>
             
             <CardContent>
              {messages.map((m) => (
            <div key={m.id} className='text-sm text-gray-200'>
              <text className="font-semibold">{m.author}: </text>
              <text>{m.mesage}</text>
              <span className=''/>
            </div>
             ))}
             </CardContent>
             <CardFooter>
              <form className='flex ' onSubmit={onsubmit}>
                <Input placeholder='creat anything' onChange={(e) => setMessages(e.target.value)} value={messagesa} className='focus-visible:border-none border-gray-400 w-80'/>
             
             <Button variant={'link'} size={'icon'} ><SendHorizontal className="w-5 h-5" color='white' /></Button>
            
             </form>
              </CardFooter>
          </Card>
          <Card className='w-screen h-screen  bg-gray-700'>
            <CardHeader></CardHeader>
            <CardContent>
              <pre className='text-sm text-gray-200'>{}</pre>
            </CardContent>
          </Card>
      
        </div>
  )
}
