import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/storage-bins')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/storage-bins"!</div>
}
