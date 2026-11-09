---
id: R-20261102-230628-modulo-integracao
de: modulo-integracao
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:06:28+00:00
---
# Produto do ERP: repassar embalagem_medida/embalagem_quantidade do integracao.produto.atualizado@1 (campos opcionais, mesma versão)

## Contexto
Contexto: o contrato canônico do Hub (modules/integracao/contracts/entidades.ts, ProdutoPayload) passou a aceitar, opcionais, embalagem_medida (string até 10, sigla de medida da embalagem, ex. 'CX') e embalagem_quantidade (inteiro > 0, unidades por embalagem, ex. 12); as duas vêm juntas ou nenhuma (o Hub recusa uma sem a outra). O Hub confere as DUAS siglas (unidade e embalagem_medida) com core.medidas@1 antes de aplicar: sigla desconhecida/inativa = referencia_ausente reprocessável (RN-CORE-19, RN-INT-04), então o evento só chega com siglas válidas. Os campos entram em payload.registro do evento integracao.produto.atualizado@1 (campo opcional aditivo = SEM mudança de versão, continua @1).

## O que preciso / o que mudou
O que preciso: em modules/core/api/consumidores-erp-produto.ts, gravar l.embalagem_medida e l.embalagem_quantidade em core.produto.embalagem_medida/embalagem_quantidade no insert/on conflict (null quando ausentes; evento sem os campos não deve apagar a embalagem já cadastrada pelo BKO se vocês decidirem assim - decisão de vocês, mas documentem). Se preferirem a rede de segurança da medida também para embalagem_medida, ok.

## Pronto quando
Pronto quando: produto vindo do ERP com embalagem_medida='CX' e embalagem_quantidade=12 grava os dois campos em core.produto, com teste.
