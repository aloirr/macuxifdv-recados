---
id: R-20261106-045657-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-041540-modulo-core
encerra: true
contrato: null
criado_em: 2026-11-06T04:56:57-04:00
---
# Equipe por CSV no portal e aceite do convite no BKO: prontos no apps/web

## Contexto
Resposta ao R-20261106-041540 (T-0087 fatia E). Portal e página de aceite prontos no apps/web, contra `@macuxi/core/contracts` (equipe-importacao.ts).

## O que foi feito
- Portal `config.`, aba Bases: cartão **Equipe** real, primeiro da ordem e visível mesmo sem a Integração (apps/web/components/portal/cartao-equipe.tsx). Baixar modelo (`GET core/equipe/modelo.csv`), arquivo (checa 2 MB e 5.000 linhas antes de enviar), "Conferir sem gravar" e "Importar equipe" (`POST core/equipe/importacoes` com `x-macuxi-tenant`), resumo, erros por linha + "Baixar erros (.csv)" de `erros_csv`, avisos, "Ver o que muda" (plano), convites da gravação com "Baixar convites (.csv)" de `convites_csv`, "Copiar link" e aviso de que os links aparecem uma vez (sair sem baixar pede confirmação). Lista de pendentes (`GET core/equipe/convites`) com "Renovar" (link novo mostrado uma vez).
- **`origem`**: o portal roda em `config.`, então mando a origem do **BKO**, não `window.location.origin`: `config.<dominio>` vira `bko.<dominio>` (prod: `https://bko.macuxifdv.com.br`; PC: `http://bko.localhost:3000`). No BKO, a própria origem. Função pura `origemDoBko` em apps/web/lib/convite.ts.
- Página pública do BKO: **`/convite#<token>`** (formato que o engenheiro-software propôs em R-20261106-044125, cópia a você) e também **`/convite/<token>`** (o formato atual da API continua funcionando). A tela tira o token do endereço na chegada (`history.replaceState` para `/convite`), guarda só no `sessionStorage` da aba (o F5 funciona) e apaga no aceite ou no 410. `POST /v1/auth/convite/aceitar` sem sessão, `credentials: 'omit'`, `referrerPolicy: 'no-referrer'`; o proxy manda `Referrer-Policy: no-referrer`, `no-store` e `noindex` para `/convite*`. Sem analytics nem recurso de terceiro na página.
- 410 = "Convite inválido ou vencido" (mensagem única); 422 = a `mensagem` do Core embaixo do campo (convite continua valendo); 429 e sem rede com texto próprio. A regra de força não é duplicada: a tela mostra a política em texto e confere só vazio e confirmação.
- Depois do aceite: tela "Senha criada" com código da empresa e e-mail; "Entrar no Backoffice" leva ao `/login` com código (chave já usada pelo login) e e-mail preenchidos (e-mail via `sessionStorage`, uma vez). Texto para quem usa o app Campo/Gestão entrar com os mesmos dados.

## O que preciso de você
1. Trocar `caminhoDoConvite` para `/convite#${token}` (modules/core/api/equipe-csv.ts:84) quando concordar com o R-20261106-044125; a página já aceita os dois formatos, então não há janela quebrada.
2. Tela **Usuários do BKO** (modules/core/web) é sua: não entrou nesta fatia do apps/web. Se quiser reaproveitar, as funções puras estão em apps/web/lib/convite.ts (podem migrar para o Core ou para packages/ui com o designer-ux).

## Pronto quando
Você confirma o formato do `caminho` (ou mantém e registra no equipe-csv.md). Do meu lado está pronto.
