---
id: R-20261104-214113-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T21:41:13-04:00
---
# Revisão final do lote: lote 1 sem 🔴, lote 2 sem 🔴 (2 🟡 do D2 ao modulo-core)

## Contexto
Revisão final feita só por leitura dos commits na worktree C:\macuxifdv-pr (verificacao/T-0071-T-0077-lote). Não rodei nenhuma suíte, porque os CIs de 44b5682 e 93f9afd estão rodando. Conferi: fronteiras, contrato só aditivo, RN no domain com teste, tenant/carteira/RLS nas consultas novas, idempotência, dado pessoal em log e timer < 15 min.

## Veredito
**Lote 1 (origin/main..44b5682; T-0071, T-0063, T-0073): sem 🔴.** Pode ir ao main.
- **Card Pedidos para aprovar do Gestor:** lê só o cache do aparelho (`fila.resumo.para_mim`) e não tem timer. O cartão só aparece com `acao: fila_aprovacao.ver` e `apps: ['gestao']`. A regra do parado (`statusAgora`) está no domain, com teste citando RN-CORE-26. Os campos novos em `PainelDia`, `VisaoEquipe` e `ParametrosGestor` são opcionais ou têm default.
- **Pull de `deposito`/`estoque_saldo`:** escopo tenant, dentro do `comTenant` (RLS), com cursor `(updated_at, id)` e removidos. O promotor sem `promotor_ve_preco_estoque` recebe vazio (RN-CAT-05). As entidades já existiam no contrato.
- **PUT do orçamento (RN-VEN-33):**
  - O hash usa a mesma base do push (`conteudoDoEnvio`, sem `atualizado_em`) e é comparado com o `hash_envio` da última alteração gravada.
  - Um PUT diferente com `atualizado_em` antigo recebe 409.
  - O PUT idêntico ao último recebe 200 sem escrita nem auditoria.
  - A auditoria agora registra o `antes` real.
  - O O5a/b/c cobre os três casos.
- **POST de medida (RN-CORE-19):** a corrida com o mesmo id devolve a medida. Sigla igual com outro id continua 422.
- **Telas do Vendedor (O-3):** `somenteLeitura ? null : (...)` envolve todas as ações do detalhe. Nenhum log, timer ou import fora da fronteira.

🟢 do lote 1, para o backlog:
- (a) Trocar `promotor_ve_preco_estoque` tem o mesmo buraco de cursor do D2. O aparelho do promotor não recebe de novo o preço e o estoque ao religar, nem os remove ao desligar. O problema já existia no preço (T-0029).
- (b) No push, um orçamento atrasado depois de um PUT recebe a mensagem de conflito "Este pedido... Duplique-o", que fala em pedido, não em orçamento.

**Lote 2 (D1, D2, C1, V1 e 93f9afd): sem 🔴.** Pode ir ao main.
- **D1:** `ultimaMudancaDeStatus` é pura, está no domain e tem teste. `Order.status_changed_at` é `nullable().optional()`, portanto aditivo.
- **V1:** o card e a lista usam a mesma `orcamentoEmAberto` (RN-VEN-18).
- **C1:** `tolerante()` troca `.strict()` por `.strip()` de forma recursiva e preserva refinements. Cobre todos os construtores usados por `InicioSchema` e `SessaoRespostaSchema`.
- **D2:** o `GET /v1/core/clientes/:id` está correto: devolve histórico vazio e resumo zerado, dentro do `comTenant`.
- **Teste 93f9afd:** só troca o mês do fixture.

🟡 do lote 2, enviados ao modulo-core em R-20261104-214043:
- **D2-a:** desligar `promotor_ve_pedidos` não toca o `updated_at`. Um aparelho com o cursor adiantado mantém o histórico já baixado até um pull completo. O teste usa `desde: null` e não pega o caso.
- **D2-b:** a linha "removida" do pull ainda leva `valor_cents`, `pedidos`, `itens` e `ultima_compra_em` pela rede. O motor apaga ao gravar.

Nenhum dos dois bloqueia. Recomendo que entrem antes do APK do promotor. A UI do app já esconde o histórico conforme a opção.

🟢 do lote 2:
- `tolerante()` perde o `min`/`max` de array e não trata `discriminatedUnion`/`intersection`. Hoje não são usados; vale documentar no arquivo.
- `vendedor/contracts` reexporta cerca de 19 funções de `domain/busca-periodo` sem consumidor fora do módulo; dá para enxugar.
- Religar a opção faz todos os perfis do tenant baixarem o histórico de novo. Aceitável, porque a troca é rara.

## Pronto quando
Push do lote com os CIs verdes. Os 🟡 D2-a e D2-b ficam com o modulo-core para a próxima rodada; os 🟢 vão para o backlog.
