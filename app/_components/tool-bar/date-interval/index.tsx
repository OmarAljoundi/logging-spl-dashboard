import { FunctionComponent, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { ArrowDown, CalendarClockIcon, FolderSync } from "lucide-react";
import QuickStart from "./quick-start";
import CommonlyUsed from "./commonly-used";
import RefreshInterval from "./refresh-interval";
import { useSearchParams } from "@search-params/react";
import { config } from "@/app/_lib/search-config";

interface DateIntervalProps {}

const DateInterval: FunctionComponent<DateIntervalProps> = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);
  const { refreshInterval, searchInterval } = useSearchParams({
    route: config.home,
  });

  const getSearchInterval = () => {
    if (searchInterval.label) return searchInterval.label;

    return (
      searchInterval.timeTense?.toCapitalCase() +
      " " +
      searchInterval.timeValue +
      " " +
      searchInterval.timeUnit?.toCapitalCase()
    );
  };

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <div className="flex border items-center">
          <Button size={"icon"} variant={"outline"} className="rounded-r-none">
            <CalendarClockIcon className=" h-4 w-4" />
          </Button>

          <div className="flex">
            <Button variant={"outline"} className="px-2 text-xs font-bold">
              {getSearchInterval()}
            </Button>
            {refreshInterval.enabled && (
              <Button variant={"secondary"} className="px-2 text-xs font-bold">
                <FolderSync className="mr-2 h-4 w-4" /> Every{" "}
                {refreshInterval.interval + " " + refreshInterval.timeUnit}
              </Button>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0" align="end">
        <div className="grid space-y-4 py-2">
          <QuickStart closeModal={closeModal} />
          <CommonlyUsed closeModal={closeModal} />
          <RefreshInterval />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateInterval;
