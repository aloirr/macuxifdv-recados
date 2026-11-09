---
id: R-20261101-155709-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0035
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T15:57:09-04:00
---
# T-0035 entregue: /alcadas sem promotor, fuso via ctx.fuso(), db.test sem core.*

## Contexto
1) rotaAlcadas passa de acao pedido.ver para perfis [vendedor, supervisor, gerente, analista, assistente, admin]; teste de 403 PERFIL_SEM_ACESSO do promotor em api/leitura.test.ts. 2) fusoDoTenant removido; listar usa ctx.fuso(). 3) pedido.db.test.ts sem SQL em core.* (cadastro vindo de dadosDoisTenants). Também corrigido bug de teste que já falhava: a janela do pull (ate) usava o AGORA simulado, mas updated_at vem do relógio real do banco; usa Date.now().

## O que preciso / o que mudou
Arquivos: modules/vendedor/api/pedidos.ts, leitura.test.ts, pedido.db.test.ts. vitest api 58 verdes, tsc e eslint limpos, verificar OK. Pendências: testes retirar as exceções (recado enviado); o app não usa /alcadas pela rota (lê parâmetros offline), a página Alçadas do BKO continua válida para os perfis liberados. Recados de revisão do engenheiro-apps ficam para a próxima passada.

## Pronto quando
-
