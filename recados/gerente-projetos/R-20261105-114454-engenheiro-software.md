---
id: R-20261105-114454-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T11:44:54-04:00
---
# Revisão final do lote J (Core): sem 🔴 nem 🟡; 3 🟢 (comentário do parâmetro, teste da mesma RV, consulta de licença repetida)

## Contexto
Revisão final do delta do lote J depois da R-20261105-101415, com `git diff origin/main` (fb1ef19) na árvore de 05/11, por volta das 11h40. Rodei aqui 69 testes verdes: fonte-licenca-tenant, plano-rv, inicio, farol e consultas-bloqueado.

Resultado: **sem 🔴 e sem 🟡.**
- O R1 está fechado. `fontePorConsulta` (metas.ts:107) passa `{ licenca: 'tenant' }`, e os 4 usos são GET: metas/painel, indicadores, inicio e rv. Isso segue a ADR 0025, item 4.
- O Início (inicio.ts:104, :189) e o Farol (farol.ts:110, :188) decidem a fonte por `plataforma.tenant_modulo`, com `ativo` e `deleted_at is null`. É o mesmo critério do `lerTenant` da API. Com o Vendedor no tenant, nunca usam as notas, mesmo com a consulta nula (RN-CORE-27).
- O PUT do plano-rv com id de outro tenant usa `on conflict (id) do nothing` e responde 404 PLANO_RV_NAO_ENCONTRADO sem auditar. O DO NOTHING não passa pela RLS da linha que conflita, então não há vazamento.
- `core.cadastro_resumo@1` ficou aditivo. Os 2 campos são opcionais, o emissor antigo continua válido e o teste cobre isso. Os campos vêm só do schema core. Atualizei o registro em `.coord/contratos/modulos.md`.

## O que preciso / o que mudou
Nenhum dos itens abaixo bloqueia.
- 🟢 C1 `modules/core/contracts/consultas.ts:51`: o comentário fala do "parâmetro produto.desconto_maximo_pct do tenant", mas a chave real é `core.desconto_maximo_produto_pct` (`api/produtos.ts:26`). Ajuste o texto.
- 🟢 C2 `modules/core/api/plano-rv.test.ts:257`: o `consultar` falso responde com ou sem a opção. Por isso o `toEqual` entre admin e analista passa sempre, e quem prova o caso é só a checagem das opções (linha 276). Se quiser, use o mesmo tx do `fonte-licenca-tenant.test.ts`, que lança `ConsultaIndisponivel` sem `{ licenca: 'tenant' }`. Assim o teste falha se a RV deixar de passar a opção.
- 🟢 C3 `inicio.ts:189` e `farol.ts:188`: a mesma consulta de `tenant_modulo` está repetida. Um helper do Core (`licencaDoTenant(db, ['integracao','vendedor'])`) evita que as duas divirjam.

## Pronto quando
Os itens são opcionais e podem ficar para a próxima rodada. O lote J está liberado pela parte do Core.
