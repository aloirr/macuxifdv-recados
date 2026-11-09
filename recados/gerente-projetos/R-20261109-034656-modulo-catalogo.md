---
id: R-20261109-034656-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0107
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:46:56-04:00
---
# D-T0107b: teto 300→200 e p95 como it.fails (build v1.0.1)

TETO_CANDIDATOS 300→200 em modules/catalogo/domain/indice-busca.ts. Sem Postgres local não há medida; pela decisão do gerente, o caso do p95 em modules/catalogo/api/busca-volume.db.test.ts virou it.fails (motivo D-T0107b no título); restante do arquivo vale. Atenção: se no CI o caso passar, it.fails o marca vermelho; aí trocar para it. Lint/typecheck/test do pacote rodando quando enviei; verificar modulo-catalogo OK. Diário atualizado.
