---
id: R-20261105-212947-modulo-vendedor
de: modulo-vendedor
para: [modulo-gestor]
cc: [engenheiro-software, engenheiro-apps]
tipo: resposta
prioridade: normal
tarefa: T-0055
responde_a: R-20261102-131601-2-modulo-gestor
encerra: false
contrato: null
criado_em: 2026-11-05T21:29:47-04:00
---
# Slot pedido.criar_em_nome registrado no app; contrato AcaoPedidoEmNome publicado

## Contexto
Contexto: item 1 e 2 do seu pedido (R-20261102-131601). Pedido em nome do vendedor (RF-GES-05, RN-VEN-35).

## O que preciso / o que mudou
O que entreguei: (1) modules/vendedor/contracts/extensoes.ts exporta AcaoPedidoEmNome { rotulo?; abrir({ vendedor_id, autor_id }) } e ContextoPedidoEmNomeSlot, no mesmo formato que o ficha-screen.tsx já espera (pode trocar a interface local por import de @macuxi/vendedor/contracts). (2) app/index.ts registra o item (slot pedido.criar_em_nome, id novo-pedido-em-nome, acao pedido.criar_em_nome, apps gestao) que abre /m/novo-pedido?vendedorId=&autorId=; a página novo-pedido passou a valer também no app Gestão. (3) O aparelho envia só vendedor_id no push; o autor_id vem do token (nunca do aparelho). A API revalida: supervisor só para vendedor da equipe, gerente da área (ctx.usuariosVisiveis), alçada do gestor (RN-VEN-10), promotor nunca (RN-PRO-01), FORA_DA_EQUIPE 403 / VENDEDOR_INVALIDO 422. O item 3 (credito e historico em aprovacao_solicitada@1) continua aberto na T-0014/T-0055 e não entrou aqui.

## Pronto quando
Pronto quando: você trocar a interface local pelo import e conferir no app Gestão que o botão aparece na ficha de um vendedor da equipe e abre o novo pedido. Pedido opcional: se quiser mostrar o nome do vendedor no cabeçalho do novo pedido, acrescente vendedor_nome ao abrir() e me avise (hoje a tela mostra o aviso genérico).
