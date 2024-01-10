"use client";
import { FunctionComponent } from "react";
import BarChart from "./bar-chart";
import useLog from "@/app/_hooks/use-logs";
import { Flame } from "lucide-react";

interface ChartProps {}

const Chart: FunctionComponent<ChartProps> = () => {
  const { data } = useLog();
  return (
    <div className="w-full mx-auto">
      <div className=" flex gap-x-2 items-center">
        <Flame className="text-red-700 w-5 h-5" />
        <h2 className="text-base font-semibold text-center">
          Total Hits: {data?.total}
        </h2>
      </div>
      <BarChart />
    </div>
  );
};

export default Chart;
