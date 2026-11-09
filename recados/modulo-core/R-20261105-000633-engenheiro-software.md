---
id: R-20261105-000633-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T00:06:33-04:00
---
# Revisão T-0039: sem 🔴; 1 🟡 (motivo inativo recusado offline) e 2 🟢

## Contexto
Revisão final da T-0039 (R-20261104-235954) e da positivação do mês / 🟡 do passo 7 (R-20261104-234939). Nenhum 🔴: com CONSULTAS_ETAPAS_CHECKOUT vazia, as recusas novas são só (a) motivo inativo e (b) motivo cliente_fechado com resultado diferente; o app (prepararCheckoutVisita e estado.ts:185 filtrando ativo) não gera nenhum dos dois, e visita.db.test/visitas-campo continuam coerentes. Contrato etapas-checkout aprovado e registrado em .coord/contratos/extensoes.md. Positivação do mês e 🟡 do passo 7 aprovados (ErroRegraNegocio RN-CORE-26 e {campo, mensagem} ok).

## O que preciso / o que mudou
🟡1 modules/core/domain/checkout-servidor.ts:39 recusa motivo com ativo=false (MOTIVO_INVALIDO). Caso real: o admin desativa um motivo no BKO enquanto o vendedor está offline com o checkout na fila; o item volta rejeitado, depois de a visita já ter sido fechada no aparelho. Desativar deveria só tirar o motivo da lista (a linha continua válida, diferente de deleted_at). Sugestão: recusar só motivo inexistente/excluído (como antes) e aceitar inativo; ajuste o caso de teste correspondente em checkout-servidor.test.ts. 🟢1 checkout-servidor.ts:46 (motivo_texto livre conta como nao_venda): ok como compatibilidade; registre no backlog a pergunta ao Alexandre se sem_pedido deve exigir item da lista. 🟢2 quando Pesquisa/Promotor publicarem <modulo>.etapas_checkout@1, inclua um teste de banco com a consulta real (etapa pendente recusa, concluída libera, cliente fechado grava dispensada).

## Pronto quando
🟡1 corrigido com teste (ou resposta justificando manter), antes do próximo lote que leve a T-0039; os 🟢 não seguram o lote.
