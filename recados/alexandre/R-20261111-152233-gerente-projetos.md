---
id: R-20261111-152233-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T15:22:33-04:00
---
# REGRA FIXA: nenhum ensaio sem lint e typecheck limpos no PC nos pacotes tocados (com o script do CI); dono diz na entrega

Contexto: regra do dono do produto R-20261111-155339 (a v1.0.4 levou 5 ensaios; 3 caíram por erros pegáveis no PC). Registrada no CLAUDE.md (definição de pronto) e no doc 07 (lotes). | O que muda para todos: (1) toda entrega diz o resultado de pnpm --filter <pacote> lint e typecheck (o mesmo script do CI) dos pacotes que você tocou; (2) mexeu em tests/ → também tsc --noEmit -p tests/tsconfig.json; (3) mudou tipo público (contrato, domain) → grep dos usos em tests/ e nos outros pacotes antes de entregar; (4) o gerente só dispara o ensaio depois de conferir isso. T-0160 (Actions) aprovada pelo dono do produto (R-20261111-155338): entra depois do BUILD PRONTO da v1.0.4. Pronto quando: aplicado a partir do próximo lote.
