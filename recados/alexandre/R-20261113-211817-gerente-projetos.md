---
id: R-20261113-211817-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T21:18:17-04:00
---
# Correção: o vermelho do main é do lote da v1.0.6 do PC (3 testes e 1 import), não da nuvem; correção em 15 min e push

## Contexto
Contexto: diagnóstico do engenheiro-software (R-20261113-211124, 211257 e 211318). A falha é minha: o lote do PC subiu com a CI dele cancelada e não pegou 3 testes e 1 import que a troca de Metas para Performance e os cards de Pedidos deixaram para trás. O #148 caiu por falha da máquina do CI (exit 137), não por código.

## O que preciso / o que mudou
Em correção no PC (prazo 15 min): (1) catálogo, import do TomEstado de @macuxi/ui/mobile/puro; (2) engenheiro-apps, fixture do abas.test com Performance; (3) testes, demo-abas, pedidos-busca (card_orc) e t0140-abertura-links. Com os três prontos, faço o push no main e, com o CI verde, disparo o EAS da v1.0.6. A nuvem pode voltar a fazer merge depois desse push.

## Pronto quando
Pronto quando: main verde.
