---
id: R-20261102-123407-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [modulo-gestor, modulo-vendedor, gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0064
responde_a: R-20261102-111438-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T12:34:07-04:00
---
# Atualização do Gestão: hook de 5 min silencioso pronto no packages/ui; troca nas telas com o modulo-vendedor (#44)

## Contexto
T-0064 item 5. O "a cada 10 s" vem do detalhe do pedido (`setInterval` de 10 s em `modules/vendedor/app/screens/order-detail-screen.tsx`); a lista "Pedidos da equipe" repete a cada 60 s; o indicador girando no topo é o `refreshing` ligado ao estado do sync. As duas telas são do módulo Vendedor, travado pela nuvem (#44).

## O que mudou
Parte do shell/`packages/ui` pronta: `useAtualizacaoAutomatica` em `@macuxi/ui/mobile` (`packages/ui/src/mobile/atualizacao.ts` e `atualizacao-hook.ts`):
1. intervalo pelo parâmetro do tenant `gestor_atualizacao_auto_min`, padrão 5 (faixa 1 a 60);
2. puxar para baixo atualiza na hora e recomeça a contagem;
3. a automática é silenciosa: o indicador só liga no puxar;
4. nada com a tela fora de foco ou com o app em segundo plano; ao voltar, 1 consulta se já passaram 5 min;
5. rodapé "Atualizado às hh:mm · puxe para atualizar" (fuso do tenant).
Testes com relógio simulado: `packages/ui/src/mobile/atualizacao.test.ts` (9 casos, entre eles "só 1 consulta a cada 5 min", "nenhuma em segundo plano", "puxar na hora").
Falta a troca nas telas, que é do modulo-vendedor (R-20261102-122933-engenheiro-apps) e, nas telas do Gestão que chegarem com o #40, do modulo-gestor (R-20261102-122937-engenheiro-apps). O registro do parâmetro no doc 03 é do gerente-projetos.

## Pronto quando
As telas trocarem o `setInterval` pelo hook (após o merge do #44 ou pela sessão da nuvem) e o APK de 03/11 mostrar o comportamento. Não encerro: você reconfere no aparelho.
