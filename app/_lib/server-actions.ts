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
        query: {
          ...query,
        },
        from,
        size,
        _source: true,
      },
    };
    if (indexName != null && indexName != "all")
      searchObject["index"] = indexName;

    console.log("searchObject", JSON.stringify(searchObject));
    const response = await client.search(searchObject);
    return response.body.hits.hits;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
