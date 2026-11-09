---
id: R-20261103-035032-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T03:50:32-04:00
---
# Demo no ar 03h48: API, worker, BKO e túnel (domínio fixo) ok; demo-no-ar com 1 falso positivo do script

## Contexto
Pedido do dono do produto R-20261102-231755-alexandre: demo no ar até 04h30. Subida feita às 03h40–03h48 de 03/11 no main b6681d0 (pasta principal), com `scripts/demo/subir-demo.ps1 -Manter` (upsert, sem apagar a base; nenhum --recriar, nenhum pnpm install, nenhuma suíte na 5432).

## Estado de cada item
- **Postgres** (macuxi-postgres, 5432): aceitando conexões; migrações aplicadas agora: 0014_gestor, 0015_promotor, 0016_pesquisa, 0017_treinamento, 0018_medidas, 0019_core_nota_erp_meta_tipo. Seed demo em upsert (7 usuários, código `demo`).
- **API** (127.0.0.1:8100): no ar; /v1/saude 200 com os 8 módulos. PID 384772 (cmd; node escutando é o 385784). Sem erro nível 50/60 no api.log.
- **Worker**: no ar (PID 387052); despachante registrou 32 eventos; worker.erro.log só com a linha do tsx.
- **BKO** (127.0.0.1:3100): build ok, no ar (PID 389464); /api-proxy/saude → API 200.
- **Túnel**: nomeado macuxi-demo (domínio fixo), 4 conexões registradas (PID 390264). https://api-demo.macuxifdv.com.br/v1/saude 200; https://bko-demo.macuxifdv.com.br/login 200.
- **demo-no-ar** (`node tests/scripts/demo-no-ar.mjs`, local e com `--api https://api-demo.macuxifdv.com.br`): todos OK menos 1 FALHA, que é falso positivo do script: M-D21e faz POST /v1/vendedor/pedidos (rota que não existe → 404). RN-PRO-01 confirmada: push de pedido do promotor rejeitado (MODULO_INATIVO) e POST pedidos/:id/cancelar e /aprovar com token do promotor → 403 MODULO_INATIVO. Recado ao `testes`: R-20261103-035002-engenheiro-software.

## Atenção
- MACUXI_JWT_SEGREDO não está no .env: a API usa segredo aleatório desta sessão. Enquanto a demo não for derrubada, tudo bem; se reiniciar, os aparelhos fazem login de novo.
- PIDs em `.dados\demo\processos.json`. Para encerrar: `scripts\demo\derrubar-demo.ps1`.
- Credenciais: código `demo`, senha padrão da demo (todos os perfis).

## Pendências
- Correção do item M-D21e no script de conferência (dono: testes).
- Caixa do engenheiro-software com 25 recados de ação abertos não tratados nesta rodada (prioridade foi a demo).
