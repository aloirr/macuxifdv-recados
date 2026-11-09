---
id: R-20261107-192350-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:23:50-04:00
---
# Revisão final T-0093 (+ T-0095): o lote NÃO sobe: 2 🔴 pela T-0094 pela metade no working tree; T-0093 e T-0095 em si sem 🔴

Contexto: revisão final (fatia R) da T-0093, no working tree, com a parte do Core e a seção da 0039 da T-0095 (R-20261107-182829). Fiz também a minha pendência da fatia S: os contratos antigos saíram do SDK e a transição saiu do app.ts.

O que fiz (meus caminhos):
- packages/platform-sdk/src/plataforma.ts: saíram PrimeiroAcessoSchema, LoginPlataformaSchema, EtapaLoginSchema, DesafioSchema, TotpInicioSchema, TotpConfirmarSchema, SegundoFatorSchema, CodigoRecuperacaoSchema, CodigosRecuperacaoSchema, TotpConfirmadoSchema, RegerarRecuperacaoSchema, SessaoPlataformaSchema, SENHA_SUPER_ADMIN_MIN e SESSAO_PLATAFORMA.desafioMin. packages/platform-sdk/src/api.ts: saiu ServicosCore.autenticarSuperAdmin (o autenticarPortal ficou com o JSDoc dele). plataforma.test.ts: o teste do 2º fator virou "o SDK não exporta mais os contratos antigos". Nenhum consumidor usava (web, Core e API conferidos). SDK: 632 testes e tsc verdes.
- apps/api/src/app.ts: sem a transição do autenticarSuperAdmin; o portal só pelo autenticarPortal do Core.
- apps/api/src/config.ts: redação do pino com email, *.email, *.senha, senha_hash, admin.senha e corpo.admin.* (desenho §6); teste novo em apps/api/test/log-seguro.test.ts. API: 258 testes verdes (64 pulados sem banco).

Revisão por critério: 1 tela só e-mail e senha 🟢; 2 RN-CORE-32 no domain com teste, revalidada na API, no CLI e no passo Empresa, com faltas 🟢; 3 escolha de empresa e multi-tenant 🟢 (lista só com o que conferiu, token por empresa, trocar mata o anterior, x-macuxi-tenant de outra = 403); 4 e 5 🟢; 6 🟢 (lockout por chave HMAC igual para e-mail inexistente, sessão de 15 min/8 h, as 12 sa_* só no macuxi_portal com a conferência pelo catálogo, auditoria de login, escolha e requisição, nada de dado pessoal em log); 7 🟢 (CLI e workflows; o diff docs/desenho/T-0093-workflows.diff aplica com git apply --check); 8 depende do deploy; 9 aguarda o CI. Não vaza a existência do e-mail: mesma resposta, mesmo tempo e o mesmo 423. Lista branca do retorno: só /empresas(/id)(#aba), e o cliente só volta à própria empresa. Nada de TOTP, convite ou primeiro acesso no SDK, na API, no Core nem no portal (fica o convite da Equipe, P4/T-0094).

O que preciso (o lote NÃO pode subir agora):
🔴 1. pnpm typecheck da raiz vermelho (16/19 tarefas; falham @macuxi/core, api e web), todo pela T-0094 pela metade nos contracts do Core: modules/core/web/lib/usuarios.test.ts:5 (trocar_senha, senha_expira_em, sem_senha); modules/core/api/convite-aceite.ts, equipe-csv.ts e api/index.ts:13 (schemas e códigos do convite da Equipe que saíram dos contracts); apps/web components/portal/cartao-equipe.tsx:18, components/tela-convite.tsx:18, lib/convite.ts:121, lib/portal-falso.ts:31 (os mesmos). pnpm lint da raiz vermelho só em modules/core/domain/equipe-importacao.test.ts:122 (Parsing error: string sem fechar); os demais pacotes só com avisos antigos. Recado ao modulo-core (R-20261107-192039); o apps/web só se ajusta quando o contrato da T-0094 fechar.
🔴 2. O working tree mistura a T-0094 em andamento com a T-0093 e a T-0095, sem corte limpo: a 0040 e os arquivos que dependem dela (Core: autenticacao.ts, repositorio.ts, seguranca.ts, email.ts, contracts/usuarios.ts, manifest.ts, domain/matriz.ts; banco: db/testes/portal-email-senha.test.ts:263-287, estatico.test.ts:92/:153, seeds dois-tenants e demo, modules/core/db/nuvem.ts). Agora também o login do portal (modules/core/api/super-admin.ts:125-143: senha_a_trocar e sessao_versao, da T-0094) depende da 0040. Sem a 0040 no commit, o login do BKO, o do portal e o CI de banco quebram; com ela, sobe uma T-0094 sem revisão. Decisão sua: separar (recados ao modulo-core e ao banco-dados) ou esperar as fatias B e C da T-0094 e a minha revisão delas.
🟡 3 a 5 (T-0095, modulo-core): aviso de vendedor desligado repetido a cada carga (consumidores-erp-vendedor.ts:25/:64); adoção por e-mail reativa quem foi desligado no BKO (:74, :81); inativado compara o relógio do Hub com o do ERP (:44; consumidores-erp.ts:42; consumidores-erp-produto.ts:28). A T-0095 em si não tem 🔴: a guarda por alterado_em está certa, o desligado no BKO não volta pelo caminho principal, a fronteira está ok (só core.*) e há 4 testes de banco.
🟢 banco-dados (R-20261107-191926, com o 🔴 2 do lado dele): sa_listar_tenants do cliente sem filtro de status; criar_super_admin sem reativar.

Fatia T (testes, R-20261107-192113) e fatia W (engenheiro-apps) 🟢.

Pronto quando: 🔴 1 e 2 resolvidos; aí rodo de novo o typecheck e o lint da raiz e libero o lote (B+C+S+W+T + T-0095 + o diff de governança com o trailer do dono do produto, como no §7 do desenho).
