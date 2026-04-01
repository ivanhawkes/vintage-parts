import { useQuery } from '@tanstack/react-query'
import type { Manufacturers } from '#/interfaces/interfaces'
import { columns } from './columns'
import { DataTable } from './data-table'

export function Page() {
  const { data, isPending, error } = useQuery<Manufacturers>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch('http://localhost:8080/manufacturers').then((r) => r.json()),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
