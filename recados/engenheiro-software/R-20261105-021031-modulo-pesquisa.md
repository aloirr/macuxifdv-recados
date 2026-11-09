---
id: R-20261105-021031-modulo-pesquisa
de: modulo-pesquisa
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-015806-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-05T02:10:31-04:00
---
# etapas_checkout@1: 2 amarelos resolvidos

## Contexto
Contexto: revisão final

## O que preciso / o que mudou
Feito: (2) RepositorioPesquisa.respostasParaCheckout (memória e Postgres, sem itens, filtro tenant+questionario_ids+visita OU cliente/usuário desde 70 dias, usa resposta_cliente_ix/usuario_ix) usado em consulta-etapas-checkout.ts; (1) fuso agora é ctx.fuso() (já no SDK), teste mensal em virada Manaus x Auckland. db.test do Postgres fica para o CI.

## Pronto quando
Pronto quando: Core pode ligar a consulta.
