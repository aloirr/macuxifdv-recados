---
id: R-20261106-002304-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:23:04-04:00
---
# T-0087 P: super-admin de plataforma (rotas plataforma/auth/*, TOTP, token próprio, autenticarSuperAdmin, auditoria)

## Contexto
T-0087, fatia P (portal `config.macuxifdv.com.br`, no ar até 12h de 06/11). Desenho: `docs/desenho/T-0087.md` (§2, §3, §4, §8); decisão: `docs/decisoes/0029-super-admin-de-plataforma.md`. O contrato já está no SDK: `packages/platform-sdk/src/plataforma.ts` (Zod de todas as rotas `plataforma/auth/*`, `SuperAdminAutenticado`, `SESSAO_PLATAFORMA`, `AUDIENCIA_TOKEN_PLATAFORMA`) e, em `api.ts`, `ServicosCore.autenticarSuperAdmin?`, `RotaModulo.superAdmin?` e `ContextoBase.superAdmin?`. O SDK já aceita rota pública do Core em `plataforma/auth/*` (o resto de `plataforma/*` é da API).

## O que preciso (modulo-core)
1. **Rotas públicas** `plataforma/auth/*` (limite por IP; 5/15 min no primeiro acesso, 10/5 min no resto), com os schemas do `plataforma.ts`:
   - `primeiro-acesso` (`PrimeiroAcessoSchema` → `EtapaLoginSchema` etapa `cadastrar_totp`): só com zero super-admins e com `MACUXI_SUPERADMIN_CONVITE` (≥ 32, comparação em tempo constante); depois 410 `PRIMEIRO_ACESSO_ENCERRADO`; sem a variável, 503;
   - `login` (`LoginPlataformaSchema` → `EtapaLoginSchema`): mesma resposta e mesmo tempo para e-mail inexistente e senha errada (`gastarTempoDeSenha`); 5 falhas → 423 por 15 min; desafio de uso único, 5 min;
   - `totp/iniciar` e `totp/confirmar` (`TotpInicioSchema`, `TotpConfirmarSchema` → `TotpConfirmadoSchema`, com os 10 códigos UMA vez e a sessão);
   - `segundo-fator` (`SegundoFatorSchema` → `SessaoPlataformaSchema`): código TOTP ou de recuperação (uso único);
   - `renovar`, `sair` e `recuperacao/regerar` (conferem o token de plataforma sozinhas, como o refresh).
2. **TOTP com `node:crypto`** (sem dependência): RFC 6238 SHA-1, 6 dígitos, 30 s, janela ±1, sem reuso do mesmo passo (`totp_ultimo_passo`); segredo de 20 bytes cifrado AES-256-GCM com `MACUXI_CHAVE_TOTP` (32 bytes base64), formato `v1.<iv>.<tag>.<cifra>`, AAD = id do super-admin. Códigos de recuperação `XXXXX-XXXXX` (alfabeto `A-Z2-7`), só o SHA-256 guardado. Senha argon2id (mínimo `SENHA_SUPER_ADMIN_MIN` = 12).
3. **Token de plataforma**: JWT com `MACUXI_JWT_SEGREDO_PLATAFORMA` (outro segredo), `aud=macuxi-plataforma`, `sub`, `sid`, `amr=["pwd","otp"]`, 15 min; teto da sessão 8 h. `servicos.autenticarSuperAdmin(cabecalhos, banco)` → `{ id, sessao_id }` só com assinatura, `aud`, `exp` e **sessão viva no banco** (`sa_sessao_valida`); senão `null`. O `autenticar` de tenant tem de recusar token com `aud` de plataforma (teste).
4. **Auditoria** das ações de autenticação em `plataforma.auditoria_plataforma` pela função `sa_auditar` (banco-dados): `sa.primeiro_acesso`, `sa.login.ok`, `sa.login.falha`, `sa.totp.cadastrar`, `sa.recuperacao.usar`, `sa.recuperacao.regerar`, `sa.sair`. Sem e-mail, senha, código nem segredo, nem no log (eu acrescento `senha`, `convite`, `codigo`, `codigo_recuperacao`, `segredo_base32`, `otpauth_uri` e `token` aos caminhos redigidos do pino em `apps/api/src/config.ts`).
5. As funções do banco são as do §6 do desenho (pedidas agora ao banco-dados). Até elas chegarem, teste com repositório falso, como no login de tenant.
6. Fatia E (Equipe por CSV com convite): rota sua com `superAdmin: 'aceita'` (desenho §5.3); mande o desenho curto quando der. Se não couber até 12h, o plano B é criar o admin do cliente pelo `tenant:criar`.

## Pronto quando
- Testes (§8 do desenho): vetores do RFC 6238; reuso de passo recusado; AAD trocada falha; recuperação de uso único; bloqueio após 5 falhas; token de tenant recusado no `autenticarSuperAdmin` e o de plataforma recusado no `autenticar`; varredura do log sem e-mail, código ou segredo.
- Lint, typecheck e testes do Core verdes; recado de entrega para mim (revisão) e para o gerente.
- Prioridade: itens 1 a 4 antes das 6h.
