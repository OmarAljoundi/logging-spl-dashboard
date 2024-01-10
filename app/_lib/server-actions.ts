"use server";
import { Client } from "@opensearch-project/opensearch";
import { mapOpenSearchFieldsToObjects } from "./actions";

const client = new Client({
  node: process.env.NEXT_OPENSEARCH_HOST,
  auth: {
    username: process.env.NEXT_OPENSEARCH_USER!,
    password: process.env.NEXT_OPENSEARCH_PASSWORD!,
  },
});

export async function searchLogs({
  query = { match_all: {} },
  size,
  page,
  indexName = null,
}: {
  query?: any;
  indexName?: string | null;
  page: number;
  size: number;
}) {
  try {

    const from = (page - 1) * size;
    var searchObject: any = {
      body: {
        track_total_hits: true,
        query: {
          ...query,
        },
        from,
        size,
        aggs: {
          hits_over_time: {
            date_histogram: {
              field: 'sentDate',
              fixed_interval: "3h"
            }
          }
        },
        _source: true,
      },
    };
    if (indexName != null && indexName != "all")
      searchObject["index"] = indexName;

    const response = await client.search(searchObject);
    return { total: response.body.hits.total.value, result: response.body.hits.hits, aggregations: response.body.aggregations.hits_over_time.buckets };
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function getIndexMappings(indexName: string) {
  try {
    const response = await client.indices.getMapping({ index: indexName });
    let allMappings: any = {};

    if (indexName !== "_all") {
      allMappings = mapOpenSearchFieldsToObjects(response.body[indexName].mappings);
    } else {
      for (const index in response.body) {
        allMappings = {
          ...allMappings,
          ...mapOpenSearchFieldsToObjects(response.body[index].mappings)
        }
      }
    }

    return allMappings;
  } catch (error) {
    console.error("Error fetching index mappings:", error);
  }
}

export async function getAllIndices() {
  try {
    const allIndices = await client.cat.indices({ format: "json" });

    const excludedPatterns = ["security-auditlog-*"];
    const isExcluded = (indexName: string) => {
      return (
        indexName.startsWith(".") ||
        excludedPatterns.some((pattern) =>
          indexName.startsWith(pattern.slice(0, -1))
        )
      );
    };
    const nonSystemIndices = allIndices.body.filter(
      (item: any) => !isExcluded(item.index)
    );

    return nonSystemIndices;
  } catch (error) {
    console.error("Error fetching indices:", error);
    throw error;
  }
}
