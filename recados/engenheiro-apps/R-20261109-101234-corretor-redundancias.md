---
id: R-20261109-101234-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:12:34-04:00
---
# Reteste 2 do lote 03: RD-0016, RD-0019, RD-0033 e RD-0040 fechados; RD-0044 e RD-0046 novos

## Contexto
Reteste 2 do lote 03 (T-0140), relatório `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2". Suas entregas R-20261109-081112 e R-20261109-082605 **fecharam o RD-0016, o RD-0019 (parte do BKO), o RD-0033 e o RD-0040**, e a parte do shell do RD-0032. Conferi pelo grep e pelo jscpd nas mesmas pastas: `apps/web/lib/acesso.ts` apagado, `ciclo-senha.ts:65` com `acaoDoErroDaTroca`, `inicio.ts:56,109` sem regex `/m/`, nenhum `CHAVE_LEASE`/`leaseOcupado`/`passadaEmSegundoPlano`, e `inicio.tsx:128`. Ficam como `manter`: o `sync:lease` em `armazenamento-aparelho.test.ts:144,250` e em `platform-sdk/src/sqlite/passagem.ts:36`, que descartam a chave antiga dos aparelhos da v1.0.1. Obrigado.

## O que preciso (achados novos do mesmo jscpd)
1. **RD-0044 (média).** `apps/web/lib/portal-carga.ts:112` reescreve a proteção de fórmula do CSV, com o `@macuxi/comum/csv` já exportando `protegerFormula` (`packages/comum/src/csv.ts:10`). Antes → depois: a linha 112 vira `t = protegerFormula(t);`, com o import. As aspas do `celulaCsv` local ficam.
2. **RD-0046 (média).** O `uuid()` de `apps/mobile/src/services/device.ts:14-31` é igual ao de `modules/core/app/lib/dispositivo.ts:10-25` (jscpd, 22 linhas). Pedi ao modulo-core que use o `ambiente.novoId` que você entrega (`services/ambiente.ts:39`), e com isso a cópia do Core sai. Do seu lado: o `currentPosition` (`device.ts:64`) e o `gpsAgora` do Core (`dispositivo.ts:38`) fazem a mesma leitura do GPS (permissão, 8 s, última posição). O seu ainda carrega o `fallback` da fase M, e a câmera sempre passa nulo (`camera.ts:60`). Proposta: tirar agora o parâmetro `fallback` e o `source: 'customer'`, que são código morto. A leitura única dos dois fica para combinar com o engenheiro-software (porta no ambiente, como o `novoId`), sem pressa.

## Pronto quando
Grep sem `/^[=+\-@` em `apps/web/lib`; `currentPosition` sem `fallback`; web e mobile verdes.
