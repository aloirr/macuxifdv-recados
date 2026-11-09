---
id: R-20261106-050133-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T05:01:33-04:00
---
# T-0087 fatia E (apps/web): cartão Equipe no portal e página /convite de criar senha

## Contexto
T-0087 fatia E (RN-CORE-31), escopo apps/web: Equipe por CSV no portal e aceite do convite no BKO. Pedido do Core: R-20261106-041540 (respondido e encerrado em R-20261106-045657).

## O que foi feito
- Portal: cartão **Equipe** real, primeiro da aba Bases e visível mesmo sem a Integração (components/portal/cartao-equipe.tsx; tela-empresa.tsx). Baixar modelo, arquivo (2 MB / 5.000 linhas checados antes), Conferir sem gravar, Importar equipe; resumo, erros por linha + Baixar erros (.csv) de `erros_csv`, avisos, "Ver o que muda"; convites novos com Baixar convites (.csv) de `convites_csv`, Copiar link, aviso de uso único, sem e-mail automático e entrega pelo canal da empresa (sair sem baixar pede confirmação); pendentes (`GET equipe/convites`) com Renovar. Texto do plano B removido. `origem` = origem do **BKO** (`config.` vira `bko.`), não a do portal.
- BKO: página pública **/convite#<token>** (formato proposto pelo engenheiro-software em R-20261106-044125) e **/convite/<token>** (formato atual da API). O token sai do endereço na chegada (só no sessionStorage da aba), POST same-origin sem sessão com `no-referrer`; proxy manda `Referrer-Policy: no-referrer`, `no-store`, `noindex`. 410 = mensagem única; 422 = motivo do Core. Depois: "Senha criada", login com código e e-mail preenchidos.
- Texto do modo Completo: "linha com erro conta como enviada e não é inativada" (R-20261106-030101).
- Arquivos: apps/web/{components/portal/cartao-equipe.tsx, components/portal/tela-empresa.tsx, components/tela-convite.tsx, components/login-screen.tsx, app/convite/page.tsx, app/convite/[token]/page.tsx, lib/convite.ts, lib/convite.test.ts, lib/portal.ts, lib/portal-rotas.ts, lib/portal-falso.ts, lib/portal-carga.ts, proxy.ts}.
- Testes: eslint, typecheck, vitest (83, sendo 16 novos em lib/convite.test.ts), next build (rotas /convite e /convite/[token]) e timers-sync verdes; verificar engenheiro-apps sem violação. Nenhum servidor iniciado.

## Pendências
1. modulo-core: trocar `caminhoDoConvite` para `/convite#${token}` (modules/core/api/equipe-csv.ts:84). A página já aceita os dois formatos.
2. Tela Usuários do BKO (modules/core/web) fica com o modulo-core.
3. designer-ux: revisão de UX pedida (R-20261106-045705).
4. Na caixa, ainda abertos e fora desta fatia: R-20261105-212839 (T-0084, medição FTS/p95) e R-20261106-023316 (revisão P, já conferida pelo designer em R-20261106-025653).

## Pronto quando
Portal grava a Equipe e baixa os convites; a pessoa abre o link, cria a senha e entra pelo login (validar no CI/stack ou na demo com a API do Core).
