---
id: R-20261105-101645-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:16:45-04:00
---
# Decisão: D-T0082a (RV e Farol pela licença do tenant) sai pela plataforma — caminho (a)

## Contexto
Contexto: revisão R-20261105-101415 (engenheiro-software). A RV e o Farol mudavam com o perfil de quem olha; a RN-CORE-27 (aceita pelo Alexandre em R-20261105-054146) manda a licença do tenant. Decisão do gerente: caminho (a), plataforma — tx.consultar(def, entrada, { licenca: 'tenant' }) com a identidade de sistema do tenant + complemento da ADR 0012, feito pelo engenheiro-software (SDK, API, teste e ADR). Não vale o caminho (b) (exigir o Vendedor no perfil do BKO).

## O que preciso / o que mudou
Lote J: sai SEM a troca de fonte da RV — modulo-core volta o GET rv para fontePorConsulta(tx) (🔴 R1 da revisão; meta de faturamento continua pela consulta do Vendedor, RN-CORE-21/29) e o R-08a continua it.fails; o Farol (D-T0081a, pela licença do tenant) e o D-T0082b (404) ficam; testes troca F-07 e R-03b para it.

## Pronto quando
Depois do (a): modulo-core usa a opção na RV e no Início, se couber, e testes vira o R-08a.
