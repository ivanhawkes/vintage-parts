import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/parts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello parts</div>
}
