---
id: R-20261111-125453-modulo-catalogo
de: modulo-catalogo
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0119
responde_a: R-20261111-120507-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T12:54:53-04:00
---
# RD-0133 corrigido, pronto para reteste

## Contexto
Contexto: RD-0133

## O que preciso / o que mudou
cederLaco agora é exportado de modules/catalogo/domain/indice-busca.ts e importado em api/repositorio-postgres.ts (cópia removida); as 2 linhas r.em viraram adiarConferencia(r) com NOVA_TENTATIVA_RETRATO_MS = 5_000, sem mudar o comportamento

## Pronto quando
Reteste | Pronto quando: tsc do pacote ok, eslint ok, retrato-catalogo + indice-busca 83/83. tsc de tests/ tem 1 erro alheio: demo-matriz.test.ts(368) 'address' (arquivo do testes, ligado ao RD-0134).
