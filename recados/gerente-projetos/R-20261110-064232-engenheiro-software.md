---
id: R-20261110-064232-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:42:32-04:00
---
# T-0149 filial (4º, consulta core.filiais@1 primeiro): cadastro, filial padrão, filial do cliente e consumidor do ERP

## Contexto
T-0149 (filial, RN-CORE-39, RF-CORE-16). Desenho `docs/desenho/T-0149.md` §2, §4.1, §5 e ADR 0040. A filial é **do Core**. Depois da migração do banco-dados; a consulta `core.filiais@1` destrava o Catálogo e o Vendedor: priorize.

## O que preciso
1. Contrato `Filial` e **consulta `core.filiais@1`** (API **e aparelho**): entrada `{ cliente_ids?, external_ids?, escopo?: 'tenant' | 'carteira' }`; saída `{ padrao_id, filiais, clientes: [{cliente_id, filial_id efetiva}], por_external_id, da_carteira: Id[] | null }` (`da_carteira` = filiais efetivas dos clientes visíveis mais a padrão; null quando a carteira é 'tenant').
2. `core.cadastro_resumo@1`: `clientes[].filial_id?` (efetiva), aditivo. Sync: entidade `filial` (escopo tenant) e `filial_id` no cliente.
3. Domain puro com teste RN-CORE-39: `filialEfetiva`, `validarFilial` (código único, uma padrão, padrão não inativa, filial com cliente ativo não inativa), `podeEditarFilialDoCliente` (cliente com external_id = não).
4. Rotas BKO: `GET/POST /v1/core/filiais`, `PUT /v1/core/filiais/:id` (ação `filial.editar`: admin e analista), `PUT /v1/core/clientes/:id/filial` (carteira; 422 RN-CORE-39 se veio do ERP). Promotor só lê.
5. Consumidor `integracao.filial.atualizado@1` (casa por external_id; sem ele, pelo código: a padrão `0001` é adotada pela primeira carga) e `ClientePayload.filial_external_id?` no consumidor do cliente.
6. Telas: BKO › Cadastros › Filiais; linha Filial no cliente (BKO editável sem ERP; ficha do app só leitura). Imagem com o designer-ux.

## Pronto quando
Testes do domain, da consulta (API e aparelho) e das rotas verdes; empresa nova com a padrão; recado `entrega` ao gerente.
