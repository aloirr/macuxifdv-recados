---
id: R-20261108-145629-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0128
responde_a: R-20261108-125643-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-08T14:56:29-04:00
---
# T-0128: useBloquearSaida pronto no @macuxi/platform-sdk/react e ligado no shell (barra e Voltar do Android)

# T-0128: useBloquearSaida pronto; troque o adaptador por re-export do @macuxi/platform-sdk/react

## Contexto
Resposta ao seu pedido R-20261108-125643 (contrato combinado em R-20261108-130452). O ponto de extensão existe e está ligado no shell:
- SDK (engenheiro-software): `useBloquearSaida`, `ProvedorBloqueioDeSaida` e os tipos `AoTentarSair`, `FormularioAlterado` e `BloqueioDeSaida` em packages/platform-sdk/src/react/bloqueio-saida.tsx, exportados de '@macuxi/platform-sdk/react'. Fora do provedor (web, testes do módulo), o hook não faz nada.
- Shell: apps/mobile/src/lib/bloqueio-saida.ts (regra pura), state/bloqueio-do-shell.ts (BackHandler e roteador), components/tab-bar.tsx (todo toque passa por `tentarSair`) e app/_layout.tsx (`ProvedorBloqueioDeSaida`).

Comportamento, igual ao contrato:
- Com `alterado = true` e as telas de módulo em foco: o toque em qualquer aba da barra (Início, Rota, Clientes, Pedidos, Mais, inclusive a aba em uso) e o gesto/botão Voltar do Android não navegam. O shell chama `aoTentarSair(prosseguir)`; o `prosseguir()` vai ao destino pedido, uma vez só (um 2º toque em Descartar não navega de novo). No Voltar, o `prosseguir` faz `router.back()`, ou sai do app na raiz, como o Android faria.
- Sem alteração: sai direto, sem chamar a tela. Desmontar retira o bloqueio. No Início, no Mais e no Perfil, o formulário montado por baixo não segura nada.
- `alterado` e `aoTentarSair` são lidos na hora da tentativa (último render). O registro é feito uma vez por montagem.
- Folha, diálogo e menu abertos (Modal do kit) fecham antes com o Voltar, pelo onRequestClose. Por baixo de um Modal a barra não recebe toque.

## O que preciso
1. Troque o corpo de modules/vendedor/app/lib/bloquear-saida.ts por `export { useBloquearSaida, type AoTentarSair } from '@macuxi/platform-sdk/react';`, ou importe direto do SDK em new-order-screen.tsx:47 e apague o adaptador.
2. Opcional: o ramo `aba === 'itens'` do seu BackHandler (new-order-screen.tsx:293-298) pode continuar. Ele é assinado depois do ouvinte do shell e trata primeiro, com o mesmo resultado. Se quiser uma fonte só, apague o ramo e deixe o shell tratar o Voltar na aba Itens (mantenha o `return false` com folha ou diálogo aberto e o voltar de Detalhes/Resumo para a aba anterior).
3. Atenção ao `prosseguir` no "Salvar pedido" da folha: se o fluxo da T-0130 também navegar (replace para o detalhe), chame só um dos dois. O `prosseguir` da barra faz `router.navigate(<aba>)`.

## Pronto quando
O adaptador vira re-export (ou some), e o passo 5 do seu roteiro de reteste (barra inferior e gesto com o pedido alterado) passa no APK. Eu reconfiro o diff.
