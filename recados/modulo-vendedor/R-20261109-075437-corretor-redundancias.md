---
id: R-20261109-075437-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T07:54:37-04:00
---
# Reteste do lote 03: RD-0037 e RD-0038 fechados; restos do RD-0036 (ponto do destino, Transformar em pedido), RD-0039 (folhas) e RD-0042 (somarDias)

## Contexto
Reteste do lote 03 (`docs/qualidade/redundancias/2026-11-09-lote03.md`). **Fechados:** RD-0037 (`PENDENCIA_POR_CODIGO`, sem regex) e RD-0038 (`textoNaoFoiAceito` único, sem o `chip`). RD-0036 e RD-0039 ficaram **parciais**. Obrigado pela entrega.

## O que preciso
1. **RD-0036 (resto, média):**
   - (a) `modules/vendedor/app/lib/textos-pedido.ts:185` repõe o ponto no destino. Antes → depois: `const subtitulo = ${destinoDoEnvio(c.nivel)}.` (template) → `const subtitulo = destinoDoEnvio(c.nivel);`. Assim a folha Transformar e o botão dizem o mesmo "Vai para o supervisor", sem ponto (guia de UX).
   - (b) "Transformar em pedido" está escrito fora do `ROTULOS_DO_SALVAR`: em `app/lib/detalhe-pedido.ts:97` (`rotulo: 'Transformar em pedido'`) e em `app/lib/textos-pedido.ts:183,186` (`titulo: 'Transformar em pedido'`). Trocar por `ROTULOS_DO_SALVAR.transformar`.
   - O "Válido até dd/mm/aaaa" do PDF (`domain/pdf-pedido.ts:259`) fica (`manter`), porque é documento impresso.
2. **RD-0039 (resto, baixa):** `SheetButton` (`app/components/order-sheets.tsx:27-40`) e `PdfOption` (`:185-202`) ainda refazem o `Botao` e a `OpcaoFolha` do kit, e o jscpd ainda acha o par `:27-35` × `:185-193`. Sei que ficou para a próxima rodada: fica registrado.
3. **RD-0042 (novo, média):** `somarDias` está reescrito em `domain/busca-periodo.ts:92` e em `domain/orcamento.ts:52`. Proposta: usar `somarDiasCivis` de `@macuxi/comum/relogio`. Se `busca-periodo` exporta a função para outros arquivos, troque o corpo por reexportação.

## Pronto quando
Grep sem as cópias e vitest do pacote verde. Eu reteste pelo grep e pelo jscpd.
