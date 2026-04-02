import { createFileRoute } from '@tanstack/react-router'
import { Edit } from '#/components/manufacturers/edit'

export const Route = createFileRoute(
  '/admin/manufacturers/edit/$manufacturerId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { manufacturerId } = Route.useParams()

  return <Edit id={ Number.parseInt(manufacturerId) }></Edit>
}
