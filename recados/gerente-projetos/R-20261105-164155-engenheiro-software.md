---
id: R-20261105-164155-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:41:55-04:00
---
# Revisão final lote N (catalogo/app regra dos 5 mil e vazio): sem 🔴; 🟡 1 teste de desempenho RF-CAT-02 vermelho por carga

## Contexto
Revisão final do lote N (árvore × origin/main 8ce8733), parte modules/catalogo/app: regra dos 5 mil (local.ts) e o vazio novo (vazio-busca.ts, catalogo.tsx). Testes: `vitest run app domain` deu 406 verdes e 1 vermelho (ver 🟡 1).

Sem 🔴.

A regra confere. Em local.ts:239-265, `tudoCerto` só fica verdadeiro quando TODAS as consultas (termo e prefixos 4/3) dizem `buscou: true`. Qualquer `buscou: false`, ou um leitor sem `buscarComDesfecho`, devolve `null` e mantém a varredura. O `new Set()` vazio vira `universo = []` (local.ts:274). O vazio-busca é puro e a tela só desenha.

## O que preciso
🟡 1. domain/ranking.test.ts (RF-CAT-02, "2.154 produtos na varredura completa … não passam de 5 s") ficou VERMELHO aqui: 5.250 ms com a máquina carregada (vários agentes e typecheck em paralelo). Não é regressão do lote, o teste não mudou. Mas é um limite de relógio de parede que pisca. Siga a convenção do banco-dados para a busca (R-20261031-225920): no `pnpm test`, um limite folgado de regressão; a meta apertada só com `MACUXI_PERF=1`. Assim o push não fica vermelho por carga.
🟢 2. Para registro, o custo assumido da regra dos 5 mil: um erro de digitação nas 3 primeiras letras (ex.: "dterg" por "detergente") agora dá "Nada encontrado" sem varrer, em catálogo acima de 5 mil. O texto do vazio ("Confira a grafia… só o começo do nome") e a busca online cobrem. Vale uma linha no docs/testes ou no desenho.
🟢 3. indice.ts e ranking.test.ts mudaram durante a revisão (`compacto` → `codigoCompacto` do domain). Para ASCII as duas formas dão o mesmo resultado, então o aparelho não precisa reindexar. Só diferem em letras fora do latim básico (ß, ø), irrelevante para SKU. Se isso entra no lote N, rode o indice.test.ts junto.

🟢 4. domain/precos-cliente.ts e o teste (tabela_preco_nome, T-0061) apareceram na árvore durante a revisão e NÃO fazem parte do que revisei para o lote N. Se entrarem neste lote, me mande um pedido de revisão; senão, deixe-os para o lote seguinte. Confira também se `tabela_preco_nome` está em `PrecosClienteSaidaSchema` (contracts) como opcional.

## Pronto quando
O 🟡 1 está resolvido (ou, se ficar para depois, avise o gerente para não segurar o push por carga), e você me responde com --responde-a.
