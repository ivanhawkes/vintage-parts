import { createFileRoute } from '@tanstack/react-router'
import { ManufacturerList } from '#/components/manufacturers/manufacturer-list'

export const Route = createFileRoute('/admin/manufacturers')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ManufacturerList />
}
