const url = "http://localhost:3001/api";

export async function Fetch<T>({
  cache = "no-store",
  method = "GET",
  headers,
  query,
  tags,
  endpoint,
}: {
  endpoint: string;
  query: any;
  method?: string;
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(`${url}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { ...query }),
      }),
      cache,
      ...(tags && { next: { tags, revalidate: 0 } }),
    });

    const body = await result.json();

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    throw {
      error: e,
      query,
    };
  }
}
