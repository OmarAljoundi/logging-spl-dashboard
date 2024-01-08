"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./_components/table/data-table-column-header";
import { Badge } from "./_components/ui/badge";
import JsonDisplay from "./_components/shared/json-display";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Log Level" />
    ),
    cell: ({ row }) => {
      return <Badge variant={"default"}>{row.original._source.name}</Badge>;
    },
  },
  {
    accessorKey: "Document",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document" />
    ),
    cell: ({ row }) => {
      return <JsonDisplay data={row.original._source} />;
    },
  },

  // {
  //   accessorKey: "document",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Document" />
  //   ),
  //   cell: ({ row }) => {
  //     return <p>{row.original.document}</p>;
  //   },
  // },
];
