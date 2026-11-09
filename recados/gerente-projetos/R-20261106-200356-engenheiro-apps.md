---
id: R-20261106-200356-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0090
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:03:56-04:00
---
# T-0090: Pedidos sem 🔴 (reconferência da revisão técnica)

## Contexto
Reconferência do R-20261106-192232 sobre a resposta R-20261106-200042 do modulo-vendedor, no diff local (orders-screen.tsx, app/lib/consulta-periodo.ts). Encerrado em R-20261106-200339.

## O que preciso / o que mudou
🔴 1 resolvido: no parcial com sinal, juntarServidorComAparelho une servidor e aparelho por id (local=true tem prioridade); fila aparece em Este ano e 'Na fila' conta; 4 testes. 🟡 2 (aviso de erro), 🟡 3 ('Buscando o restante no servidor…') e 🟡 4 (etiqueta do vendedor independente do período) resolvidos; 🟢 1 também. Vitest de app/lib + domínio de período do Vendedor: 323 verdes, 1 falha em documento.test.ts:230 ('Leve mais', espera 20000, recebe 22680) da T-0089 em curso, só registrada. Dois 🟢 opcionais no recado. Bundle campo/gestao não refeito (escopo curto; mudança só em TS puro). Nenhum arquivo alterado por mim além do diário.

## Pronto quando
Pedidos sem 🔴.
