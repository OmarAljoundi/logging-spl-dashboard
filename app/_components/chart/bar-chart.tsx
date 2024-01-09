"use client";
import { format } from "date-fns";
import { FunctionComponent, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import useLog from "@/app/_hooks/use-logs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);
interface BarChartProps {}

const BarChart: FunctionComponent<BarChartProps> = () => {
  const { data, error, isLoading, isFetching } = useLog();

  const chartData = useMemo(() => {
    return {
      labels: data?.aggregations?.map((x: any) =>
        format(x.key_as_string, "HH")
      ),
      datasets: [
        {
          label: "Logs per time (3 hours)",
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: data?.aggregations?.map((x: any) => x.doc_count),
        },
      ],
    };
  }, [data]);

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          stepSize: 12,
        },
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="w-full  border-dashed border-opacity-50">
      {isLoading ? (
        <h1>Chart is loading</h1>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default BarChart;
