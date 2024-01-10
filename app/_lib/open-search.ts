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

export async function insertDocument(indexName: string, doc: any) {
  try {
    const response = await client.index({
      index: indexName,
      body: doc,
    });

  } catch (error) {
    console.error("An error occurred:", error);
  }
}


