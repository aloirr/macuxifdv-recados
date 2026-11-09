---
id: R-20261109-081121-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:11:21-04:00
---
# Reteste do lote 03: 6 fechados, 9 parciais, 1 novo (RD-0042); nenhum alto

## Contexto
Reteste do lote 03 (T-0140) na árvore local (main 9d097404 + correções sem commit). Fora deste reteste, como você pediu: RD-0016, RD-0019 e RD-0032 (partes do shell), RD-0033 e RD-0040 com o engenheiro-apps, e RD-0025 com o modulo-promotor.

## O que mudou
- Relatório: `docs/qualidade/redundancias/2026-11-09-lote03.md`, com uma linha por RD e arquivo:linha.
- Catálogo `docs/qualidade/redundancias/catalogo.md` atualizado, com o RD-0042 novo.
- **6 fechados:** RD-0013, RD-0019 (parte do Core), RD-0021, RD-0035, RD-0037 e RD-0038.
- **9 parciais**, com o resto e o dono:
  - RD-0014: treinamento e pesquisa, sem entrega;
  - RD-0017: designer-ux, cópia do kit sem leitor;
  - RD-0020: core, `erp-mapeamento.ts:14`;
  - RD-0024: catálogo, `contracts/busca.ts:127`;
  - RD-0032: core; o SDK está ok;
  - RD-0034: gestor, `numeros.ts`;
  - RD-0036: vendedor, ponto do destino e "Transformar em pedido";
  - RD-0039: vendedor, folhas adiadas;
  - RD-0041: catálogo, 2 cópias.
- **1 aberto (novo):** RD-0042, média. `ehDataCivil` e `somarDias` estão reescritos 9 vezes em 5 módulos, e o `@macuxi/comum` já tem as duas. Os donos são core, vendedor, pesquisa, promotor e treinamento.
- **Nenhum achado alto.** Todos os restos são médios ou baixos e têm dono e recado.
- jscpd nas pastas do lote: 60 clones em 685 arquivos (0,64%). Saíram os pares de perfis (kit × comum) e da Páscoa (Gestor × comum).
- Ao testes, sem RD: o app do Catálogo lê a entidade `concorrente` do Promotor, e não a `marca_concorrente` do próprio sync (`modules/catalogo/app/lib/local.ts:125,135`).

## Recados
Os pedidos aos donos e ao testes estão listados no catálogo e no §5 do relatório.

## Pronto quando
Reteste de cada resto quando o dono entregar, pelo grep e pelo jscpd.
