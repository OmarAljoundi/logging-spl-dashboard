"use client";
import { FunctionComponent } from "react";
import BarChart from "./bar-chart";
import useLog from "@/app/_hooks/use-logs";

interface ChartProps {}

const Chart: FunctionComponent<ChartProps> = () => {
  const { data } = useLog();
  return (
    <div className="w-full mx-auto">
      <div className="flex  gap-4 px-2 justify-between">
        <h2 className="text-2xl font-semibold text-center">
          Total Hits: {data?.total}
        </h2>
      </div>
      <BarChart />
    </div>
  );
};

export default Chart;
