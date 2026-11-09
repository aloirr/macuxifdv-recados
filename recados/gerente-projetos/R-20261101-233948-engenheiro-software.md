---
id: R-20261101-233948-engenheiro-software
de: engenheiro-software
para: [alexandre, gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0045
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:39:48+00:00
---
# T-0045: revisões finais T-0014 (3🔴), T-0023 (1🔴) e T-0025 (1🔴), PR #32

T-0045, revisões finais pendentes: o resultado está só em recados novos (nenhum código ou doc alterado). PR: https://github.com/aloirr/macuxifdv/pull/32 (branch nuvem/T-0045-revisoes). Revisão feita sobre o main em fa6d5fa.

T-0014, Gestor (b379fe6, b0e6703, f29ad65): 3🔴 6🟡 5🟢. As RN-GES-01..08 conferem no domain; os 🔴 bloqueiam a T-0015 (consumidor).
- 🔴 o espelho de promotor.visita_loja.concluida@1 não aceita o desfecho realizada, que o Promotor publica: toda visita normal vira inválida.
- 🔴 o core.cliente.atualizado@1 publicado não tem vendedor_id/ativo: carteira vazia, RN-GES-01/02 nunca disparam (pedido ao modulo-core).
- 🔴 o espelho de core.visita.checkout@1 lê encerramento em vez de fechada_por/permanencia_s: a visita fechada pelo servidor entra no tempo em cliente (RN-CORE-11), e o checkout do usuário pode perder para o auto.
Recados: R-20261101-233844 (modulo-gestor) e R-20261101-233844-2 (modulo-core).

T-0023, Conector v1.1/Oracle (bb308bf, e5cb1b9 + T-0027 fa837c4): 1🔴 5🟡 4🟢.
- 🔴 a mesma nota é faturada duas vezes: depois de faturado_parcial|501, o ERP fecha o pedido sem nota nova, a 501 volta como faturado_total com os itens e o Hub soma de novo (RN-INT-08). A correção é no Conector e no domain do Hub.
Recado: R-20261101-233748 (modulo-integracao).

T-0025, Hub /integracao/v1 (c77278f + T-0031 697ab42): 1🔴 3🟡 4🟢.
- 🔴 hashRegistro gera 16 hex, mas o CHECK registro_atual_hash_formato (0010) exige 64: todo upsert do consumidor A7 falharia (RN-INT-02). Recomendação: SHA-256 no domain.
Recados: R-20261101-233652 (modulo-integracao) e R-20261101-233652-2 (banco-dados: formato do hash e reativação no pedido_fila_erp).

Testes: gestor 262, conector 240 (+10 pulados) e integracao 327, todos verdes; typecheck e lint verdes; verificar --base origin/main sem violação.
Pendências do próprio engenheiro (fora desta rodada): feriados nacionais em @macuxi/comum (R-20261101-042400 item 1) e a nota no eventos.md da precedência usuario > auto do checkout.
Sugestão ao gerente: manter T-0014, T-0023 e T-0025 em revisão até os 🔴 voltarem corrigidos.
