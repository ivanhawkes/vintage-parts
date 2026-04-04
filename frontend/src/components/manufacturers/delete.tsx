import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getManufacturer,
  deleteManufacturer,
  manufacturerQueryKeys,
} from '#/api/rest'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'

export function Delete({ id: manufacturerId }: { id: number }) {
  const queryClient = useQueryClient()

  // GET
  const { data, isPending, error } = useQuery({
    queryKey: manufacturerQueryKeys.detail(manufacturerId),
    queryFn: () => getManufacturer(manufacturerId),
  })

  // Use a mutation to handle the 'DELETE' request.
  const deleteMutation = useMutation({
    mutationFn: deleteManufacturer,
    mutationKey: manufacturerQueryKeys.detail(manufacturerId),

    onSuccess: () => {
      const navigate = useNavigate()
      navigate({
        to: '/admin/manufacturers',
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: manufacturerQueryKeys.detail(manufacturerId),
      })
      console.log('settled')
    },
  })

  const handleSubmit = async (id: number) => {
    await deleteMutation.mutateAsync(id)
  }

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

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
