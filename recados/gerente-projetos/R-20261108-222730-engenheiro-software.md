---
id: R-20261108-222730-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-211057-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-08T22:27:30-04:00
---
# T-0140 (engenheiro-software): regra react-hooks e lockfile aplicados; lint acusa só o Novo pedido do Vendedor; revisão do branch sem 🔴 além disso; 3 contratos registrados

## Contexto
T-0140, minha parte do branch claude/relaxed-johnson-w2afvp (5441d064) e a revisão do branch inteiro (resposta ao R-20261108-211057-gerente-projetos).

## O que foi feito
1. packages/config/eslint.mjs: `react-hooks/rules-of-hooks` como erro em `.tsx/.jsx` (igual ao branch). A mais: bloco em `.ts/.mts` fora de teste como AVISO, porque hooks próprios em lib também escondem o defeito; vira erro quando a Integração corrigir o único caso (`useAgora`, R-20261108-215827).
2. packages/config/package.json: `eslint-plugin-react-hooks@^5.2.0`. pnpm-lock.yaml regerado com `pnpm install --lockfile-only`; o resultado é idêntico ao do branch (13 linhas); `pnpm install --frozen-lockfile` ok.
3. Lint da raiz com a regra nova: só o @macuxi/vendedor falha. new-order-screen.tsx:559-561 (useState/useRef/useEffect depois de return: é o defeito do relato, que some quando o Vendedor aplicar a parte dele) e cards-inicio.tsx:7 (`View` sem uso, trabalho em andamento). Recado R-20261108-215615. `pnpm fronteiras`: 0 erros.
4. Typecheck da raiz: só tests/modulos/dias-uteis-entre-telas-t0124.test.ts:119 (arquivo novo do testes, em edição); avisado.
5. Revisão do branch: nenhum 🔴 além do item 3. Engenheiro-apps (R-20261108-215731): 🟡 `JSON.stringify` de objeto lançado no registro do erro (erro-de-tela.ts:35) pode levar dado pessoal ao Diagnóstico, ao logcat e ao "Enviar ao suporte"; 🟡 `console.warn` com a mensagem inteira no release (erros.ts:14); 🟢 o não fatal sobrescreve o fatal, `eslint src` não cobre index.ts e services/pdf.ts parece sem uso. ErrorBoundary nas duas camadas e `ErrorUtils` (encadeia, liga uma vez, espera no máximo 600 ms) aprovados. Core (R-20261108-215844): sem 🔴; 🟡 da T-0124: ciclo contracts/ciclo-senha → domain e contracts importando domain. Banco: seed e fixture ok. Corretor (R-20261108-220002): proposta de `caminhoDoLinkInterno` no SDK como fonte única de caminhoDoLink × linkNavegavel, se ele pedir.
6. Contratos: `core.calendario_metas@1` (modulos.md), `emitido_em?` em `vendedor.pedido.criado@1` (eventos.md) e `vendedor_nome?` no contexto de `pedido.criar_em_nome` (extensoes.md). Respostas R-20261108-215925 e R-20261108-215936.

## Testes
@macuxi/config: lint, typecheck e test (10) verdes. `coord verificar engenheiro-software` sem violações.

## Pendências
Revisão final da T-0140 quando chegarem as entregas do Vendedor (lint do item 3), do engenheiro-apps (🟡 1 e 2) e do corretor. Promover a regra a erro em `.ts` depois da correção da Integração.
