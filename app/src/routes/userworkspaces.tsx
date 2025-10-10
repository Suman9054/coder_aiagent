import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/userworkspaces')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workspaces"!</div>
}
