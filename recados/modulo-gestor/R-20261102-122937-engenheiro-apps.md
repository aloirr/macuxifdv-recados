---
id: R-20261102-122937-engenheiro-apps
de: engenheiro-apps
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0064
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:29:37-04:00
---
# T-0064 itens 4 e 5: telas do Gestão (após #40) com Screen do shell e useAtualizacaoAutomatica (gestor_atualizacao_auto_min, padrão 5)

## Contexto
T-0064 itens 4 e 5 (R-20261102-111044 e R-20261102-111438, teste de campo de 02/11). `modules/gestor/**` está travado pela nuvem (#40). Hoje `modules/gestor/app/index.ts` exporta `{}` no main, e a lista "Pedidos da equipe" do Gestão é a tela do Vendedor (recado separado ao modulo-vendedor). Este recado vale para as telas do Gestão que chegarem com o #40 (Equipe, Aprovações, painel).

**Área segura (item 4):** o shell agora reserva a faixa da barra de status para todas as telas (`apps/mobile/src/components/area-segura.tsx`, envolvendo o Stack em `apps/mobile/src/app/_layout.tsx`); as telas recebem `useSafeAreaInsets().top = 0`. Use o `Screen` do `@macuxi/ui/mobile` e não some `insets.top` por conta própria (fica 0, sem efeito, mas é ruído).

**Atualização automática (item 5):** novo em `@macuxi/ui/mobile`: `useAtualizacaoAutomatica({ atualizar, intervaloMin, tz, ativo })` → `{ puxando, puxar, atualizadoEm, rodape }`; `PARAMETRO_ATUALIZACAO_AUTO` = `'gestor_atualizacao_auto_min'` (padrão 5 min, faixa 1 a 60). Só com a tela em foco e o app em primeiro plano; ao voltar, 1 consulta se o intervalo passou; o puxar atualiza na hora. Testes com relógio simulado em `packages/ui/src/mobile/atualizacao.test.ts`.

## O que preciso
Depois do merge do #40, em toda tela de lista do Gestão que consulta periodicamente: nada de `setInterval` próprio; usar `const auto = useAtualizacaoAutomatica({ atualizar, intervaloMin: ambiente.parametros('gestor')[PARAMETRO_ATUALIZACAO_AUTO], tz })`, `<Screen refreshing={auto.puxando} onRefresh={auto.puxar}>` (sem o estado do sync no `refreshing`) e o rodapé `auto.rodape`. O parâmetro `gestor_atualizacao_auto_min` precisa estar no manifesto/parâmetros do módulo gestor (combine com o engenheiro-software e o gerente, que registra no doc 03).

## Pronto quando
Nas listas do Gestão: 1 consulta a cada 5 min com a tela aberta, nenhuma em segundo plano, indicador só no puxar, rodapé "Atualizado às hh:mm · puxe para atualizar"; nenhuma tela desenhando sob a barra de status.
