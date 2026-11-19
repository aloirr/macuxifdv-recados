---
id: R-20261118-231800-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-18T23:18:00-04:00
---
# PASSAGEM da v1.0.15: pausa até as 3h (os créditos acabaram); fila por sessão, branches, heads e o que falta

Ordem do dono do produto (pela ponte, 23h10 de Manaus): "Acabaram os créditos. Salve e pause tudo até as 3h. Programe a volta esse horário."
Todas as sessões receberam a ordem de fazer push em rascunho e parar. As rondas do gerente e a reserva estão desligadas. O "no ar até as 6h" fica sem efeito: na volta, o gerente manda a nova previsão.
Nenhum merge foi feito na v1.0.15. O main continua em b52ca64d (v1.0.14 no ar).

## Bloco 1 — P-6 (T-0184) e BKO › Pedidos
| PR | Dono / sessão | Branch | Head | Situação |
|---|---|---|---|---|
| #495 | banco-dados / S5 | nuvem/v1015-p6-banco-dados | be728b9c | Corretor LIBERADO. **Falta:** seeds `db/seeds/demo/demo.ts` (~972) e `db/seeds/fase-m/fase-m.ts:247-269` sem as linhas da `vendedor.pedido_aprovacao` (testes) |
| #494 | engenheiro-software / S3 | nuvem/v1015-p6-engenheiro-software | eb711905 | Corretor LIBERADO no 903094a1. Pedido: RD-2260/2261 e saída do `limite_informado` do desenho. Reteste no head novo |
| #493 | modulo-vendedor / S6 | nuvem/v1015-modulo-vendedor | 12f6748b | RETIDO (marca MC-1760..1763; corretor RD-2272..2277). **Defeito:** corpo das rotas de decisão fora do desenho §7.1 (`{ motivo, motivo_aprovacao }`); padrão Gerente (P5 B); exportar dos contratos `maiorNivel`, estados, rótulos, mínimo de 3 e mapa decisão→rota. Reenvio no ciclo 2 grava sempre o ciclo 1 (`receber.ts:406`) |
| #496 | modulo-core / S4 | nuvem/v1015-p6-modulo-core | a5e9263d | RETIDO (RD-2263..2265). Tirar `limite_informado`. **Defeito:** o Core consome só o `@1`, e nenhum aprovador é avisado (`manifest.ts:18`, `consumidores-pedido.ts:60`) |
| #497 | modulo-gestor / S7 | nuvem/v1015-p6-modulo-gestor | 0f8888e4 | RETIDO (MC-1764/1765; RD-2267..2271). Importar do vendedor, tirar a extensão de `registrarDecisao`, uma contagem só, cliente em destaque, corpo das rotas |
| — | testes (sessão do gerente) | nuvem/v1015-testes | 5e039f44 | PDF-8, e-mail de senha e T-0184 (20 casos). No merge local: 2157 verdes e 14 vermelhos, todos pelos 3 defeitos acima. Entra depois de #493, #495, #496 e #497. Sem PR ainda |

**Ordem de merge do bloco 1:** #495 → #494 → #493 → #496 → #497 → testes.

## Bloco 2
| PR | Dono / sessão | Branch | Head | Situação |
|---|---|---|---|---|
| #498 | banco-dados / S5 | nuvem/v1015-banco-dados | 26d8b635 | 0089 (rastreamento). RETIDO no 27621300 (RD-2254/2255): reteste |
| #499 | modulo-core / S4 | nuvem/v1015-modulo-core | 70a826ae | Login (T-0185) e T-0156 do core. Sem parecer ainda. Entra depois do #498 |
| #500 | engenheiro-software / S3 | nuvem/v1015-engenheiro-software | 8accd0f9 | Marca LIBERADO no 4a8554d0; corretor RETIDO (RD-2251/2252). Faltam o logo dos e-mails (lote 8 da marca) e a `MACUXI_EMAIL_URL_ATIVOS` em produção |
| #501 | engenheiro-apps / S7 | nuvem/v1015-engenheiro-apps | 3a82ef03 | MC-1756 e pedido do core (R-20261118-230000) |
| #502 | modulo-gestor / S7 | nuvem/v1015-modulo-gestor | b685f51d | MC-1754/1755 (médias): reteste |
| #503 | modulo-catalogo / S2 | nuvem/v1015-catalogo-modulo-catalogo | 27d11fab | MC-1752/1753 e RD-2245..2248. **Defeito:** ninguém oferece o `vendedor.preco_prazo_padrao@1` (o vendedor tem que oferecer) |
| #492 | designer-ux / S1 | nuvem/v1015-designer-ux | 992c77b6 | Pranchas aprovadas e telas da T-0156: MC-1750/1751 e RD-2240..2244, reteste |
| #504 | engenheiro-software / S3 | nuvem/v1015-ci-economia-engenheiro-software | e2b9d4d2 | Governança. RD-2249 (cron), reteste. Frase pela ponte (delegação até as 6h) |
| — | modulo-vendedor / S6 | nuvem/v1015-prazo-medio-modulo-vendedor | aa519d5e | Prazo médio fora do pedido (RN-VEN-25). Sem PR nem parecer |

## Fora dos blocos
- **Prints limpos para a apresentação:** `nuvem/v1015-apresentacao-designer-ux`, head 07d6df46, em `docs/design/apresentacao-2026-11/`. Faltam as telas da sequência do dia que ainda não saíram.
- **Gerente:** doc 03 (RN-VEN-12, 13, 25, 30 e 47), T-0184 e quadro no #490, no fechamento.
- **OUTBOX_PARADA** (36 eventos): o S3 ainda não mandou o recado.

## Sessões (todas pausadas)
S1 session_019xHEXrPzgn3fNKy4GEjQ9e · S2 session_019xHEXpM3H8fEg12NYaJako · S3 session_019xHEXpXBUTFFB9Bpw8jz5K · S4 session_019xHEXsxrtSFcQixPyeQu1L · S5 session_019xHEXog6yNKyddkVYJPaT9 · S6 session_019xHEXrgRttetdrVq3A8CTL · S7 session_019xHEXsQcR5VFywTxs8L6Wq. As sessões filhas não têm GitHub MCP nem send_message, e recebem 403 nos recados: o gerente abre os PRs e grava os recados por elas.
