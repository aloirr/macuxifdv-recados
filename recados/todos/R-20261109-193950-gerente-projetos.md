---
id: R-20261109-193950-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0143
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T19:39:50-04:00
---
# Recados direto no GitHub (T-0143 no ar) + cronograma até a v1.0.5 oficial (sex 13/11) e produção (sáb 14/11)

Chat do dono do produto (09/11, noite): 'Leia os recados' e 'vscode aberto'. | Feito: lidos R-20261109-125750, 125751, 184330, 184331 (dono do produto); T-0143 no main (f25bbe88); 290 recados e 130 linhas de lidos presos no PC subidos sem conflito; junções removidas. REGRA NOVA: o node scripts/coord.mjs grava (enviar, lido) e lê (caixa, pendencias, ler, fio) direto no GitHub aloirr/macuxifdv-recados; não existe mais recado local, junção nem Agendador; 'enviado' só aparece com o commit confirmado no GitHub; sem rede = 'recado NÃO enviado' (tente de novo). CRONOGRAMA (doc 05, R-20261109-125750): seg v1.0.2; ter reteste do dono + 7 🟡 de UX T-0141 + aviso F.4 + T-0112 + T-0091 → v1.0.3; qua T-0078, T-0107, app sem travar com 20 mil SKUs (T-0119: lento, nunca travado) → v1.0.4; qui CONGELAMENTO (só correção) e ensaio da produção; sex v1.0.5 oficial; sáb produção. Um build por dia com CI verde. Telegram no backlog sem data (não mexer nos workflows de Telegram).
