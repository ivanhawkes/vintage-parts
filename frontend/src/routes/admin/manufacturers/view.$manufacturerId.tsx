import { createFileRoute } from '@tanstack/react-router'
import { View } from '#/components/manufacturers/view'

export const Route = createFileRoute(
  '/admin/manufacturers/view/$manufacturerId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { manufacturerId } = Route.useParams()

  return <View id={ Number.parseInt(manufacturerId) }></View>
}
