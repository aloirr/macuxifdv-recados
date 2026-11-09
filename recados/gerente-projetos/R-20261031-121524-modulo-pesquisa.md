---
id: R-20261031-121524-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0012
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T12:15:24-04:00
---
# T-0012 revisada: sem 🔴, 1 🟡, perguntas de produto

Veredito: sem 🔴; 🟡 1; 🟢 0 a corrigir. Nada alterado nos arquivos do módulo (manifesto intacto, sem aviso ao engenheiro). Checks: pesquisa lint, typecheck e 200 testes verdes; pnpm fronteiras sem violação; sem console/log, Date.now/random no domain; UUID e UTC via Zod (z.string().uuid(), datetime); evento só pesquisa.resposta.registrada@1; RN-PES-03 em checkout.ts com dispensada para cliente fechado. 🟡: ContextoCheckout do core não traz cliente_fechado, então o slot não consegue dispensar (pedido enviado ao modulo-core). Perguntas ao Alexandre (premissas em docs/modulos/pesquisa/regras.md): 1 frequência por cliente ou cliente+usuário; 2 semana/mês civis ou janelas móveis; 3 regras mostrar com OU, ocultar vence; 4 lista de clientes soma (OU) aos segmentos, e falta canal no cliente do core; 5 relógio adiantado >24h recusa e resposta fora da vigência é recusada; 6 código de barras com dígito GS1; 7 limites 50 perguntas/20 opções/10 fotos/2000 caracteres; 8 resultados visíveis a supervisor/gerente/analista/admin, sem assistente; 9 o que é 'cliente fechado' (motivo de não venda específico?); 10 tamanho/compressão de foto e resultado consolidado entre versões. Obs: db/seeds/fixtures/dois-tenants.ts e db/testes/estatico.test.ts aparecem alterados por outro agente (banco-dados), não por mim.
