import { createFileRoute } from '@tanstack/react-router'
import { Page } from '#/components/payments/page'

export const Route = createFileRoute('/payments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Page />
}
