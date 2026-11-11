---
id: R-20261110-193300-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [engenheiro-software]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:33:00-04:00
---
# Proposta para reduzir o GitHub Actions: ~90% é o CI completo repetido; de ~10.500 para ~3.000 min/semana (−70%)

## Contexto
Pedido no chat (10/11, ~19h40): "MEU CONSUMO DE GITHUB ACTIONS ESTÁ UM ABSURDO ME GERE UMA PROPOSTA PARA REDUZIR O CONSUMO."

Medi os últimos 7 dias (03/11 a 10/11) pelo `gh run list`. Os dois repositórios são **privados**, então todo minuto é cobrado. No Linux, cada job é **arredondado para cima no minuto**.

## Onde está o consumo (7 dias)
| Origem | Runs | Minutos cobrados (aprox.) | Observação |
|---|---|---|---|
| **CI completo** (12 jobs, ~40 min cobrados por run) | 238 | **~9.500** | 99 manuais (meus ensaios e lotes), 69 de push no main, 63 de PR da nuvem, 7 noturnos |
| demo-publicar (depois de todo CI do main) | 77 | ~600 | Roda até quando o commit só mexe em docs ou recados |
| stack isolado | 57 | ~300 | 18 cancelados (push e manual em dobro) |
| DBaaS, carga, recriar base | 15 | ~150 | Ok |
| Repositório de recados (Telegram por push + resumo de hora em hora) | ~40+ | ~100 a 750/mês | O Telegram está no backlog, mas os workflows continuam rodando |

**Resumo: ~90% do gasto é o CI completo.** Ele é rodado várias vezes para o mesmo código:
- no ensaio (manual, na branch de verificação);
- de novo no push do main;
- a cada push de PR da nuvem.

Cada run sobe 12 máquinas, e cada uma refaz checkout e `pnpm install` e arredonda o minuto.

## Proposta (em ordem de efeito)
1. **CI só do que mudou** (economia estimada de 40 a 60%). Em PR, ensaio e push do main, rodar só os pacotes afetados (`turbo --filter=...[origin/main]`). A matriz completa fica só na rodada noturna e na véspera de build oficial.
2. **Não repetir o CI para o mesmo código** (~25%). Se a árvore que vai ao main for idêntica à que passou no ensaio (mesmo tree SHA), o push do main pula o CI e reaproveita o resultado. Do meu lado, faço **no máximo 2 ensaios por lote** (hoje foram 3).
3. **Ignorar commits de docs e de coordenação** (~10%). O CI e o demo-publicar não rodam quando o commit só muda `docs/**`, `.coord/**` ou `*.md`.
4. **Menos máquinas por run** (~15 a 20%). Juntar os 12 jobs em 4 ou 5 maiores corta o checkout, o install e o arredondamento repetidos. Tudo com cache do pnpm e do turbo.
5. **PR da nuvem só quando pronto**. Rascunho não roda CI; roda quando o PR sai de rascunho ou ganha \"[PRONTO PARA MERGE]\". `cancel-in-progress` em todo evento, não só em PR.
6. **demo-publicar só quando há código**. Paths de `apps/**`, `modules/**`, `packages/**` e `db/**`, ou disparo manual no lote.
7. **Agendados:**
   - CI noturno em dias úteis, sem sábado e domingo;
   - carga de 20 mil semanal, mantida.
8. **Repositório de recados (decisão sua, porque você pediu para não mexer no Telegram):** desligar o \"resumo de hora em hora\" e o \"aviso no Telegram\" enquanto o Telegram está no backlog. Hoje rodam sem uso.
9. **Mais adiante, opcional:** um runner próprio (self-hosted) na VM da Magalu para o CI pesado. Minuto grátis, mas exige cuidado de segurança. Só depois de sábado.

**Estimativa:** de ~10.500 para ~2.500 a 3.500 minutos por semana (−65 a 75%), sem perder nenhuma verificação antes do main.

## O que preciso
- **\"Aprovo\"** (ou o que tirar) para os itens 1 a 7. Mexem em `.github/workflows/**`, que é do engenheiro-software (sem governança sua). Ele aplica na **quarta, depois do build v1.0.4**, para não arriscar o build de hoje nem a produção de sábado. Eu sigo o item 2 do meu lado já a partir de hoje.
- **Decisão sua** sobre o item 8 (workflows do repositório de recados).

## Pronto quando
Você responde. Na semana seguinte, mostro o consumo antes e depois.
