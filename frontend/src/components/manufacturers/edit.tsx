import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useNavigate } from 'react-router-dom'
import type { Manufacturer } from '#/api/interfaces'
import { ManufacturerFields } from './fields'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Edit({ id }: { id: number }) {
  //   const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isPending, error } = useQuery<Manufacturer>({
    queryKey: ['manufacturer-edit'],
    queryFn: () =>
      fetch('http://localhost:8080/manufacturers/' + id).then((r) => r.json()),
  })

  const putManufacturer = useMutation({
    mutationFn: () =>
      fetch('http://localhost:8080/manufacturers/' + id, {
        method: 'PUT',
        body: JSON.stringify({
          manufacturerId: 1,
          manufacturerName: 'Aardvark',
          description: 'Product description',
        }),
      }),

    onMutate: () => {
      console.log('Before')
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-edit'] })
      console.log('Success')
      //   navigate('/')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      console.log('Settled')
    },
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  return (
    <div>
      <ManufacturerFields m={data} isDisabled={false}></ManufacturerFields>
      <div className="container mx-auto py-2">
        <Link
          to="/admin/manufacturers/list"
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Cancel
        </Link>

        <Button
          onClick={() => {
            putManufacturer.mutate()
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
