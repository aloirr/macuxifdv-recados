---
id: R-20261108-002650-engenheiro-software
de: engenheiro-software
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:26:50-04:00
---
# T-0113 P: Promotor lê marcas por catalogo.marcas@1; concorrente sem escrita; promotor.concorrentes@1 e entidade concorrente em deprecação — ADR 0034

## Contexto
T-0113, decisão do dono R-20261107-173950 b: o cadastro de marcas concorrentes sai do Promotor e vai para o Catálogo (`catalogo.marca_concorrente`, mesmos ids). O Promotor lê por contrato e não guarda cópia. ADR docs/decisoes/0034-marcas-concorrentes-no-catalogo.md (§3 e §5) e desenho docs/desenho/T-0113.md §2 fatia P. Você vai depois de B (banco-dados) e K (modulo-catalogo), no mesmo lote. A migração revoga a escrita do macuxi_app em `promotor.concorrente` e tira a FK `produto_concorrente_concorrente_fk`.

## O que preciso
1. Manifesto:
   - `usaConsultas += 'catalogo.marcas@1'` (o Catálogo já está em opcionais);
   - `promotor.concorrentes@1` fica em ofereceConsultas, marcada como deprecada;
   - a descrição de `concorrente.gerenciar` passa a "Produtos do concorrente (as marcas são do Catálogo)". A chave não muda.
2. Produto do concorrente: validar `concorrente_id` por `catalogo.marcas@1 {ids:[id]}`, com a marca ativa. Senão 422 `REFERENCIA_INVALIDA`. `ConsultaIndisponivel` dá 422 com "Cadastre as marcas concorrentes no Catálogo".
3. Cadastro `concorrente` sem escrita (nada de POST, PUT ou DELETE). A listagem do seletor do BKO fica só leitura, pela consulta, numa rota do próprio Promotor; a forma é sua. A contagem de uso por concorrente sai (a RN-PRO-12 fica só para categoria; o texto do doc 03 é com o gerente).
4. `promotor.concorrentes@1`: delega para `catalogo.marcas@1` (`marcas` passa a `concorrentes`, `incluir_inativos` passa a `incluir_inativas`), com `@deprecated`, até a fase 2 (não antes de 2026-12-08).
5. Entidade `concorrente`: continua registrada, com o provedor devolvendo página vazia, para o APK Campo-Demo-v1.0.0 não receber 404.
6. BKO de cadastros:
   - a aba Concorrentes vira um aviso: "As marcas concorrentes agora ficam em Catálogo → Marcas concorrentes", com link;
   - a aba Produtos do concorrente usa a lista nova: seletor só com as ativas, nome das inativas no histórico e no CSV.
7. App: nada a mudar hoje. As telas futuras de concorrente leem `catalogo.marcas@1` no aparelho.

## Pronto quando
- nenhuma leitura ou escrita de `promotor.concorrente` no código, fora do provedor vazio;
- testes de rota do produto do concorrente cobrindo: marca ativa, inativa, inexistente e Catálogo indisponível;
- teste do manifesto e lint, typecheck e testes do @macuxi/promotor verdes;
- recado de entrega ao gerente com cópia para mim. Precisa de `@macuxi/catalogo` no package.json: me peça o lockfile.
