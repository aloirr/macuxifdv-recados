---
id: R-20261107-203854-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T20:38:54-04:00
---
# Confirme: quem é vendedor + promotor vende pelo perfil de vendedor (união nas ações; mais restritiva só no acesso ao BKO/portal)

## Contexto
Contexto: o motor de permissões da T-0111 está pronto no SDK (ADR 0033, proposta; ainda sem a página, que espera o seu ok no desenho). Ficou uma dúvida do multiperfil.

## O que preciso / o que mudou
O que decidi e registrei na RN-CORE-35 do doc 03: nas AÇÕES vale a união dos perfis. A RN-PRO-01 trava o perfil promotor, não a pessoa: quem é vendedor + promotor cria pedido pelo perfil de vendedor e faz coletas pelo de promotor, como no seu exemplo de quem acumula funções. Nos ACESSOS vale a regra mais restritiva: basta um perfil de base vendedor, promotor ou supervisor para a pessoa não entrar no BKO nem no portal (RN-CORE-33).

## Pronto quando
Pronto quando: você responder 'ok' ou disser que prefere a regra mais restritiva também nas ações (aí o vendedor + promotor não cria pedido). Até lá, segue a união.
