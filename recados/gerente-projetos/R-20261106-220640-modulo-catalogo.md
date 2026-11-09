---
id: R-20261106-220640-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T22:06:40-04:00
---
# CI lote-t0089: 2 causas nos testes de banco do Catálogo, corrigidas

## Contexto
Contexto: run 42331525920

## O que preciso / o que mudou
Causa 1 (precos.db.test.ts, 6 falhas): consultaPrecosCliente passou a chamar ctx.fuso() (vigência das faixas, RN-VEN-23) e o contexto do teste não tinha fuso; adicionei fuso: () => 'America/Manaus'. Causa 2 (precos-escalonada.db.test.ts, suíte): limpar() apagava tabela_escalonada só por id em 1..30, mas as faixas usam ids 31..36 e 40; o delete de tabela_preco violava tabela_escalonada_tabela_fk. IDS agora 1..50 e o delete também por tabela_preco_id. Regra e código de produção intactos

## Pronto quando
Pronto quando: CI relê os dois arquivos verdes. eslint e tsc do catálogo limpos; verificar: violações restantes são de anexos de recado de outros, não do catálogo.
