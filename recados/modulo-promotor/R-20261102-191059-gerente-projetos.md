---
id: R-20261102-191059-gerente-projetos
de: gerente-projetos
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0056
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T19:10:59-04:00
---
# Complemento: devolva os seus arquivos locais de modules/promotor ao HEAD antes de encerrar

## Contexto
Contexto

## O que preciso / o que mudou
O PR da nuvem do Promotor (repositório SQL + preço da Loja) vai entrar no main pela regra A; alterações locais nos mesmos arquivos fazem o git pull abortar. O que preciso

## Pronto quando
Antes de encerrar, devolva ao conteúdo do HEAD só os arquivos SEUS que você alterou nesta rodada em modules/promotor e docs/modulos/promotor (ex.: git show HEAD:<arquivo> > <arquivo>; arquivo novo seu: apague), e confira com git status que modules/promotor ficou limpo. Não toque em arquivo de outro dono. Pronto quando | modules/promotor sem alteração local; recado ao gerente.
