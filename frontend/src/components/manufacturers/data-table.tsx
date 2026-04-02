'use client'

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { buttonVariants } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'

import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  var pageList: number[] = []
  for (let i = 1; i <= table.getPageCount(); i++) {
    pageList[i] = i
  }

  return (
    <div>
      <div className="flex py-2 justify-between">
        <Input
          placeholder="Filter by name..."
          value={
            (table.getColumn('manufacturerName')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) =>
            table
              .getColumn('manufacturerName')
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Link
          to="/admin/manufacturers/edit"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          activeProps={{ className: 'nav-link is-active' }}
        >
          Add Manufacturer
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <TablePagination /> */}

      <div>
        <div className="flex py-2 justify-between text-sm">
          <div className="flex shrink-0 items-center gap-3">
            <Label>Rows per page</Label>

            <Select
              defaultValue="15"
              value={table.getState().pagination.pageSize.toLocaleString()}
              onValueChange={(e) => {
                table.setPageSize(Number(e))
              }}
            >
              <SelectTrigger className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Select number of results" />
              </SelectTrigger>
              <SelectContent>
                {[10, 15, 25, 50].map((pageSize) => (
                  <SelectItem value={pageSize} key={pageSize}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Label>Page: </Label>
            <Select
              defaultValue="1"
              onValueChange={(e) => {
                table.setPageIndex(Number(e) - 1)
              }}
            >
              <SelectTrigger className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Select number of results" />
              </SelectTrigger>
              <SelectContent>
                {pageList.map((page) => (
                  <SelectItem value={page} key={page}>
                    {page}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Pagination className="w-fit max-sm:mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.firstPage()}
                    isActive={!table.getCanPreviousPage()}
                    aria-label="Go to first page"
                    size="icon"
                    className="rounded"
                  >
                    <ChevronFirstIcon className="size-4" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.previousPage()}
                    isActive={!table.getCanPreviousPage()}
                    aria-label="Go to previous page"
                    size="icon"
                    className="rounded"
                  >
                    <ChevronLeftIcon className="size-4" />
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.nextPage()}
                    isActive={!table.getCanNextPage()}
                    aria-label="Go to next page"
                    size="icon"
                    className="rounded"
                  >
                    <ChevronRightIcon className="size-4" />
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => table.lastPage()}
                    isActive={!table.getCanNextPage()}
                    aria-label="Go to last page"
                    size="icon"
                    className="rounded"
                  >
                    <ChevronLastIcon className="size-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}
