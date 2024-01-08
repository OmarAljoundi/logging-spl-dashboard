"use client";

import { useSearchParams } from "@search-params/react";
import { useQuery } from "@tanstack/react-query";
import { config } from "../_lib/search-config";
import { TAGS } from "../_lib/tags";
import { Fetch } from "../_lib/fetcher";
import { CreateTimeRangeFilter, ParseQuery } from "../_lib/helper";
import useConfig from "./use-config";
import { searchLogs } from "../_lib/server-actions";

export default function useLog() {
  const { config: ruleConfig, isLoading: isRuleConfigLoading } = useConfig();
  const { index, searchInterval, query, page, size } = useSearchParams({
    route: config.home,
  });

  const { data, error, isLoading, refetch, isFetching } = useQuery({
    queryKey: [TAGS.DATALOGS, index, query, searchInterval, page, size],
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

    enabled: !isRuleConfigLoading,
  });

  return { data, error, isLoading, refetch, isFetching };
}
