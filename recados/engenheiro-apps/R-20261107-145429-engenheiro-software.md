---
id: R-20261107-145429-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:54:29-04:00
---
# T-0093 fatia W: telas do portal (Entrar só e-mail e senha, Escolha a empresa, Trocar de empresa, admin inicial no passo Empresa) e remoção de primeiro acesso/TOTP/QR

## Contexto
T-0093 (ADR 0031, aceita pelo dono do produto): o portal config. (e config-demo.) entra só com e-mail e senha; sem "Primeiro acesso", convite, QR e código de 6 dígitos; o admin do cliente escolhe a empresa quando tiver mais de uma; o passo Empresa ganha o admin inicial com a senha master (RN-CORE-34); RN-CORE-32 nas telas que criam senha. Desenho: docs/desenho/T-0093.md §2, §5, §6, §8 e §9 (fatia W do §11). Contratos do SDK já feitos: LoginPortalSchema, SessaoPortalSchema (tipo, empresa, empresas), EscolherEmpresaPortalSchema, AdminInicialEmpresaSchema, CriarEmpresaSchema.admin, CriarEmpresaRespostaSchema.admin.

## O que preciso
1. Entrar: só e-mail e senha → `POST /v1/plataforma/auth/login` → SessaoPortal. super_admin → Empresas (todas, como hoje). admin_cliente com 1 empresa → direto na empresa; com 2+ → tela "Escolha a empresa" (nomes de `sessao.empresas`) → `POST /v1/plataforma/auth/empresa {tenant_id}` → SessaoPortal nova (troca o token guardado).
2. "Trocar de empresa" só para admin_cliente com 2+: volta à lista da sessão e escolhe de novo (sem digitar a senha). "Nova empresa" e a lista de todas só para o super-admin. `x-macuxi-tenant` = empresa da sessão para o cliente.
3. `portal-sessao.ts` com SessaoPortalSchema (sessionStorage, nada de senha); renovar em `/plataforma/auth/renovar`; 401 SESSAO_PLATAFORMA_INVALIDA → Entrar; 403 EMPRESA_NAO_PERMITIDA e 409 EMPRESA_NAO_ESCOLHIDA → Escolha a empresa.
4. Passo Empresa: e-mail, nome e senha inicial do admin (lista das regras da RN-CORE-32 ao vivo, com o componente do designer-ux, e "Mostrar senha"); mostrar o resultado admin criado/existente; 422 RN-CORE-34 e RN-CORE-32 no campo.
5. Remover: /config/primeiro-acesso, tela-primeiro-acesso.tsx, cadastro-totp.tsx, lib/qr.ts (+ teste), a dependência qrcode do apps/web, os textos de convite e TOTP do portal-api.ts e as rotas totp/primeiro-acesso do portal-rotas.ts; portal-falso.ts com os dois tipos de acesso (super-admin e admin com 1 e com 2 empresas).
6. `apps/web/lib/convite.ts`: REGRA_DA_SENHA passa a vir do `@macuxi/core/contracts` (fatia C).

## Pronto quando
Testes das telas: 1 empresa entra direto; 2+ mostra a lista com os nomes; trocar exige escolher; 401 e 423 com as mensagens do designer-ux; nada de senha no sessionStorage; nenhuma rota/tela de TOTP ou convite sobrando; build e testes do apps/web verdes; revisão do designer-ux sem 🔴. Depende dos textos do designer-ux (fatia U) e dos contratos do Core (fatia C); pode começar já contra o SDK e o portal-falso.
