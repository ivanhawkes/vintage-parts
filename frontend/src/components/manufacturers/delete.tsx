import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Manufacturer } from '#/api/interfaces'
import { getManufacturer, deleteManufacturer, manufacturerQueryKeys } from '#/api/rest'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Delete({ id: manufacturerId }: { id: number }) {
  const queryClient = useQueryClient()

  // GET
  const { data, isPending, error } = useQuery({
    queryKey: manufacturerQueryKeys.detail(manufacturerId),
    queryFn: () => getManufacturer(manufacturerId),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  // Use a mutation to handle the 'DELETE' request.
  const deleteMutation = useMutation({
    mutationFn: deleteManufacturer,
    mutationKey: manufacturerQueryKeys.detail(manufacturerId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-delete'] })
    },
  })

  const handleSubmit = (id: number) => {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      <ManufacturerFields m={data} isDisabled={true}></ManufacturerFields>
      <div className="container mx-auto">
        <button
          onClick={() => handleSubmit(manufacturerId)}
          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
        <Link
          to="/admin/manufacturers"
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Cancel
        </Link>
        <Link
          to="/admin/manufacturers"
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Confirm
        </Link>
      </div>
    </div>
  )
}
