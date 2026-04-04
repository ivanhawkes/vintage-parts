import { useQuery } from '@tanstack/react-query'
import { getAllManufacturer, manufacturerQueryKeys } from '#/api/rest'
import type { Manufacturers } from '#/api/interfaces'
import { columns } from './columns'
import { DataTable } from './data-table'

export function List() {
  // GET
  const { data, isPending, error } = useQuery({
    queryKey: manufacturerQueryKeys.all,
    queryFn: () => getAllManufacturer(),
  })

  if (isPending) return <span>Loading...</span>
  if (error) return <span>An error has occurred.</span>

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
