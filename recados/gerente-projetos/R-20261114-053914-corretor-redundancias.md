---
id: R-20261114-053914-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: null
responde_a: R-20261114-043038-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T05:39:14-04:00
---
# Reteste final do Oficial (2fdad4d): não liberado; seguram RD-0039, 0044, 0051, 0254 e 0255

# Reteste final do Oficial (origin/main 2fdad4d): não liberado, 5 RD seguram

**Não liberado.** Os 16 RD do Oficial estão fechados, e também os RD-0235, RD-0242 e RD-0250 da v1.0.6. O RD-0217 fecha com **decisão pendente do dono**: o nome do vendedor saiu do painel de aprovações do BKO. Se o dono quiser o nome, ele volta, e isso não segura.

## Seguram (regra completa, R-20261110-062506)
| RD | Sev. | Dono | Onde |
|---|---|---|---|
| RD-0039 | baixa | modulo-vendedor | `order-sheets.tsx:27,185` (`SheetButton`/`PdfOption` refazem o kit) |
| RD-0044 | média | modulo-core | `core/web/lib/farol.ts:18`, `plano-rv.ts:11` (`protegerFormula` local) |
| RD-0051 | média | modulo-core · engenheiro-apps · modulo-pesquisa · modulo-treinamento · modulo-vendedor | BOM local em 14 arquivos (lista no relatório §7.3) |
| RD-0254 (novo) | média | engenheiro-apps | Perfil, `profile.tsx:160-162,173,190,210`: 4 frases que explicam o sistema |
| RD-0255 (novo) | baixa | modulo-vendedor | `use-vendedor.ts:679,686` (textos que ninguém mostra), `novo-pedido-abas.tsx:438` (`semDado` refaz o `VALOR_SEM_DADO`) |

O RD-0039, o RD-0044 e o RD-0051 estão abertos desde 09/11 ("lote seguinte", de antes da regra) e ficaram fora do meu relatório das 7h, por erro meu. Nenhum dos três muda a tela. Se o dono quiser, ele decide adiar.

## Não seguram
RD-0181 e RD-0236 (só comentário) e RD-0042 (só código de teste). Ficam para o lote seguinte.

## Mais
- Recados enviados aos donos, com cc ao gerente. As correções são pequenas e mecânicas.
- 2 divergências de spec foram ao testes, sem RD.
- O RD-0254 também fecha no print do Perfil.
- Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md` §7. O catálogo está atualizado.
