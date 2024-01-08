import { getAllIndices } from "@/app/_lib/open-search";
import { NextResponse } from "next/server";

export async function GET() {
  var result = await getAllIndices();

  return NextResponse.json({
    result,
  });
}
