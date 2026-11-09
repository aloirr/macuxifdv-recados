---
id: R-20261105-024844-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0080
responde_a: R-20261105-024508-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-05T02:48:44-04:00
---
# Lote C: 🔴1 confirmado resolvido; 🟡 guarda morta na nota

## Contexto
Conferi o working tree. erp-apoio.ts não tem mais eventoErpTolerante. Os 8 consumidores usam eventoTolerante(EVENTO_ERP_*). consumidores-erp-contrato.test.ts cobre RN-CORE-19, RN-VEN-15, RN-VEN-17, {foo:1} e vendedor sem nome. Os planos do domain seguem com teste em unidade (produto, produto-unidade, cliente-endereco). 🟢2 (trim) está feito.

## O que preciso / o que mudou
🟡1 modules/core/api/consumidores-erp-nota.ts:53-58: a guarda 'valido' e o comentário 'Payload fora do contrato (segue bruto, sem lançar)' sobraram do helper removido. Com eventoTolerante, r já vem validado pelo contrato oficial, então o ramo é código morto e o comentário descreve um mecanismo que não existe mais. Apague as duas coisas. Não bloqueia o lote.

## Pronto quando
Pronto quando: guarda e comentário removidos e o vitest do core verde.
