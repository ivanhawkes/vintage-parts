import { useQuery } from '@tanstack/react-query'
import type { Manufacturer } from '#/interfaces/interfaces'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Edit({ id }: { id: number }) {
  const { data, isPending, error } = useQuery<Manufacturer>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('http://localhost:8080/manufacturers/' + id).then((r) => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  return (
    <div>
      <ManufacturerFields m={data} isDisabled={ false }></ManufacturerFields>
      <div className="container mx-auto py-2">
        <Link
          to="/admin/manufacturers/list"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Cancel
        </Link>
        <Link
          to="/admin/manufacturers/list"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Save
        </Link>
      </div>
    </div>
  )
}
