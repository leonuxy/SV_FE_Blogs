"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Posts = {
  id: number
  title: string
  category: string
  status: string
}
interface ColumnActions {
    handleDetails: (id: number) => void;
    handleDelete: (id: number) => void;
}

export const Columns = ({
    handleDetails,
    handleDelete,
  }: ColumnActions): ColumnDef<Posts>[] => [
  {
    accessorKey: "title",
    header: "title",
  },
  {
    accessorKey: "category",
    header: "category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDetails(data.id)}><Pencil className="w-24 h-24" />Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(data.id)}><Trash className="w-24 h-24" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
