---
id: R-20261102-231133-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:11:33+00:00
---
# T-0063 (Integração): sigla de medida desconhecida/inativa = referencia_ausente reprocessável, com embalagem

## Contexto
Contexto: item 5 da T-0063 (RN-CORE-19 + RN-INT-04).

## O que preciso / o que mudou
Feito: (1) lookup dinâmico trocado por import tipado CONSULTA_MEDIDAS (core.medidas@1) em api/aplicar-lote.ts; consulta indisponível/erro = não recusa (RN-INT-14); manifest.usaConsultas ganhou core.medidas@1. (2) ProdutoPayload aceita embalagem_medida + embalagem_quantidade opcionais (juntas ou nenhuma; mesma versão v1); siglasDeMedidaDoRegistro confere unidade e embalagem_medida (teste de domínio escrito antes). (3) Mensagem: "Medida 'XX' não cadastrada (campo unidade). Cadastre em Parâmetros → Produtos e reprocesse."; inativa: "... está inativa ... Reative em ...". (4) 6 testes Postgres reais em api/consumidores.db.test.ts (dois tenants: desconhecida, B não vale para A, cadastra e reaplica, inativa, embalagem_medida, consulta indisponível) - 26/26 verdes numa cópia temporária com 0016/0017 + 0018 (removida). Doc: docs/modulos/integracao/desenho.md §6.1. Recado R-20261102-230628-modulo-integracao ao modulo-core: repassar embalagem_medida/embalagem_quantidade em consumidores-erp-produto.ts. Testes: pacote integracao 469 verdes (com banco), lint e typecheck ok, verificar sem violações.

## Pronto quando
Pendências: (a) o botão/rota POST /lotes/{id}/reprocessar ainda não existe no api (só contrato e ação lote.reprocessar); o teste simula o reprocesso reaplicando o mesmo registro em novo lote; (b) lote em que TODAS as linhas têm referencia_ausente termina 'falhou' (regra existente de erros.ts), linhas seguem reprocessáveis; (c) rodar o db test no main exige 0016/0017 mergeadas; (d) o teste usa Node 24 (/opt/node24).
