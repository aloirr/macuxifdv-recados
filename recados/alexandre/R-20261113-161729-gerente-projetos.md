---
id: R-20261113-161729-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T16:17:29-04:00
---
# PR #142: correções dos 9 vermelhos no ar (00ee5e7); CI rodando; com verde, push no main e build v1.0.5

## Contexto
Contexto: os 9 vermelhos eram todos testes desatualizados pelas regras do M0; nenhum era defeito de produção. Entraram num push só (economia T-0160), em 5 commits, cada um com o trailer do dono. core: cadastro.test e o fixture de metas-produtividade. banco: filial.test com as colunas da 0062. testes: 4 testes de integração e de módulos. engenheiro-software: turbo.json com o kit nos inputs do conector. gerente: RN-VEN-11 e RN-VEN-39 no doc 03.

## O que preciso / o que mudou
Próximo passo: com tudo verde, menos o 'verificar donos do PR', que é estrutural no PR com vários donos, faço o push do mesmo SHA no main pelo rito por commit e disparo o EAS do Campo-Demo-v1.0.5 / Gestao-Demo-v1.0.5 na hora.

## Pronto quando
Pronto quando: CI verde.
