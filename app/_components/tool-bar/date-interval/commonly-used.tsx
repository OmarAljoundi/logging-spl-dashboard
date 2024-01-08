"use client";
import { FunctionComponent, useState } from "react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { config } from "@/app/_lib/search-config";
import { useSearchParams } from "@search-params/react";
import { cn } from "@/app/_lib/utils";

interface CommonlyUsedProps {}

const column1 = [
  {
    label: "Today",
    timeValue: 1,
    timeUnit: "days",
    aggs: "1d",
  },
  {
    label: "This week",
    timeValue: 1,
    timeUnit: "weeks",
    aggs: "7d",
  },
  {
    label: "Last 15 minutes",
    timeValue: 15,
    timeUnit: "minutes",
    aggs: "15m",
  },

  {
    label: "Last 30 minutes",
    timeValue: 30,
    timeUnit: "minutes",
  },
  {
    label: "Last 1 hour",
    timeValue: 1,
    timeUnit: "hours",
  },
];

const column2 = [
  {
    label: "Last 24 hour",
    timeValue: 24,
    timeUnit: "hours",
  },
  {
    label: "Last 7 days",
    timeValue: 7,
    timeUnit: "days",
  },
  {
    label: "Last 30 days",
    timeValue: 30,
    timeUnit: "days",
  },

  {
    label: "Last 90 days",
    timeValue: 90,
    timeUnit: "days",
  },
  {
    label: "Last 1 year",
    timeValue: 1,
    timeUnit: "years",
  },
];

const CommonlyUsed: FunctionComponent<CommonlyUsedProps> = () => {
  const { setQuery, searchInterval } = useSearchParams({
    route: config.home,
  });

  const SubmitData = (data: any) => {
    setQuery({
      searchInterval: {
        label: data.label,
        timeUnit: data?.timeUnit,
        timeValue: data?.timeValue,
        timeTense: undefined,
      },
    });
  };
  return (
    <div className="px-4 py-2">
      <h1 className="text-sm">Commonly Used</h1>
      <Separator className="my-2" />
      <div className="grid grid-cols-2 items-center gap-x-2">
        <div className="grid space-y-2 gap-x-2 justify-start items-start justify-items-start">
          {column1.map((c) => (
            <Button
              variant={"link"}
              key={c.label}
              onClick={() => SubmitData(c)}
              className={cn(
                searchInterval?.label == c.label
                  ? "bg-black text-white rounded-lg"
                  : "",
                "duration-300 transition-all cursor-pointer ease-in-out"
              )}
            >
              {c.label}
            </Button>
          ))}
        </div>
        <div className="grid space-y-2  gap-x-2 justify-start items-start justify-items-start">
          {column2.map((c) => (
            <Button
              variant={"link"}
              key={c.label}
              onClick={() => SubmitData(c)}
              className={cn(
                searchInterval?.label == c.label
                  ? "bg-black text-white rounded-lg  "
                  : "",
                "duration-300 transition-all cursor-pointer ease-in-out"
              )}
            >
              {c.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommonlyUsed;
