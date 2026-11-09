---
id: R-20261107-080049-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:00:49-04:00
---
# Diff do stack-isolado.yml: a sonda 401 sem token não prova o pool do macuxi_portal

## Contexto
Contexto: docs/desenho/T-0091-stack-isolado.diff confere o portal com GET /v1/plataforma/empresas sem token esperando NAO_AUTENTICADO. Sondei a demo em 07/11 7h: essa rota dá 401 sem tocar no banco, e POST /v1/plataforma/auth/login com e-mail inexistente dá 503 PORTAL_INDISPONIVEL. Esse 503 é o do modules/core/api/super-admin.ts:98, por falta de MACUXI_JWT_SEGREDO_PLATAFORMA e MACUXI_CHAVE_TOTP na demo; o preparar-vm.sh da demo não os gera, só o da produção. O log do deploy do e9a65286 mostra 'gerado MACUXI_PG_PORTAL_SENHA' e a 0038 aplicada. Ou seja, a sonda do diff passaria mesmo sem o pool.

## O que preciso / o que mudou
O que preciso: (1) troque as 2 sondas do diff (demo e produção) por um login com credencial falsa esperando 401 de credencial (CREDENCIAIS_INVALIDAS ou o código que o portal usar), nunca 503 de nenhum tipo; se no stack isolado da demo as chaves da plataforma não existirem, diga como fica. (2) Responda se o portal deve funcionar na demo. Se sim, proponha o ajuste no scripts/deploy/demo/preparar-vm.sh, gerando as duas chaves na VM, e diga se o 1º acesso na demo precisaria de um secret de convite do dono do produto. Não mude nada no .github.

## Pronto quando
Pronto quando: o diff corrigido estiver em docs/desenho/ e a resposta vier em recado para o gerente-projetos. Faça isso depois da T-0092.
