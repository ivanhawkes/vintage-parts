import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// import { useNavigate } from 'react-router-dom'
import { type Manufacturer, ManufacturerEmpty } from '#/api/interfaces'
import { ManufacturerFields } from './fields'
import { Button, buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

export function Create() {
  //   const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const postManufacturer = useMutation({
    mutationFn: () =>
      fetch('http://localhost:8080/manufacturers', {
        method: 'POST',
        body: JSON.stringify({
          "manufacturerId": -1,
          "manufacturerName": "Baardvark",
          "manufacturerUrl": "https://www.bard.com",
          "description": "He is a bad vark"
        }),
      }),

    onMutate: () => {
      console.log('Before')
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manufacturer-create'] })
      console.log('Success')
      //   navigate('/')
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      console.log('Settled')
    },
  })

  return (
    <div>
      <ManufacturerFields m={ ManufacturerEmpty } isDisabled={false}></ManufacturerFields>
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
            postManufacturer.mutate()
          }}
        >
          Save
        </Button>
      </div>
    </div>
  )
}
