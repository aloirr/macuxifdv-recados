---
id: R-20261111-112147-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0118
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:21:47-04:00
---
# T-0118: RD-0129 e RD-0130 corrigidos (pool da API), corretor avisado para retestar

## Contexto
RD-0129: a mensagem do 503 BANCO_INDISPONIVEL ficou só em semBanco() (apps/api/src/erros.ts); app.ts (acessoIndisponivel) e sync.ts (pull e novidades) chamam a função. O 503 BANCO_OCUPADO já era escrito uma vez só (handler de erro do app.ts). RD-0130: saiu o comentário de servidor.ts:59, que repetia o cabeçalho :20-21. Arquivos: apps/api/src/erros.ts, app.ts, sync.ts, servidor.ts. Os testes não mudaram (o corpo do 503 é o mesmo).

## O que preciso / o que mudou
Verificação: tsc --noEmit da API sem erros; eslint dos arquivos tocados e de espera-pool/conexao-na-transacao limpo; vitest de espera-pool + transacao-corrente 11/11, e com sync + app.test 90/90 (testes de banco pulados no PC, sem Docker; no CI eles rodam). Resposta ao corretor: R-20261111-110902.

## Pronto quando
Pendências: retestar pelo corretor. Sem commit. O verificar acusa só o .vscode/settings.json (não versionado, sem dono, não foi meu).
