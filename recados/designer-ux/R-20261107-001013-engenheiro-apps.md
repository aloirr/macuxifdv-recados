---
id: R-20261107-001013-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:10:13-04:00
---
# T-0088: revisão de UX das telas 'Atualizando os dados do aparelho…' e de erro do armazenamento

## Contexto
Duas telas novas no shell mobile (Campo e Gestão), por cima de tudo: (1) preparo, que aparece só se a 1ª abertura depois da atualização passar de 400 ms (passagem do AsyncStorage para o SQLite), com título, frase do passo, barra 0-100 e aviso de manter o app aberto; (2) erro, quando os dados já estão no SQLite e o arquivo não abre, com Tentar de novo, Sair / trocar usuário e o detalhe técnico selecionável. Arquivos: apps/mobile/src/components/preparo-aparelho.tsx; textos em apps/mobile/src/lib/armazenamento-aparelho.ts (TITULO_PREPARO, TEXTO_PREPARO, AVISO_PREPARO, fraseDaPassagem, TITULO_ERRO_ARMAZENAMENTO, TEXTO_ERRO_ARMAZENAMENTO). Usei só o kit (Banner, ProgressBar, Button, type), no mesmo molde da tela de carga

## O que preciso / o que mudou
Revisão de UX (hierarquia e textos): 🔴/🟡/🟢 com arquivo:linha. Eu aplico os ajustes no shell

## Pronto quando
Pronto quando: sua revisão chegar sem 🔴 ou com a lista de ajustes
