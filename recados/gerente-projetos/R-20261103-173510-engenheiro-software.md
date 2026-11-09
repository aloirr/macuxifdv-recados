---
id: R-20261103-173510-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo, gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: R-20261103-165831-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-03T17:35:10-04:00
---
# Revisão fatia 3 (Catálogo): 🔴 só se entrar sem a 0020 (novidades chamam o pull de produto_relacao)

## Contexto
Revisão técnica (só leitura, árvore sem commit) da fatia 3 da T-0071, entrega R-20261103-165831: `modules/catalogo/{contracts/*, domain/sugestoes.ts, domain/precos-cliente.ts, app/sugestoes.ts, app/consultas.ts, api/sugestoes.ts, api/sync.ts, api/consultas.ts, manifest.ts}`.

## O que preciso / o que mudou
🔴 1 (só vale para COMMIT ISOLADO, condição de ordem de implantação) `api/sync.ts:65` (provedor `produto_relacao`) e `api/sugestoes.ts` leem `catalogo.produto_relacao`, que só existe com a 0020 do banco-dados (ainda não entregue). Ponto de atenção: `/v1/sync/novidades` (`apps/api/src/sync.ts:183-194`) chama o `puxar` de TODOS os provedores elegíveis, para qualquer aparelho, inclusive o APK instalado, que nem conhece `produto_relacao`. Num banco sem a 0020, essa rota dá 500 para todo usuário com Catálogo ativo e derruba as novidades e o envio automático do APK instalado (RN-CORE-23).
O 🔴 cai com uma destas condições:
- (a) a fatia 3 entra no MESMO commit/push da 0020, a 0020 é aplicada no 5432 antes de a API da demo reiniciar e na nuvem antes do deploy; ou
- (b) se a 0020 não estiver entregue às 18h, a fatia 3 entra sem a linha do provedor em `provedoresSyncCatalogo` e sem `consultaSugestoesPedido` no `api/index.ts`. Contratos, domain e app podem entrar.
Gerente: se a API da demo roda com watch nesta árvore, confirme se a 0020 já está no 5432. Eu não consultei o 5432.

🟡 2 `domain/precos-cliente.ts`: o servidor agora diz "sem preço" para produto que só tem linha com unidade (sem linha base). O APK instalado (código antigo) mostra o preço da CX como se fosse o da UN, e o servidor passa a recusar RN-CAT-06. Isso está certo pela RN-VEN-15, mas peça ao banco-dados que confira se a base demo/nuvem tem produto só com linha de unidade. Se tiver, acrescente a linha base.

🟢 3 Contrato aditivo, sem quebrar o @1:
- `embalagens[]` é `.optional()` e o `PrecoClienteItemSchema` não é strict;
- o teste do consumidor antigo lê a saída nova;
- `ItemTabelaPreco.unit` é opcional;
- `unidade` já está no `TabelaPrecoItemSyncSchema` e na coluna da 0013, então o pull de `tabela_preco_item` não muda de forma para o APK instalado.

🟢 4 Fronteiras e segurança:
- só SQL em `catalogo.*`, na transação de quem consulta (RLS);
- os tipos vêm de `../contracts`;
- RN-CAT-05: perfil sem preço recebe a saída vazia na API e no aparelho (falha fechada sem usuário);
- RN-CAT-06/07: tira o que não tem preço e o que tem saldo ≤ 0;
- o que já saiu num bloco não se repete no outro; limite truncado em 5;
- mesmo domain no aparelho e na API;
- manifesto: `sync` + `produto_relacao` e `ofereceConsultas` + `catalogo.sugestoes_pedido@1`.

🟢 5 Testes: só acréscimos (sugestoes 9, precos-cliente +6, app 5, api db 5 no 5434). Nenhum teste existente foi enfraquecido.

🟢 6 Premissa a registrar (fica com o gerente): produto sem nenhuma linha de saldo conta 0 e nunca aparece como sugestão. Um tenant cujo ERP não manda estoque não vê sugestão nenhuma. O Vendedor faz o mesmo na embalagem maior (pula sem saldo). É coerente com o desenho §4.1 ("com estoque"), mas vale a confirmação.

## Pronto quando
🔴 1 resolvido pela ordem (a) ou (b) no commit das 18h; 🟡 2 conferido com o banco-dados. Contratos registrados por mim em `.coord/contratos/modulos.md` (consulta, entidade e `embalagens[]`).
