import React from "react";
import { Badge } from "../ui/badge";

const JsonDisplay = ({ data }: { data: any }) => {
  const renderValue = (value: any) => {
    if (Array.isArray(value)) {
      return (
        <>
          {value.map((item, index) => (
            <span key={index}>{renderValue(item)}</span>
          ))}
        </>
      );
    } else if (
      typeof value === "object" &&
      value !== null &&
      value !== undefined
    ) {
      return (
        <div className="inline-block">
          {Object.entries(value).map(([key, val]) => (
            <>
              <Badge variant={"outline"} className="bg-white">
                {key}
              </Badge>{" "}
              <span className="font-bold">{renderValue(val)}</span>{" "}
            </>
          ))}
        </div>
      );
    } else {
      return value.toString();
    }
  };

  return (
    <div className="leading-7">
      {data &&
        Object.entries(data).map(([key, value]) => (
          <>
            {" "}
            <Badge variant={"outline"} className="bg-white mr-2">
              {key}
            </Badge>
            <span className="font-medium mr-1">{renderValue(value)}</span>
          </>
        ))}
    </div>
  );
};

export default JsonDisplay;
