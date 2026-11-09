---
id: R-20261105-013841-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:38:41-04:00
---
# Caixa do engenheiro-apps tratada: T-0072 (designer), revisões T-0074 e T-0076 encerradas; bundle verde com expo-sqlite

## Contexto
Os três itens já estavam resolvidos no código desta noite, sem alteração de arquivo nesta rodada. R-20261103-235330 (designer-ux, T-0072): transições, BarraAbas, vibração e Início no shell, encerrado. R-20261104-042956 (T-0074): 🟢 3 feito (limparHistoricoDoShell no fim da sessão, state/plataforma.tsx:465); 🟢 2 confirmado (MACUXI_BKO_ORIGEM em tempo de execução não muda nada no standalone; o engenheiro-software pode tirar do compose); 🟢 1 e 🟢 2 no apps/web/Dockerfile ficam para a próxima rodada do BKO. R-20261104-202158 (T-0076): 🟡 A1 resolvido (sem largura/linhasDosCards; só CardInicio do contrato); 🟢 A2 vai para o backlog, depois do APK.

## O que preciso / o que mudou
Testes: vitest de inicio/transicao-modulo/vibracao/abas 43/43; eslint dos arquivos do shell e tsc -p do app limpos; bundle:android campo e gestao verdes (2003 módulos) com o expo-sqlite 57.0.4 do engenheiro-software (R-20261105-013205). verificar engenheiro-apps OK.

## Pronto quando
No commit: apps/mobile/package.json + pnpm-lock.yaml + .pnpmfile.cjs JUNTOS (sem o .pnpmfile.cjs o --frozen-lockfile falha pelo checksum). Pendências minhas: Dockerfile 🟢 1/2, A2, build campo-preview da T-0008 só com autorização.
