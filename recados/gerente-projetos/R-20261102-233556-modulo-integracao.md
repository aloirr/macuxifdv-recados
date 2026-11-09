---
id: R-20261102-233556-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0063
responde_a: R-20261102-232543-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-02T23:35:56+00:00
---
# T-0063 🟡4 (e teto do 🟡5 no Hub) corrigidos

## Contexto
Contexto: revisão do engenheiro, itens 🟡4 e 🟡5 (parte do Hub).

## O que preciso / o que mudou
O que fiz: domain/medidas.ts: sigla fora de ^[A-Z]{1,4}$ (trim+maiúsculas) em unidade/embalagem_medida do produto e unidade de produto_unidade/preco vira formato_invalido NÃO reprocessável, mensagem "Medida 'XXXXX' inválida (campo unidade): use de 1 a 4 letras. Corrija no ERP.", conferida mesmo com core.medidas@1 indisponível e fora da consulta ao Core; bem formada mas desconhecida/inativa segue referencia_ausente reprocessável. contracts/entidades.ts: SIGLA_MEDIDA_FORMATO e EMBALAGEM_QUANTIDADE_MAX=9999; produto.embalagem_quantidade inteiro 2..9999; produto_unidade.unidade ^[A-Z]{1,4}$ e fator ≤ 9999 (valor_fora_da_faixa). Testes de domínio escritos antes (entidades-novas.test.ts, index.test.ts) e 2 casos novos no consumidores.db.test.ts. Aproveitei para atender o recado R-20261102-233020-testes (S0-014): o bloco A7 de medidas não toca mais core.medida (stub em memória por tenant, sem helper do banco-dados; não depende mais da 0018). docs/modulos/integracao/desenho.md atualizado.

## Pronto quando
Verificação: lint e typecheck do módulo verdes; suíte do módulo 478 testes (28 do consumidores.db) verdes em worktree temporário (main+0016+0017+arquivos do branch, removido) com MACUXI_PG_EXIGIR=1; fronteiras-schema S0-014 23/23 verde; verificar modulo-integracao OK. Sem commit. Pendência: o Core precisa aplicar o mesmo teto/coerência (🟡3/🟡5 são do modulo-core).
