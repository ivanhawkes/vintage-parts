import { useQuery } from '@tanstack/react-query'
import type { Manufacturer } from '#/api/interfaces'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function View({ id }: { id: number }) {
  const { data, isPending, error } = useQuery<Manufacturer>({
    queryKey: ['manufacturer-view'],
    queryFn: () =>
      fetch('http://localhost:8080/manufacturers/' + id).then((r) => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  return (
    <div>
      <ManufacturerFields m={data} isDisabled={true}></ManufacturerFields>
      <div className="container mx-auto">
        <Link
          to="/admin/manufacturers"
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Cancel
        </Link>
        <Link
          to={'/admin/manufacturers/' + id + '/delete'}
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Delete
        </Link>
        <Link
          to={'/admin/manufacturers/' + id + '/edit'}
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Edit
        </Link>
      </div>
    </div>
  )
}
