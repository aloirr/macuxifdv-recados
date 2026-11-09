---
id: R-20261107-092953-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T09:29:53-04:00
---
# T-0087 P: 🟡 3, 7, 9 a 13 e 🟢 16 a 21 do portal aplicados; texto do completo (RN-INT-06); OpenAPI pela rota pública

## Contexto
T-0087 P, fechamento da revisão de UX do portal config. (R-20261106-023316), antes da produção. Só apps/web; sem APK.
O que entrou:
- os 🟡 3, 7 e 9 a 13;
- os 🟢 16 a 21;
- a resposta do modulo-integracao (R-20261106-030101) aplicada no texto do modo completo;
- o pedido R-20261107-085332: o botão do OpenAPI aponta para a rota pública da T-0092.
O fluxo de login, TOTP e convite (chamadas e etapas) não mudou. Mudaram só os textos e o destino depois do login (volta à página de origem, 🟡 10).

## O que preciso / o que mudou
Arquivos alterados:
- apps/web/components/portal: base.tsx, tela-entrar.tsx, cadastro-totp.tsx, tela-primeiro-acesso.tsx, cartao-base.tsx, aba-integracao.tsx, passo-empresa.tsx, tela-empresa.tsx, tela-empresas.tsx;
- apps/web/lib: portal-sessao.ts, portal-api.ts, portal-rotas.ts;
- apps/web/next.config.ts;
- testes: lib/portal-telas.test.ts, lib/portal-sessao.test.ts, lib/hosts-bko.test.ts.

Mudanças por item:
- 🟡 3: textos do 2º fator (recuperação incorreta ou usada; TOTP com a dica da hora do celular), 503 "Faltam os segredos do portal neste servidor (environment PRODUCAO)", convite citando o secret PROD_SUPERADMIN_CONVITE.
- 🟡 7: "Importar completo" virou danger, com o arquivo e o tamanho no diálogo. Linhas com erro: "Linhas com erro não inativam nada; se alguma vier sem código, nada é inativado nesta carga." (RN-INT-06, confirmado pelo modulo-integracao).
- 🟡 9: as telas estreitas ficam num cartão branco; o "← Empresas" usa accent-ink.
- 🟡 10: a guarda guarda a página de origem (só /empresas[/id][#aba], com teste contra redirecionamento aberto); /entrar mostra "Sua sessão terminou"; o login volta para a origem; "Sair" não guarda nada. O cabeçalho diz "encerra após 15 min sem uso".
- 🟡 11: ErrorBlock com "Tentar de novo" nos erros do lote.
- 🟡 12: o selo diz "Restam N códigos de recuperação", com title.
- 🟡 13: o texto do guia diz "chega em breve", porque não há página servida.
- OpenAPI (R-20261107-085332): o botão baixa GET /integracao/v1/openapi.json, sem token e sem tenant, pelo rewrite /api-proxy/_publico/integracao/v1/openapi.json → <origem da API>/integracao/v1/openapi.json (next.config.ts; a regra específica vem antes da geral; testes em hosts-bko.test.ts). No modo falso mostra "em breve"; o 429 tem frase própria. Pedi por engano ao modulo-integracao o superAdmin na rota autenticada (R-20261107-085223) e cancelei (R-20261107-090216).
- 🟢 que entraram:
  - 16: token accent-accent;
  - 17: rótulo do fuso;
  - 18: Ativa, Suspensa ou Encerrada;
  - 19: a entrada aceita a sessão em "renovar";
  - 20: "Passo N de 3" no primeiro acesso;
  - 21: "Copiar chave" do TOTP.
- 🟢 que ficaram:
  - 14: densidade e última carga lida do servidor; depende de rota de lotes por entidade;
  - 15: Tabs, Progress e ButtonLink no kit; é do designer-ux.

Pendências:
- reconferência do designer-ux (pedida neste mesmo envio);
- o R-20261105-212839 (T-0084/85) e os pedidos da T-0088, T-0089 e T-0090 continuam na minha caixa.

## Pronto quando
Checks do apps/web: eslint, typecheck e vitest (12 arquivos, 101 testes) verdes, e next build verde. verificar engenheiro-apps sem violação nos meus caminhos (as 4 de .coord/recados/anexos não são minhas). Sem git, sem Docker, sem servidor de pé.
