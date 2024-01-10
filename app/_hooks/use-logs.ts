"use client";

import { useSearchParams } from "@search-params/react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { config } from "../_lib/search-config";
import { TAGS } from "../_lib/tags";
import { ConvertToMilliseconds, CreateTimeRangeFilter, ParseQuery } from "../_lib/helper";
import useConfig from "./use-config";
import { searchLogs } from "../_lib/server-actions";
import { toast } from "sonner";

export default function useLog() {
  const { config: ruleConfig, isLoading: isRuleConfigLoading, error: configError, status } = useConfig();
  const { index, searchInterval, refreshInterval, query, page, size } = useSearchParams({
    route: config.home,
  });

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: [TAGS.DATALOGS, index, query, searchInterval, page, size, refreshInterval, isRuleConfigLoading],
    queryFn: async () => {
      const result = await searchLogs({
        query: ParseQuery(
          ruleConfig,
          query,
          CreateTimeRangeFilter(
            searchInterval?.timeValue,
            searchInterval?.timeUnit
          )
        ),
        indexName: index,
        page,
        size,
      });
      return result;
    },
    placeholderData: keepPreviousData,
    refetchInterval: refreshInterval.enabled ? ConvertToMilliseconds(refreshInterval.interval, refreshInterval.timeUnit) : false,
    enabled: !isRuleConfigLoading,
  });
  if (configError) {
    console.log("configError", configError)
    toast.error(`Error while calling useConfig ${configError}`)
  }


  return { data, error, isLoading, refetch, isFetching, isRuleConfigLoading };
}
