"use client";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./columns";
import Toolbar from "./_components/tool-bar";

import { toast } from "sonner";
import useLog from "./_hooks/use-logs";
import Chart from "./_components/chart";
import { Separator } from "./_components/ui/separator";
import { ScrollArea } from "./_components/ui/scroll-area";

const LogHome = () => {
  const { data, error } = useLog();
  if (error) {
    toast.error(`Error while fetching the logs, ${error.message}`);
  }

  console.log(":data", data);
  return (
    <div>
      <Chart />

      <DataTable
        columns={columns}
        data={data?.result || []}
        total={data?.total}
      />
    </div>
  );
};
export default LogHome;
