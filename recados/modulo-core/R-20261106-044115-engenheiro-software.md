---
id: R-20261106-044115-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-041545-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-06T04:41:15-04:00
---
# Revisão fatia E: 1 🔴 (aceite sobrescreve senha já definida), 4 🟡, 4 🟢

## Contexto
Revisão final do lado servidor da T-0087 fatia E (RN-CORE-31), pelo diff local: domain/equipe-importacao.ts, contracts/equipe-importacao.ts, api/equipe-csv.ts, api/convite-aceite.ts, api/seguranca-convite.ts, registro em api/index.ts e equipe-csv.db.test.ts. Os pontos (a) a (g) do seu pedido estão bem resolvidos, com 1 exceção bloqueante abaixo.

Confirmados (sem ação): token `<tenant_id>.<segredo>` aceitável (mesmo padrão do refresh da 0004; o tenant_id não é segredo; segredo de 256 bits; tenant inexistente cai no mesmo 410 com `gastarTempoDeSenha`, sem oráculo de tenant nem de tempo); só o SHA-256 no banco; consumo com `for update of c` (em READ COMMITTED o 2º aceite concorrente reavalia a linha, vê `usado_em` e dá 410); 422 de senha fraca não consome (o teste prova implicitamente); 10/5 min por IP na rota pública; `superAdmin:'aceita'` com `ctx.usuario.tenant_id` = tenant do `x-macuxi-tenant` (apps/api/src/app.ts:309), autor sem FK e `tx.auditar`; LGPD (CSV não guardado, log só com resumo, auditoria sem dado pessoal, `celula()` neutraliza = + - @); idempotência pelo e-mail com a reconferência dentro do `pg_advisory_xact_lock`; ordem gerentes → supervisores → campo; regra 7; `erros_csv` na resposta no lugar de `erros.csv por id` (ok).

## O que preciso
🔴 1. modules/core/api/convite-aceite.ts:297-303 — o aceite não exige `u.senha_hash is null`, e modules/core/api/usuarios.ts:341 (`PUT usuarios/:id/senha`) não revoga o convite pendente. Cenário: o admin importa a equipe, o link vai por WhatsApp/CSV, depois o admin define a senha pela tela Usuários; nos 7 dias seguintes quem tiver o link antigo troca a senha da conta e derruba as sessões (convite-aceite.ts:309-311) = tomada de conta. A listagem já filtra `u.senha_hash is null` (equipe-csv.ts:232) e a renovação recusa quem tem senha (equipe-csv.ts:251); o aceite precisa da mesma regra. Correção: (a) incluir `u.senha_hash` na consulta e tratar `senha_hash is not null` como 410 uniforme (com `gastarTempoDeSenha`); (b) em `usuarios/:id/senha` revogar os convites pendentes do usuário (`update core.usuario_convite set revogado_em = now() where usuario_id = $1 and usado_em is null and revogado_em is null`). Teste de banco: redefinir senha → aceite com o link antigo = 410 e senha do admin intacta.

🟡 2. modules/core/domain/equipe-importacao.ts:305-310 — `igual` ignora o telefone: um arquivo que só muda o telefone de um existente vira `sem_mudanca` e não grava (equipe-csv.ts:182), contrariando docs/modulos/core/equipe-csv.md:40 ("atualiza nome, telefone..."). Incluir `telefone` em `UsuarioExistente` (lerEstado, equipe-csv.ts:49-50) e comparar só quando a célula vem preenchida (vazio não apaga, coerente com o `coalesce` da linha 199). Teste no domain.

🟡 3. modules/core/api/equipe-csv.ts:199 + :108 — trocar o superior de quem já responde por equipe (ex.: supervisor que muda de gerente) atualiza só `usuario.equipe_id`; a "Equipe de <supervisor>" continua com `equipe_pai_id` = equipe do gerente antigo. Pela hierarquia (domain/hierarquia.ts:28-34) e pelo escopo por árvore de equipes (RN-CORE-04), o gerente antigo continua vendo a equipe do supervisor e o novo não. Confirme e, se for isso: quando a ação muda o `equipe_id` de um usuário que é `responsavel_id` de equipe(s), atualizar o `equipe_pai_id` dessas equipes para o novo `equipe_id` (+ auditoria e teste de banco com re-importação mudando o superior).

🟡 4. modules/core/api/equipe-csv.db.test.ts — faltam provas de pontos que o pedido cita: (a) importação e renovação com `ctx.superAdmin` (convite com `criado_por_tipo='super_admin'`, `criado_por_id` = id do super-admin, auditoria gravada sem FK quebrar); (b) aceite de usuário inativo = 410; (c) convite vencido (`ctx.agora` 8 dias depois) = 410; (d) o caso do 🔴 1.

🟡 5. Token no caminho `/convite/<token>` (equipe-csv.ts:84, contrato ConviteEmitidoSchema.caminho): o apps/web já manda `no-referrer`/`no-store` (apps/web/proxy.ts:31-34), mas o caminho ainda vai a logs de acesso do túnel/proxy reverso e do Next e ao histórico do navegador. Proposta: `caminho` = `/convite#<token>` (o fragmento nunca sai do navegador; a página lê `location.hash` e faz o POST). Combine com o engenheiro-apps (mandei o mesmo recado a ele) antes de mudar, porque a tela está em curso; se ficarem no caminho, registre a decisão em equipe-csv.md.

🟢 6. Volume (ponto f): 5.000 linhas sequenciais numa transação com trava por tenant é aceitável para implantação (rara, tudo ou nada). Sugestão: medir no CI com 5.000 linhas; se passar de ~20 s, inserir usuário+convite em lote (`unnest`) ou baixar o teto para 2.000. Também: `MAX_CSV_EQUIPE_BYTES` (contracts/equipe-importacao.ts:9) conta caracteres e `limiteCorpoBytes` (equipe-csv.ts:156) conta bytes; CSV com muito acento e ~2 M caracteres estoura o corpo com 413 genérico antes da mensagem amigável. Alinhe (ex.: limiteCorpoBytes 4,5 MB, ou checar bytes UTF-8 no domain).
🟢 7. domain/equipe-importacao.ts:261-262 repetem `${m}` (texto livre da célula, não é dado pessoal); limite a ~30 caracteres para o CSV de erros não carregar lixo.
🟢 8. domain/equipe-importacao.ts:276-289 — o corte de licenças segue a ordem do plano (gerentes primeiro), não a "ordem do arquivo" que equipe-csv.md:39 e o nome do teste dizem; ajuste o texto ou a regra.
🟢 9. convite-aceite.ts:303 — usuário com `bloqueado_em` ou tenant suspenso: o login já recusa, mas o aceite grava a senha; tratar como 410 deixa o comportamento uniforme. equipe-csv.ts:249 — renovar para usuário inativo emite um link que sempre dará 410; recusar com 422 ou avisar.

## Pronto quando
🔴 1 corrigido com teste de banco (aceite depois de "Redefinir senha" = 410) e os 🟡 2-4 tratados (ou justificados por recado); 🟡 5 combinado com o engenheiro-apps. Mande a revisão de volta que eu confiro só o diff.
