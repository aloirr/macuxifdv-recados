---
id: R-20261102-122933-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0064
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:29:33-04:00
---
# T-0064 itens 4 e 5: área segura já no shell; trocar setInterval (10 s no detalhe, 60 s na lista) pelo useAtualizacaoAutomatica do @macuxi/ui e tirar o sync do refreshing

## Contexto
T-0064 itens 4 e 5 (R-20261102-111044 e R-20261102-111438, teste de campo de 02/11). `modules/vendedor/**` está travado pela nuvem (#44); a parte do shell e do `packages/ui` já está feita no local. Aplique depois do merge do #44 (ou peça à sessão da nuvem).

**Item 4, área segura (nada a mudar para corrigir):** o shell agora reserva a faixa da barra de status para TODAS as telas (`apps/mobile/src/components/area-segura.tsx`, envolvendo o Stack em `apps/mobile/src/app/_layout.tsx`) e repassa às telas `useSafeAreaInsets().top = 0`. O detalhe do pedido, o novo pedido e a ficha do cliente deixam de rolar por baixo da barra de status sem mudar código. Limpeza opcional: `Math.max(16, insets.top + 4)` e `insets.top + 16` viram só `16` (order-detail-screen.tsx:74 e 218, new-order-screen.tsx:56, 160, 169 e 264); o toast de aviso.tsx:25 com `insets.top + 14` continua certo. Se algum dia usar `KeyboardAvoidingView` com `behavior="padding"` no Android, passe `keyboardVerticalOffset` com a faixa (hoje o new-order usa `undefined` no Android, sem efeito).

**Item 5, atualização do Gestão:** novo em `@macuxi/ui/mobile`: `useAtualizacaoAutomatica({ atualizar, intervaloMin, tz, ativo })` → `{ puxando, puxar, atualizadoEm, rodape }`, e as funções puras `PARAMETRO_ATUALIZACAO_AUTO` (`'gestor_atualizacao_auto_min'`), `intervaloAtualizacaoMs` (padrão 5 min, faixa 1 a 60) e `rodapeAtualizacao` ("Atualizado às hh:mm · puxe para atualizar"). Liga só com a tela em foco E o app em primeiro plano; ao voltar, atualiza 1 vez se o intervalo passou; o puxar atualiza na hora e recomeça a contagem; nunca roda duas consultas juntas. Testes com relógio simulado em `packages/ui/src/mobile/atualizacao.test.ts`.

## O que preciso
1. `modules/vendedor/app/screens/orders-screen.tsx` (Pedidos da equipe no Gestão):
   - trocar o `useFocusEffect` + `setInterval(POLL_GESTAO_MS)` (linhas 19 e 33-40) por `const auto = useAtualizacaoAutomatica({ atualizar: () => Promise.all([flushOutbox(), refreshOrders()]), intervaloMin: <parâmetro>, tz, ativo: gestao && !offline })`;
   - `<Screen refreshing={auto.puxando} onRefresh={auto.puxar}>`: **tirar `sync.running`** do `refreshing` (linha 59; é ele que deixa o indicador girando o tempo todo). No Campo, que não tem automática, mantenha o puxar com o mesmo hook (`ativo: false`) ou o estado local de hoje, também sem `sync.running`;
   - rodapé (linha 96) no Gestão: `auto.rodape` no lugar de "Atualiza a cada 1 min · puxe para atualizar".
2. `modules/vendedor/app/screens/order-detail-screen.tsx:62-69`: o `setInterval(..., 10_000)` do detalhe é o "a cada 10 s" que o Alexandre viu. Trocar pelo mesmo hook (`atualizar: () => loadOrder(id)`, `ativo: !isQueued && Boolean(id)`), sem indicador na automática.
3. Parâmetro: `gestor_atualizacao_auto_min` é do tenant (o gerente registra no doc 03). Leia por `ambiente.parametros('gestor')[PARAMETRO_ATUALIZACAO_AUTO]` ou combine com o engenheiro-software se ele deve vir em `parametros('vendedor')`; sem valor, o hook usa 5.
4. Teste: na lista do Gestão, `refreshing` não depende de `sincronizando`; o detalhe não tem mais `setInterval` de 10 s.

## Pronto quando
Com a tela aberta no Gestão: 1 consulta a cada 5 min, nenhuma fora de foco ou em segundo plano, indicador só no puxar, rodapé com a hora. Telas do Campo e do Gestão sem conteúdo sob a barra de status no APK de preview de 03/11.
