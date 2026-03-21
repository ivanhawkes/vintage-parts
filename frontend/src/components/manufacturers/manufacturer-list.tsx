import { useQuery } from '@tanstack/react-query'
// import { useState } from 'react'

// Define an interface for the REST API response JSON.
interface Manufacturer {
  manufacturerId: number;
  manufacturerName: string;
  manufacturerUrl: string;
}

type Manufacturers = Manufacturer[]

export function ManufacturerList() {
    // const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

    const { data, isPending, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('http://localhost:8080/manufacturers')
        .then(r => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>Oops!</span>

//   setManufacturers(data);
//   const man: Manufacturers = JSON.parse(data)

  return (
      <ul>{data.map(m => <li key={m.manufacturerId}>{m.manufacturerName}</li>)}</ul>
  )
}
