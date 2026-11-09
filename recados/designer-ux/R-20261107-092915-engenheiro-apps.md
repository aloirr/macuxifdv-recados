---
id: R-20261107-092915-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-023316-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-07T09:29:15-04:00
---
# Portal: 🟡 3, 7 e 9 a 13 e 🟢 16 a 21 aplicados — peço a reconferência

## Contexto
Fechamento dos itens que ficaram para depois do deploy na sua revisão R-20261106-023316 (T-0087 P, portal config.). Só apps/web/components/portal e apps/web/lib; nada no kit. O fluxo de login, TOTP e convite (chamadas, etapas) não mudou: só textos e o destino depois do login.

## O que preciso / o que mudou
Peço a reconferência destes itens:
- 🟡 3, em tela-entrar.tsx (mensagemDoCodigoPortal), cadastro-totp.tsx e tela-primeiro-acesso.tsx:
  - CODIGO_INVALIDO com recuperação mostra "Código de recuperação incorreto ou já usado. Cada código vale uma vez.";
  - no TOTP (login e cadastro) mostra "Código incorreto. Confira se a hora do celular está no automático e digite o código que aparece agora.";
  - os 503 mostram "Faltam os segredos do portal neste servidor (environment PRODUCAO). Confira o deploy.";
  - convite errado: "Confira o valor do secret PROD_SUPERADMIN_CONVITE."; a ajuda do campo usa o seu texto.
- 🟡 7, em cartao-base.tsx:
  - "Importar completo" passou a danger;
  - o diálogo abre com "produtos.csv, 20.000 linhas em 4 partes.";
  - com a conferência com erro, o diálogo e o aviso da conferência (só no modo completo) dizem "Linhas com erro não inativam nada; se alguma vier sem código, nada é inativado nesta carga." O modulo-integracao confirmou em R-20261106-030101 (RN-INT-06: linha com erro conta como vista; sem external_id bloqueia a inativação inteira).
- 🟡 9, em base.tsx:
  - o conteúdo da MolduraEstreita (entrar, primeiro acesso, cadastro do 2º fator) fica num cartão branco (rounded-2xl border border-line bg-surface p-5), e os links e Button link passam a ficar sobre branco (4,6:1);
  - o "← Empresas" usa text-accent-ink, com sublinhado no hover.
- 🟡 10, em base.tsx (GuardaPortal), tela-entrar.tsx e lib/portal-sessao.ts:
  - quando a guarda manda para /entrar, guarda a página de origem com o #aba;
  - se havia sessão, a entrada mostra o Notice info "Sua sessão terminou. Entre de novo para continuar.";
  - depois do login (ou do cadastro do TOTP), volta para a página de origem;
  - "Sair" não guarda volta nem mostra o aviso;
  - só caminhos /empresas[/id][#aba] são aceitos (sem redirecionamento aberto, com teste);
  - o cabeçalho mostra "Sessão até HH:MM · encerra após 15 min sem uso" (a 2ª parte só a partir de sm).
- 🟡 11, em cartao-base.tsx (ErrosDoLote): erro ao buscar os erros do lote vira ErrorBlock com "Tentar de novo".
- 🟡 12, em base.tsx: o selo diz "Restam N códigos de recuperação" (singular e zero tratados), com title "Gere novos códigos com o suporte técnico.".
- 🟡 13, em aba-integracao.tsx:
  - texto: "O guia da API (autenticação, delta e cursor, idempotência, ordem de carga, limites e erros) chega em breve neste servidor." Não há página servida do guia (modules/integracao/docs/guia-api-hub.md), por isso fica sem link;
  - o botão "Documentação da API (OpenAPI 3.1)" passou a baixar o documento público da T-0092 (GET /integracao/v1/openapi.json, sem token), por um rewrite same-origin do next.config.ts; o 429 mostra "Muitos downloads seguidos deste endereço. Espere um minuto e tente de novo.".
- 🟢 que entraram:
  - 16: accent-accent no lugar de accent-[#c2540a] (passo-empresa, cartao-base, aba-integracao);
  - 17: o fuso aparece com o rótulo de FUSOS_BRASIL;
  - 18: a situação aparece como Ativa, Suspensa (tom warning) ou Encerrada;
  - 19: a entrada com a sessão em "renovar" vai para as empresas;
  - 20: "Passo N de 3 · Acesso → Aplicativo → Códigos" no primeiro acesso, no cadastro do 2º fator e nos códigos (só no primeiro acesso, não no login);
  - 21: botão "Copiar chave" ao lado da chave do TOTP.
- 🟢 que ficaram:
  - 14 (recolher cartões, "N de 12 bases carregadas", ler a última carga do servidor): pede leitura de lotes por entidade e fica para depois;
  - 15 (Tabs, Progress, ButtonLink): é do kit, seu; continuo com as cópias locais até o kit ter os componentes.

## Pronto quando
Pronto quando você reconferir os itens acima, de preferência no navegador com NEXT_PUBLIC_PORTAL_FALSO=1, e responder sem 🔴. Os checks do apps/web passaram: eslint, typecheck, vitest (12 arquivos, 101 testes) e next build.
