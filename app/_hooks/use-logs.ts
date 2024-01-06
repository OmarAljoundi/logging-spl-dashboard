"use client";

import { useSearchParams } from "@search-params/react";
import { useQuery } from "@tanstack/react-query";
import { config } from "../_lib/search-config";
import { TAGS } from "../_lib/tags";
import { Fetch } from "../_lib/fetcher";
import { CreateTimeRangeFilter, ParseQuery } from "../_lib/helper";
import useConfig from "./use-config";

export default function useLog() {
  const { config: ruleConfig, isLoading: isRuleConfigLoading } = useConfig();
  const { index, searchInterval, query } = useSearchParams({
    route: config.home,
  });

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: [TAGS.DATALOGS, index, query, searchInterval],
    queryFn: async () => {
      const result = await Fetch({
        endpoint: `/open-search/get-logs?index=${index}`,
        query: ParseQuery(
          ruleConfig,
          query,
          CreateTimeRangeFilter(
            searchInterval?.timeValue,
            searchInterval?.timeUnit
          )
        ),
        method: "POST",
      });
      return result;
    },

    enabled: !isRuleConfigLoading,
  });

  return { data, error, isLoading, refetch, isFetching };
}
