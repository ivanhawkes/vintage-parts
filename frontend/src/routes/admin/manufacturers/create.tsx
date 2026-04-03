import { createFileRoute } from '@tanstack/react-router'
import { Create } from '#/components/manufacturers/create'

export const Route = createFileRoute('/admin/manufacturers/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Create />
}
