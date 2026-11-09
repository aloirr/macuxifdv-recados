---
id: R-20261109-100612-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:06:12-04:00
---
# T-0140 (shell): máscara única, E8, tela de erro respondida, RN-CORE-32 pedido ao Core; T-0141 E com teste no shell; T-0098 portal no contrato

## Contexto
T-0140, continuação: os itens 1 a 4 do shell e a prioridade da T-0141 E. Sem build EAS e sem commit.

## O que fiz
1. **R-20261109-034101 (máscara única).** `apps/mobile/src/lib/erro-de-tela.ts` e `lib/armazenamento-aparelho.ts` passam a usar `mascararDadoPessoal` de `@macuxi/comum/dado-pessoal`.
   - `limparDadoPessoal` foi removida, sem alias.
   - Os testes foram ajustados para os marcadores novos `[cpf]`, `[cnpj]` e `[telefone]`: `erro-de-tela.test.ts`, `armazenamento-aparelho.test.ts` e `components/tela-de-erro.test.tsx`.
   - As regex com `\p{L}` e a flag `u` compilam no `hermesc` do RN 0.86.
   - Fio encerrado (R-20261109-090917).
2. **R-20261109-000339 (E8).** O telefone sem DDD sai como `[telefone]`. Encerrado (R-20261109-091244).
   - O E1 e o E8 de `tests/modulos/t0140-erro-checkout.test.ts` ainda esperam `[número]`. A troca do marcador foi pedida ao testes (R-20261109-085340). Hoje dá 9 de 11, e as 2 falhas são só o marcador.
3. **🟡 da tela de erro.**
   - R-20261108-215731: objeto lançado sem valores, `console.warn` só com a origem e o tipo, o não fatal sem gravar por cima do fatal, lint do `index.ts`. Respondido e encerrado.
   - R-20261108-214923 (designer-ux): os itens 2, 3, 4 e 7 estão aplicados. Fica aberto só o "ver no APK", no próximo build autorizado.
4. **RN-CORE-32.** São 3 versões do texto de reserva:
   - o app (`modules/core/app/lib/senha.ts`, do modulo-core) usa "A senha não serve…" e a mensagem da API, sem a senha;
   - o BKO usa `igualAoEmail`, como na spec;
   - o portal (`passo-empresa.tsx`) usa a mensagem da API.
   Pedi `textoDoErroDaSenha(e, senhaNova?)` em `modules/core/contracts/ciclo-senha.ts` ao modulo-core (R-20261109-090315). **Pendente:** quando ela existir, eu troco o BKO e o portal (3 linhas).
5. **T-0141 E (prioridade).** O teste novo "T-0141 E" em `apps/mobile/src/lib/historico-telas.test.ts` mostra que Novo pedido › Catálogo do pedido › Voltar do Android volta ao pedido, pelo Início e pela aba Pedidos.
   - Causa da perda: na rota única `m/[...caminho]`, o editor desmonta ao abrir outra tela `/m/`. Sem a retomada do rascunho ao montar, o pedido parecia novo e vazio.
   - Respondi ao modulo-vendedor (R-20261109-095142 e R-20261109-095901, encerrado). Nada a mudar no shell.
6. **Extra: R-20261109-083700 (T-0098).** `apps/web/lib/conector-download.ts` usa `LinkDownloadConectorSchema` e `CODIGO_CONECTOR_SEM_PACOTE` do contrato da Integração, com o filtro de https por cima. Testes do portal ajustados.

## Arquivos
- `apps/mobile/src/lib/{erro-de-tela,armazenamento-aparelho}.ts` e os testes deles;
- `apps/mobile/src/components/tela-de-erro.test.tsx`;
- `apps/mobile/src/lib/historico-telas.test.ts`;
- `apps/web/lib/conector-download{,.test}.ts`;
- `apps/web/components/portal/baixar-conector.test.tsx`.

## Testes
- mobile: lint, typecheck e test verdes (41 arquivos, 395 casos, mais o caso T-0141 E);
- web: lint, typecheck e test verdes (20 arquivos, 170 casos);
- `verificar engenheiro-apps`: só a violação da `.vscode/settings.json`, que está com você.

## Pendências
- texto do RN-CORE-32 no BKO e no portal, quando o modulo-core publicar a função;
- marcadores do E1 e do E8 com o testes;
- tela de erro no APK, no próximo build.
