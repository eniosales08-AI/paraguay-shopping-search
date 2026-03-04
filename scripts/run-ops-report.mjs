#!/usr/bin/env node
/**
 * Script run-ops-report — compras-paraguai-ops
 * Chama GET /api/ops-report e imprime (e opcionalmente grava) o relatório.
 * Uso: node scripts/run-ops-report.mjs [BASE_URL] [--out arquivo.json|arquivo.md]
 * Ex.: node scripts/run-ops-report.mjs
 *      node scripts/run-ops-report.mjs https://paraguay-shopping-search.vercel.app --out data/reports/ops-report.json
 */

const baseUrl = process.argv[2] || process.env.BASE_URL || "http://localhost:3000";
const outIdx = process.argv.indexOf("--out");
const outFile = outIdx >= 0 ? process.argv[outIdx + 1] : null;
const format = outFile && outFile.endsWith(".md") ? "markdown" : "json";
const url = `${baseUrl.replace(/\/$/, "")}/api/ops-report?format=${format}`;

async function main() {
  try {
    const res = await fetch(url);
    const text = await res.text();
    if (!res.ok) {
      console.error("Erro:", res.status, text);
      process.exit(1);
    }
    if (outFile) {
      const fs = await import("fs");
      fs.writeFileSync(outFile, text, "utf8");
      console.log("Relatório gravado em", outFile);
    } else {
      console.log(text);
    }
  } catch (e) {
    console.error("Falha ao obter relatório:", e.message);
    process.exit(1);
  }
}

main();
