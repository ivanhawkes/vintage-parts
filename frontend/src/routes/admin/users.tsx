import { createFileRoute } from '@tanstack/react-router'
import { UserList } from '#/components/users/user-list'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserList />
}
