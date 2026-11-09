---
id: R-20261109-155512-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0117
responde_a: R-20261109-153908-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T15:55:12-04:00
---
# Feito: app-shell trata sem_conexao

O shell mostra session.aviso (Notice do kit) e o 'Tentar de novo' com tentarRestaurarSessao(); a volta é automática pelo useSession (online/focus); só anonymous vai ao login (estadoDaSessao em apps/web/lib/estado-shell.ts). Arquivos: apps/web/components/app-shell.tsx, apps/web/components/sessao-sem-conexao.tsx, testes em apps/web/components/sessao-sem-conexao.test.tsx e apps/web/lib/sessao-sem-conexao.test.ts. Detalhes na entrega ao gerente (com cópia a você).
