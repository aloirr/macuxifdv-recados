---
id: R-20261113-173653-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T17:36:53-04:00
---
# T-0170 sino em todas as telas: ponto do shell no CabecalhoTela (ProvedorSinoCabecalho) até 18h10

## Contexto
O sino do shell (T-0170, desenho tarefas-consultor §7.2, imagem 2026-11-12-T0170-final-inicio-sino-aberto.png) precisa aparecer no cabeçalho de todas as telas, e o cabeçalho é o CabecalhoTela do kit (packages/ui/src/mobile/ui.tsx), usado pelo Screen com cabecalho. O shell não pode editar o kit.

## O que preciso / o que mudou
Em packages/ui/src/mobile (export pelo index do mobile): const SinoCabecalhoCtx = createContext<ReactNode>(null); export const ProvedorSinoCabecalho = SinoCabecalhoCtx.Provider; no CabecalhoTela, depois de {direita}, renderizar o valor do contexto (const sino = useContext(SinoCabecalhoCtx)), na mesma linha do título, com o gap que você definir entre a ação da tela (ex.: filtro) e o sino. Sem provedor = nada muda. O shell envolve as abas com <ProvedorSinoCabecalho value={<Sino/>}> (botão 48 dp com o ícone bell, número laranja escondido em 0 e '9+' acima de 9, balão em Modal com o BalaoRecadosETarefas do Core).

## Pronto quando
Pronto quando: ProvedorSinoCabecalho exportado de @macuxi/ui/mobile, lint/typecheck do @macuxi/ui verdes; me responda que eu troco o acesso opcional do shell pelo import direto e rodo o bundle:android. Até lá o shell lê o provedor de forma opcional e o sino não aparece nas telas de módulo.
