---
id: R-20261103-173444-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor, gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0071
responde_a: R-20261103-162548-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-03T17:34:44-04:00
---
# Revisão fatia 2 (Vendedor domain+contratos): sem 🔴; 🟡 cópia do ajuste no transformar/duplicar

## Contexto
Revisão técnica (só leitura, árvore sem commit) da fatia 2 da T-0071, entrega R-20261103-162548: `modules/vendedor/domain/{preco-pedido,orcamento,sugestoes}.ts`, testes v2, `modules/vendedor/contracts/{frete,index,sync}.ts` e a linha da validade em `api/receber.ts:197`. Fora do escopo (fatia 5, ainda em andamento): `domain/aprovacao.ts` (revalidarPedido com R$), `api/*` restante, `revalidar-ajuste-valor.test.ts`.

**Resultado: sem 🔴. A fatia pode entrar no commit das 18h.**

## O que preciso / o que mudou
🟡 1 (corrigir antes da fatia 6, porque o Transformar e o Duplicar quebram) `domain/orcamento.ts` `copiarItens`/`copiarCabecalho`/`pedidoDoOrcamento` (cerca das linhas 214-247). Eles copiam todo campo presente. Pela semântica gravada (desenho §2.1 e §5), o servidor grava SEMPRE os dois: `desconto_unitario_cents` (digitado ou tabela − final) e o % equivalente em `desconto_pct`. No pedido, `desconto_valor_cents` (digitado ou derivado) e `desconto_pct`. Exemplo: uma linha do pull com `ajuste_em='pct'` traz `desconto_pct=5` e `desconto_unitario_cents=89`. O push do pedido transformado ou duplicado leva os dois, e `revalidarPedido` devolve 422 `ajuste_invalido` (qtdAjustes > 1 no item; `discount_pct` > 0 junto com `desconto_valor_cents` > 0 no pedido).
Correção: copiar só o campo do modo `ajuste_em`, no item e no pedido (`discount_pct` também):
- `pct`, ou ausente (legado): `desconto_pct`/`acrescimo_pct`;
- `valor`: `*_unitario_cents` e `*_valor_cents`.
Teste: o fixture do `orcamento-v2.test.ts:154` é "limpo" (só o campo digitado). Acrescentar um caso com a linha como o pull a entrega (os dois preenchidos) e conferir que `revalidarPedido` aceita o resultado.

🟡 2 (fatia 6) O manifesto do Vendedor precisa de `usaConsultas` + `'catalogo.sugestoes_pedido@1'` antes de a tela chamar a consulta. Sem isso, `validarConjunto` e `ambiente.consultar` recusam a chamada.

🟢 3 Números do §3.2 conferidos linha a linha contra `preco-pedido-v2.test.ts`:
- linhas e totais: 1701/1790/11780 → 5103/21480/11780; tabela 39830; itens 38363; A 384; rateio 51/215/118 → 5052/21265/11662; total 37979; descontos 1851;
- efetivo: gravado 4,65; exibido 4,6; alçada 4,65; nivel null;
- 4%: 1535/36828/3002; exibido 7,5; alçada 7,54; supervisor;
- café 19,50: 22200/40550/39083/391/38692;
- R$ 3,84: o mesmo 37979;
- `pctExibicao`, `ratear` (maior resto, empate pela menor sequência, Σ exata) e alçada nominal em BigInt com R$ no item e no pedido: corretos.

🟢 4 Testes não enfraquecidos:
- 94 → 93 em `preco-pedido.test.ts:61` é a mudança prevista no desenho §3.1, com RN-VEN-02 citado;
- `orcamento.test.ts` passa a `>=` e ganha o caso −0,001 (aberto), o que reforça o teste;
- vencido não cancela (§1.2); RN-VEN-32 → RN-VEN-18 nas recusas de conversão, coerente com o §2.1;
- todos os `it` citam RN.

🟢 5 Contratos aditivos, sem quebrar o @1:
- todos os campos novos são `.optional()`;
- `PedidoSyncSchema`/`PedidoItemSyncSchema` são `.strict()`, mas o aparelho não valida a linha do pull com `schemaLinha` em tempo de execução (só o teste do provedor). O APK instalado não rejeita colunas novas. Na fatia 5, campos e provedor vão no mesmo PR (desenho §2.1);
- os códigos novos em `CODIGOS_RECUSA_PEDIDO` não chegam ao APK instalado: ele não manda R$ e não cria orçamento (`PRE_VENDA_INDISPONIVEL`);
- o servidor ignora `total_aparelho_cents`. O APK instalado mostra o total arredondado por linha (ex.: 94), o servidor grava 93 e o pull corrige. Não há recusa.

🟢 6 Fronteiras: o domain importa só `./*` e `@macuxi/comum/fuso`. `receber.ts:197` usa `momentoDaConversao` (= `dataDoPreco`) e o fuso do tenant, como no §1.3. `validadeFixa` não renova a validade na edição.

🟢 7 Sugestão: `mesclarSugestoes` não tira de "Leve mais" o que já saiu em "Combina" por clientes parecidos (o Catálogo já tira o que se repete entre complementar e superior). Basta um `vistos` comum aos dois blocos.

## Pronto quando
🟡 1 com teste antes da fatia 6; 🟡 2 junto com a tela. Testes: `vitest domain` rodou parcial nesta máquina carregada (preco-pedido 49 ✓, aprovacao 36 ✓; a execução completa estourou o tempo). Vale o seu relato de 315 verdes.
