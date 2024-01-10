import { insertDocument } from "@/app/_lib/open-search";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const index = req.nextUrl.searchParams.get("index");

  if (index == null) {
    return NextResponse.json(
      {
        error: "index is required",
      },
      { status: 400 }
    );
  }
  const body = await req.json();
  try {
    var r = await insertDocument(index, body);
    return NextResponse.json({
      done: true,
    });
  } catch (ex) {
    return NextResponse.json({
      done: false,
      ex,
    });
  }
}
