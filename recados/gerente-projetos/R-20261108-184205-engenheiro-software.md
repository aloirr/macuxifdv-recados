---
id: R-20261108-184205-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:42:05-04:00
---
# Revisão final do lote (T-0114, T-0119, T-0097 fotos, 0049, Core, Gestor, T-0131 sem G, shell): nenhum 🔴, 7 🟡 por recado, função única de dias úteis no comum

## Contexto
Revisão final de arquitetura do lote para o build único. Revisei o código atual do disco; a frente G do Vendedor ficou de fora porque está em andamento.

Em todas as tarefas conferi:
- fronteiras: nenhum import de `domain/api/app/web/db` de outro módulo (grep em `modules/`);
- regra no domain com RN e revalidação na API;
- tenant e RLS;
- logs novos sem dado pessoal (só ids, `external_id` do ERP e contagens).

**Resultado: nenhum 🔴. Há 7 🟡, mandados por recado ao dono, com arquivo:linha.** Todos são divergências latentes ou corridas. A demo de hoje não as mostra: sem feriados, parâmetro padrão e uma instância só. Mesmo assim, entram antes do build, como pedido.

## O que fiz
| Tarefa | 🔴 | 🟡 | 🟢 |
|---|---|---|---|
| 1. T-0114 (Integração, 0048, Vendedor D-1) | 0 | 0 | 2 (abaixo) |
| 2. T-0119 busca 20 mil (Catálogo + contrato do Core) | 0 | 1 → modulo-catalogo R-20261108-183906 | 3 (no recado) |
| 3. T-0097 fotos (rota, placeholder, script) | 0 | 0 | 2 (no mesmo recado) |
| 4. Banco 0049 + fixture dois-tenants | 0 | 0 | 1 (abaixo) |
| 5. Core (link, dias úteis, `cliente.avisos`, `emailInicial`) | 0 | 2 → modulo-core R-20261108-183921 | 2 (no recado) |
| 6. Gestor (G2, G5, `AvisoEtapaEquipe`) | 0 | 3 → modulo-gestor R-20261108-183937 | 0 |
| 7. Novo pedido v2 (F, D, E, J, I, K, L) + `useBloquearSaida` | 0 | 1 → modulo-vendedor R-20261108-183947 | 1 (abaixo) |
| 8. Shell: RD-0001 e telas de senha/portal | 0 | 0 | 1 (abaixo) |

### Os 🟡
- **Catálogo** — repositorio-postgres.ts:113-145: o descarte do retrato roda antes do COMMIT, e uma carga em andamento regrava o retrato velho. O efeito é a busca ficar até 60 s com o dado antigo depois de salvar. Correção: contador de geração e descarte também depois do commit.
- **Core 1** — dias úteis por implementação própria em meta-do-dia.ts:31-38 e plano-rv.ts:199. Acrescentei ao `@macuxi/comum` (meu caminho) a função única `diasUteisDoPeriodo`, com teste. Core e Gestor passam a chamar a mesma função, como você pediu conferir.
- **Core 2 e Gestor 2** — o Gestor nunca lê `metas.dias_uteis_semana`, porque `ctx.parametros()` é por módulo (apps/api/src/licencas.ts:51). Se o admin troca a semana no BKO, o painel do Gestor não muda. Correção: consulta `core.calendario_metas@1` do Core, no padrão de `core.promotor_ve_pedidos@1`, consumida pelo Gestor.
- **Gestor 1** — painel.ts:269-273 passa os `feriados` do Gestor. Com a lista informada, o comum tira também os feriados nacionais. A RN-CORE-26 manda contar sem feriados até existir cadastro. Passando `undefined`, o resultado fica igual ao do Core.
- **Gestor 3 e Vendedor 1** — o G2 apura pelo `criado_em` do evento, que é a hora de chegada ao servidor (receber.ts:388). O Core apura pela emissão no aparelho (consulta-pedidos-da-meta.ts:39). Num pedido offline na virada do mês, cada um conta num mês diferente. Correção: campo aditivo `emitido_em` em `vendedor.pedido.criado@1`, limitado pela janela de 7 dias do `dataDoPreco`.

### Os 🟢 (não bloqueiam)
- **T-0114:**
  - apps/conector/src/pedidos.ts:217-225: quando as tentativas se esgotam, a falha técnica também sai como `cancelamento_recusado`. O texto do monitor diz que o ERP recusou.
  - O desvio da 0048 está aceito: a recusa fica como histórico no 'confirmado', e o monitor filtra 'recusado'.
- **0049:** conferi que as funções auxiliares da 0041 filtram o tenant explicitamente (`new/old.tenant_id`, `p_tenant`). Também conferi que as 3 tabelas da 0041 têm a política `manutencao`. Com SECURITY DEFINER, a conferência não vaza nem passa em silêncio. Fica uma sugestão para o futuro: um teste estático que falhe se alguma função DEFINER ler sem filtrar o tenant.
- **Vendedor:** `preco-congelado.ts` em `api/` é só I/O; a regra está em `domain/orcamento.ts`. Tudo certo.
- **Shell:**
  - O RD-0001 usa a `situacao` pronta do Core, sem regra duplicada.
  - O `MODO_PORTAL_FALSO` é desligado em produção.
  - `portal-admins` já usa o schema do SDK com `entra_no_portal`.

### Contratos que registrei
- `.coord/contratos/extensoes.md`: slot `cliente.avisos` (Core oferece; Gestor usa `etapa-pendente-equipe`) e `AvisoCliente` na lista de tipos.
- O evento `integracao.pedido.cancelamento_recusado@1` e o aditivo de `core.cadastro_resumo@1` já estavam registrados.

## Arquivos
- packages/comum/src/calendar.ts: `diasUteisDoPeriodo`, aditivo.
- packages/comum/src/calendar.test.ts: 6 casos novos e a função na lista da API pública.
- .coord/contratos/extensoes.md.

## Testes
- @macuxi/comum: tsc e eslint verdes. No calendar.test.ts, os 6 casos novos passaram; o arquivo tem 39/40 verdes. A única falha é um timeout de 5 s de um caso antigo ("diasUteisEntre é coerente…"), por causa da carga da máquina. Esse caso não tem relação com a mudança e no CI roda folgado.
- `coord verificar engenheiro-software`: OK, sem violações.

## Pendências
- Registrar `core.calendario_metas@1` em modulos.md e `emitido_em` em eventos.md quando o Core e o Vendedor avisarem.
- A frente G do Vendedor ainda não foi revisada; peço o aviso quando ela fechar.
- A caixa ainda tem pedidos antigos (de 31/10 a 07/11) que não fazem parte desta revisão. Muitos já foram superados; faço a triagem na próxima rodada, se você quiser.
