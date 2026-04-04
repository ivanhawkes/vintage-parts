import { useQueryClient, useMutation } from '@tanstack/react-query'
import { defaultManufacturer } from '#/api/interfaces'
import { postManufacturer } from '#/api/rest'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Create() {
  const queryClient = useQueryClient()

  // Use a mutation to handle the 'POST' request.
  const mutation = useMutation({
    mutationFn: postManufacturer,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-create'] })
    },
  })

  const handleSubmit = () => {
    mutation.mutate({
      manufacturerName: 'The New Guys',
      manufacturerUrl: 'http://example.com',
    })
  }

  return (
    <div>
      <ManufacturerFields
        m={defaultManufacturer}
        isDisabled={false}
      ></ManufacturerFields>
      <div className="container mx-auto py-2">
        <Link
          to="/admin/manufacturers"
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Cancel
        </Link>

        <button
          onClick={() => handleSubmit()}
          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
