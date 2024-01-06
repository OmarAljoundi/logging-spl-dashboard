import { getIndexMappings } from "@/app/_lib/open-search";
import { NextResponse } from "next/server";

export async function GET() {
  var result = await getIndexMappings("order");

  return NextResponse.json({
    result,
  });
}
