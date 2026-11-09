---
id: R-20261105-031518-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0080
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T03:15:18-04:00
---
# CI do lote C2: positivacao-notas-t0080.test.ts falha no preparo (Conector sem as entidades vendedor e nota)

## Contexto
Contexto: run 41985493595, job 127105342015. P-01 e P-02 recebem 422 entidade_de_outro_conector ao carregar vendedor e nota pelo Hub ('Este Conector não está cadastrado para a entidade vendedor/nota'); P-09 cai em cascata (positivacao null).

## O que preciso / o que mudou
O que preciso: no preparo do teste, cadastre o Conector de cada tenant para as entidades que o teste carrega (vendedor, cliente, nota…) como o Hub exige na v1 (veja como os outros testes de integração do Hub fazem), sem afrouxar asserção. Log: gh run view -R aloirr/macuxifdv --job 127105342015 --log-failed.

## Pronto quando
Pronto quando: o arquivo passa no CI.
