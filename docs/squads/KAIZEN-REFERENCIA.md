# Kaizen Squad — Referência e como usar no projeto

**Fonte:** [squads.sh — kaizen (Tiag8)](https://squads.sh/pt/Tiag8/uploads/kaizen)  
**Preço:** US$ 10,00 (marketplace)  
**Versão:** v1.2.0

---

## O que é o Kaizen

Meta-squad de **RH + Ferramentas** do ecossistema AIOS. Analisa continuamente squads, agentes, ferramentas e competências; detecta gaps, monitora performance e recomenda novos recursos. Descrito como o “sistema nervoso” do AIOS.

- **7 agentes:** kaizen-chief (orquestrador), topology-analyst, performance-tracker, bottleneck-hunter, capability-mapper, tech-radar, cost-analyst  
- **6 tarefas:** detect-gaps, performance-dashboard, update-radar, cost-analysis, generate-recommendations, self-improve  
- **3 workflows:** wf-ecosystem-analysis, wf-weekly-report, wf-self-improve  

Frameworks usados: Team Topologies, DORA, BSC, OKR, TOC, Wardley Maps, Technology Radar, FinOps, entre outros.

---

## Como pode ajudar no Compras Paraguay

- **\*gaps** — Detectar gaps de competência e ferramentas nos squads paraguay-shopping-search e compras-paraguai-ops.  
- **\*analyze** — Análise do ecossistema (agentes, squads, docs) em 6 dimensões.  
- **\*performance** — Dashboard de performance (DORA, BSC, OKR) para o projeto.  
- **\*recommend** — Recomendações de novos recursos (agentes, squads, ferramentas) com base em evidência (regra N&lt;3).  
- **\*report** — Relatório semanal de recomendações.  

Útil para melhorar continuamente os squads e o site depois que estiver estável.

---

## Como acessar / instalar

1. **Comprar no marketplace**  
   Acesse [https://squads.sh/pt/Tiag8/uploads/kaizen](https://squads.sh/pt/Tiag8/uploads/kaizen) e use “Comprar por US$ 10,00”. Siga as instruções do squads.sh (conta, pagamento, download ou acesso).

2. **Se o squads.sh fornecer arquivos do squad**  
   Coloque em `squads/kaizen/` (agents, tasks, workflows, config, etc.) conforme a estrutura descrita na página do Kaizen. Depois ative no Cursor conforme a documentação do squads.sh (ex.: `/kaizen:chief`, `/kaizen:analyze`).

3. **Se o squads.sh fornecer só acesso via skill/comando**  
   Use a ativação indicada na página (ex.: `/kaizen:chief`, `/kaizen:analyze`) no ambiente onde o squads.sh estiver integrado.

4. **Referência sem compra**  
   Você pode usar este doc e a regra em `.cursor/rules/kaizen-referencia.md` para lembrar dos comandos e do papel do Kaizen; a análise real depende de ter o squad instalado ou do serviço do squads.sh.

---

## Comandos principais (resumo)

| Comando        | Descrição                                      |
|----------------|------------------------------------------------|
| `*analyze`    | Análise completa do ecossistema (6 dimensões)  |
| `*gaps`       | Detectar gaps de competência e ferramentas     |
| `*performance`| Dashboard de performance (DORA + BSC + OKR)     |
| `*radar`      | Atualizar technology radar                     |
| `*cost`       | Análise de custos e ROI                        |
| `*report`     | Relatório semanal de recomendações             |
| `*recommend`  | Gerar recomendações de recursos                |
| `*self-improve` | Meta-análise e auto-melhoria do squad        |

---

*Squads no squads.sh são publicados por terceiros; use por sua conta e risco. Termos: [squads.sh/pt/terms](https://squads.sh/pt/terms).*
