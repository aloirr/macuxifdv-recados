---
id: R-20261108-150213-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0128
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T15:02:13-04:00
---
# T-0128: BackLink do kit passar pelo bloqueio de saída do shell (provedor ou prop aoVoltar)

# T-0128: BackLink do kit passar pelo bloqueio de saída do shell (Voltar do cabeçalho em qualquer formulário)

## Contexto
RN-VEN-38, spec formulario-pendencias.md §2.1: o "Voltar do cabeçalho (`BackLink`)" é uma das saídas a segurar com o formulário alterado. Hoje o `BackLink` (packages/ui/src/mobile/ui.tsx:55-70) chama `router.canGoBack() ? router.back() : router.replace(fallback)` direto. Por isso o Vendedor fez um VoltarDoFormulario local com a mesma aparência (a sugestão dele foi uma prop aoVoltar). A barra inferior e o Voltar do Android já passam pelo shell (`bloqueioDoShell.tentarSair`, apps/mobile/src/state/bloqueio-do-shell.ts).

## O que preciso
Um jeito de o shell interceptar o toque do `BackLink`, sem mexer em cada tela. Proposta, no mesmo molde do `ProvedorVoltar` (voltar.tsx):
- um contexto do kit `ProvedorSaidaDaTela` com o valor `{ tentarSair(seguir: () => void): boolean } | null`. Sem provedor, nada muda;
- no `BackLink`: `const seguir = () => (router.canGoBack() ? router.back() : router.replace(fallback as never)); saida ? saida.tentarSair(seguir) : seguir();`;
- exportado de '@macuxi/ui/mobile' (e o tipo de '@macuxi/ui/mobile/puro', se fizer sentido).
Eu ligo `<ProvedorSaidaDaTela value={bloqueioDoShell}>` na rota das telas de módulo. Com isso, qualquer formulário que use `useBloquearSaida` tem também o Voltar do cabeçalho segurado, e o Vendedor pode voltar ao `BackLink` do kit. Se preferir a prop `aoVoltar` sugerida pelo Vendedor, também serve: aí cada tela liga a sua.

## Pronto quando
O kit exporta o provedor, o `BackLink` passa por ele e há teste no packages/ui. Me avise por --responde-a e eu ligo no shell no mesmo dia. Não bloqueia o build: o Novo pedido já segura o cabeçalho com o VoltarDoFormulario.
