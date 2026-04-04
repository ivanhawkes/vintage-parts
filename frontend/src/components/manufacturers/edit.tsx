import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { type Manufacturer } from '#/api/interfaces'
import { putManufacturer, manufacturerQueryKeys } from '#/api/rest'
import { ManufacturerFields } from './fields'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Edit({ id: manufacturerId }: { id: number }) {
  const queryClient = useQueryClient()

  // Use a mutation to handle the 'PUT' request.
  const mutation = useMutation({
    mutationFn: putManufacturer,
    mutationKey: manufacturerQueryKeys.detail(manufacturerId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-edit'] })
    },
  })

  const handleSubmit = () => {
    mutation.mutate({
      manufacturerId: manufacturerId,
      manufacturerName: 'SHaardvark',
      manufacturerUrl: 'https://www.hard.com',
    })
  }

  return (
    <div>
      {/* <ManufacturerFields m={data} isDisabled={false}></ManufacturerFields> */}
      <div className="container mx-auto py-2">
        <Link
          to="/admin/manufacturers"
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Cancel
        </Link>
        <Button variant="outline" onClick={() => handleSubmit()}>
          Save
        </Button>
      </div>
    </div>
  )
}
