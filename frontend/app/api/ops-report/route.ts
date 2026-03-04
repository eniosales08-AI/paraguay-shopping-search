import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/** Base URL da própria app (para chamar /api/search em runtime). */
function getBaseUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return "http://localhost:3000";
}

export type OpsReport = {
  reportMetadata: {
    generatedAt: string;
    period: string;
  };
  catalog: {
    total: number;
    facets: { categories: number; stores: number; price_range: { min: number; max: number } };
    status: "ok";
  };
  exchangeRates: { status: "não disponível"; note: string };
  content: { status: "não disponível"; note: string };
  health: "ok" | "warning";
  alerts: string[];
};

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get("format") ?? "json"; // json | markdown
  const generatedAt = new Date().toISOString();
  const alerts: string[] = [];
  const report: OpsReport = {
    reportMetadata: {
      generatedAt,
      period: new Date().toLocaleDateString("es-PY", { dateStyle: "long" }),
    },
    catalog: {
      total: 0,
      facets: { categories: 0, stores: 0, price_range: { min: 0, max: 0 } },
      status: "ok",
    },
    exchangeRates: { status: "não disponível", note: "Task update-exchange-rates ainda não implementada." },
    content: { status: "não disponível", note: "Task sync-content ainda não implementada." },
    health: "ok",
    alerts: [],
  };

  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/search?limit=1`);
    if (!res.ok) {
      report.catalog.status = "ok";
      report.catalog.total = 0;
      report.health = "warning";
      report.alerts.push("API de busca não respondeu com sucesso.");
    } else {
      const data = (await res.json()) as {
        total?: number;
        facets?: { categories?: unknown[]; stores?: unknown[]; price_range?: { min?: number; max?: number } };
      };
      report.catalog.total = typeof data.total === "number" ? data.total : 0;
      if (data.facets) {
        report.catalog.facets = {
          categories: Array.isArray(data.facets.categories) ? data.facets.categories.length : 0,
          stores: Array.isArray(data.facets.stores) ? data.facets.stores.length : 0,
          price_range: {
            min: data.facets.price_range?.min ?? 0,
            max: data.facets.price_range?.max ?? 0,
          },
        };
      }
      if (report.catalog.total === 0) {
        report.health = "warning";
        report.alerts.push("Catálogo vazio ou API sem produtos.");
      }
    }
  } catch (e) {
    report.health = "warning";
    report.alerts.push("Erro ao consultar API de busca: " + (e instanceof Error ? e.message : String(e)));
  }

  report.alerts = alerts;

  if (format === "markdown") {
    const md = [
      "# Relatório de operações — Compras Paraguay",
      "",
      `**Gerado em:** ${report.reportMetadata.generatedAt}`,
      `**Período:** ${report.reportMetadata.period}`,
      "",
      "## Catálogo",
      `- Total de produtos: **${report.catalog.total}**`,
      `- Categorias (facets): ${report.catalog.facets.categories}`,
      `- Lojas (facets): ${report.catalog.facets.stores}`,
      `- Faixa de preço (PYG): ${report.catalog.facets.price_range.min} – ${report.catalog.facets.price_range.max}`,
      `- Status: ${report.catalog.status}`,
      "",
      "## Câmbio",
      `- ${report.exchangeRates.status}: ${report.exchangeRates.note}`,
      "",
      "## Conteúdo",
      `- ${report.content.status}: ${report.content.note}`,
      "",
      "## Saúde",
      `- **${report.health.toUpperCase()}**`,
      ...(report.alerts.length ? report.alerts.map((a) => `- ⚠ ${a}`) : []),
    ].join("\n");
    return new Response(md, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  return Response.json(report);
}
