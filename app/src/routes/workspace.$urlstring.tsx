import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { authClient } from '@/lib/auth-client'
import { Get } from '@/lib/fetch'
import { Message } from '@/types/types'
import { QueryClient, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { SendHorizontal } from 'lucide-react'
import React from 'react'


export const Route = createFileRoute('/workspace/$urlstring')({
  component: RouteComponent,
  ssr: false,
  
})




function RouteComponent() {
 
  const param = Route.useParams();
  const session = authClient.useSession();
  const [messagesa, setMessages] = React.useState('');

  const query = useQuery<Message[]>({
    queryKey: ['messagesa'],
    queryFn: async () => {
      const res = await Get(`/api/mesagestore/${param.urlstring}/${session.data?.session.userId}`);
      return res;
    }})
    
    const onsubmit = (e: React.FormEvent) => {
      e.preventDefault()


      setMessages('')
    }



    return (
      <div className='flex gap-0'>

        <Card className='w-screen max-w-sm   h-screen bg-gray-700'>
          <CardTitle className='text-amber-200 text-lg font-bold p-4 border-b border-gray-600'>coder 0</CardTitle>

          <CardContent>
            {query.data ? (
              <div className='flex flex-col gap-4'>
                {query.data.map((message, index) => (
                  <div key={index} className={`p-3 rounded ${message.author === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                    <p className='whitespace-pre-wrap'>{message.mesage}</p>
                  </div>
                ))}
              </div>
            ) :<div>Loading...</div>}
          </CardContent>
          <CardFooter>
            <form className='flex' onSubmit={onsubmit}>
              <Input placeholder='creat anything' onChange={(e) => setMessages(e.target.value)} value={messagesa} className='focus-visible:border-none border-gray-400 w-80' />
              <Button variant={'link'} size={'icon'}><SendHorizontal className="w-5 h-5" color='white' /></Button>
            </form>
          </CardFooter>
        </Card>
        <Card className='w-screen h-screen  bg-gray-700'>
          <CardHeader></CardHeader>
          <CardContent>
            <pre className='text-sm text-gray-200'></pre>
          </CardContent>
        </Card>

      </div>
    )
  }
