import { useQuery } from '@tanstack/react-query'

// Define an interface for the REST API response JSON.
interface Manufacturer {
  manufacturerId: number;
  manufacturerName: string;
  manufacturerUrl: string;
}

type Manufacturers = Manufacturer[]

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
