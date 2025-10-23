import Loginfrom from '@/components/loginfrom'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { authClient } from '@/lib/auth-client'
import { createFileRoute } from '@tanstack/react-router'
import { Github } from 'lucide-react'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  ssr: false,
})

function RouteComponent() {
  return <div>
    
    <Card className="w-[400px] mx-auto mt-20 p-8">
      <Loginfrom />
      <CardFooter>
        <Button variant="link" className="mx-auto" onClick={async ()=>{
          await authClient.signIn.social({
            provider:"github"
          })
        }}> <Github  /></Button>
      </CardFooter>
    </Card>
    
    </div>
}
