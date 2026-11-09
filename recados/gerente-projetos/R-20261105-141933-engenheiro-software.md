---
id: R-20261105-141933-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:19:33-04:00
---
# T-0052-B4/T-0008: linhasPorCampo, contarLinhas e versaoLinhas no motor (SQLite e memória, 31 testes); tela de medição não muda

## Contexto
T-0052-B4 e T-0008. Cumpre a decisão sobre a proposta R-20261105-132933: três leituras novas no motor de sync. São aditivas, não criam cache de linhas e funcionam no SQLite e no adaptador em memória.

## O que mudou
- `packages/platform-sdk/src/motor-sync.ts`:
  - `motor.linhasPorCampo(e, campo, valores[])`: aceita texto ou número, compara o tipo de forma estrita, ignora repetidos, null e NaN, e recusa campo fora de `[a-z][a-z0-9_]*`;
  - `motor.contarLinhas(e)`;
  - `motor.versaoLinhas(e)`: número opaco. A versão é invalidada depois da gravação e da transação, também em caso de falha: na página do pull, no fim da ressincronização, em RN-CORE-02, na troca de geração (ADR 0021) e em RN-CORE-15. O relógio é do processo, então dois motores nunca repetem número;
  - `LinhasSync.porCampo` opcional, com filtro em JS quando o adaptador não tem;
  - `comLinhasEmChaveJson` implementa `porCampo`;
  - auxiliares exportados `validarCampoLinha` e `valoresDeCampo`, e o tipo `ValorCampoLinha`.
- `packages/platform-sdk/src/sqlite/armazenamento.ts`: `porCampo` numa consulta só (`json_extract(dados,'$.<campo>') IN (SELECT value FROM json_each(?))`), sem limite de parâmetros.
- `packages/platform-sdk/src/motor-sync.leituras.test.ts`: 31 casos novos. Os três adaptadores (chave→JSON, linhas sobre chave→JSON, SQLite) rodam os mesmos casos. Só no SQLite: plano `SEARCH ... USING INDEX`, 1.200 valores numa consulta só e validação direta no adaptador.
- Contrato: `.coord/contratos/modulos.md`, seção "Leituras do motor de sync no aparelho". ADR: adendo de 2026-11-05 na `docs/decisoes/0003-*.md`. Não houve decisão nova, então não abri ADR nova.
- Recado ao modulo-catalogo (R-20261105-141459) com o modo de usar em `app/lib/local.ts`:
  - limiar por `contarLinhas`;
  - produtos, vocabulário, sinônimos e depósitos memorizados por `versaoLinhas`;
  - estoque, preço e vínculo do cliente por `linhasPorCampo` só dos candidatos.
  O recado também lista os índices de expressão v2 que ele precisa pedir ao banco-dados: estoque_saldo, tabela_preco_item, cliente_tabela_preco e produto_conteudo.

## Ganho medido
node:sqlite, 400 candidatos, PC carregado:
- estoque com 40 mil linhas: de 930 ms com `linhas` para 31 ms com `porCampo` e índice;
- preço com 20 mil linhas: de 360 ms para 15 ms;
- `porIds` de 400 produtos: 23 ms;
- `contar`: 0,1 ms.
Sem o índice, a varredura custa quase o mesmo que `linhas`. Por isso os índices são parte da entrega do Catálogo. No aparelho, os ~250 ms que sobravam devem cair para 15 a 30 ms por busca.

## Tela de medição da T-0008
Não precisa mudar. Ela mede o que a T-0008 promete: carga de 20 mil SKUs sem travar e busca FTS5 com leitura dos 50 primeiros abaixo de 300 ms. Usa só `linhas.aplicar`, `contar`, `porIds` e `busca`, que não mudaram. O mobile ficou verde com a mudança: typecheck, lint e 225 testes.
Sugestão para depois (fora do critério, dono engenheiro-apps): quando o Catálogo adotar as funções e os índices v2 entrarem, uma fase opcional "estoque e preço dos candidatos". Ela carregaria estoque_saldo e tabela_preco_item sintéticos e mediria `porCampo` dos 50 primeiros, o que mostraria no aparelho o caminho real da busca do Catálogo. Antes dos índices ela mediria a varredura.

## Testes
- platform-sdk: 465 testes verdes (36 arquivos), lint e typecheck verdes.
- apps/mobile: typecheck verde, lint verde, 225 testes verdes.
- `node scripts/coord.mjs verificar engenheiro-software`: sem violação.

## Pendências
- modulo-catalogo: adotar em `local.ts`.
- banco-dados: migração v2 do aparelho do Catálogo com os índices.
- Durante a rodada, o typecheck do mobile ficou vermelho por alguns minutos com `modules/catalogo/contracts/rotas.ts:91`: regex com quebra de linha literal, edição em andamento do modulo-catalogo. Na nova tentativa passou. Se voltar, é dele.

## Pronto quando
Para o gerente: registrar no quadro. O B4 do SDK está concluído; o B4 do Catálogo fica com o modulo-catalogo.
