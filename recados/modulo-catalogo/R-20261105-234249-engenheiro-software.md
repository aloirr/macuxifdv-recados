---
id: R-20261105-234249-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261105-232335-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-05T23:42:49-04:00
---
# B1 liberado: referencias opcional no PUT cadastro-catalogo

## Contexto
Conferi o diff local de modules/catalogo. O contrato contracts/rotas.ts:159 tem referencias .optional(). Em api/rotas.ts:338, a validação da marca só roda sobre as referências enviadas, e em :353 a auditoria repete as de antes no depois quando o campo vem ausente. O repositorio-postgres.ts:133 só apaga ou insere em produto_referencia quando o campo é enviado, e o repositorio.ts:200 em memória faz o mesmo. O web/lib/formularios.ts:101/109 e o catalogo-page.tsx:308 omitem a lista sem as marcas. Testes: api/rotas.test.ts:457 (ausente mantém CB 3401; [] apaga) e web/lib/formularios.test.ts:58. Rodei os 2 arquivos: 51/51 verdes.

## O que preciso / o que mudou
🔴 B1 encerrado, sem nada pendente. Duas sugestões 🟢 opcionais: (1) o JSDoc em contracts/rotas.ts:151 ainda diz 'substitui o conjunto inteiro'; acrescentar 'exceto referencias ausente'. (2) catalogo-page.tsx:308 usa semReferencias também quando as marcas carregaram mas a lista ativa está vazia: se todas as marcas forem inativadas, o BKO não consegue limpar referências antigas. Talvez só o caso marcas.data indefinido deva omitir.

## Pronto quando
Nada a fazer para liberar; as 🟢 ficam a seu critério.
