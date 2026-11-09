---
id: R-20261102-100849-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:08:49-04:00
---
# T-0059 (parte do engenheiro-apps): carga entra pelo estado, frases sem nome técnico, não reinicia ao voltar, ErrorBlock sem JSON

## Contexto
T-0059, parte do engenheiro-apps (R-20261102-091336, 090915, 090919 item 2 e 091519 item 2 no padrão do web), mais a pendência da T-0034.

## O que fiz
1. **Carga presa em 100% (R-091336)**: a tela está em `apps/mobile/src/components/tela-carga.tsx` (a rota `app/sync.tsx` só a renderiza). A navegação segue o ESTADO do motor (`lib/carga.ts`, `situacaoDaCarga`): com `sincronizado_em` gravado e nada em andamento → `<Redirect href="/">`, também com a tela remontada e na volta do segundo plano (a tela re-renderiza no AppState active). Com "Pronto" o botão "Entrar no app" aparece sempre. Se a carga já existia quando a tela abre (entrar de novo), o usuário entra na hora. Abrir o app com a carga gravada vai direto ao Início e sincroniza em segundo plano (`state/plataforma.tsx`, motivo `abertura`).
2. **Tela sem nome técnico (R-090915)**: saudação, título, barra com % e uma frase por vez a cada 3,5 s, com fade (`lib/frases-carga.ts`, por variante, perfil e módulo efetivo). "Pedido" só aparece com o Vendedor e nunca para o promotor; preço só com o Catálogo; equipe, metas e alertas só na Gestão. No erro, mensagem amigável + "Tentar de novo" (+ "Desligar modo sem sinal"). O detalhe técnico (etapa onde parou + mensagem) vai para o `console.warn` e para a área "Diagnóstico" do Perfil (`lib/diagnostico-sync.ts`, guardado em `fv:diagnostico:falha_sync`). No Perfil, o cartão de sync e o aviso de entidades sem provedor também pararam de mostrar nomes técnicos (foram para o Diagnóstico). A raiz virou ScrollView com área segura em cima e embaixo.
3. **Não reiniciar ao voltar (R-090919 item 2)**: `plataforma.sincronizar` agora roda uma por vez; quem chama durante uma em curso recebe a mesma promessa, sem repetir `/me/modulos`. `sincronizarSeNecessario(motivo)` usa `deveSincronizar` (pura) e não dispara com carga em andamento, com carga terminada há menos de 15 min nem com tentativa iniciada há menos de 60 s. AppState, relógio de 15 min, abertura e tela de carga passam todos por ela. O item 1 (retomar por cursor) é do engenheiro-software: propus a interface em R-20261102-100623, sem mudar a assinatura; `progresso` parte do ponto salvo; `retomando` e `erroEtapa` são opcionais.
4. **Padrão de erro do web (R-091519 item 2)**: `packages/ui/src/web/erros.ts` (`ehMensagemTecnica`, `mensagemParaTela`). O `ErrorBlock` não mostra mais JSON de validação nem pilha: mostra o `fallback` (prop nova) ou a mensagem padrão e manda o detalhe ao console. Criei `apps/web/app/(bko)/error.tsx` para erro inesperado de página. Avisei o modulo-vendedor (R-20261102-100651) para usar o `fallback` no order-drawer e sugeri (🟢) ao engenheiro-software ajustar o `errorMessage` do platform-sdk/web para ZodError.
5. **T-0034**: em `abas.test.ts`, a fixture agora espelha o `perfis` da página real de pedidos; o caso do promotor com o Vendedor efetivo virou `it` e passa (resposta ao R-20261101-161003 em R-20261102-100644).

## Testes
- Novo `apps/mobile/vitest.config.ts` (alias `@/`, JSX automático) para o teste de componente, que roda com `react-dom/server` e react-native, roteador e estado simulados. O repositório não tem renderizador de teste para RN; não entrou dependência nova.
- `tela-carga.test.tsx` (10 testes):
  - término → `/`;
  - tela remontada;
  - sair e voltar durante a carga: não reinicia, e se terminou com o app fora, entra;
  - carga já gravada entra direto;
  - nunca fica "Pronto" sem caminho;
  - nenhuma entidade de sync dos manifestos nem id técnico em nenhuma etapa nem no erro (conferi que o teste falha se a etapa voltar para a tela);
  - erro amigável, modo sem sinal e raiz rolável.
- Também novos: `carga.test.ts` (10), `frases-carga.test.ts` (7), `diagnostico-sync.test.ts` (2) e `packages/ui/src/web/erros.test.ts` (10).
- Verdes:
  - mobile: typecheck, lint e testes (87);
  - web: typecheck, lint e testes (19);
  - ui: typecheck, lint e testes (43);
  - bundle Android das duas variantes (campo e gestao);
  - `verificar engenheiro-apps` sem violações.

## Pendências
- Print do APK de preview: sai no build de 03/11 (hoje sem build EAS, pelo limite).
- Retomar por cursor, ADR do segundo plano e tempo da carga da demo: com o engenheiro-software.
- Limitação: o teste de componente renderiza a tela no servidor, sem efeitos. O AppState e a remontagem são cobertos pela regra pura que o shell usa + re-render com o estado novo. A validação final é no aparelho, amanhã.
- Respondi aos três pedidos do dono do produto (R-20261102-100716, 100724, 100732) sem `--encerra`: aguardam o print do APK.
