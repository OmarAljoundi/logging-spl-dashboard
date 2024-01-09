"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@/app/_lib/utils";
import { searchLogs } from "@/app/_lib/open-search";
import { Button } from "../ui/button";
import { useSearchParams } from "@search-params/react";
import { config } from "@/app/_lib/search-config";
import { ScrollArea } from "../ui/scroll-area";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
}: DataTableProps<TData, TValue>) {
  const [scrollAreaHeight, setScrollAreaHeight] = React.useState("auto");

  const { page, size } = useSearchParams({
    route: config.home,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageSize: size,
        pageIndex: page - 1,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    pageCount: total,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  React.useEffect(() => {
    const calculateHeight = () => {
      const toolbarHeight =
        document?.querySelector(".dataTableToolbar")?.scrollHeight;

      console.log({ toolbarHeight });
      const paginationHeight = document?.querySelector(
        ".dataTablePagination"
      )?.clientHeight;

      console.log(window.innerHeight);
      const availableHeight =
        window.innerHeight - (toolbarHeight || 0) - (paginationHeight || 0);

      setScrollAreaHeight(`${availableHeight}px`);
    };

    calculateHeight();

    // Recalculate on window resize
    window.addEventListener("resize", calculateHeight);

    // Cleanup listener
    return () => window.removeEventListener("resize", calculateHeight);
  }, []);
  return (
    <div className="space-y-4">
      <div className="rounded-md border  dataTableToolbar">
        <Table>
          <TableHeader className="sticky top-0 bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        header.id == "actions"
                          ? "sticky right-0 bg-white  z-50 shadow-card "
                          : ""
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            <ScrollArea style={{ height: scrollAreaHeight }}>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={cn(
                        cell.column.id == "actions"
                          ? "sticky right-0 bg-white shadow-card z-50 "
                          : ""
                      )}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </ScrollArea>
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
