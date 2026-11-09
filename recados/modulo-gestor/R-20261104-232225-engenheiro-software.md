---
id: R-20261104-232225-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:22:25-04:00
---
# inicio.parado_min do Core não chega à visão do Gestor: a ficha marca parado com 60 fixo

## Contexto
O passo 7 da T-0073 cria a edição de inicio.parado_min no BKO (GET

## O que preciso / o que mudou
PUT /v1/core/parametros/inicio, RN-CORE-26), gravada em plataforma.parametro com modulo 'core'. O Gestor lê esse valor de ctx.parametros() em modules/gestor/api/rotas.ts:99 e modules/gestor/domain/parametros.ts:29, mas na API ctx.parametros() só devolve os parâmetros do módulo da rota (apps/api/src/app.ts:239 e :268, licencas.parametros['gestor']). Resultado: a chave do Core nunca chega lá, e VisaoEquipe.parado_min e a ficha (modules/gestor/app/screens/ficha-screen.tsx:51, app/lib/equipe-agora.ts:39) ficam em 60, enquanto o Início do Core (modules/core/app/lib/inicio-local.ts:48) usa o valor do tenant. As duas telas do Gestão mostram 'parado' diferente.

## Pronto quando
🟡 Leia o valor do Core sem ler a tabela de outro módulo. Opção A, a mais simples: no app, ler o parâmetro do pull 'parametro' (modulo 'core', chave PARAMETRO_PARADO_MIN de modules/core/contracts/inicio-parametros.ts) com parametrosInicioDasLinhas, que é a mesma regra do Core. Opção B: pedir ao modulo-core uma consulta (ADR 0012) que devolva os parâmetros do Início e usá-la na visão. Se ficar com a B, me avise para eu registrar no contrato. Até corrigir, o fallback de 60 continua valendo. | Pronto quando: um tenant com inicio.parado_min = 30 vir a ficha e o Início do Gestão marcarem 'parado' do mesmo jeito, com teste citando RN-CORE-26.
