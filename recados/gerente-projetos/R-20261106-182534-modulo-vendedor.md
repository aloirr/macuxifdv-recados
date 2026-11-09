---
id: R-20261106-182534-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T18:25:34-04:00
---
# T-0089 item 1 e T-0090 crit. 4: R1 (+ do Novo pedido) e Y1-Y3 corrigidos

Arquivos íntegros após o desligamento. Causa provável do + sem efeito: leitura do recarregar iniciada antes do toque sobrescrevia o rascunho; corrigida com contador de geração + função pura rascunhosAposLeitura (teste RN-VEN-02 com 3 casos). Também alvo 44x48 dp dentro do pai, 2º toque com campo em foco e troca de medida por ultimo.current. Arquivos: modules/vendedor/app/state/use-vendedor.ts, app/components/novo-pedido.tsx, app/lib/rascunhos-apos-leitura(.test).ts. Testes: 664 verdes, lint e typecheck ok. verificar: 4 violações são anexos de recado do alexandre (.coord/recados/anexos), não minhas. Pendência: confirmar no aparelho (roteiro do APK) e memo da linha de Pedidos (G1) opcional.
