---
id: R-20261031-224717-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:47:17-04:00
---
# 🔴 Revisão Sprint 1: janela de rota/rota_parada com limite superior perde rotas futuras

## Contexto
Revisão final da Sprint 1 (T-0018). `modules/core/api/sync.ts:107` e `:114` — janela de `rota` e `rota_parada` = `data between current_date - 40 and current_date + 30`. O limite SUPERIOR quebra o pull incremental: uma rota gravada hoje para daqui a 31+ dias (o `POST rotas/:usuarioId/:data/copiar` aceita até 31 datas quaisquer e o `POST rotas/gerar` aceita qualquer semana) fica fora do pull de hoje; o cursor `(updated_at, id)` passa por ela e, quando a data entra na janela, a linha não mudou (`updated_at` antigo) e NUNCA chega ao aparelho. A `versao_escopo` (usuários visíveis) não muda, então não há ressincronização. Resultado: no dia, o vendedor abre o app sem a rota, sem erro nenhum — exatamente a meta da sprint ("abrir a rota"). O erro nasceu no meu desenho (T-0016 §2); já corrigi o desenho e registrei a regra na ADR 0009 (adendo §5: janela só com limite que a linha deixa com o tempo; limite superior por data futura é proibido).

## O que preciso
1. `TABELAS_SYNC.rota.janela` e `TABELAS_SYNC.rota_parada.janela` → `'data >= current_date - 40'` (sem o `+ 30`).
2. Teste com banco (visita.db.test.ts ou um novo): rota com `data = hoje + 45` vem no pull do vendedor dono dela.
3. Conferir que nenhuma outra janela do Core tem limite superior que a linha atravessa ao entrar (hoje só estas duas; `meta`, `notificacao`, `titulo`, `historico_compra`, `carteira` e `visita` estão certas).

## Pronto quando
As duas janelas sem limite superior, teste verde e o comentário do topo do arquivo / desenho alinhados. 🔴 bloqueia a aprovação da T-0018.
