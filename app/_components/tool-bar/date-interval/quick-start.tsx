"use client";
import { FunctionComponent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { useSearchParams } from "@search-params/react";
import { config } from "@/app/_lib/search-config";

interface QuickStartProps {
  closeModal: () => void;
}

const QuickStart: FunctionComponent<QuickStartProps> = ({ closeModal }) => {
  const { setQuery, searchInterval } = useSearchParams({
    route: config.home,
  });

  const [timeUnit, setTimeUnit] = useState(
    searchInterval?.timeUnit ?? "minutes"
  );
  const [timeValue, setTimeValue] = useState(searchInterval?.timeValue ?? 15);
  const [timeTense, setTimeTense] = useState(
    searchInterval?.timeTense ?? "last"
  );

  const onSubmit = () => {
    setQuery({
      searchInterval: {
        timeValue,
        timeUnit,
        timeTense,
      },
    });
    closeModal();
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-sm">Quick start</h1>
      <Separator className="my-2" />
      <div className=" flex items-center gap-x-2">
        <Select
          defaultValue="last"
          onValueChange={setTimeTense}
          value={timeTense}
        >
          <SelectTrigger>
            <SelectValue placeholder="type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last">Last</SelectItem>
            <SelectItem value="next">Next</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          name="interval-time"
          defaultValue={15}
          value={timeValue}
          onChange={(e) => setTimeValue(Number(e.currentTarget.value))}
        />

        <Select
          defaultValue="minutes"
          onValueChange={setTimeUnit}
          value={timeUnit}
        >
          <SelectTrigger>
            <SelectValue placeholder="Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seconds">Seconds</SelectItem>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
            <SelectItem value="days">Days</SelectItem>
            <SelectItem value="months">Months</SelectItem>
            <SelectItem value="years">Years</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={() => onSubmit()}>Apply</Button>
      </div>
    </div>
  );
};

export default QuickStart;
