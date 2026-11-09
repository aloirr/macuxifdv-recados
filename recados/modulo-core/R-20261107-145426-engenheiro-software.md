---
id: R-20261107-145426-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:54:26-04:00
---
# T-0093 fatia C: RN-CORE-32 no domain, login do portal sem TOTP/convite com escolha de empresa, autenticarPortal e contratos do Core

## Contexto
T-0093 (ADR 0031, aceita pelo dono do produto): portal config. só com e-mail e senha; admin do cliente entra e escolhe a empresa; RN-CORE-32 em todas as senhas (P1). Desenho: docs/desenho/T-0093.md §2 a §5, §8 e §9 (fatia C do §11). Contratos do SDK já feitos: LoginPortalSchema, SessaoPortalSchema, EscolherEmpresaPortalSchema, EmpresaDoAcessoSchema, AcessoPortalAutenticado, ServicosCore.autenticarPortal (packages/platform-sdk/src/plataforma.ts e api.ts).

## O que preciso
1. RN-CORE-32 no domain, teste antes citando a RN (`modules/core/domain/senha.ts`): 8 a 200 pontos de código; letra `\p{L}` (acento vale); número `\p{Nd}`; especial = `[^\p{L}\p{N}\s]` (espaço permitido, não conta); sem trim; mantém "não igual ao e-mail". `faltasNaSenha(senha)` → ('caracteres'|'letra'|'numero'|'especial')[] e `mensagemDaSenha(faltas)` ("Falta um número." / "Faltam um número e um caractere especial."; texto final do designer-ux). `validarSenhaInicial` passa a usar a regra (mesma assinatura: usuarios.ts criar/redefinir, convite-aceite.ts, web/lib/usuarios.ts e o tenant:criar herdam); 422 mantém os códigos atuais, com `detalhes.faltas`.
2. Contratos do Core: reexportar os novos do SDK; `senha.ts` com SENHA_MIN_CARACTERES, faltasNaSenha, mensagemDaSenha, REGRA_DA_SENHA e SenhaNovaSchema; CODIGOS_PORTAL sem primeiroAcessoEncerrado, conviteInvalido, desafio, codigoInvalido, totpNaoIniciado e com `empresaNaoPermitida: 'EMPRESA_NAO_PERMITIDA'` (403) e `empresaNaoEscolhida: 'EMPRESA_NAO_ESCOLHIDA'` (409).
3. Rotas públicas com `conexao: 'portal'`: `plataforma/auth/login` (10/5 min por IP), `plataforma/auth/empresa` (30/5 min; token no Authorization), `plataforma/auth/renovar` e `plataforma/auth/sair`. Algoritmo do §3: chave = HMAC-SHA256(MACUXI_JWT_SEGREDO_PLATAFORMA, "portal.login:" + e-mail normalizado); bloqueio antes de tudo (423 também para e-mail inexistente); sa_contas_para_login; verificarSenha em paralelo (gastarTempoDeSenha quando não há conta); precedência do super-admin; falha → sa_tentativa_falha; sucesso → sa_tentativa_sucesso + sa_abrir_sessao_portal; auditoria sa.login.ok / sa.login.falha sem e-mail.
4. Token (§4): `typ` 'sa'|'cli', `tid` para o cliente com empresa, `sub` = super_admin.id | core.usuario.id da empresa | sid (sem empresa); `amr` ['pwd']; 15 min, teto 8 h. `autenticarPortal` confere assinatura, aud, prazo e sa_sessao_valida (tipo, sub e tid iguais à sessão); token sem `typ` = null. Sem MACUXI_CHAVE_TOTP e sem MACUXI_SUPERADMIN_CONVITE em lugar nenhum (só o segredo da plataforma: falta = 503).
5. Remover (§9): primeiro acesso, totp/*, segundo-fator, recuperacao/regerar, desafio, conviteConfere, TOTP/base32/otpauth/recuperação/cifra no domain e na api, os métodos do super-admin-repositorio das funções que somem, e os testes deles. `autenticarSuperAdmin` sai dos serviços quando a API passar ao `autenticarPortal` (mesmo commit da fatia S, minha).

## Pronto quando
Testes do domain da RN-CORE-32 (cada falta e combinações, acento, emoji, espaço, 7/8/200/201, igual ao e-mail) e da api com repositório falso: e-mail inexistente e senha errada = mesma resposta e o mesmo número de conferências; 423 também para e-mail inexistente na 6ª tentativa; super-admin com precedência; admin com 2 empresas e senhas diferentes só recebe a que conferiu; 1 empresa já escolhida; token sem empresa recusado em rota de tenant; token antigo morre ao trocar de empresa; token sem typ recusado; log sem e-mail, senha nem token. lint/typecheck/test do @macuxi/core verdes. Entra no main no mesmo commit da migração (fatia B) e da API (fatia S).
