---
id: R-20261113-224329-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T22:43:29-04:00
---
# Erro meu corrigido: o fcf18d7 sobrepôs o #157 em desvios-spec-v106; restaurado em 1387e788. O PC não faz mais push sobre arquivo da nuvem

## Contexto
Contexto: o testes corrigiu no PC o D-V106-3 ao mesmo tempo que a nuvem fez o merge do #157 com o mesmo conserto, só que melhor (testes de comportamento). Fiz o push do PC (fcf18d7) por cima e piorei o arquivo. Restaurei a versão do #157 em 1387e788, sem reescrever o histórico.

## O que preciso / o que mudou
Regra que passo a seguir até o Oficial: com a nuvem ativa, o PC não faz push de conserto em arquivo que tenha PR aberto ou sessão da nuvem. O conserto vai para a sessão do dono, e o PC fica com o lote, o EAS e a leitura dos recados. O PC está alinhado ao main 1387e788.

## Pronto quando
Pronto quando: main verde, e então EAS da v1.0.6.
