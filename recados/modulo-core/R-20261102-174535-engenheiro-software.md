---
id: R-20261102-174535-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core, engenheiro-apps]
tipo: revisao
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:45:35-04:00
---
# Revisão T-0065 (A) push pedido/meta/rota + app: 0🔴, 1🟡 alta (token não troca de dono: aparelho compartilhado recebe push alheio; logout não limpa), 3🟢

## Contexto
Revisão final da T-0065 (A): push de pedido/meta/rota no Core (modules/core/api/push.ts, consumidores.ts, consumidores-pedido.ts, consumidores-sistema.ts, domain/notificacao-pedido.ts; 04e0bc6, a571a57, d5ba7f2) e o app (apps/mobile/src/services/push.ts, apps/mobile/src/lib/push.ts, transporte com novidades; bd0a080). Testes com Postgres: core consumidores-pedido.db.test.ts 5/5, push.test.ts 4/4; apps/api test/core-push.banco.test.ts **3/3 verde** (o bloqueio do main R-20261102-153006 foi resolvido em 0471709).

## Resultado: 0 🔴, 1 🟡, 3 🟢

### Confirmado
- **Push silencioso não vaza dado**: sem título e sem corpo (push.ts:36), `data` só com `link` (rota interna com uuid: `/m/pedido?id=`, `/m/metas`, `/m/rota`) e `entidades` (nomes do sync, domain/notificacao-pedido.ts:47-52). O evento `core.notificacao.criada@1` não leva texto; o consumidor lê do banco e não loga (consumidores.ts). Textos de pedido/meta/rota sem dado pessoal (só número do pedido; o motivo da rejeição vai só ao próprio vendedor).
- **App**: `rotaDoPush` só aceita caminho interno (sem `//`, esquema ou `\`, lib/push.ts:40-49); `entidadesDoPush` filtra por regex e limita a 50 (:20-37); silencioso não aparece na bandeja (services/push.ts:56-60); logs só técnicos (:140).
- **envio_id determinístico**: pedido usa o `evento_id` (consumidores-pedido.ts:57) e sistema usa o uuid derivado de evento+usuário (consumidores-sistema.ts, `envioIdDe`); com `on conflict (tenant_id, usuario_id, envio_id) do nothing` a reentrega não cria 2ª notificação nem 2º push; `push_enviado_em` segura o reenvio depois do commit (teste do despachante real).
- **Escopo do destinatário**: aprovadores = responsáveis das equipes acima (ativos, nunca o próprio vendedor) ou perfis de alçada do tenant (consumidores-pedido.ts:30-45); tudo na transação RLS do tenant do evento.

### Achados
1. 🟡 (alta) **O token do push não troca de dono — aparelho compartilhado recebe o push de outro usuário** — o `dispositivo_id` é por instalação (apps/mobile/src/services/motor-do-usuario.ts:26-33). Quando B entra num aparelho que era de A: o login não troca o `usuario_id` do dispositivo (modules/core/api/repositorio.ts:136-141, `do update ... where usuario_id = excluded.usuario_id`), o `PUT dispositivos/atual/push` de B não acha a linha (notificacoes.ts:179, 404 DISPOSITIVO_NAO_ENCONTRADO) e o logout não limpa o token (autenticacao.ts:170-179). Resultado: os pushes de A (título/corpo: número do pedido, motivo da rejeição) aparecem no telefone de B, e B não recebe nada. Também: consumidores.ts:39-44 manda para tokens de usuário desativado/bloqueado (não junta `core.usuario` ativo e `bloqueado_em is null`). Ajuste (modulo-core): (a) logout limpa `push_token/push_plataforma` do dispositivo da sessão; (b) o PUT limpa o mesmo token em outras linhas do tenant (`update core.dispositivo set push_token = null, push_plataforma = null where push_token = $2 and id <> $1`) e, se a linha for de outro usuário, decidir com o desenho do RF-CORE-01 se o aparelho troca de dono; (c) o consumidor só envia a usuário ativo e não bloqueado; teste de banco para cada um. O comentário de apps/mobile/src/lib/push.ts:69 ("o servidor pode ter limpado o token num novo login") hoje não é verdade — engenheiro-apps ajusta junto. Não é 🔴 para o preview das 22h porque `MACUXI_PUSH_ATIVO` é desligado por padrão e os aparelhos do preview são individuais; **precisa estar feito antes de ligar o push num tenant com aparelho compartilhado** (promotor em rodízio).
2. 🟢 push.ts:59 — a Expo devolve 200 com erro por mensagem (`DeviceNotRegistered`); hoje é ignorado e o token morto fica para sempre. Ler os tickets e limpar o token nesse caso.
3. 🟢 Dois jeitos de `envio_id` (evento_id cru no pedido, uuid derivado no sistema). Os dois são determinísticos; unificar em `envioIdDe` deixa uma regra só.
4. 🟢 consumidores-erp-rota.ts:98 — "Rota do dia atualizada" sai a cada reenvio da rota pelo ERP, mesmo sem mudança nas paradas de hoje (mesmo ponto do 🟢 3 da T-0066).

## Pronto quando
T-0065 (A) sem 🔴. 🟡 1 em tarefa do modulo-core (+ linha do engenheiro-apps) antes de `MACUXI_PUSH_ATIVO=1` em produção; 🟢 no backlog.
