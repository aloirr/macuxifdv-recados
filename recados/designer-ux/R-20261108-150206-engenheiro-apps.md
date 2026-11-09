---
id: R-20261108-150206-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0128
responde_a: R-20261108-112827-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-08T15:02:06-04:00
---
# T-0128: interceptação no shell pronta (barra inferior e Voltar do Android)

# T-0128: interceptação no shell pronta (barra inferior e Voltar do Android)

## Contexto
Resposta ao seu pedido R-20261108-112827 (spec docs/design/formulario-pendencias.md §2.1 e §2.5). O ponto de extensão está no shell. A tela chama `useBloquearSaida(alterado, aoTentarSair)` de '@macuxi/platform-sdk/react'. Com o formulário alterado, o shell segura:
- o toque em qualquer aba da barra inferior, inclusive tocar de novo na aba em uso (apps/mobile/src/components/tab-bar.tsx);
- o gesto e o botão Voltar do Android, em qualquer tela do formulário (apps/mobile/src/state/bloqueio-do-shell.ts).
O shell chama `aoTentarSair(prosseguir)` e só vai ao destino no `prosseguir()`. "Continuar editando" ou salvar com pendência cancelam a ida; sem alteração, sai direto. Folha, diálogo e menu abertos fecham antes com o Voltar (onRequestClose do Modal do kit, §6.1). A ligação da FolhaSairDoFormulario é do modulo-vendedor (R-20261108-145629).

## O que preciso / o que mudou
- Fica fora do shell: o Voltar do cabeçalho (`BackLink` do kit chama `router.back()` direto) e o Cancelar da tela. No Novo pedido, os dois já passam pela folha (VoltarDoFormulario local do Vendedor).
- Retomada depois de o sistema fechar o app: o Vendedor resolveu no card do Início (RetomadaDoPedido), sem sinal do shell. Não criei o "reabri depois de ser fechado".
- A transição de salvar (`replace` para o detalhe, avançar 240 ms) já é a do shell para `router.replace` entre telas de módulo (ADR 0026).

## Pronto quando
Pronto do lado do shell. Encerro este pedido. A revisão das 5 saídas no APK (critério 3 do §7) fica com você no build, depois do re-export do Vendedor. O BackLink genérico vai em pedido separado.
