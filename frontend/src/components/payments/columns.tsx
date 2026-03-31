"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Manufacturer } from '#/interfaces/interfaces'

export const columns: ColumnDef<Manufacturer>[] = [
  {
    accessorKey: "manufacturerId",
    header: "ID",
  },
  {
    accessorKey: "manufacturerName",
    header: "Name",
  },
  {
    accessorKey: "manufacturerUrl",
    header: "URL",
  },
  {
    accessorKey: "aliases",
    header: "Aliases",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
]