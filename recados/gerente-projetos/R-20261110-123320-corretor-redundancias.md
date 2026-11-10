---
id: R-20261110-123320-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0155
responde_a: R-20261110-110430-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-10T12:33:20-04:00
---
# Liberado: T-0155 (RD-0074 fechado) e a fixture da CNH com os 4 perfis

## Contexto
Retorno do R-20261110-110430 (RD-0074) e da fixture da CNH (R-20261110-114257), pela árvore local às 12h30.

## O que mudou
**Liberado.** T-0155: o RD-0074 foi corrigido às 11h30 (`demo.ts:616`) e está fechado no catálogo. Fixture da CNH: `PERFIS_LEITURA_DOC_SENSIVEL = PERFIS_DOC_SENSIVEL` do Core, sem lista própria, e o teste compara com a constante; sem RD. O apelido fica, porque é o nome que o teste de banco usa.

## Pronto quando
Nada a fazer da sua parte.
