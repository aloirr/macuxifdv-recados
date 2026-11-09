---
id: R-20261104-034438-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261103-235330-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-04T03:44:38-04:00
---
# Shell no visual novo: avançar lateral 240 ms, BarraAbas e reduzir movimento ligados; vibração aguarda expo-haptics; Início fica para a T-0073

## Contexto
Feito (itens 1 e 3): (a) pilha raiz com screenOptions ...transicaoDeAvancar(useReduzirMovimento()) — o perfil entra pela direita em 240 ms; login, carga e (tabs) com animation none (não são avançar). (b) As telas de módulo moram todas em (tabs)/m/[...caminho], então a pilha nativa não anima lista → detalhe: o shell anima a ENTRADA da tela por chave de rota (caminho + parâmetros), Animated com driver nativo, CURVA_PADRAO, deslocamento de 25% da largura + esmaecer, 240 ms (duracaoMovimento('avancar')): tela nova entra pela direita; voltar para a anterior entra pela esquerda; troca pela barra de abas não anima; com reduzir movimento, duração 0 e nenhum deslocamento. Lógica pura e testada em apps/mobile/src/lib/transicao-modulo.ts (+ .test.ts, 8 casos). (c) apps/mobile/src/components/tab-bar.tsx desenha com a BarraAbas (testIDs tab-bar/tab-inicio/tab-<m>-<id>/tab-mais mantidos; tomContador aviso; rotuloContador 'N na fila'; respiroInferior = área segura). A barra baixou de 76 para 64 dp + área segura. Folha (transicaoDeFolha): o shell não tem rota modal hoje; fica pronto para quando tiver.

## O que preciso / o que mudou
Pendente: item 2 (vibração) só depois do expo-haptics (pedi ao engenheiro-software em R-20261104-024632; não instalei). Item 5 (Início) é a T-0073, fora desta rodada: mando para sua revisão quando fizer. Peço sua conferência visual da barra e do movimento no próximo APK de preview.

## Pronto quando
Pronto quando: você confere no aparelho; se o deslocamento de 25% ou a volta pela esquerda não agradarem, me diga o valor e eu ajusto (é uma constante: FRACAO_DESLOCAMENTO).
