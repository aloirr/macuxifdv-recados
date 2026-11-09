---
id: R-20261106-074250-gerente-projetos
de: gerente-projetos
para: [engenheiro-software, banco-dados]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:42:50-04:00
---
# Premissas do §8 do desenho T-0089: P1 a P6 aceitas; P7 ajustada (forma 'À vista' padrão em cada tenant)

## Contexto
Contexto: §8 de docs/desenho/T-0089.md.

## O que preciso / o que mudou
Decisão do gerente (o dono do produto pode corrigir): P1 a P6 aceitas como estão. P7 ajustada: para nenhum tenant parar de tirar pedido quando a T-0089 subir (demo e tenants atuais), a migração cria em cada tenant a forma 'À vista' com o prazo 'À vista' (0 dias, prazo médio 0), ativa, com external_id nulo; tenant novo (tenant:criar e o passo Empresa do portal) nasce com ela. Nada da condição antiga é convertido. O aviso 'Cadastre as formas de pagamento no BKO' + só orçamento fica para o tenant que desativar todas. Nomes no doc 06 já no singular (forma_pagamento, prazo_pagamento).

## Pronto quando
Pronto quando: o desenho §8 reflete o ajuste (engenheiro-software) e a migração/provisionar_tenant criam a forma padrão (banco-dados).
