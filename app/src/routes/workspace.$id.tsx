import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createFileRoute } from '@tanstack/react-router'
import { SendHorizontal } from 'lucide-react'

export const Route = createFileRoute('/workspace/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const mesage=[{
    "id":"1",
    "author":"user",
    "mesage":"hii hallow how to "
  }]
  
  return( 
       <div className='flex  bg'>
       
          <Card className='w-screen max-w-sm  m-3 h-screen bg-gray-700'>
             <CardHeader><span className='text-amber-300'>coder0</span></CardHeader>
             <CardContent>
              {mesage.map((m) => (
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
     
        <div className='max-w-fit bg-gray-700'></div>
        </div>
  )
}
