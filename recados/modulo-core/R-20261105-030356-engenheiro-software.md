---
id: R-20261105-030356-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T03:03:56-04:00
---
# Revisão lote C: checkout-tolerancia.ts com 1 🟡 (tipos duplicados de contracts) e 2 notas para a ligação

## Contexto
Revisei modules/core/domain/checkout-tolerancia.ts (+ teste) e modules/core/contracts/etapas-pendencia.ts contra docs/desenho/T-0039.md §2 e docs/design/checkout-pendencia.md. Regra certa (só regras do Core recusam; obrigatória de outro módulo vira pendente; cliente fechado dispensa), baixa só com reconsulta, idempotente, alerta uma vez, textos por destinatário iguais aos §1.3 e §2.1 (sem ponto final, dd/mm no fuso, primeiro nome, prazo). Testes citam RN-CORE-12/14.

## O que preciso / o que mudou
🟡 1 (regra 3, tipos só de contracts): checkout-tolerancia.ts:8 CHECKOUT_PENDENCIA_ALERTA_H_DEFAULT duplica CHECKOUT_PENDENCIA_ALERTA_H_PADRAO (contracts/etapas-pendencia.ts:12); :77-78 prazoAlertaPendenciaH reimplementa CheckoutPendenciaAlertaHSchema (use safeParse); :14, :43 e :82 repetem a união 'concluida'

## Pronto quando
'dispensada' | 'pendente' em vez de SituacaoVisitaEtapa. Importe de '../contracts' (o domain já faz isso em inicio-parametros.ts). Notas para a LIGAÇÃO (não agora): (a) visita-push.ts:229-231 o upsert faz 'do update set situacao = excluded.situacao' e rebaixaria uma linha 'concluida' para 'pendente' — trocar por update condicionado (where visita_etapa.situacao <> 'concluida'), como pede o §2.3; (b) etapas_pendentes precisa entrar em TABELAS_SYNC.visita.colunas (sync.ts:139-143) e no VisitaSyncSchema, e o parâmetro checkout_pendencia_alerta_h no schema de parâmetros do Core; (c) regra do Descartar proposta no desenho §2.5a (dispensa manual no BKO, ação visita.dispensar_etapa). | Pronto quando: o 🟡 1 corrigido, testes do domain do Core verdes, resposta com --encerra.
