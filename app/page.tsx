"use client";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./columns";
import Toolbar from "./_components/tool-bar";

import { toast } from "sonner";
import useLog from "./_hooks/use-logs";

const LogHome = () => {
  const { data, error } = useLog();
  if (error) {
    console.log;
    toast.error(`Error while fetching the logs, ${error.message}`);
  }
  return (
    <div>
      <Toolbar />
      <DataTable
        columns={columns}
        data={((data?.body as any)?.result as any) || []}
      />
    </div>
  );
};
export default LogHome;
