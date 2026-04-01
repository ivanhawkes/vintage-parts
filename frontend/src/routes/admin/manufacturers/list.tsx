import { createFileRoute } from '@tanstack/react-router'
import { Page } from '#/components/manufacturers/page'

export const Route = createFileRoute('/admin/manufacturers/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Page />
}
