"use client";

import { FunctionComponent } from "react";
import { Button } from "../../ui/button";
import { useSearchParams } from "@search-params/react";
import { config, searchParamsSchema } from "@/app/_lib/search-config";

interface ClearQueryProps {}

const ClearQuery: FunctionComponent<ClearQueryProps> = () => {
  const { clearQuery } = useSearchParams({
    route: config.home,
  });

  const c = () => {
    console.log(searchParamsSchema.parse({}));
    clearQuery();
  };
  return (
    <Button onClick={() => c()} variant={"destructive"}>
      Clear Search
    </Button>
  );
};

export default ClearQuery;
