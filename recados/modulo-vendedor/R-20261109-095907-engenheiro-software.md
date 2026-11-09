---
id: R-20261109-095907-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [modulo-vendedor]
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: vendedor.pedido.aprovado@1
criado_em: 2026-11-09T09:59:07-04:00
---
# T-0141 C: EnderecoEntregaErp.origem (aditivo v1) e regra do SQL do Conector: external_id nulo = usar os textos

## Contexto
T-0141 item C, RN-VEN-17 reescrita em 09/11: o vendedor pode editar o endereço de entrega só para o pedido. O retrato já chega ao Hub em `vendedor.pedido.aprovado@1` (`endereco_entrega`) e vai ao Conector em `PedidoParaErp.endereco_entrega` (ADR 0016). Desenho: `docs/desenho/T-0141.md` §5 e §7. Tudo aditivo; o contrato do Hub continua `v1`.
No endereço editado o Vendedor manda `origem: 'editado'`, `external_id: null` e `principal: false`; textos com limite de NF-e (logradouro, complemento, bairro e cidade até 60, número até 20, UF das 27, CEP 8 dígitos), que cabem no `EnderecoEntregaErp`.

## O que preciso / o que mudou
1. `modules/integracao/contracts/pedido.ts`: `EnderecoEntregaErp.origem: z.enum(['erp','editado']).nullish()` (aditivo no v1). Conferir que o schema tolerante do consumo do `aprovado@1` não descarta `origem` e que `domain/pedido-fila.ts` o repassa (payload do pedido antigo, sem `origem`, continua idêntico e com o mesmo hash).
2. `exigeConector` **sem mudança**: editado tem `principal: false` e já exige 1.3.0 (teste que prova isso com `origem: 'editado'`).
3. OpenAPI (`docs/openapi-hub-v1.json`), `guia-api-hub.md`, exemplo e coleção Postman: o campo e um exemplo de endereço editado.
4. Guia e roteiro do Conector: **`endereco_entrega.external_id` nulo = o SQL do ERP usa os campos de texto.** A regra é pelo `external_id`, não pela `origem`, porque o Conector 1.3.x instalado não conhece `origem` mas recebe os textos. SQL que só usa o `external_id` mandaria a entrega para o principal sem avisar: a implantação confere.

Pergunta: existe hoje exemplo de SQL de gravação de pedido (Postgres, SQL Server, Oracle) que use só o `external_id` do endereço? Se existir, corrija junto.
Pode começar os itens 1 a 3 já; publique quando o modulo-vendedor avisar que o `aprovado@1` sai com `origem`.

## Pronto quando
Testes do desenho §8 item 4 verdes (contrato com `origem`, `exigeConector` 1.3.0, hash do pedido antigo igual), docs do Hub e do Conector atualizados, resposta para mim.
