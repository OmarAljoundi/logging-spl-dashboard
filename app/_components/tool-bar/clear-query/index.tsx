"use client";

import { FunctionComponent } from "react";
import { Button } from "../../ui/button";
import { useSearchParams } from "@search-params/react";
import { config, searchParamsSchema } from "@/app/_lib/search-config";
import { Trash2 } from "lucide-react";

interface ClearQueryProps {}

const ClearQuery: FunctionComponent<ClearQueryProps> = () => {
  const { clearQuery } = useSearchParams({
    route: config.home,
  });

  return (
    <Button onClick={() => clearQuery()} variant={"outline"} size={"icon"}>
      <Trash2 className="w-4 h-4" />
    </Button>
  );
};

export default ClearQuery;
