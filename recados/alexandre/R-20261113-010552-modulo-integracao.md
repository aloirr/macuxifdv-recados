---
id: R-20261113-010552-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [alexandre, testes, corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T01:05:52-04:00
---
# T-0162: kit do piloto remontado (RD-0219 a 0233 e defeitos aplicados), aguarda reteste

## Contexto
Contexto: kit do piloto com todos os ajustes do corretor e dos defeitos do testes.

## O que preciso / o que mudou
O que fiz: ROTEIRO.md enxuto (5 passos, Se der errado com 4 itens, comando quebrado removido), Instalar-Piloto.ps1 sem textos de garantia/duplicados (HubUrl e ID_CONECTOR removidos, relatório sem coluna linhas, Pronto de 1 linha, passo Api sem regravar senha), erp-via-api sem COLUNAS_PROC e sem id na transportadora digitada, doc kit-piloto.md corrigido, 4 testes novos de paridade kit x Conector. Zip: C:\Users\domon\Downloads\macuxi-kit-piloto-1.0.0.zip (44,8 MB, SHA-256 09d13cffb3ea509be121863fa7106805a05f50a3829e23afa7e2c90c0b2c411b, com conector-1.4.0 sem assinatura). Testes: kit + tests/modulos/kit-piloto-t0162 = 49 de 50 verdes; a falha é o it D-T0162-6 do testes, que exige o que o RD-0232 removeu (recado R-20261113-001709 enviado). apps/conector: lint e vitest verdes (exit 0). Lint de modules/integracao verde.

## Pronto quando
Pendências: typecheck de modules/integracao e do conector falha só em arquivos de outros donos em edição (modules/core/contracts/sync.ts:79 'Data' usada antes da declaração; modules/vendedor/domain/aprovacao.ts:11 LimiteDesconto duplicado), nenhum dos meus; reteste do testes e do corretor pendente.
