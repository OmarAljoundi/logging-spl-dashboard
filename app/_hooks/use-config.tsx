"use client";
import { useQuery } from "@tanstack/react-query";
import { configuration } from "../_rule-group/config";
import { getIndexMappings } from "../_lib/server-actions";
import { useSearchParams } from "@search-params/react";
import { config } from "../_lib/search-config";
import { TAGS } from "../_lib/tags";

export default function useConfig() {
  const { index } = useSearchParams({
    route: config.home,
  });
  const { data, isLoading, error, status } = useQuery({
    queryKey: [TAGS.FIELDMAPPING, index],
    queryFn: async () => await getIndexMappings(index),
    staleTime: Infinity,
    structuralSharing: false,
  });

  return {
    config: configuration(data),
    fields: data,
    isLoading,
    error,
    status,
  };
}
