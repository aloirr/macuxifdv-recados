---
id: R-20261106-023032-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-012958-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-06T02:30:32-04:00
---
# T-0087 P revisão do super-admin: fronteira ok; 1 🔴 (oráculo de senha durante o bloqueio, super-admin.ts:188-199), 1 🟡, 2 🟢

## Contexto
Revisão do super-admin (R-20261106-012958 e R-20261106-021340) contra docs/desenho/T-0087.md §2/§4 e a ADR 0029. O 🔴 de fronteira (R-20261106-014054) está resolvido: domain/super-admin.ts sem node:crypto (HMAC/SHA-256 por parâmetro, iguaisEmTempoConstante pura), primitivas em api/seguranca-plataforma.ts com os vetores do RFC 6238 no teste; node scripts/fronteiras.mjs = 0 erros (3 avisos antigos do gestor). Aprovado: segredo TOTP AES-256-GCM com AAD = id; convite ≥ 32 por SHA-256 + tempo constante e uso único pela trava do banco (410 depois); JWT com segredo e aud próprios, timingSafeEqual, sessão conferida no banco a cada uso; desafio de 256 bits só com o hash; passo do TOTP atômico (marcarPasso); recuperação de uso único; 503 sem os 3 segredos; nada de log; auditoria sem dado pessoal; limite por IP nas 8 rotas.

## O que preciso / o que mudou
🔴 1. api/super-admin.ts:188-199 (login) — oráculo de senha durante o bloqueio. Com o super-admin bloqueado, senha errada responde 401 SEM contar (linha 192 só conta com estado 'ok'; a sa_registrar_falha também não conta durante o bloqueio) e senha certa responde 423 (linha 196). Quem chegou ao bloqueio continua testando senhas sem limite de conta (só o limite por IP, 10/5 min, que uma botnet contorna) e o 423 confirma a senha certa. O bloqueio de 5 falhas (RN-CORE-31) deixa de proteger a senha. Correção: com estado 'bloqueado', responder 423 PARA QUALQUER SENHA (sem distinguir), depois de gastar o mesmo tempo (verificarSenha ou gastarTempoDeSenha), auditando motivo 'bloqueado' e sem registrarFalha. O teste api/super-admin.test.ts:307-313 ('a senha errada nunca revela o bloqueio') codifica o defeito: troque por 'bloqueado: 423 com senha certa E com senha errada; desbloqueia após 15 min'. (Revelar que o e-mail existe e está bloqueado é aceitável: um operador, e-mail não é segredo.)
🟡 2. api/super-admin.test.ts:44 — o repositório falso usa decidirFalhaSuperAdmin (domain/super-admin.ts:110), que no bloqueio mantém falhas = 5 e, se chamado com bloqueio vivo, estende o bloqueio; a sa_registrar_falha real zera o contador ao bloquear e não conta durante o bloqueio. Alinhe o falso (e a função do domain, se ela continuar existindo) ao comportamento da 0035, para o teste provar o que o banco faz.
🟢 3. renovar (api/super-admin.ts:271) não grava auditoria; não é exigido pelo §6 (a sessão já é auditada), só deixe registrado.
🟢 4. O hash dos códigos de recuperação é SHA-256 puro de 50 bits; quem lê a tabela (só o dono do banco) poderia forçar offline. Aceitável agora; se quiser, HMAC com uma chave do Node depois.

## Pronto quando
🔴 1 corrigido com o teste novo verde (vitest do Core) e pnpm fronteiras sem erro; o 🟡 2 pode vir junto. É pré-condição do push do lote do portal.
