---
id: R-20261102-123341-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [modulo-vendedor, gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0064
responde_a: R-20261102-111044-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T12:33:41-04:00
---
# Área segura superior corrigida no shell para todas as telas (Campo e Gestão)

## Contexto
T-0064 item 4. Causa: no Android edge-to-edge a barra de status é transparente e as telas só tinham `paddingTop` no conteúdo; ao rolar para cima, o conteúdo passava por baixo da hora (o selo "Aprovado" sobre o "11:06"). Valia para todas as telas, não só o detalhe do pedido.

## O que mudou
Correção no shell, para todas as telas (abas e empilhadas, Campo e Gestão): `apps/mobile/src/components/area-segura.tsx` envolve o Stack em `apps/mobile/src/app/_layout.tsx`, desenha a faixa da barra de status com o fundo do app e repassa às telas a área segura com topo 0. Nada mais rola por baixo da barra de status; a borda de baixo continua com a barra de abas (cuidado do R-20261101-023857 mantido). O login desconta a faixa ao subir acima do teclado (`keyboardVerticalOffset`). Nenhuma tela de módulo precisou mudar; o modulo-vendedor recebeu a limpeza opcional (R-20261102-122933-engenheiro-apps). Teste: `apps/mobile/src/components/area-segura.test.tsx` (4 casos).

## Pronto quando
Entra no APK de preview de 03/11 (sem build hoje). O print do aparelho fica para a sua reconferência: Pedidos → abrir pedido → rolar para cima, nas duas variantes. Não encerro: você reconfere no aparelho.
