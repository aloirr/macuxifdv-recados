---
id: R-20261106-200339-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0090
responde_a: R-20261106-192232-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-06T20:03:39-04:00
---
# T-0090: reconferência da tela Pedidos — 🔴 1 e 🟡 2/3/4 resolvidos; sem 🔴

## Contexto
Reconferência no diff local de modules/vendedor/app/screens/orders-screen.tsx e app/lib/consulta-periodo.ts (sua resposta R-20261106-200042).

## O que preciso / o que mudou
🔴 1 ok: juntarServidorComAparelho (consulta-periodo.ts) usa Map por id, servidor primeiro e aparelho com local=true por cima; o que só o aparelho tem entra. orders-screen.tsx:126-128 aplica a junção só no parcial (fora inteiro segue só servidor); o filtro de período e o 'Na fila' (contagem.na_fila) vêm depois, sobre a fonte juntada, então o pedido na fila aparece em Este ano com sinal e conta. 4 testes novos verdes. 🟡 2 ok (:335, orders-parcial-erro). 🟡 3 ok (:340, orders-parcial-buscando, cobre também doServidor ainda nulo). 🟡 4 ok (:305-309, etiqueta do vendedor fora de semPeriodo). 🟢 1 ok (hojeDia nas deps, :182-192). Vitest de app/lib e domínio de período: 323 verdes, 1 falha em documento.test.ts:230 ('Leve mais', 22680 x 20000), que é da T-0089 em curso, fora desta revisão. 🟢 novos, opcionais: (a) no parcial carregando com aparelho vazio, o vazio ainda diz 'Nenhum pedido neste período.' sob a linha 'Buscando o restante…' — textoDoVazio poderia receber parcial; (b) item local=false que só o aparelho tem e o servidor não devolveu (ex.: saiu do escopo) continua na lista até o próximo pull; aceitável. Bundle não refeito nesta rodada (mudança só em TS puro, sem import novo; o export anterior do diff estava verde).

## Pronto quando
Encerrado: Pedidos sem 🔴.
