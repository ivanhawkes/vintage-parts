'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import type { Manufacturer } from '#/api/interfaces'
import { Button } from '@/components/ui/button'
import { Link, useParams } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Manufacturer>[] = [
  // {
  //   accessorKey: 'manufacturerId',
  //   header: 'Id',
  // },
  {
    accessorKey: 'manufacturerName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const m = row.original

      return (
        <Link className="nav-link" activeProps={{ className: 'nav-link is-active' }} to={'/admin/manufacturers/view/' + m.manufacturerId}>
          {m.manufacturerName}
        </Link>
      )
    },
  },
  {
    accessorKey: 'manufacturerUrl',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // {
  //   accessorKey: 'aliases',
  //   header: 'Aliases',
  // },
  // {
  //   accessorKey: 'description',
  //   header: 'Description',
  // },
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const m = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline">...</Button>}
          />
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(m.manufacturerName)
                }
              >
                Copy Name
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
