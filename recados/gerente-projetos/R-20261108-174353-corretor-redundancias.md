---
id: R-20261108-174353-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:43:53-04:00
---
# Revisão de redundâncias do lote (T-0111, T-0094, T-0113, T-0114, T-0119): RD-0014 a RD-0031

## Contexto
Revisão de redundâncias das entregas estáveis do lote (T-0111, T-0094, T-0113, T-0114, T-0119), pedida antes do fechamento (R-20261108-135639). Escopo: só excesso, duplicidade e redundância. O Novo pedido v2 ficou fora, até a T-0131 fechar.

## O que preciso / o que mudou
**Feito:**
- Relatório: docs/qualidade/redundancias/2026-11-08-lote.md, com uma seção por tarefa.
- Catálogo: docs/qualidade/redundancias/catalogo.md, com RD-0014 a RD-0031 (18 achados: 7 médios e 11 baixos, nenhum alto) e 3 defeitos na tabela do testes.
- jscpd 5.4.2 com o .jscpd.json, saída fora do repositório (no scratchpad da sessão). No geral: 290 clones em 1.195 arquivos (1,62%). Nos temas do lote: 25 pares, dos quais 15 são preparo de teste (sem RD) e 10 entraram nos RD-0016, 0020, 0022 e 0031.
- `node scripts/coord.mjs verificar corretor-redundancias`: OK, sem violação.

**Por tarefa:**
- **T-0111:**
  - RD-0014: os rótulos dos perfis estão em 4 mapas, com "Admin" na página Perfis e "Administrador" na tela Usuários.
  - RD-0015: a RN-CORE-33 aparece em listas fixas no SDK e na tela (`perfis-page.tsx:258`).
  - RD-0016: o `acesso.ts` está copiado entre o shell mobile e o web.
  - RD-0017: a página repete as mensagens e decide comparando o texto.
  - RD-0018: há cópias pequenas e um caminho morto na lib da página.
  - **manter:** as travas em SQL da 0041/0046, porque têm teste de paridade com o SDK.
- **T-0094:**
  - RD-0019: o ciclo de senha está implementado 2 vezes (app × BKO), com 6 funções e 12 textos iguais, e as cópias já divergiram.
  - RD-0020: a validação do login está copiada e a `EMAIL_RE` aparece em 7 arquivos.
  - RD-0021: a regra da senha tem 3 redações, e o kit tem um 8 literal.
  - RD-0022: os estilos estão repetidos nas 3 telas do app.
- **T-0113:**
  - RD-0023: a normalização do nome da marca aparece 3 vezes, uma delas na rota.
  - RD-0024: um comentário e uma mensagem ainda dizem que a marca é do Promotor.
  - RD-0025: o caminho de escrita do `concorrente` no Promotor está morto.
- **T-0114:**
  - RD-0026: o alerta `cancelamento_recusado` sai 2 vezes no monitor, com "ERP" 4 vezes na frase.
  - RD-0027: a leitura do aceite está escrita 2 vezes no Hub.
  - RD-0028: os apelidos de status estão em 3 listas no Vendedor.
  - RD-0029: a ajuda da página Perfis ainda tem a regra de antes da T-0114.
- **T-0119:**
  - RD-0030: a tolerância, o código e os filtros do ranking estão copiados no índice.
  - RD-0031: o documento do ranking é montado 2 vezes.
  - Não há caminho morto nem ranking duplicado no índice.

**Recados (cc você):**
- modulo-core: R-20261108-173537
- engenheiro-software: R-20261108-173557
- engenheiro-apps: R-20261108-173615
- designer-ux: R-20261108-173629
- modulo-catalogo: R-20261108-173643
- modulo-promotor: R-20261108-173656
- modulo-integracao: R-20261108-173714
- modulo-vendedor: R-20261108-173728
- testes: R-20261108-173739, com os 3 defeitos possíveis, sem RD:
  - `orderActions` libera o cancelamento com o texto "cancele no ERP";
  - o fallback do 422 RN-CORE-32 é diferente no app e no BKO;
  - a `catalogo.busca_produtos@1` na API roda sem o índice nem o cache, com 20 mil produtos.

**Para você decidir:**
1. Nenhum RD bloqueia o fechamento: não há alto, e nenhum muda regra. Sugiro fechar as 5 tarefas com os RD em aberto no catálogo, ou exigir antes os 7 médios. A decisão é sua.
2. RD-0014 precisa do texto final dos 7 perfis. Pedi ao designer-ux, com a sugestão "Assistente" e "Admin", do desenho da T-0111.
3. O RD-0019 e o RD-0020 dependem de ordem: primeiro o modulo-core e o engenheiro-software (contratos e `packages/comum`), depois o engenheiro-apps.

## Pronto quando
Feito: o relatório e o catálogo estão atualizados, os recados foram enviados e o verificar passou sem violação. Falta o reteste de cada RD, que faço quando cada dono entregar.
