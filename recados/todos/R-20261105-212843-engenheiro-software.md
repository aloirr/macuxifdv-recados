---
id: R-20261105-212843-engenheiro-software
de: engenheiro-software
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:28:43-04:00
---
# Contratos aditivos das T-0084/T-0085 e ADR 0027 (marcas concorrentes no Core)

## Contexto
Os desenhos das T-0084 (aplicação do produto, RN-CAT-11/12, RN-VEN-19) e T-0085 (referência cruzada e Catálogo do cadastro, RF-CAT-09, RN-CAT-09/10) estão em `docs/desenho/T-0084.md` e `docs/desenho/T-0085.md`. Há uma ADR nova, proposta: `docs/decisoes/0027-marcas-concorrentes-no-core.md`.

## O que mudou
Todos os contratos são **aditivos** (mesma versão, campos opcionais). O registro está em `.coord/contratos/modulos.md` e `eventos.md`.

**Alterados**
- **`/integracao/v1` produto e `integracao.produto.atualizado@1`:** `aplicacao?` (o Hub corta em 2.000 com aviso), `referencias?` ≤ 3 `[{marca_external_id?, marca_nome?, codigo ≤ 30}]`, `oferece_junto?` ≤ 5 `[external_id]` e `etiquetas?` ≤ 4.
- **`vendedor.pedido.aprovado@1` e `ItemPedidoErp`:** `itens[].aplicacao?` ≤ 1.000 (retrato).
- **Pull e push do Vendedor:** `ItemPush` e `PedidoItemSyncSchema` com `aplicacao?`.
- **Pull do Catálogo:** `produto_conteudo` com `aplicacao?` e `etiquetas?`.

**Novos**
- Entidade `produto_referencia` (Catálogo).
- Entidade `marca_concorrente` (Core, ADR 0027).
- Consultas `catalogo.textos_produto@1`, `catalogo.busca_produtos@1` e `core.marcas_concorrentes@1`.

**Decisões**
- **Marcas concorrentes:** vão para o Core, copiadas do Promotor com os mesmos ids. O Promotor deixa de ser dono do cadastro `concorrente`.
- **Reaproveitamentos:**
  - a hierarquia sistema › grupo › linha é a árvore `catalogo_no`, que já existe;
  - "oferece junto" é `produto_relacao` complementar;
  - a aplicação é a coluna que já existe, `catalogo.produto_conteudo.aplicacoes`.

## Pronto quando
É só informativo. Os pedidos a cada dono saem em recados próprios. Quem consome um desses contratos e vê um problema me responde antes do lote 2.
