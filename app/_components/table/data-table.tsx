"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
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
import { cn } from "@/app/_lib/utils";
import { useSearchParams } from "@search-params/react";
import { config } from "@/app/_lib/search-config";
import { useVirtualizer } from "@tanstack/react-virtual";
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
  const [scrollAreaHeight, setScrollAreaHeight] = React.useState(0);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const memoColumns = React.useMemo(() => {
    return columns;
  }, []);

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
    columns: memoColumns,
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

  React.useLayoutEffect(() => {
    const calculateScrollAreaHeight = () => {
      const paginationHeight = document.getElementById(
        "Data-Table-Pagination"
      )?.clientHeight;
      const navBarHight = document.getElementById("Nav-bar")?.offsetHeight;
      const height = window.innerHeight - (paginationHeight! + navBarHight!);
      setScrollAreaHeight(height);
    };

    // Set the initial height
    calculateScrollAreaHeight();

    // Add event listener to resize
    window.addEventListener("resize", calculateScrollAreaHeight);

    // Cleanup event listener
    return () =>
      window.removeEventListener("resize", calculateScrollAreaHeight);
  }, []);
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div className="flex flex-col">
      <div
        className="rounded-md border overflow-auto"
        ref={tableContainerRef}
        style={{
          overflow: "auto", //our scrollable table container
          position: "relative", //needed for sticky header
          height: scrollAreaHeight, //should be a fixed height
        }}
      >
        <Table>
          <TableHeader className="sticky top-0 bg-white z-50">
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

          {/*  */}
          <TableBody style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<TData>;
              return (
                <TableRow
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row?.id}
                  //data-state={row.getIsSelected() && "selected"}
                  style={{
                    display: "flex",
                    position: "absolute",
                    transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                    width: "100%",
                  }}
                >
                  {row?.getVisibleCells()?.map((cell) => (
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
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div id="Data-Table-Pagination" className="mt-auto ">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
