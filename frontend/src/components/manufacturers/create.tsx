import { useQueryClient, useMutation } from '@tanstack/react-query'
import { defaultManufacturer } from '#/api/interfaces'
import { postManufacturer, manufacturerQueryKeys } from '#/api/rest'
import { ManufacturerFields } from './fields'
import { buttonVariants } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'

export function Create() {
  const queryClient = useQueryClient()

  // Use a mutation to handle the 'POST' request.
  const mutation = useMutation({
    mutationFn: postManufacturer,
    mutationKey: manufacturerQueryKeys.all,

    onSuccess: () => {
      console.log('success')
      const navigate = useNavigate()
      navigate({
        to: '/admin/manufacturers',
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-create'] })
      console.log('settled')
    },
  })

  const handleSubmit = async () => {
    await mutation.mutateAsync({
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
