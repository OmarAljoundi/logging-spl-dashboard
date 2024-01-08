"use client";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./columns";
import Toolbar from "./_components/tool-bar";

import { toast } from "sonner";
import useLog from "./_hooks/use-logs";
import Chart from "./_components/chart";

const LogHome = () => {
  const { data, error } = useLog();
  if (error) {
    console.log;
    toast.error(`Error while fetching the logs, ${error.message}`);
  }

  console.log(":data", data);
  return (
    <div>
      <Toolbar />
      <Chart />
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};
export default LogHome;
