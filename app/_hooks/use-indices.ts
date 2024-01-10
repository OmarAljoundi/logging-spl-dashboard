"use client"
import { useQuery } from "@tanstack/react-query";
import { TAGS } from "../_lib/tags";
import { getAllIndices } from "../_lib/server-actions";

export default function useIndices() {
    const { data: indices, isLoading, error } = useQuery({
        queryKey: [TAGS.INDICES],
        queryFn: async () => await getAllIndices(),
        select: (data) => {
            return data?.map((item: any) => {
                return {
                    label: item.index?.toCapitalCase(),
                    value: item.index,
                };
            });
        },
    });

    return { indices, isLoading, error }
}