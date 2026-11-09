---
id: R-20261101-155028-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:50:28-04:00
---
# Revisão PR #24 (T-0027) e PR #25 (T-0031): 🟢 sem 🔴; 3 🟡 (external_id 200 nos erros do Hub, corpo do 409 de topologia, inativadas na auditoria) e 1 decisão

## Contexto
Revisão do engenheiro-software (T-0032, critério "revisão do PR #24 sem 🔴") dos dois PRs da nuvem já no main: **PR #24 / T-0027 (fa837c4)** e **PR #25 / T-0031 (697ab42)**. Li contracts e domain inteiros nos trechos tocados e o cliente do Conector (cliente.ts, remetente.ts). Desenho das rotas que vão ligar isso: docs/desenho/T-0032.md e ADR 0013 (proposta).

## Veredito
- **PR #24 (T-0027): 🟢 aprovado, sem 🔴.** 1 🟡.
- **PR #25 (T-0031): 🟢 aprovado, sem 🔴.** 2 🟡 e 1 ponto para decisão.

### PR #24 — T-0027
- 🟢 `domain/sessao.ts` `calcularInativacao` + `invalidosNaSessao` e `idsDaSessaoNoLote`: o 🔴 do D-1 está fechado (inválido nunca inativado, inclusive após confirmação); boa a deduplicação por `indice` dos erros do Hub.
- 🟢 `domain/envelope.ts` + `topologia.ts` `erroEntidadeDeOutroConector` (422, P-6) e `contracts/base.ts` `EXTERNAL_ID_MAX = 200` (subir o máximo é compatível com v1).
- 🟢 Conector `hub/cliente.ts`: 426 → `ErroHubVersao` antes do ramo 429/5xx, lendo `detalhes.versao_minima` — é exatamente o corpo que o pipeline da ADR 0013 vai devolver; `?limite_erros=5500` no `consultarLote`.
- 🟡 **1 — external_id acima de 200 nos erros do Hub**: `contracts/lote.ts:151` `LinhaErro.external_id` é `z.string().nullable()` sem `max`, e `domain/sessao.ts:143` (`limpa`) aceita qualquer tamanho. Um registro com `external_id` de 250 caracteres (carga por arquivo, outro cliente HTTP) gera `LinhaErro` com o id inteiro: a coluna `lote_linha_erro.external_id` e `sessao_carga_recebido.external_id` terão check de 200 (pedido ao banco-dados) e o bloco da aplicação cairia. Ajuste: id acima de `EXTERNAL_ID_MAX` vira `null` no `LinhaErro` (ou `.max(EXTERNAL_ID_MAX)` + o domain anula) e conta como `semIdentificacao` em `idsDaSessaoNoLote` — o mesmo que a premissa aprovada da T-0027 para o Conector (sem id = a sessão não inativa). Teste citando RN-INT-06.

### PR #25 — T-0031
- 🟢 `domain/permissoes.ts` + teste de igualdade com o manifesto; `decidirPendencia` confere o perfil antes do estado e recebe o autor de fora (a rota passa o da sessão); auditoria sem dado pessoal.
- 🟢 `aplicarRetornoPedido` (P-4): status vale, só válidos acumulam e vão no evento, `erros_monitor` completo para `pedido_retorno_erro`; mensagens com a ação seguinte. `montarAlertasMonitor` com `retornosComItensDescartados24h` ok.
- 🟡 **2 — corpo do 409 de topologia**: `contracts/bko.ts:57-72` `RecusaTopologiaConector` põe `conflitos` e `entidades_livres` no topo, mas a rota do BKO é rota de usuário e o corpo de erro é `ErroApi { codigo, mensagem, detalhes? }` (ADR 0008; `corpoDoErroModulo`). Mude para `{ codigo: 'topologia_conflitante', mensagem, detalhes: { conflitos, entidades_livres } }` (o contrato só tem o BKO como consumidor e a tela ainda não existe; sem quebra). A rota vai lançar `new ErroHttpModulo(409, 'topologia_conflitante', r.mensagem, { conflitos: r.conflitos, entidades_livres: r.entidades_livres })`. Ajuste o teste de `bko.test.ts`.
- 🟡 **3 — auditoria sem o efetivamente inativado**: `contracts/bko.ts:235-251` `AuditoriaInativacao.quantidade` é o que a pendência previa; ao confirmar, a reavaliação com os ativos de agora pode inativar menos. Acrescente `inativadas: z.number().int().nonnegative().nullish()` (opcional; nulo na recusa) — a API preenche depois da reavaliação na mesma transação; pedi a coluna `inativacao_auditoria.inativadas` ao banco-dados.
- ❓ **4 — decisão (não bloqueia)**: `contracts/pedido.ts:100-105` recusa o retorno inteiro (400, definitivo para o Conector) quando `itens_faturados` repete uma sequência. Com a P-4 ("item inválido não recusa o retorno"), o status desse retorno nunca seria aplicado. Sugiro tratar a repetição como descarte no domain (`codigo` novo `sequencia_repetida`, valor novo de enum = compatível) e tirar o superRefine. Pergunte ao gerente/Alexandre antes; se ficar como está, registre no hub-api §11.3.

## O que preciso
🟡 1, 2 e 3 numa tarefa local sua (ou junto da parte de handlers da T-0032), antes das rotas A5/A9; o 4 depois da decisão.

## Pronto quando
Os ajustes estiverem no main com testes do módulo verdes e você me responder neste fio (eu encerro).
