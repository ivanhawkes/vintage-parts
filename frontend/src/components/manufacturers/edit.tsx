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
    queryKey: ['manufacturer-edit', id],
    queryFn: () =>
      fetch('http://localhost:8080/manufacturers/' + id).then((r) => r.json()),
  })

  const putManufacturer = useMutation({
    mutationFn: (newManufacturer: Manufacturer) =>
      fetch('http://localhost:8080/manufacturers/' + id, {
        method: 'PUT',
        body: JSON.stringify(newManufacturer),
      }),

    onMutate: () => {
      console.log('Mutate')
    },

    onSuccess: (data) => {
      console.log(data)
      //   navigate('/')
    },

    // 3. On error - Rollback
    onError: (error, variables, context) => {
      // queryClient.setQueryData(['todos'], context.previousTodos)
      // toast.error('Failed to add todo')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-edit', id] })
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newManufacturer: Manufacturer = {
      manufacturerId: -4,
      manufacturerName: 'Haardvark',
      manufacturerUrl: 'https://www.hard.com',
      description: 'Life is hard.',
      aliases: '',
    }
    putManufacturer.mutate(newManufacturer)
  }

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
        <form onSubmit={handleSubmit}>
          <Button type="submit">Save</Button>
        </form>
      </div>
    </div>
  )
}
