"use server";
import { Client } from "@opensearch-project/opensearch";

export async function searchLogs({
  query = { match_all: {} },
  size,
  page,
  indexName = null,
}: {
  query?: any;
  indexName: string | null;
  page: number;
  size: number;
}) {
  try {
    const client = new Client({
      node: "http://localhost:9200",
      auth: {
        username: "admin",
        password: "admin",
      },
    });
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

    console.log("searchObject", JSON.stringify(searchObject));
    const response = await client.search(searchObject);
    return { total: response.body.hits.total.value, result: response.body.hits.hits, aggregations: response.body.aggregations.hits_over_time.buckets };
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
