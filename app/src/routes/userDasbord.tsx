import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/userDasbord')({
  component: userDasbord,
})




function userDasbord(){
    return(
        <>
        userDasbord
        </>
    )
}