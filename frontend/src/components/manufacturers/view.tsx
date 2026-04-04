import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getManufacturer } from '#/api/rest'
import type { Manufacturer } from '#/api/interfaces'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const manufacturerQueryKeys = {
  all: ['manufacturer'],
  details: () => [...manufacturerQueryKeys.all, 'detail'],
  detail: (id: number) => [...manufacturerQueryKeys.details(), id],
  pagination: (page: number) => [...manufacturerQueryKeys.all, 'pagination', page],
  infinite: () => [...manufacturerQueryKeys.all, 'infinite'],
}

export function View({ id }: { id: number }) {
  const queryClient = useQueryClient()

  // GET
  const { data, isPending, error } = useQuery<Manufacturer>({
    queryKey: manufacturerQueryKeys.detail(id),
    queryFn: () => getManufacturer(id),
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
