---
id: R-20261107-173122-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0093
responde_a: R-20261107-145429-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-07T17:31:22-04:00
---
# Re: T-0093 fatia W pronta (telas do portal, sem primeiro acesso/TOTP/QR)

## Contexto
T-0093 fatia W (pedido R-20261107-145429-engenheiro-software; spec docs/design/portal-entrar.md; desenho docs/desenho/T-0093.md §2, §4, §6, §9). Só apps/web, contra os contratos do SDK (SessaoPortalSchema, LoginPortalSchema, EscolherEmpresaPortalSchema, AdminInicialEmpresaSchema, CriarEmpresaSchema.admin) e do Core (CODIGOS_PORTAL, faltasNaSenha, mensagemDaSenha, REGRA_DA_SENHA). Rotas do Core conferidas em modules/core/api/super-admin.ts: login, empresa, renovar e sair, sem divergência de nome.

## O que fiz
- Entrar só com e-mail e senha (components/portal/tela-entrar.tsx), com o olho no campo (CampoSenha em base.tsx), "Esqueceu a senha? Fale com a Macuxi." e os erros do §4 (401, 423, 429, 503, sem rede). Time da Macuxi → Empresas; admin com 1 empresa → direto nela; com 2+ → Escolha a empresa.
- Escolha a empresa: rota nova /escolher-empresa (app/config/escolher-empresa/page.tsx e components/portal/tela-escolher-empresa.tsx). A lista vem da sessão, com selo "Atual". POST /plataforma/auth/empresa troca o token e limpa o cache do React Query.
- Trocar de empresa no cabeçalho (MolduraPortal), só para o admin com 2+, com o nome da empresa atual. Para o cliente, a marca leva à empresa dele, o "← Empresas" some, e Empresas e Nova empresa redirecionam para ele. Na aba Empresa, o cliente não vê o passo Empresa: o POST é só do super-admin.
- lib/portal-sessao.ts sobre SessaoPortalSchema, com destinos puros (destinoDaSessao, destinoDepoisDoLogin, desvioDaPaginaDaEmpresa, itensDaEscolha) e o desvio de 403 EMPRESA_NAO_PERMITIDA e 409 EMPRESA_NAO_ESCOLHIDA pela guarda (lib/portal-api.ts). A lista branca do retorno ficou igual; o cliente só volta para a página da própria empresa.
- Passo Empresa: bloco "Administrador da empresa" (nome, e-mail, senha inicial com RegrasDaSenha ao vivo e olho), 422 RN-CORE-34 e RN-CORE-32 no lugar certo, resultado criado/existente e senha limpa depois de gravar.
- Removidos: /config/primeiro-acesso, tela-primeiro-acesso.tsx, cadastro-totp.tsx, lib/qr.ts e qr.test.ts, os textos de convite e TOTP do portal-api.ts, o selo dos códigos de recuperação e as rotas primeiro-acesso, totp e segundo-fator do portal-rotas.ts. A dependência qrcode não existia no package.json: o QR era feito à mão em lib/qr.ts.
- lib/convite.ts reexporta REGRA_DA_SENHA do @macuxi/core/contracts. O modo falso do aceite usa faltasNaSenha.
- lib/portal-falso.ts com três contas: time@macuxi.com.br, admin@uma.com.br (1 empresa) e admin@duas.com.br (2 empresas). Ele imita 401, 423, 403, 409 e 422 RN-CORE-34/32. O contador de bloqueio fica só na memória: nenhum e-mail vai ao sessionStorage.
- Mantidos sem mudança: o rewrite do openapi.json (next.config.ts), o proxy, o config-demo e a lista branca do retorno.

## Testes
- eslint, tsc (--noEmit) e next build do apps/web: código 0. O build tem /config/escolher-empresa e não tem /config/primeiro-acesso.
- vitest: 13 arquivos, 127 testes verdes. O novo lib/portal-escolha.test.ts tem 19 testes: 1 empresa entra direto; 2+ mostra a lista com os nomes; trocar exige escolher (token antigo morre, outra empresa = 403); 409 sem escolher; 401 igual para e-mail inexistente e senha errada; 423 na 5ª; nada de senha nem e-mail no sessionStorage; RN-CORE-34/32 no passo Empresa. portal-telas.test.ts cobre os textos do Entrar e o admin inicial.
- verificar engenheiro-apps: OK, sem violações.

## Pendências
- Revisão de UX pedida ao designer-ux (R-20261107-173033-engenheiro-apps), com 6 pontos em que decidi sem texto na spec. Corrijo os 🔴 e 🟡 quando ela chegar.
- O teste de ponta com a API real fica com a fatia T (testes/CI). Localmente só rodei contra o modo falso, sem Docker.
- Se o SDK remover SessaoPlataformaSchema e os schemas antigos (§5, fim), o apps/web já não usa nenhum deles.
