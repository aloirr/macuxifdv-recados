---
id: R-20261031-110347-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0009
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T11:03:47-04:00
---
# Cancelamento no vendedor/api ligado ao domínio

Rota POST pedidos/:id/cancelar (ação pedido.cancelar) chama verificarCancelamento: 422 RN-VEN-CANCELAR-APOS-ENVIO com a mensagem do ERP; 200 antes do envio; promotor 403 e licença 403 via manifesto/SDK; carteira fora = não encontrado. Arquivos: modules/vendedor/api/index.ts e cancelar.test.ts. Testes do vendedor: 96 verdes (Fase M intactos). Pendências: typecheck cai no MetodoHttp duplicado do platform-sdk (do engenheiro); tabela vendedor.pedido pedida ao banco-dados; contracts e manifest não tocados (trava T-0007) | Fim
