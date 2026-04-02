import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/manufacturers/edit/$manufacturerId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/manufacturers/edit"!</div>
}
