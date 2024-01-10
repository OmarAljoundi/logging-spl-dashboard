import { FunctionComponent } from "react";
import { Separator } from "../../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { useSearchParams } from "@search-params/react";
import { config } from "@/app/_lib/search-config";

interface RefreshIntervalProps {}

const RefreshInterval: FunctionComponent<RefreshIntervalProps> = () => {
  const { refreshInterval, setQuery } = useSearchParams({
    route: config.home,
  });
  return (
    <div className="px-4 py-2">
      <h1 className="text-sm">Refresh Interval</h1>
      <Separator className="my-2" />
      <div className=" flex items-center gap-x-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="refresh-interval-mode"
            onCheckedChange={(enabled) =>
              setQuery({ refreshInterval: { ...refreshInterval, enabled } })
            }
            checked={refreshInterval.enabled}
          />
          <Label htmlFor="refresh-interval-mode" className="text-xs">
            Refresh every
          </Label>
        </div>
        <Input
          type="number"
          name="interval-time"
          value={Number(refreshInterval.interval)}
          min={1}
          onChange={(e) =>
            setQuery({
              refreshInterval: {
                ...refreshInterval,
                interval: Number(e.target.value),
              },
            })
          }
          disabled={!refreshInterval.enabled}
          placeholder="Refresh value"
        />

        <Select
          defaultValue="minutes"
          disabled={!refreshInterval.enabled}
          value={refreshInterval.timeUnit}
          onValueChange={(timeUnit) =>
            setQuery({
              refreshInterval: {
                ...refreshInterval,
                timeUnit,
              },
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Interval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seconds">Seconds</SelectItem>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RefreshInterval;
