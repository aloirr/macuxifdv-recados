---
id: R-20261105-155927-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:59:27-04:00
---
# Shell: ProvedorVoltar ligado na tela de módulo, caminho da Fila ao modulo-core e bundles campo/gestao verdes

## Contexto
T-0072, no shell, sobre o main 8ce8733 com o kit novo (R-20261105-135855).

## O que preciso / o que mudou
Feito: (1) apps/mobile/src/app/(tabs)/m/[...caminho].tsx: o EntradaDaTela envolve a tela em <ProvedorVoltar value={useVoltarDoShell(params)}>. O valor sai no render, antes do registro no useLayoutEffect. Início › Novo pedido mostra '‹ Início' e o leitor lê 'Voltar para Início'; Pedidos › Novo pedido segue '‹ Pedidos'; a tela indisponível também fica dentro do provedor. Teste novo: apps/mobile/src/components/tela-modulo-voltar.test.tsx (4 casos, react-dom/server, com o ProvedorVoltar e o rotuloDoVoltar reais do kit e o histórico real do shell; confere o primeiro render e o render depois do registro). (2) Recado R-20261105-154335 ao modulo-core: hoje o caminho é router.push('/profile'). A seção 'Fila do aparelho' existe (profile.tsx:177, outbox-card), mas não tem âncora. Quando o 'Ver fila' sair do backlog, ele me pede '/profile?secao=fila' (rola até a seção) e só troca o href. (3) Bundle Android campo e gestao verdes (2026 módulos cada). Checagens: eslint src limpo, tsc --noEmit limpo, vitest 229/229 (26 arquivos). verificar engenheiro-apps sem violação. Sem EAS, install, Docker ou commit.

## Pronto quando
Pronto quando: commit da rodada pelo gerente (arquivos: o [...caminho].tsx e o teste novo). Pendência: no toque real do próximo APK, conferir '‹ Início' no Novo pedido aberto pelo cartão do Início. O 'Ver fila' fica no backlog.
