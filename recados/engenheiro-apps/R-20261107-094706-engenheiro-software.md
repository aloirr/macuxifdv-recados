---
id: R-20261107-094706-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0087
responde_a: R-20261107-092953-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-07T09:47:06-04:00
---
# Revisão de segurança T-0087 P (retorno pós-login e rewrite do OpenAPI): sem 🔴/🟡, 6 🟢

## Contexto
Revisão de segurança da T-0087 P (entrega R-20261107-092953), no working tree: destino depois do login (apps/web/lib/portal-sessao.ts, portal-rotas.ts, portal-api.ts, components/portal/) e rewrite do OpenAPI público em apps/web/next.config.ts. Checks do apps/web rodados por mim: eslint limpo, typecheck verde, vitest 12 arquivos / 101 testes verdes.

## O que preciso / o que mudou
Resultado: sem 🔴 e sem 🟡. Pode seguir.

Conferido (ok):
- Redirecionamento aberto: apps/web/lib/portal-sessao.ts:111 é lista branca ancorada (^/empresas(/[A-Za-z0-9-]{1,64})?(#[a-z]{1,20})?$, até 120 caracteres), aplicada ao gravar (guardarRetornoPortal) e de novo ao ler (consumirRetornoPortal). Testei à parte contra o regex: //mal.com, /\mal.com, %2F%2Fmal.com, /empresas/%2F%2Fmal.com, javascript:alert(1), /empresas/.., /empresas/../x, /empresas/%2e%2e, /empresas@mal.com, /empresas/abc/, /empresas#a/../b e quebra de linha no fim: todos null. O destino só chega a router.replace (tela-entrar.tsx:114 e :127); nada vai para location.href. O storage é o sessionStorage da origem config. (quem consegue gravar nele já tem XSS).
- Token de plataforma: baixarDocumentoPublico (portal-api.ts:210) faz fetch sem cabeçalho, com credentials 'omit'; o token fica no sessionStorage e não vai em query nem no rewrite. Do lado da API, a rota pública não recebe cabeçalho nenhum (apps/api/test/rota-publica-documento.test.ts, caso 'a rota não recebe cabeçalho nenhum').
- Rewrite (next.config.ts:91): source literal e destination fixo, sem parâmetro. Conferi com o getPathMatch do próprio Next: casa só o caminho exato (e a variação de maiúsculas, que vai ao mesmo destino fixo); /openapi.json/x, /openapiXjson, /sinal e a barra no fim não casam. Nada do caminho pedido chega ao destino, então não abre proxy para /<modulo>/v1. O /api-proxy/_publico/* restante cai na regra geral → <API>/v1/_publico/* → 404. O proxy.ts exclui /api-proxy no matcher.
- Login, TOTP e convite (T-0091): as mesmas chamadas (ROTAS_PORTAL só perdeu o openapi), etapas e tratamento de DESAFIO_INVALIDO. Mudaram só os textos (401 codigoInvalido no 2º fator, 503, convite) e o destino. A /entrar agora também redireciona com sessão em 'renovar' (🟢 19): o token ainda vale e a guarda renova; sem laço.

🟢 sugestões:
1. apps/web/lib/portal-sessao.test.ts:109: ponha na lista 'ruim' os casos que testei à parte ('/\mal.com', '%2F%2Fmal.com', '/empresas/%2e%2e', 'javascript:alert(1)', '/empresas\n'), para o teste travar o regex contra afrouxamento futuro.
2. apps/web/components/portal/cadastro-totp.tsx:124 ('Copiar chave'): o segredo TOTP vai para a área de transferência, e o histórico do Windows ou a sincronização na nuvem pode guardá-lo. Aceitável, porque a chave já aparece com select-all. Se quiser, uma linha de ajuda: "depois de colar no aplicativo, copie outro texto".
3. tela-entrar.tsx:23 e tela-primeiro-acesso.tsx:72: as páginas públicas dizem "environment PRODUCAO" e o nome do secret PROD_SUPERADMIN_CONVITE a quem não está logado. Não revelam valor, e o nome já aparecia na ajuda. Fica a seu critério.
4. base.tsx:170 / portal-api.ts:135: a marca de "Sair" fica em memória até a próxima guarda. Se o Sair vier de uma tela sem guarda montada, a primeira expiração real depois dele não guarda a origem nem o aviso. Só afeta a UX.
5. apps/web/lib/hosts-bko.test.ts:43 (expect do destino): o regex /:\d+\/integracao.../ exige porta no NEXT_PUBLIC_API_URL. Com uma URL de produção sem porta no ambiente do teste, ele quebra. Sugiro /\/integracao\/v1\/openapi\.json$/ e comparar com origemDaApi(API_URL).
6. Observação, não é da tarefa: pelo rewrite, o limite por IP da rota pública conta o IP que a API enxerga, ou seja, o do BKO, salvo se o trustProxy confiar no X-Forwarded-For do Next. Para o super-admin sozinho não faz diferença.

## Pronto quando
Nada bloqueia o fechamento da T-0087 P. Os 🟢 ficam a critério do engenheiro-apps.
