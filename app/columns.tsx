"use client";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./_components/table/data-table-column-header";
import { Badge } from "./_components/ui/badge";
import JsonDisplay from "./_components/shared/json-display";
import { Button } from "./_components/ui/button";
import { useSearchParams } from "@search-params/react";
import { config } from "./_lib/search-config";
import { useMemo } from "react";
import { Expand, Shrink } from "lucide-react";

export default function useColumns() {
  const { fieldsFiltered } = useSearchParams({
    route: config.home,
  });

  const columns = useMemo<ColumnDef<any>[]>(() => {
    return [...defaultColumns];
  }, [fieldsFiltered]);

  return { columns };
}

export const defaultColumns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => <h1>Expand</h1>,
    cell: ({ row }) => {
      if (row.getIsSelected()) {
        return (
          <Button
            size={"icon"}
            onClick={() => {}} //TODO: Close Model with details info
            aria-label="Shrink Row"
            variant={"ghost"}
          >
            <Shrink className="w-3 h-3" />
          </Button>
        );
      }

      return (
        <Button
          size={"icon"}
          onClick={() => {}} //TODO: Open Model with details info
          aria-label="Expand Row"
          variant={"ghost"}
        >
          <Expand className="w-3 h-3" />
        </Button>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sendDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="@timestamp" />
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
];
