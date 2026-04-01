'use client'

import type { ColumnDef } from '@tanstack/react-table'
import type { Manufacturer } from '#/interfaces/interfaces'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

export const columns: ColumnDef<Manufacturer>[] = [
  // {
  //   accessorKey: 'manufacturerId',
  //   header: 'ID',
  // },
  {
    accessorKey: 'manufacturerName',
    header: 'Name',
  },
  {
    accessorKey: 'manufacturerUrl',
    header: 'URL',
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
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
