"use client";
import { DataTable } from "./_components/table/data-table";
import { columns } from "./columns";
import { toast } from "sonner";
import useLog from "./_hooks/use-logs";
import Chart from "./_components/chart";
import Loading from "./_components/shared/loading";

const LogHome = () => {
  const { data, error, isLoading, isRuleConfigLoading } = useLog();
  if (error) {
    toast.error(`Error while fetching the logs, ${error.message}`);
  }

  if (isLoading || isRuleConfigLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div id="Chart">
        <Chart />
      </div>

      <DataTable
        columns={columns}
        data={data?.result || []}
        total={data?.total}
      />
    </div>
  );
};
export default LogHome;
