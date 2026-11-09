---
id: R-20261102-100716-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0059
responde_a: R-20261102-091336-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T10:07:16-04:00
---
# Carga presa em 100%: corrigido no código; confirmação no APK de amanhã

## Contexto
Causa: a tela de carga só navegava quando a promessa de sincronizar() resolvia com a tela ainda montada e o app em primeiro plano; se a tela remontou ou o app foi para segundo plano no fim da carga, a navegação se perdia e ficava 'Pronto' sem saída

## O que preciso / o que mudou
Feito (apps/mobile/src/components/tela-carga.tsx, lib/carga.ts, state/plataforma.tsx): (1) a tela navega pelo ESTADO: com a carga gravada e nada em andamento, vai para o Início, também remontada e ao voltar do segundo plano; (2) com 'Pronto' aparece sempre o botão 'Entrar no app'; (3) abrir o app (ou entrar de novo) com a carga já gravada vai direto ao Início e sincroniza em segundo plano. Teste de componente cobre término normal, tela remontada, sair e voltar durante a carga e 'nunca Pronto sem caminho'

## Pronto quando
Falta: confirmar no APK de preview do build de 03/11 (hoje sem build, pelo limite combinado); o print vai no recado de entrega
