import { createFileRoute } from '@tanstack/react-router'
import { Delete } from '#/components/manufacturers/delete'

export const Route = createFileRoute('/admin/manufacturers/$manufacturerId/delete')({
  component: RouteComponent,
})

function RouteComponent() {
  const { manufacturerId } = Route.useParams()

  return <Delete id={ Number.parseInt(manufacturerId) }></Delete>
}
