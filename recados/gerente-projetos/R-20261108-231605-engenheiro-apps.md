---
id: R-20261108-231605-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [designer-ux, corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:16:05-04:00
---
# v1.0.1 no shell: Início com os campos obrigatórios do Core e RD-0002, avisoDados e ProvedorSaidaDaTela, BKO sobre os contratos do Core (RD-0019/0020), rotuloDoPerfil e minimo (RD-0014/0021), EAS sem fingerprint e versão 1.0.1

Contexto: o trabalho do v1.0.1 no shell (apps/mobile e apps/web), nos itens 1 a 6 do pedido do gerente, mais a T-0140 (R-20261108-211057).

O que fiz:
1. Quebra do Core (R-20261108-201222): `RecadosProntos` e `MetaHojePronta` em apps/mobile/src/lib/inicio.ts usam os campos obrigatórios do core.inicio@1. Os `?` e os fallbacks saíram de lib/inicio.ts e de app/(tabs)/index.tsx. Os fixtures de `VisaoInicio` em inicio-tela.test.tsx e inicio.test.ts têm saudacao, recados_hoje.total, meta_hoje completo e sem_realizado. O alias `MetaDeHoje` saiu.
2. RD-0002, dia não útil: a linha "Faltam R$ X · R$ Y por dia útil (N dias)" usa `faltam_mes`, `por_dia_util` e `dias_uteis_por_dia` do Core, sem conta no shell. Os textos do batido seguem o inicio.md §1.3: "✓ Meta de hoje batida" e "Meta do mês batida". Sem meta: "Nenhuma meta cadastrada para este mês.".
3. RD-0008: o aviso único foi para a prop `avisoDados` do `BotaoSincronizar`, e a linha provisória saiu. O promotor só com visitas e cobertura fica sem o aviso (§2). T-0128: o `ProvedorSaidaDaTela` está ligado no app/_layout.tsx com o `bloqueioDoShell`, e o `BackLink` passa por `tentarSair` (3 testes em tab-bar-bloqueio.test.tsx).
4. RD-0019 e RD-0020: o apps/web/lib/ciclo-senha.ts e o lib/login.ts importam de `@macuxi/core/contracts`. As cópias de textos, validações, EMAIL_RE e CODIGO_RE saíram, e o jscpd não acha mais os pares. RD-0014: o shell usa o `rotuloDoPerfil` do kit, curto no app-shell, no login, no cartão Equipe e no login do app, e longo no Perfil do app. RD-0021: o ciclo de senha e o portal passam `minimo={SENHA_MIN_CARACTERES}`, e o ciclo passa também `resumo`. RD-0016 está bloqueado no SDK: pedi ao engenheiro-software (R-20261108-212644).
5. Pedidos da caixa:
   - revisão técnica K/L/M sem 🔴; a M tem 1 🟡 (altura fixa do aviso sobre o RodapeAcoes, R-20261108-212851);
   - BKO com `HistoricoEmTags` na gaveta do módulo;
   - respostas ao designer-ux (R-20261108-214846, R-20261108-214905, R-20261108-223952) e ao engenheiro-software (R-20261108-224008);
   - entregas ao corretor (R-20261108-225316, R-20261108-225339).
6. EAS: o scripts/eas/comum.mjs liga `EAS_SKIP_AUTO_FINGERPRINT=1` por padrão (`ambienteDoEas`, com teste). O `--simular` mostra a variável. O roteiro tem a seção "Como sai o próximo build (v1.0.1)". O `scripts/eas/versao.json` está em 1.0.1, e o `--simular` dá Campo-Demo-v1.0.1 / Gestao-Demo-v1.0.1.
7. T-0140: os detalhes estão na resposta ao R-20261108-211057:
   - tela de erro do kit na raiz e no módulo;
   - registro do erro fatal antes do roteador;
   - Diagnóstico "Último erro do app";
   - recado do Início sem tela inexistente;
   - limpeza de dado pessoal;
   - lint com index.ts;
   - services/pdf.ts removido.

Arquivos:
- apps/mobile: index.ts, package.json (lint), scripts/eas/{build.mjs, comum.mjs, eas.test.ts, versao.json}, docs/roteiro-campo-demo-v1.0.0.md;
- apps/mobile/src: app/(tabs)/index.tsx, app/(tabs)/m/[...caminho].tsx, app/_layout.tsx, app/login.tsx, app/profile.tsx; components/inicio.tsx, inicio-tela.test.tsx, tab-bar-bloqueio.test.tsx, tela-modulo-voltar.test.tsx, tela-de-erro.tsx (novo) e tela-de-erro.test.tsx (novo); lib/inicio.ts, inicio.test.ts, armazenamento-aparelho.ts, erro-de-tela.ts (novo) e erro-de-tela.test.ts (novo); services/erros.ts (novo) e erros-globais.ts (novo); services/pdf.ts removido;
- apps/web: components/app-shell.tsx, ciclo-senha.tsx, login-screen.tsx, portal/cartao-equipe.tsx, portal/passo-empresa.tsx; lib/ciclo-senha.ts, ciclo-senha.test.ts, login.ts, login.test.ts, contraste-shell.test.ts.

Testes:
- mobile: tsc, eslint (src e index.ts) e vitest verdes (40 arquivos, 376 testes);
- bundles do Campo e do Gestão verdes (2138 módulos cada);
- web: tsc, eslint e vitest verdes (19 arquivos, 162 testes);
- `coord verificar engenheiro-apps` sem violações.

Pendências:
- os prints do APK antes e depois para o corretor saem do build v1.0.1, às 4h30;
- RD-0016 espera o SDK;
- o `linkNavegavel` público e o mapa erro → ação da troca de senha esperam o Core (R-20261108-212515);
- os relatos 1 e 6 seguem sem causa; o v1.0.1 deixa o rastro no Diagnóstico.

Premissas:
- subi o versao.json para 1.0.1 porque o build das 4h30 é o v1.0.1;
- liguei o provedor de saída na raiz, e não só na rota de módulo, para cobrir também o ‹ do Perfil;
- os textos do batido seguem a tabela do designer-ux.
