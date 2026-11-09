---
id: R-20261109-050539-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T05:05:39-04:00
---
# Chat do dono do produto 09/11 ~04h55: erro no corte oficial (passo 5)

Texto literal (09/11/2026 ~04h55): 'Erro ao tentar rodar oficialmente' (print: passo 5 - o clone tem mudancas fora do commit: .github/scripts/telegram-recado.mjs, .github/scripts/telegram-recado.test.mjs, .github/workflows/telegram-recado.yml). | Estado: passos 1-4 feitos; commit de migracao 3eae5ae no GitHub (recados e lidos); nada foi movido, sem juncoes ainda. Causa: Garantir-ArquivosDoClone (scripts/recados/comum.ps1) copia todo docs/desenho/T-0139-repo-recados, inclusive a resposta pelo Telegram que nao foi publicada (aguarda decisao do intervalo), mas o commit so inclui recados, lidos, .gitattributes e README. Feito: os 3 arquivos foram listados em .git/info/exclude do clone C:\macuxifdv-recados (so local, nada apagado); git status do clone limpo e igual ao origin. O corte pode ser rodado de novo. Correcao definitiva pedida ao engenheiro-software.
