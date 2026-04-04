import { useQueryClient, useMutation } from '@tanstack/react-query'
import { type Manufacturer, defaultManufacturer } from '#/api/interfaces'
import { ManufacturerFields } from './fields'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import axios from 'axios'

export const postManufacturerFn = axios.create({
  baseURL: 'http://localhost:8080/manufacturers',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 2000,
})

export function Create() {
  const queryClient = useQueryClient()

  const newManufacturer: Manufacturer = {
    manufacturerId: 0,
    manufacturerName: 'Baardvark',
    manufacturerUrl: 'https://www.bard.com',
    description: 'He is a rad vark',
  }

  const postManufacturer = useMutation({
    mutationFn: () =>
      fetch('http://localhost:8080/manufacturers', {
        method: 'POST',
        body: JSON.stringify(newManufacturer),
      }),

    onMutate: async () => {
      console.log('Before')
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-create'] })
      console.log(data)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-create'] })
      console.log('Settled')
    },
  })

  // function createUser(){}
  // const postMan { isLoading, isSuccess, error, mutate } = useMutation(createUser) }

  return (
    <div>
      <ManufacturerFields
        m={defaultManufacturer}
        isDisabled={false}
      ></ManufacturerFields>
      <div className="container mx-auto py-2">
        <Link
          to="/admin/manufacturers/list"
          className={buttonVariants({ variant: 'outline' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Cancel
        </Link>

        <Button onClick={() => postManufacturer.mutate()}>Save</Button>
      </div>
    </div>
  )
}
