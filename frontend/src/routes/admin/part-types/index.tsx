import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/part-types/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/part-types"!</div>
}
