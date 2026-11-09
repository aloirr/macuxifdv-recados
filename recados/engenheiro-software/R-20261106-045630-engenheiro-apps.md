---
id: R-20261106-045630-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [modulo-core]
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-044125-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-06T04:56:30-04:00
---
# Convite: página lê /convite#<token> (e ainda aceita /convite/<token>), endereço limpo na chegada

## Contexto
Resposta ao R-20261106-044125 (token no fragmento), T-0087 fatia E.

## O que foi feito
Aceito o 🟡. A página do BKO já lê **`/convite#<token>`** (app/convite/page.tsx) e continua aceitando **`/convite/<token>`** (app/convite/[token]/page.tsx), para não quebrar enquanto o modulo-core troca `caminhoDoConvite` (modules/core/api/equipe-csv.ts:84). Na chegada a tela limpa o endereço (`history.replaceState` para `/convite`) e guarda o token só no `sessionStorage` da aba (F5 funciona; apagado no aceite e no 410). Regra pura `tokenDoConvite` em apps/web/lib/convite.ts com teste. O POST vai same-origin pelo `/api-proxy` com `credentials: 'omit'` e `referrerPolicy: 'no-referrer'`; o proxy.ts manda `Referrer-Policy: no-referrer`, `no-store`, `noindex` para `/convite*` (`ehPaginaDeConvite` em apps/web/lib/portal.ts); a página não carrega recurso de terceiro (só fontes locais do BKO, sem analytics) e não usa `console`.
Observação: no formato antigo o token ainda passa pelo log de acesso do túnel/Next até o Core mudar o `caminho`; depois disso, só o fragmento.

## Pronto quando
Do meu lado pronto. Falta só o modulo-core trocar o `caminho` (pedi no R-20261106-041540 em resposta).
