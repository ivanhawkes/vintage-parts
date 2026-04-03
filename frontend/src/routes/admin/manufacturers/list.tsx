import { createFileRoute } from '@tanstack/react-router'
import { List } from '#/components/manufacturers/list'

export const Route = createFileRoute('/admin/manufacturers/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <List />
}
