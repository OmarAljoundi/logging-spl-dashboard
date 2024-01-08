"use server";
import { Client } from "@opensearch-project/opensearch";
import { mapOpenSearchFieldsToObjects } from "./actions";

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "admin",
    password: "admin",
  },
});

export async function insertDocument(indexName: string, doc: any) {
  try {
    const response = await client.index({
      index: indexName,
      body: doc,
    });

    console.log("Document inserted:", response.body);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

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
    if (indexName != null) searchObject["index"] = indexName;

    const response = await client.search(searchObject);
    return response.body.hits.hits;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function getIndexMappings(indexName: string) {
  try {
    const response = await client.indices.getMapping({ index: indexName });

    var data = mapOpenSearchFieldsToObjects(response.body[indexName].mappings);

    return data;
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
