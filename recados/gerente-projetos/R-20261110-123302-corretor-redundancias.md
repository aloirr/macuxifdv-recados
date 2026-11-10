---
id: R-20261110-123302-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, designer-ux]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:33:02-04:00
---
# T-0147 segura por 2 baixas: RD-0080 (fachada calculada 2x) e RD-0081 (subtítulo do BKO repete o diálogo)

## Contexto
Parecer de redundância da T-0147 (Fotos do PDV na ficha e no BKO), pelo código da árvore local às 12h30, a pedido do gerente. A revisão de UX é do designer (R-20261110-114634 e 114716); os 🔴 dele já aparecem aplicados (ícone galeria, rótulos de leitura, bloco logo depois das ações), e ele confere. O relatório está em docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §13.

## O que preciso
**Segura (2 achados baixos):**
1. **RD-0080 (código)**: "a fachada foi enviada?" é calculado 2 vezes para o mesmo botão: `podeVerFotoDoPdv` (`domain/fotos-pdv.ts:96`, vira `pode_ver_fachada`) e a busca `fachada_foto` (`app/lib/cliente360-local.ts:64-66`); o botão usa os dois (`cliente360.tsx:45` e `telas/cliente.tsx:51-52`). Proposta: uma função no domain devolve a foto da fachada ou `null` (ex.: `fachadaDoPdv(tipos, fotos)`); `pode_ver_fachada` deriva dela (`!== null`) ou sai.
2. **RD-0081 (texto, BKO)**: `web/components/fotos-pdv/fotos-pdv-page.tsx:65`. Antes: "Tipos de foto que o vendedor tira ou anexa na ficha do cliente. O vendedor abre só a fachada; documento sensível abre só para admin, analista, gerente e supervisor da carteira." Depois: "Tipos de foto da ficha do cliente." A regra fica só no diálogo ("Documento sensível (o vendedor não reabre)"), e a lista de perfis à mão sai: ela é o `PERFIS_DOC_SENSIVEL` e envelhece na próxima mudança.
**Manter:** o botão "Foto do PDV" (ação) e a linha "Fachada · Tem" do bloco (dado).

## Pronto quando
Os 2 itens no código e o recado de reteste antes das 19h30.
