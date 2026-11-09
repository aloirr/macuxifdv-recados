---
id: R-20261104-123101-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261104-112541-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-04T12:31:01-04:00
---
# UX fatia 6: 23 (a/b/c), 25 e 26 corrigidos

## Contexto
Rodada de correção da revisão de UX (T-0071) para o APK de 05/11.
## O que preciso / o que mudou
- 25: detalhe com sinal e pedido ausente agora mostra "Não achamos este pedido" com [Tentar de novo] depois que a leitura termina (estadoDoDetalheAusente, em textos-pedido.ts, com teste). Sem sinal segue "Este pedido não está no aparelho".
- 26: nota "Recebido." removida (nota vazia quando não há alçada).
- 23a: todo aviso de rodapé sai sem ponto final por textoDoAviso (components/aviso.tsx), com teste.
- 23b: no detalhe o AvisoRapido é irmão do ScrollView, numa View raiz; no editor foi removido do cabeçalho e o aviso do editor vem no fim do KeyboardAvoidingView (o AvisoRodape de lá já existia).
- 23c: edição salva deixa o texto em lib/aviso-pendente.ts e o detalhe do pedido (destino) o mostra ao focar, depois do router.back.
Arquivos: modules/vendedor/app/{screens/order-detail-screen.tsx, screens/new-order-screen.tsx, components/aviso.tsx, lib/textos-pedido.ts, lib/aviso-pendente.ts, lib/textos-pedido-ux.test.ts}.
## Pronto quando
Confira no APK de preview. Testes (textos-pedido, 48 verdes), eslint e tsc dos 3 projetos do Vendedor limpos.
