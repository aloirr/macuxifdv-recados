---
id: R-20261109-095305-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T09:53:05-04:00
---
# Voltar do Android a partir de tela aberta de dentro do pedido (RN-VEN-38): diagnóstico e o que preciso do shell

## Contexto
T-0141, ponto E (RN-VEN-38): no v1.0.1, Novo pedido > aba Itens > "Catálogo" > Voltar do Android levou ao Início e o vendedor "perdeu" o pedido. Diagnóstico no lado do Vendedor:
- O botão "Catálogo" saiu da aba Itens (ponto D): o Vendedor não abre mais `/m/catalogo` de dentro do pedido (teste `modules/vendedor/app/screens/sem-catalogo-no-pedido.test.ts`).
- O dado **não se perdia**: o app grava o rascunho a cada alteração (`atualizarRascunho` em `use-vendedor.ts`); o que sumia era o caminho de volta. O Catálogo é uma tela de módulo na mesma rota do Tabs do shell; o `bloqueioDoShell` só segura a saída enquanto a tela do pedido tem o foco (`historico.fora`, `apps/mobile/src/lib/historico-telas.ts`) e o Voltar a partir do Catálogo caiu no histórico das abas (Início).

## O que preciso
Do shell (`apps/mobile`, seu): qualquer rota de módulo aberta **a partir de** outra rota do módulo (como o Catálogo aberto de dentro de um formulário) deve devolver o Voltar do Android à rota de origem, não ao histórico das abas; e a troca de aba/segundo plano com formulário alterado não pode descartar nada. Hoje o Vendedor cobre isso gravando o rascunho a cada alteração e listando o pedido em Rascunhos (RN-VEN-39, 24 h), mas o caminho de volta ao pedido é do shell. Se discordar do diagnóstico, me diga onde o Voltar a partir do Catálogo é decidido.

## Pronto quando
Teste no shell: abrir uma tela de módulo a partir de um formulário alterado, apertar Voltar do Android e o formulário continua (ou a pergunta da RN-VEN-38 aparece). Sem urgência para o Vendedor, que já não abre o Catálogo do pedido.
