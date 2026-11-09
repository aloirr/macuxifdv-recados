---
id: R-20261109-095722-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: vendedor.pedido.aprovado@1
criado_em: 2026-11-09T09:57:22-04:00
---
# T-0141 C: contrato do endereço editado no pedido (EnderecoEditadoPedido, origem no retrato e no aprovado@1), domain e API já; telas depois da imagem

## Contexto
T-0141 item C, RN-VEN-17 reescrita em 09/11: endereço de entrega editável **só no pedido**, sem mudar o cadastro do cliente; o retrato vai no pedido, no detalhe (Campo, Gestão, BKO), nos 2 PDFs e na devolução ao ERP. Desenho completo: `docs/desenho/T-0141.md`. Tudo **aditivo**: nenhum contrato muda de versão, sem ADR. Não editei nada em `modules/vendedor` (você está nele).
Já entregue por mim: `@macuxi/comum/endereco` (`UFS_BRASIL`, `ehUf`, `normalizarCep`, `cepValido`, `formatarCep`, com testes).

## O que preciso / o que mudou
**Já (não depende da imagem):**
1. `contracts/frete.ts` (desenho §2): `LIMITES_ENDERECO_PEDIDO` (logradouro 60, número 20, complemento 60, bairro 60, cidade 60), `ORIGENS_ENDERECO_PEDIDO`, `EnderecoEditadoPedido` (strict; `uf: z.enum(UFS_BRASIL)`; `cep: /^\d{8}$/`) e `EnderecoEntregaPedido = EnderecoRetrato.extend({ origem?: 'erp' | 'editado' })`.
2. `contracts/index.ts`: `PedidoPush.endereco_entrega_editado: EnderecoEditadoPedido.nullable().optional()` (aditivo; `EditarOrcamentoRequest` herda). `Order.delivery_address` passa a `EnderecoEntregaPedido`.
3. `contracts/eventos.ts`: `EnderecoEntregaEvento.origem: z.enum(['erp','editado']).optional()` em `vendedor.pedido.aprovado@1` (continua @1; registro em `.coord/contratos/eventos.md` já atualizado por mim).
4. `domain/` (teste antes, RN-VEN-17; desenho §3): `normalizarEnderecoEditado`, `validarEnderecoEditado` (→ `endereco_invalido` + `campos`) e `enderecoDoPedido` (editado igual a endereço ativo do cliente vira `erp`; com editado o id é ignorado e nunca recusa).
5. `api/receber.ts` (4b), `api/orcamentos.ts` e Transformar: usam `enderecoDoPedido`; gravam retrato e coluna (§2.1: editado → `id`, `external_id` e `endereco_entrega_id` nulos, `principal: false`). Recusa `endereco_invalido` sem o endereço no log. Transformar herda o retrato do orçamento; Editar reabre; Duplicar copia (premissa §9). `api/mapeamento.ts` devolve `origem`; `api/aprovado-erp.ts` copia `origem` (ausente → 'erp').

**Depois da imagem aprovada (critério 2 da tarefa):** formulário C.3 com os limites do contrato (`maxLength` de `LIMITES_ENDERECO_PEDIDO`, UF da `UFS_BRASIL`), cartão e folha C.1/C.2, selo "Editado neste pedido" no Resumo e no detalhe (Campo, Gestão, BKO), PDFs com "Endereço de entrega:" sem marca. O endereço editado mora no rascunho e na fila (offline).

**Implantação:** o APK novo só vai ao dono do produto depois da API nova no ar (o `PedidoPush` não é strict: a API antiga descartaria o editado sem avisar; desenho §7).

## Pronto quando
Testes do desenho §8 itens 1 a 3 e 5 verdes (valor × regra: o mesmo endereço no Resumo, detalhe, 2 PDFs e evento), lint e typecheck verdes, recado ao modulo-integracao avisando que o `aprovado@1` já sai com `origem`, e revisão final comigo.
