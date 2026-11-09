---
id: R-20261109-101529-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:15:29-04:00
---
# RD-0045 novo (arredondar/percentual 4x: publicar no comum); RD-0044 regra do '-'; RD-0046 porta do GPS

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". O jscpd nas pastas retestadas achou cópias de utilitários que já são, ou deveriam ser, do `@macuxi/comum`.

## O que preciso
1. **RD-0045 (novo, média): publicar a fonte única.** `arredondar(valor, casas = 2)` (meio para cima, afastando de zero, sem -0) e `percentual(parte, total, casas = 2)` (`null` com total ≤ 0) estão copiados, idênticos, em 4 módulos: `modules/gestor/domain/numeros.ts:4-17`, `modules/promotor/domain/numeros.ts:4-17`, `modules/treinamento/domain/numeros.ts:4-17` e `modules/pesquisa/domain/util.ts:5-15` (jscpd, 14 linhas). Eles alimentam os indicadores dos 4 módulos, e hoje uma correção no arredondamento precisa ser feita 4 vezes. Proposta: `packages/comum/src/numeros.ts` com as 2 funções e o teste (o mesmo dos módulos), exportado pelo índice ou por `@macuxi/comum/numeros`. Avise os 4 donos quando publicar. Eles já receberam o pedido para trocar depois disso.
2. **RD-0044 (novo, média): para saber e para decidir 1 ponto.** O `protegerFormula` do comum (`csv.ts:10`) ainda está copiado em 6 lugares: no Core, `farol.ts:18`, `plano-rv.ts:11` e `equipe-importacao.ts:333`; no Catálogo, `web/exportacao/excel.ts:5`; na Pesquisa, `domain/exportacao.ts:16`; e em `apps/web/lib/portal-carga.ts:112`. Os pedidos foram aos donos, e o do Catálogo vai depois da T-0142. A decisão que é sua: a cópia da Pesquisa deixa passar `-` seguido de dígito (`/^-[^\d.,\s]/`), para o número negativo sair sem apóstrofo. Se isso for desejado, a regra entra no comum para todos; senão, fica a do comum. O ponto de segurança (`-1+1`) foi ao testes.
3. **RD-0046 (novo, média), sem pressa.** O GPS do aparelho é lido em 2 lugares com a mesma lógica (`apps/mobile/src/services/device.ts:64` × `modules/core/app/lib/dispositivo.ts:38`). O UUID já tem porta no ambiente (`novoId`), e o GPS não tem. Se fizer sentido, uma porta `posicao()` no `AmbienteAparelho` (`platform-sdk/src/ambiente.ts:88`), com a política do Core (sem a posição do cliente como reserva, RN-CORE-10), resolve. Se não fizer, responda `manter?` com o motivo.

## Pronto quando
`@macuxi/comum` com `arredondar`/`percentual` e teste; resposta sobre a regra do `-` e sobre a porta do GPS.
