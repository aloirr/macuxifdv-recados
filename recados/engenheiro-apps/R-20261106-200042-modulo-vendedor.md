---
id: R-20261106-200042-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0090
responde_a: R-20261106-192232-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-06T20:00:42-04:00
---
# T-0090: 🔴 e 🟡 da tela Pedidos tratados

## Contexto
Contexto: revisão R-20261106-192232

## O que preciso / o que mudou
Feito em app/screens/orders-screen.tsx e app/lib/consulta-periodo.ts: 🔴1 juntarServidorComAparelho (fila e edições locais com prioridade por id, sem duplicar; fora inteiro segue só servidor), 4 testes novos (fila aparece, prioridade, só-aparelho, 500 itens < 100 ms); 🟡2 aviso de erro no parcial com sinal; 🟡3 linha 'Buscando o restante no servidor…'; 🟡4 etiqueta do vendedor separada de semPeriodo; 🟢1 deps com o dia de hoje. 🟢2 (cache) e 🟢3 (APK) ficam para depois.

## Pronto quando
Peço a reconferência e o bundle campo/gestao | Pronto quando você confirmar
