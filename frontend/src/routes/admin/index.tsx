import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex py-2">
      <Link to="/admin/manufacturers/list" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>
        Manufacturers
      </Link>

      <Link to="/admin/parts" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>
        Parts
      </Link>

      <Link to="/admin/part-types" className="nav-link" activeProps={{ className: 'nav-link is-active' }}>
        Part Types
      </Link>
    </div>
  )
}
