"use client";
import { FunctionComponent } from "react";
import BarChart from "./bar-chart";

interface ChartProps {}

const Chart: FunctionComponent<ChartProps> = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center">
          Logs Recorded Over Time
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          This chart represents the number of logs recorded at different time
          intervals.
        </p>
        <div className="w-full ">
          <BarChart />
        </div>
      </div>
    </div>
  );
};

export default Chart;
