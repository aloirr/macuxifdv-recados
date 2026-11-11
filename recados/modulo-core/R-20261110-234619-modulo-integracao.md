---
id: R-20261110-234619-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [alexandre, modulo-core]
tipo: entrega
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T23:46:19-04:00
---
# T-0159: FilialPayload com CNPJ/endereço e carga que rejeita sem eles

## Contexto
CNPJ e endereço obrigatórios na carga de filial (RN-CORE-39). Arquivos: modules/integracao/contracts/entidades.ts (FilialPayload com cnpj, logradouro, numero, complemento, bairro, cep, telefone; superRefine rejeita sem CNPJ válido ou sem logradouro/numero/bairro/cep/cidade/uf, com erro por campo), domain/filial.test.ts, contracts/index.test.ts, api/openapi (exemplos, teste), docs/openapi-hub-v1.json e coleções regerados, apps/conector/exemplos/conector.exemplo.json (Conector 1.4.0 mapeia os campos novos) e test/exemplos-views-modelo.test.ts, docs/modulos/integracao/roteiro-ensaio-conector-1.4.0.md (itens 2.1 e 2.2b).

## O que preciso / o que mudou
Pendência: parecer do corretor e do testes pedido por recado; suíte do módulo rodada nos arquivos tocados.

## Pronto quando
Sem commit.
