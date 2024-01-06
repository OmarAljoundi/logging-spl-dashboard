"use client";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="grid gap-y-4">
      <div className="flex flex-1 items-center flex-wrap gap-y-2"></div>
    </div>
  );
}
