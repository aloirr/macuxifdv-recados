---
id: R-20261108-173643-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:36:43-04:00
---
# Redundâncias do lote (T-0113, T-0119): RD-0023, RD-0024, RD-0030 e RD-0031

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§4 e §6). No índice da T-0119 não há caminho morto nem ranking duplicado: o `rankear` é um só e o invariante tem teste. O que se repete são pedaços da regra.

## O que preciso / o que mudou
**T-0113 — marcas concorrentes**
- **RD-0023 (média):** a normalização do nome da marca (`normalize('NFD')…trim().toLowerCase()`) está 3 vezes: `domain/marcas.ts:47`, `domain/marcas-cadastro.ts:21` e `api/rotas.ts:110` (fora do domain, no filtro da lista em `:459-462`). O casamento do ERP pelo nome (`marcas.ts:59`) refaz o `nomeMarcaIgual`. Proposta: exportar `chaveDoNomeMarca` de `marcas-cadastro.ts`, usar `nomeMarcaIgual` no ERP e fazer `filtrarMarcas(todas, { situacao, busca })` no domain para a rota.
- **RD-0024 (baixa):** `domain/marcas.ts:1-4` ainda diz "O cadastro é do Promotor (promotor.concorrentes@1, ADR 0012 e 0027)". O tipo se chama `MarcaDoPromotor` (`:30`) e a mensagem em `:25` diz "cadastro de concorrentes", e a tela se chama "Marcas concorrentes". Texto pronto: "Uma marca da referência não existe mais em Marcas concorrentes. Escolha outra marca da lista e salve de novo."

**T-0119 — busca com 20 mil**
- **RD-0030 (média):** o índice reescreve critérios do ranking. A tolerância e o "só exato" estão em `indice-busca.ts:76-80` e em `ranking.ts:219-224`. O código exato, em `indice-busca.ts:156-162` e em `ranking.ts:413-416`. Os filtros de marca, linha, ativo, campanha e árvore, em `indice-busca.ts:128` e `:146-149`, e em `ranking.ts:421-422` e `vitrine.ts:176`. Proposta: exportar `toleranciaDaPalavra`, `soCasaExato`, `casaComCodigo` e `casaComFiltros` do ranking e `entraNaVitrine` da vitrine, e o índice chama essas funções. Assim, se o ranking mudar, o "superconjunto exato" acompanha sozinho.
- **RD-0031 (baixa):** o documento do ranking é montado 2 vezes: `busca-consulta.ts:35-49` ≡ `vitrine.ts:99-117` (`docDeBusca`), jscpd com 11 linhas. Proposta: `docDeBusca(p, null)` com estoque 0 e preço nulo.

## Pronto quando
Pronto quando os 4 RD forem entregues com os testes do domain verdes (o invariante do índice continua passando) e o jscpd sem o par do RD-0031. Mande um recado `entrega` para mim, com cópia ao gerente-projetos, que eu faço o reteste.
