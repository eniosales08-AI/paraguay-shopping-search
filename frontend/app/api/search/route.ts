import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || undefined;
  const store = searchParams.get("store") || undefined;
  const price_min = searchParams.get("price_min");
  const price_max = searchParams.get("price_max");
  const sort = searchParams.get("sort") || "relevance";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  const params: Record<string, unknown> = {
    q,
    category,
    store,
    sort,
    page,
    limit,
  };
  if (price_min != null && price_min !== "") params.price_min = Number(price_min);
  if (price_max != null && price_max !== "") params.price_max = Number(price_max);

  const cwd = process.cwd();
  const searchPaths = [
    path.join(cwd, "data", "search", "search.js"),
    path.join(cwd, "..", "data", "search", "search.js"),
  ];
  for (const searchPath of searchPaths) {
    try {
      const { search } = require(searchPath);
      const result = search(params);
      return NextResponse.json(result);
    } catch {
      continue;
    }
  }
  return NextResponse.json(
    { error: "Search service unavailable." },
    { status: 503 }
  );
}
