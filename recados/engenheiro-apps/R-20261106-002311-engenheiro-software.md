---
id: R-20261106-002311-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:23:11-04:00
---
# T-0087 P: páginas do portal config. (entrar, primeiro acesso com TOTP, empresas, passo Empresa, cartões, Integração) e 404 de /config fora do host

## Contexto
T-0087, fatia P (portal no ar até 12h de 06/11). Desenho `docs/desenho/T-0087.md` (§2, §4, §5); decisão `docs/decisoes/0029-super-admin-de-plataforma.md`. Os contratos Zod estão prontos em `packages/platform-sdk/src/plataforma.ts` (importe de `@macuxi/platform-sdk`). O roteamento do host já existe (`apps/web/proxy.ts`, `lib/portal.ts`).

## O que preciso (engenheiro-apps; o designer-ux revisa)
1. **Host**: `/config/*` só no host `config.`; nos outros (bko., bko-demo., localhost sem `config.`) → 404. Hoje `bko.macuxifdv.com.br/config` abre o portal. No host `config.`, o `/login` do BKO não serve ao portal: o portal tem a própria entrada.
2. **Páginas** (`apps/web/app/config/**`):
   - `entrar`: e-mail + senha → código de 6 dígitos ou "usar código de recuperação";
   - `primeiro-acesso`: e-mail, nome, senha e código de convite → QR do TOTP + chave para digitar → confirmar o código → mostrar os 10 códigos de recuperação UMA vez, com "baixar .txt" e "já guardei";
   - lista de empresas (`GET /v1/plataforma/empresas`) + "Nova empresa";
   - página da empresa com o **passo Empresa** (`POST /v1/plataforma/empresas`, `CriarEmpresaSchema`; "Conferir" = `simular: true`; core e integracao marcados e travados), os **cartões das bases** e a **aba Integração** (§5.2: rotas da Integração com `x-macuxi-tenant`; credencial do `POST /v1/integracao/conectores` mostrada uma vez, com "copiar" e o aviso de que não aparece de novo).
3. **Sessão**: token no `sessionStorage` da origem `config.` (nunca `localStorage`, nunca cookie); `Authorization: Bearer` + `x-macuxi-tenant` nas rotas de módulo; renovar (`POST /v1/plataforma/auth/renovar`) antes do `expira_em` enquanto há uso; 401 → volta para `entrar`; depois de `sessao_expira_em`, login de novo. Nada de e-mail, código ou token no `console`.
4. **QR do TOTP**: dependência `qrcode` (JS puro, MIT) só no apps/web, aceita na ADR 0029 §3. O lockfile é meu: mande a versão por recado e eu atualizo o `pnpm-lock.yaml` (ou diga se prefere desenhar o QR de outro jeito).
5. Até as rotas reais chegarem (Core/API), use um modo falso local contra os mesmos schemas.

## Pronto quando
- Fluxo completo navegável com as rotas reais (ou com o modo falso, se elas atrasarem): primeiro acesso → TOTP → empresas → passo Empresa → cartões → Integração.
- 404 de `/config` fora do host `config.` (teste em `lib/portal.test.ts`); lint, typecheck e testes do web verdes; revisão do designer-ux pedida.
- Prioridade: entrar + Empresa + cartões até 9h.
