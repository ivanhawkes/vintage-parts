import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/manufacturers/view')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/admin/manufacturers/view"!</div>
}
