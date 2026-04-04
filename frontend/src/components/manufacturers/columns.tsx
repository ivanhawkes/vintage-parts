'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import type { Manufacturer } from '#/api/interfaces'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from '@tanstack/react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const columns: ColumnDef<Manufacturer>[] = [
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
        <Link
          className="nav-link"
          activeProps={{ className: 'nav-link is-active' }}
          to={'/admin/manufacturers/' + m.manufacturerId + '/view'}
        >
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
  {
    header: 'Action',
    id: 'actions',
    cell: ({ row }) => {
      const m = row.original
      const navigate = useNavigate()

      const handleClickEdit = () => {
        navigate({
          to: '/admin/manufacturers/$manufacturerId/edit',
          params: { manufacturerId: `${m.manufacturerId}` },
        })
      }

      const handleClickDelete = () => {
        navigate({
          to: '/admin/manufacturers/$manufacturerId/delete',
          params: { manufacturerId: `${m.manufacturerId}` },
        })
      }

      const handleClickView = () => {
        navigate({
          to: '/admin/manufacturers/$manufacturerId/view',
          params: { manufacturerId: `${m.manufacturerId}` },
        })
      }

      const handleClickCreate = () => {
        navigate({
          to: '/admin/manufacturers/create',
        })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline">...</Button>}
          />
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleClickEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClickDelete}>
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClickView}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClickCreate}>
                Create
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
