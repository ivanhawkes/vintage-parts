import { useMutation, useQueryClient } from '@tanstack/react-query'
import { restApi, type Manufacturer } from '#/api/interfaces'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Delete({ id: manufacturerId }: { id: number }) {
  const queryClient = useQueryClient()

  // Create a DELETE function to access the REST API.
  const deleteManufacturer = async (id: number) => {
    await restApi.delete(`/manufacturers/${id}`)

    return id
  }

  // Use a mutation to handle the 'DELETE' request.
  const deleteMutation = useMutation({
    mutationFn: deleteManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer'] })
    },
  })

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      {/* <ManufacturerFields m={data} isDisabled={true}></ManufacturerFields> */}
      <div className="container mx-auto">
        <button
          onClick={() => handleDelete(manufacturerId)}
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
