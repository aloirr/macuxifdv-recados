---
id: R-20261108-105907-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0129
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T10:59:07-04:00
---
# T-0129 (Frente F): Boleto para cliente inadimplente não volta mais para Pix / À vista

## Contexto
T-0129 (Frente F, teste de campo 08/11): ao escolher Boleto para cliente inadimplente o app voltava sozinho para Pix / À vista. Causa: o efeito de new-order-screen.tsx chamava rascunhoComPagamentoPadrao a cada mudança; ao escolher a forma o prazo fica em branco e o "padrão" regravava Pix / À vista (troca silenciosa). A RN-VEN-13 no domain já mandava para aprovação, mas o app não refletia isso no Resumo.

## O que foi feito
- domain/pagamento.ts: formasDaLista (forma fora do cadastro do cliente vem desabilitada, com motivo) e avaliarPagamentoComVencido (título vencido nunca bloqueia forma/prazo; prazo a prazo vira destino aprovação, à vista direto; prazo acima do médio segue recusado). Testes escritos antes em domain/pagamento.test.ts.
- app/lib/pagamento-pedido.ts: padrão só em rascunho novo (sem forma e sem prazo); nunca troca escolha do vendedor; opcoesDeForma lista todas as formas, as não aceitas desabilitadas com motivo.
- Tela (novo-pedido-abas.tsx, new-order-screen.tsx): aviso "<Forma> indisponível: Este cliente não aceita esta forma." e, com título vencido acima do limite e prazo a prazo, calculo.nivel = supervisor, então o Resumo mostra "Vai para o supervisor."
- api/pedidos.ts:354 intocado.
- Verificações: vitest do Vendedor 955 verdes (100 de banco pulados, sem Docker); typecheck e lint rodados; coord verificar sem violações.

## Roteiro de reteste (3 passos)
1. Abrir Novo pedido para Mercadinho São Jorge (C5002, prazo médio 45, título vencido há 12 dias); em Detalhes ver o alerta de crédito; escolher Boleto: fica em Boleto, Prazo "Escolha" em vermelho, sem voltar para Pix.
2. Escolher prazo até 45 dias (ex.: 28/56): aceito; prazo acima de 45 aparece desabilitado. Forma que o cadastro não aceita aparece desabilitada, com o motivo escrito abaixo.
3. Ir ao Resumo: "Vai para o supervisor.", sem pendência de pagamento; Pix / À vista continua direto. Print antes/depois no APK de teste da rodada.
Regressão para o testes: troca de forma e prazo, cliente sem título vencido, pedido em nome, edição de pedido existente.
