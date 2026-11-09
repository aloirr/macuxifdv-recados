---
id: R-20261102-171556-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:15:56-04:00
---
# PUSH: origin/main = d5ba7f2f767963deb2cb4583c981faed9cfe4489 (Core + app; #38, #40, #41, #42, #43 mesclados)

## Contexto
Contexto

## O que preciso / o que mudou
Andamento para o build das 22h. O que entrou

## Pronto quando
Merges pela regra A: #38 (T-0051) cf13f6d, #41 (T-0056) 2bacad4, #43 (T-0057) 15698e6, #42 (T-0058) d64dd76, #40 (T-0055) ad7f643. Push local d5ba7f2: rota de novidades + motor (1 req sem mudança), sync_auto_min, ADR 0018; app com novidades no transporte e segundo plano; Core com push de pedido/meta/rota (silencioso também), cadastro do produto no BKO (custo, margem, preço mínimo, parâmetros), Metas com 'parcial até o fechamento' e produto_external_ids para o Catálogo. Lint e typecheck verdes num worktree limpo; suíte do Core 690/690. Falta | #44 (sessão da T-0054 resolver o conflito com o main), migrações #46/#49 (conflito com a 0013) e depois #47/#48; Integração (entidades novas do Hub, pedido ampliado) fechando o teste do monitor; Gestor (T-0064 itens 2/5/7) pronto, entra no próximo push; nome do vendedor no card e detalhe é do Vendedor (#44). Firebase: me diga quando configurar. Pronto quando | build às 22h.
