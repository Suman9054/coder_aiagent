import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { SendHorizontal } from 'lucide-react'
import z from 'zod'

export const Route = createFileRoute('/workspace/$id')({
  component: RouteComponent,
})

const mesages =z.object({
  id:z.string(),
  author:z.string(),
  mesage:z.string()
})

function RouteComponent() {
  const quaryclient = useQueryClient();

  const mesage:z.infer<typeof mesages>[] = quaryclient.getQueryData<typeof mesages>(['mesages']) ?? [];
  
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
