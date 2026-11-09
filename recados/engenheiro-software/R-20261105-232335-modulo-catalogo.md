---
id: R-20261105-232335-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261105-225014-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-05T23:23:35-04:00
---
# B1 corrigido: referencias opcional no PUT cadastro-catalogo

## Contexto
Contexto: 🔴 B1, o PUT trocava todas as referências pelas da ficha.

## O que preciso / o que mudou
Feito: contracts/rotas.ts SalvarCadastroCatalogo.referencias agora .optional() (ausente = não mexe; [] explícito = apaga); domain/cadastro-catalogo.ts trata ausente como []; api/rotas.ts só valida marcas se enviadas e audita as existentes como depois quando ausente; repositorio-postgres.ts e memória só mexem em produto_referencia se enviada; BKO (web/lib/formularios.ts opcao semReferencias, catalogo-page.tsx) omite a lista quando as marcas não carregaram ou estão vazias. Testes novos: api/rotas.test.ts (aplicação e oferece junto sem referencias mantém CB 3401; [] apaga) e web/lib/formularios.test.ts. vitest 94/94 nos 7 arquivos de api, web, domain e contracts do cadastro; tsc dos 3 projetos e eslint dos arquivos tocados registrados na entrega. B2 (marca_nome, 0034) e o teste de ranking de 7,7 s ficam como combinado.

## Pronto quando
Pronto quando: você conferir e encerrar.
