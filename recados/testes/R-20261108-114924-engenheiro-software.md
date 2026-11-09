---
id: R-20261108-114924-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core, banco-dados, testes]
tipo: revisao
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-091415-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-08T11:49:24-04:00
---
# Reconferência T-0111/T-0094: os 3 🔴 (A Core, B testes, C 0046) estão fechados, sem 🔴 novo; 2 🟡 novos no Core antes do build

## Contexto
Reconferência da T-0111/T-0094 sobre os 3 🔴 de R-20261108-091415. Entregas conferidas:
- Core: R-20261108-110030 e R-20261108-110059.
- Testes: R-20261108-102904.
- Banco: R-20261108-101610, a migração 0046.

A 0047 ficou fora desta revisão, como você pediu.

O que rodei aqui:
- vitest do core (pool threads): api/usuarios, domain/usuarios, domain/acesso-senha e api/autenticacao, 4 arquivos e 122 testes verdes.
- Typecheck do @macuxi/core: verde no tsconfig.json do core (tsc --noEmit; o web e o mobile do core o Core informou verdes).
- vitest do @macuxi/db (portal-multiperfil e estatico): 343 ok, 8 de banco pulados.
- `verificar engenheiro-software`: OK.

Os testes de banco e de integração rodam só no CI.

## O que preciso / o que mudou
Veredito: os 3 🔴 estão FECHADOS e não acho 🔴 novo. Pelo código, a T-0111 pode ir no lote, desde que o CI fique verde na branch de verificação. Ficam 2 🟡 novos no Core, que pelo R-20261108-090349 entram antes do build.

🔴 A (Core), fechado:
- PUT usuarios/:id/senha decide por todos os vínculos vivos do alvo (refsDoUsuario) com podeRedefinirSenha e pode(..., { perfis }).
- Recusa SENHA_DE_ADMIN quando algum perfil do alvo é de base admin, mesmo com a lista 'todos'. A lista da chave precisa cobrir todos os perfis do alvo; nunca a própria conta; alvo inativo é recusado.
- A linha do alvo é travada e outro tenant recebe 404 (RLS).
- A premissa "sem vínculo cai no principal" está aceita: depois da 0041 o trigger garantir_perfil_principal sempre cria esse vínculo, e o fallback é falha fechada.
- Os 🟡 2-4 da revisão anterior também estão feitos: estado real do tenant em editar/desativar, mensagem do 403 pelo perfil que fecha o app e apps do e-mail somados.

🔴 B (testes), fechado:
- Não sobra nenhum it.fails do D-MP1. O caso do portal (D-MP2) usa it.skipIf(SEM_PORTAL).
- O MP-06f novo cobre [analista, admin] e [admin, vendedor] = 422 SENHA_DE_ADMIN e confere que a senha, as sessões e a outbox ficam intactas.

🔴 C (banco, 0046), fechado:
- plataforma.usuario_entra_no_portal é gêmea de podeEntrar(perfis, 'portal'): exige ao menos um perfil, todos de base admin, e acesso.portal pela união entre os perfis admin.
- Ela é SECURITY INVOKER, filtra por p_tenant e não tem EXECUTE para app, worker, portal nem PUBLIC.
- As 4 sa_* (contas_para_login, abrir_sessao_portal, escolher_empresa, sessao_valida) foram recriadas com as mesmas assinaturas e ACLs e com o filtro.
- O login de quem não entra dá 0 linhas, sem oráculo. O down volta ao texto da 0040.
- Concordo com a leitura do banco: soma entre os perfis de base admin e a regra mais restritiva entre bases diferentes, igual ao SDK e à ADR 0033 §7.

Regressão: nenhuma.
- RLS: as consultas novas não nomeiam tenant fora das sa_* do portal, que filtram por p_tenant.
- O domain segue puro e cita as RN.
- Nenhum dado pessoal nos logs.
- A API revalida tudo; a tela é só reflexo.

🟡 novos, com o modulo-core (detalhe no recado R-20261108-113934-engenheiro-software):
- 🟡 1. modules/core/api/usuarios.ts:336-349. O PUT usuarios/:id com o campo legado `perfil` sem `perfis` valida o estado [perfil novo] mas grava a soma: o trigger da 0041 junta a base nova aos vínculos que já existem. A auditoria diz "admin → vendedor", e o usuário continua com as ações de admin. Não é escalada, porque o ator já tem usuario.editar e o COMMIT da 0041 confere os limites, mas o estado validado e auditado é diferente do gravado.
- 🟡 2. modules/core/web/lib/usuarios.ts:124. O botão "Redefinir senha" ainda decide pelo principal, então um [analista, admin] mostra o botão e recebe 422.
- Mais 2 🟢: um comentário e o campo `regra` na recusa da senha.

## Pronto quando
- O CI verde na branch de verificação, com a 0046 e o Core, libera a T-0111 para o lote.
- Os 🟡 1 e 2 do Core corrigidos antes do build. Reconfiro quando o Core avisar.
