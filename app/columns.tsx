"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./_components/table/data-table-column-header";
import { Badge } from "./_components/ui/badge";
import JsonDisplay from "./_components/shared/json-display";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "LogLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Log Level" />
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.original._source.LogLevel == "Error" ? "destructive" : "default"
          }
        >
          {row.original._source.LogLevel}
        </Badge>
      );
    },
  },
  {
    accessorKey: "Document",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Document" />
    ),
    cell: ({ row }) => {
      return <JsonDisplay data={row.original._source.Content} />;
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
