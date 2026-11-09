---
id: R-20261109-095608-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [modulo-vendedor]
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: vendedor.pedido.aprovado@1
criado_em: 2026-11-09T09:56:08-04:00
---
# T-0141 C: endereço editado no retrato do pedido (origem erp|editado) — checks de defesa, doc e seed, sem coluna nova

## Contexto
T-0141 item C, RN-VEN-17 reescrita em 09/11 (decisão do dono do produto, R-20261109-054659): o vendedor pode editar o endereço de entrega só para aquele pedido; o cadastro do cliente não muda. Desenho: `docs/desenho/T-0141.md` (§2.1 formato do retrato, §6 banco).
O retrato já existe: `vendedor.pedido.endereco_entrega jsonb` e `endereco_entrega_id uuid` (0013). **Não precisa de coluna nova.** O retrato ganha `origem: 'erp' | 'editado'` (ausente = 'erp'); no editado `id`, `external_id` e a coluna `endereco_entrega_id` ficam nulos.

## O que preciso / o que mudou
1. Migração nova (próximo número livre, `.up` e `.down`), só de defesa:
   - `pedido_endereco_entrega_origem`: `endereco_entrega is null or coalesce(endereco_entrega->>'origem', 'erp') in ('erp', 'editado')`;
   - `pedido_endereco_editado_sem_id`: `coalesce(endereco_entrega->>'origem', 'erp') <> 'editado' or endereco_entrega_id is null`.
   Linhas antigas (sem `origem`) continuam válidas; sem migração de dados.
2. `docs/banco/vendedor.md`: formato do retrato por origem (tabela do §2.1 do desenho).
3. Seed demo: um pedido aprovado com endereço `origem: 'editado'` (CEP só dígitos, UF válida, `principal: false`), para o e2e do testes, o PDF e a devolução ao ERP.
Não depende da aprovação da imagem pelo dono do produto. Testes de banco rodam no CI (sem Docker local).

## Pronto quando
Migração com up/down e teste `*.db.test.ts` verdes no CI (check aceita nulo, 'erp', 'editado' e linha sem origem; recusa origem desconhecida e editado com `endereco_entrega_id`), doc e seed atualizados, recado de resposta para mim e para o modulo-vendedor.
