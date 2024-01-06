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

interface RefreshIntervalProps {}

const RefreshInterval: FunctionComponent<RefreshIntervalProps> = () => {
  return (
    <div className="px-4 py-2">
      <h1 className="text-sm">Refresh Interval</h1>
      <Separator className="my-2" />
      <div className=" flex items-center gap-x-2">
        <div className="flex items-center space-x-2">
          <Switch id="refresh-interval-mode" />
          <Label htmlFor="refresh-interval-mode" className="text-xs">
            Refresh every
          </Label>
        </div>
        <Input type="number" name="interval-time" />

        <Select defaultValue="minutes">
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
