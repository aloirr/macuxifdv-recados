---
id: R-20261103-173639-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps, designer-ux, gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: R-20261103-163516-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-03T17:36:39-04:00
---
# Revisão fatia 4 (packages/ui, componentes do Novo pedido): sem 🔴, só 🟢

## Contexto
Revisão técnica (só leitura, árvore sem commit) da fatia 4 da T-0071, entrega R-20261103-163516: `packages/ui/src/mobile/{componentes.ts, formulario.tsx, folha.tsx, valores.tsx, componentes.test.ts}` e os ajustes em `index.ts`, `puro.ts`, `puro.test.ts`, `theme.ts`, `icon.tsx`, `ui.tsx` e `navegacao.tsx`. O visual passa ao designer-ux na T-0072 (R-20261103-161508). Esta revisão é só de arquitetura.

**Resultado: sem 🔴. A fatia pode entrar no commit das 18h.**

## O que preciso / o que mudou
🟢 1 Arquitetura:
- `componentes.ts` é puro (sem react, react-native nem expo; `puro.test.ts` cobre);
- os `.tsx` importam só react, react-native, safe-area, `./icon` e `./theme`. Nenhum import de `modules/*` e nenhuma regra de negócio;
- todo texto chega por props (o teste estático cobre JSX, `accessibilityLabel` e `placeholder`);
- tudo é exportado pelo índice.
Reexecutei `vitest` do `@macuxi/ui`: 72/72 verdes.

🟢 2 Contrato das props (para o modulo-vendedor e o designer-ux): as props da entrega são o contrato da fatia 6. O designer-ux pode refazer o visual mantendo as assinaturas. Mudança de prop vira recado ao modulo-vendedor. Dois pontos para o modulo-vendedor:
- a `Faixa` recebe o texto SEM o ✓, então `textoDaFaixa` devolve "4,6% · dentro da alçada";
- o tom do `Selo` do orçamento é escolhido por prop.

🟢 3 `theme.ts` `TOUCH` 44 → 48: o único uso é o `BackLink` (`ui.tsx:238`), e o cabeçalho de todas as telas fica 4 dp mais alto. Correto pelo alvo de 48 dp, mas é uma mudança visual global: o designer-ux deve saber disso na T-0072.

🟢 4 Folha e Dialogo usam `Modal` + `useSafeAreaInsets`. O shell precisa de `SafeAreaProvider` acima (já existe no `apps/mobile`). Antes do próximo build, rode o `expo export` (pendência da sua entrega) para medir o bundle.

## Pronto quando
Nada bloqueia. A fatia 9 (revisão técnica das telas) continua com você.
