import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/parts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello admin-parts</div>
}
