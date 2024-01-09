import { searchLogs } from "@/app/_lib/open-search";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let indexName = req.nextUrl.searchParams.get("index");
    if (indexName && indexName == "all") {
      indexName = null;
    }
    let query = await req.json();

    if (Object.keys(query).length === 0) {
      query = undefined;
    }
    //var result = await searchLogs({ indexName, query });
    return NextResponse.json({
      result: "ad",
    });
  } catch (ex) {
    console.log(ex);
    return NextResponse.json(
      {
        ex,
      },
      { status: 400 }
    );
  }
}
