"use client";
import Filter from "./filter";
import DateInterval from "./date-interval";
import Refresh from "./refresh";
import { IndexSelector } from "./index-selector";
import ClearQuery from "./clear-query";
import FilterResult from "../filter-result";

export default function Toolbar() {
  return (
    <div className="grid space-y-2 ">
      <div className="flex justify-between">
        <div className="flex gap-x-2">
          <IndexSelector />
          <Filter />
          <ClearQuery />
        </div>

        <div className="flex gap-x-2">
          <DateInterval />
          <Refresh />
        </div>
      </div>
    </div>
  );
}
