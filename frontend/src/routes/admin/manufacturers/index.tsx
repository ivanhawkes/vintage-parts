import { createFileRoute } from '@tanstack/react-router'
import { List } from '#/components/manufacturers'

export const Route = createFileRoute('/admin/manufacturers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <List />
}
