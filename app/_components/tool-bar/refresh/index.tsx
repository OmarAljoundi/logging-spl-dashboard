"use client";
import { FunctionComponent } from "react";
import { Button } from "../../ui/button";
import { RefreshCcw } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import useLog from "@/app/_hooks/use-logs";

interface RefreshProps {}

const Refresh: FunctionComponent<RefreshProps> = () => {
  const { isFetching, isLoading, refetch } = useLog();
  return (
    <Button
      onClick={() => refetch()}
      disabled={isLoading || isFetching}
      size={"icon"}
      variant={"outline"}
    >
      {isLoading || isFetching ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : (
        <RefreshCcw className="h-4 w-4" />
      )}
    </Button>
  );
};

export default Refresh;
