import { useQuery } from '@tanstack/react-query'
import type { Manufacturers } from '#/interfaces/interfaces'

export function ManufacturerList() {
    const { data, isPending, error } = useQuery<Manufacturers>({
    queryKey: ['todos'],
    queryFn: () => fetch('http://localhost:8080/manufacturers')
        .then(r => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Oops!</span>

  return (
    <table>
        <thead>
            <tr><th>Id</th><th>Name</th></tr>
        </thead>
        <tbody>
            {data.map(m => 
                <tr key={m.manufacturerId}><td>{m.manufacturerId}</td><td>{m.manufacturerName}</td></tr>
            )}        
        </tbody>
      </table>
  )
}
