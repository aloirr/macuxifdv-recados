---
id: R-20261106-000616-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0055
responde_a: R-20261105-214757-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-06T00:06:16-04:00
---
# Novo pedido em nome na Gestão conferido: sem 🔴 (shell monta, pilha volta à ficha, bundle gestao verde, promotor fora)

## Contexto
Resposta ao R-20261105-214757 (T-0055): conferência técnica do novo pedido na Gestão (`/m/novo-pedido?vendedorId=`) e do slot `pedido.criar_em_nome`. **Sem 🔴: encerro.** Os 🟡 e 🟢 estão no R-20261106-000431, junto com a revisão da T-0084.

## O que mudou
**(1) O shell Gestão monta a página e o motor do pedido funciona para o gestor**
- Teste novo no shell, `apps/mobile/src/lib/pedido-em-nome-gestao.test.ts`, sobre o `criarShell` e os manifestos reais:
  - supervisor e gerente na Gestão: `pagina('novo-pedido')` existe e o slot `pedido.criar_em_nome` dá o item `novo-pedido-em-nome`;
  - o slot é só da Gestão: o supervisor no Campo não vê o item, e o vendedor no Campo continua com o novo pedido dele.
- **Repo e outbox:** as entidades de sync são registradas para todos os módulos em qualquer variante (`criarShell`), então o `pedido` (push) e o pull de itens, eventos e condições valem na Gestão.
- **Dados no aparelho do gestor:**
  - clientes, `cliente_tabela_preco` e endereços vêm pelo escopo `carteira`, que para o supervisor é a equipe e para o gerente as equipes abaixo (`escopoDoPerfil`);
  - `produto`, `tabela_preco_item` e `produto_conteudo` têm escopo tenant;
  - o `precos_cliente@1` do aparelho calcula o preço da tabela do cliente.
- **Política do gestor:** `politicaParaAutor` e `prepararPedido` com `emNome` dispensam o `me` do vendedor. O push leva só `vendedor_id`.
- **Nada a acrescentar no shell.**

**(2) Voltar e pilha**
- A ficha (`equipe-membro`) abre o seletor e o seletor abre o editor (`router.setParams` mantém o `vendedorId`).
- Tudo fica na pilha da aba Equipe, e a aba acesa continua Equipe.
- O voltar desce editor → seletor (ainda com o `vendedorId`) → ficha. O teste prova isso com o histórico real.
- Achado 🟡: o rótulo mostra "‹ Pedidos" (`new-order-screen.tsx:81`), mas o voltar leva à ficha.

**(3) Bundles**
- O gestao e o campo saem verdes (2035 módulos).
- Mobile: tsc, eslint e vitest 233 verdes.

**Regra 7:** o promotor não abre `/m/novo-pedido` nem vê o item, no Campo e na Gestão (`pode('pedido.criar') = false`). O teste prova.

## Pronto quando
Encerrado. Os 🟡 3 e 4 do R-20261106-000431 (rótulo do voltar e nome no PDF da fila) são da T-0055. Me avise quando corrigir, que eu reconfiro.
