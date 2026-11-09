---
id: R-20261104-234225-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0078
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:42:25-04:00
---
# T-0078 parcial pronta para lote: /v1/saude com banco e outbox, 5xx e alertas, log de métricas na API e no worker, alerta da VM e roteiro da carga; checklist precisa do seu caminho

## Contexto
T-0078 (robustez essencial). Parte do engenheiro-software pronta para lote; faltam as provas do banco-dados e do testes para fechar o checklist.

## O que preciso / o que mudou
Feito (desenho e checklist proposto em docs/desenho/T-0078.md):
- Observabilidade: apps/api/src/observabilidade.ts (novo: contagem por janela de 15 min, resumo da outbox, alertas BANCO_FALHA/ERROS_5XX/OUTBOX_ATRASADA/OUTBOX_PARADA); apps/api/src/app.ts (hook onResponse e /v1/saude com dependencias {banco, outbox}, metricas e alertas; sempre 200, cache de 10 s, prazo de 2 s; contrato SaudeRespostaSchema intacto); apps/api/src/banco.ts (resumoOutbox opcional, tolera a função ausente); apps/api/src/despachante.ts (nomesConsumidos exportado); apps/api/src/servidor.ts e worker.ts (linha tipo=metricas a cada MACUXI_METRICAS_INTERVALO_MS, padrão 5 min, warn com alerta). Request id já existia (X-Request-Id + request_id no log).
- Alerta na VM: scripts/deploy/demo/alerta-saude.sh (novo, só leitura; cron de 5 min, avisa só na mudança de estado no syslog e num webhook opcional em /opt/macuxi/alerta.env). Não instalado: entra com o stack isolado / próximo deploy.
- Carga: scripts/carga/sync-basico.mjs (novo, só leitura, sem push) e roteiro em docs/desenho/T-0078.md §2.
- Testes: apps/api/test/observabilidade.test.ts (9); apps/api inteira 147 verdes (55 de banco pulados, Docker desligado); tsc e eslint dos arquivos tocados limpos.

Pedido (dono do arquivo): docs/seguranca/checklist.md é seu em .coord/donos.json. Ou passe docs/seguranca/** para o engenheiro-software, ou crie o arquivo com o texto da seção 3 de docs/desenho/T-0078.md (✅/🟡 com a prova de cada item). Eu atualizo os 🟡 quando chegarem as respostas.

Pendências: banco-dados (R-20261104-232912: plataforma.resumo_outbox, conferência de RLS, retenção/exclusão), testes (R-20261104-233908: carga 20/50 aparelhos e log sem dado pessoal no sync). Itens 🟡 que dependem de decisão do dono do produto: termo de uso do dado do ERP (G3) e retenção de 30 dias do doc 04 contra os 7 do backup (G1). Varredura de segredo no CI (S3) fica 🟡 (pede ADR).

Sem dependência nova; nada de pnpm install; nada na VM nem no Postgres da demo.

## Pronto quando
Lote com servidor.ts e worker.ts inteiros (T-0078 + o lerConfigApp do d40267d, ambos sem dependência da VM); checklist criado no caminho que você decidir.
