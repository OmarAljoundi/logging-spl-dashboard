"use client";
import { DataTable } from "./_components/table/data-table";
import { toast } from "sonner";
import useLog from "./_hooks/use-logs";
import Chart from "./_components/chart";
import Loading from "./_components/shared/loading";
import Toolbar from "./_components/tool-bar";
import FilterResult from "./_components/filter-result";
import useColumns from "./columns";

const LogHome = () => {
  const { data, error, isLoading, isRuleConfigLoading } = useLog();
  const { columns } = useColumns();
  if (error) {
    toast.error(`Error while fetching the logs, ${error.message}`);
  }

  if (isLoading || isRuleConfigLoading) {
    return (
      <div className="m-4">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div id="Nav-bar" className="grid space-y-4 py-4 px-4">
        <Toolbar />
        <FilterResult />
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
