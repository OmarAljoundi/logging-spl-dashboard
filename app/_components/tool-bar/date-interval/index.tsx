import { FunctionComponent } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { CalendarClockIcon } from "lucide-react";
import QuickStart from "./quick-start";
import CommonlyUsed from "./commonly-used";
import RefreshInterval from "./refresh-interval";

interface DateIntervalProps {}

const DateInterval: FunctionComponent<DateIntervalProps> = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <CalendarClockIcon className="mr-2 h-4 w-4" /> Interval
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0" align="end">
        <div className="grid space-y-4 py-2">
          <QuickStart />
          <CommonlyUsed />
          <RefreshInterval />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateInterval;
