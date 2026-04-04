import { useQueryClient, useMutation } from '@tanstack/react-query'
import { restApi, type Manufacturer, defaultManufacturer } from '#/api/interfaces'
import { ManufacturerFields } from './fields'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'


export function Create() {
  const queryClient = useQueryClient()

  // Create a POST function to access the REST API.
  const createManufacturer = async (newManufacturer: Manufacturer) => {
    const { data } = await restApi.post('/manufacturers', newManufacturer)

    return data
  }

  // Use a mutation to handle the 'POST' request.
  const mutation = useMutation({
    mutationFn: createManufacturer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturers'] })
    },
  })

  const handleCreate = () => {
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
          onClick={() => handleCreate()}
          className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
