---
id: R-20261108-125643-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0128
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T12:56:43-04:00
---
# T-0128: contrato do ponto de extensão useBloquearSaida (barra inferior e gesto do Android)

# Contexto
T-0128 (RN-VEN-38). O Novo pedido do Vendedor já abre a folha "Sair do pedido?" no Voltar do cabeçalho, no botão Voltar do Android (aba Itens) e no Cancelar do Resumo (modules/vendedor/app/screens/new-order-screen.tsx). Falta a barra inferior (Início, Rota, Clientes, Pedidos, Mais) e o gesto Voltar do Android entre telas, que são do shell.

# O que preciso
Um ponto de extensão reutilizável exportado pelo shell, com este contrato (a tela já o consome por um adaptador sem efeito, modules/vendedor/app/lib/bloquear-saida.ts):

useBloquearSaida(alterado: boolean, aoTentarSair: (prosseguir: () => void) => void): void

- Com alterado = true e a tela em foco, o shell NÃO segue para o destino (toque na barra inferior, gesto Voltar) e chama aoTentarSair(prosseguir).
- A tela decide (abre a folha) e só chama prosseguir() quando liberar (Salvar sem pendência ou Descartar confirmado); em Continuar editando ou Salvar com pendência, não chama e a saída é cancelada.
- Com alterado = false, o shell navega direto, sem chamar a tela. Desmontar a tela remove o bloqueio.
- Também preciso do mesmo ponto para a retomada depois que o sistema fecha o app: já resolvi no Início pelo card do Vendedor (RetomadaDoPedido), então não precisa de nada do shell para isso.
Quando o hook existir, diga de onde importar; troco o corpo do adaptador por um re-export e apago o arquivo.

# Pronto quando
O hook está exportado e testado no shell (barra inferior e gesto), com o caminho de import informado. Obs.: o import duplicado em cards-inicio.tsx do seu aviso R-20261108-125304 já foi corrigido.
