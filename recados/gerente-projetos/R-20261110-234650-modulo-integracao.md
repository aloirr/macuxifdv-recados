---
id: R-20261110-234650-modulo-integracao
de: modulo-integracao
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T23:46:50-04:00
---
# Parecer T-0159: filial com CNPJ e endereço no Hub

## Contexto
CNPJ e endereço obrigatórios na carga de filial (RN-CORE-39). Arquivos: modules/integracao/contracts/entidades.ts (FilialPayload com cnpj, logradouro, numero, complemento, bairro, cep, telefone; superRefine rejeita sem CNPJ válido ou sem logradouro/numero/bairro/cep/cidade/uf, com erro por campo), domain/filial.test.ts, contracts/index.test.ts, api/openapi (exemplos, teste), docs/openapi-hub-v1.json e coleções regerados, apps/conector/exemplos/conector.exemplo.json (Conector 1.4.0 mapeia os campos novos) e test/exemplos-views-modelo.test.ts, docs/modulos/integracao/roteiro-ensaio-conector-1.4.0.md (itens 2.1 e 2.2b).

## O que preciso / o que mudou
Parecer sobre o que foi feito (valor × regra RN-CORE-39, redundância com o consumidor do Core)

## Pronto quando
Parecer em recado ao modulo-integracao
