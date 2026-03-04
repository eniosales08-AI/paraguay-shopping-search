import { NextRequest } from "next/server";
import { search } from "@/lib/catalog-search";

export const dynamic = "force-dynamic";

function emptyResponse(page: number, limit: number) {
  return Response.json({
    results: [],
    total: 0,
    page,
    limit,
    facets: { categories: [], stores: [], price_range: { min: 0, max: 0 } },
  });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const result = search({
      q: searchParams.get("q") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      store: searchParams.get("store") ?? undefined,
      sort: searchParams.get("sort") ?? undefined,
      page: parseInt(searchParams.get("page") ?? "1", 10),
      limit: parseInt(searchParams.get("limit") ?? "20", 10),
    });
    return Response.json(result);
  } catch {
    const page = Math.max(1, parseInt(request.nextUrl.searchParams.get("page") ?? "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(request.nextUrl.searchParams.get("limit") ?? "20", 10)));
    return emptyResponse(page, limit);
  }
}
