import { useQuery } from '@tanstack/react-query'
import type { Manufacturer } from '#/interfaces/interfaces'

export function View({ id }:{ id:number } ){
  const { data, isPending, error } = useQuery<Manufacturer>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('http://localhost:8080/manufacturers/' + id).then((r) => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  return (
    <div className="container mx-auto py-10">
      <p>ID = { data.manufacturerId }</p>
      <p>Name = { data.manufacturerName }</p>
      <p>URL = { data.manufacturerUrl }</p>
      <p>Aliases = { data.aliases }</p>
      <p>Description = { data.description }</p>
    </div>
  )
}
