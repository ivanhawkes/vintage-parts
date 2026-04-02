import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/manufacturers/delete/$manufacturerId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/manufacturers/delete"!</div>
}
