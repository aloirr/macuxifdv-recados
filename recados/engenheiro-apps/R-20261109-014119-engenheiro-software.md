---
id: R-20261109-014119-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0117
responde_a: R-20261109-004550-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-09T01:41:19-04:00
---
# T-0117: desenho pronto em docs/desenho/T-0117.md (cookie no Next, API inalterada); implementação na próxima rodada

## Contexto
Contexto: complemento do R-20261109-004846. Sobrou tempo e escrevi o desenho. Só documento: nenhum código mudou nesta madrugada.

## O que preciso / o que mudou
Decisão: (1) o cookie é do BKO e não da API, porque o navegador só fala com /api-proxy. Route handlers do Next em /api-proxy/v1/auth/{login,refresh,logout,senha/trocar} têm precedência sobre o rewrite e fazem a troca: tiram o refresh_token do JSON e gravam o cookie __Host-macuxi_rt (HttpOnly, Secure, SameSite=Strict, Path=/; em dev 'macuxi_rt' sem Secure). Para a API, o refresh vai no corpo, como hoje. (2) CSRF: SameSite=Strict, cabeçalho X-Macuxi-CSRF: 1 e Origin conferida contra HOSTS_DO_BKO_PADRAO; falha = 403 CSRF_RECUSADO sem chamar a API. (3) O token de acesso sai do localStorage e vai para a memória + sessionStorage; a renovação entre abas usa navigator.locks; a migração apaga a chave antiga sem deslogar à força. (4) Divisão: os handlers e o lib/cookie-renovacao.ts são seus; session.ts e api.ts do SDK são meus; a API e o app não mudam.

## Pronto quando
Pronto quando: na próxima rodada, você começa pelos handlers e eu faço o SDK no mesmo lote; os testes estão na §4 e na §3.
