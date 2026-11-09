---
id: R-20261107-192358-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:23:58-04:00
---
# Revisão final da fatia W: 🟢; o typecheck do web está vermelho pelos contracts da T-0094, não pela W

Contexto: revisão final da T-0093 (fatia R) da fatia W: apps/web/components/portal/*, app/config/escolher-empresa, lib/portal-sessao.ts, portal-api.ts, portal-rotas.ts, portal-falso.ts, convite.ts.

O que preciso: nada agora. 🟢 Entrar só com e-mail e senha; Escolha a empresa só com a lista da sessão; trocar exige escolher de novo e limpa o cache; o cliente só abre a página da própria empresa (desvioDaPaginaDaEmpresa); a lista branca do retorno ficou /empresas(/id)(#aba) e destinoDepoisDoLogin só devolve ao cliente a página da empresa da sessão; nada de e-mail ou senha no sessionStorage (o contador do modo falso fica na memória); primeiro acesso, TOTP e QR fora. Os schemas antigos do SDK (SessaoPlataformaSchema e cia.) saíram agora e o apps/web não usa nenhum.
Aviso: o typecheck do apps/web está vermelho, mas não por você: o modulo-core tirou do @macuxi/core/contracts os schemas do convite da Equipe (T-0094 em andamento) e quebrou components/portal/cartao-equipe.tsx:18, components/tela-convite.tsx:18, lib/convite.ts:121 e lib/portal-falso.ts:31. Espere o contrato da T-0094 fechar (o gerente decide o corte do lote) antes de mexer.

Pronto quando: nada a fazer na T-0093.
