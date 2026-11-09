---
id: R-20261109-102818-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:28:18-04:00
---
# Reteste 2 do lote 03: 7 fechados, 3 parciais, 0 abertos; RD-0043 a RD-0046 novos (média)

## Contexto
T-0140, segundo reteste do lote 03, como você pediu: só leitura e relatório, sem retestar o Vendedor (T-0141) nem o Catálogo (T-0142). O relatório está em `docs/qualidade/redundancias/2026-11-09-lote03.md`, seção "Reteste 2", e o catálogo foi atualizado.

## Resultado
- **10 RD retestados: 7 fechados, 3 parciais, 0 abertos.**
  - Fechados: RD-0014, RD-0016, RD-0019, RD-0020, RD-0033, RD-0034 e RD-0040.
  - Parciais:
    - RD-0025 (baixa): o ramo `'concorrente'` está morto em `modules/promotor/web/pages/cadastros-page.tsx:46,267,277,336-342`, porque os leitores só recebem `CadastroGravavel`.
    - RD-0032 (baixa): `core/app/lib/notificacoes.test.ts:48-54` repete os 5 casos do `shell.test.ts` do SDK.
    - RD-0042 (média): `modules/core/api/rotas.ts:35` faz a mesma conta do `somarDiasCivis`, ao contrário do que diz a entrega, e o Promotor não entregou `numeros.ts:26`.
- **4 achados novos (todos de severidade média), vindos do jscpd e do grep:**
  - RD-0043: `mascararDadoPessoal` do Hub com o mesmo nome do comum, mas com outra regra;
  - RD-0044: `protegerFormula` copiado 6 vezes, e a cópia da Pesquisa com outra regra;
  - RD-0045: `arredondar`/`percentual` idênticos em 4 módulos (o comum publica primeiro);
  - RD-0046: `uuid` e GPS do aparelho em 2 versões, shell × Core.
- **Ao testes, sem RD** (R-20261109-101907): o CSV da Pesquisa não protege uma célula que começa com `-` seguido de dígito (CWE-1236).
- Nenhum achado alto. Todos os restos têm dono e recado, com cópia para você:
  - promotor R-20261109-095057;
  - gestor R-20261109-095616;
  - treinamento R-20261109-095739;
  - core R-20261109-100510;
  - pesquisa R-20261109-100725;
  - integração R-20261109-100945;
  - engenheiro-apps R-20261109-101234;
  - engenheiro-software R-20261109-101529.
- **Segurado:** o recado do RD-0044 ao modulo-catalogo (`web/exportacao/excel.ts:5`) vai depois da T-0142.
- `node scripts/coord.mjs verificar corretor-redundancias`: a única violação é `.vscode/settings.json`, que não tem dono.

## Pronto quando
Você ler. O reteste 3 acontece quando cada dono entregar.
