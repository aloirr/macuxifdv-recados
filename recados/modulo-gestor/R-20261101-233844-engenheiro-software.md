---
id: R-20261101-233844-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: [gerente-projetos]
tipo: revisao
prioridade: alta
tarefa: T-0014
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:38:44+00:00
---
# Revisão final T-0014: 3🔴 (espelhos de eventos divergem do publicado: promotor realizada, core.cliente.atualizado, checkout fechada_por), 6🟡, 5🟢

Revisão final da T-0014 (Gestor: b379fe6, b0e6703 e f29ad65), feita no main em fa6d5fa. As RN-GES-01..08 conferem no domain. Os 🔴 são espelhos de eventos em contracts/eventos-consumidos.ts que divergem dos payloads publicados depois pelos donos. Eles bloqueiam a T-0015 (consumidor), não o que já foi mergeado. Responda com --responde-a e --encerra quando tratar os itens. As pendências que são minhas (feriados nacionais em @macuxi/comum, R-20261101-042400 item 1, e a nota no eventos.md) eu respondo no seu recado.

Resultado: 3🔴 6🟡 5🟢 — testes 262 verdes (@macuxi/gestor; typecheck e lint limpos; nenhum Date.now/new Date() sem relógio injetado em domain nem em teste; fronteiras ok: só @macuxi/comum, @macuxi/platform-sdk e @macuxi/core/contracts)

Achados (o código das RN-GES-01..08 confere; os 🔴 são espelhos de eventos que divergem dos payloads publicados DEPOIS do merge — quando a T-0015 ligar o consumidor, os eventos reais viram 'invalido' ou são lidos errado):
1. 🔴 modules/gestor/contracts/eventos-consumidos.ts:174 — promotor.visita_loja.concluida@1: o espelho aceita desfecho concluida|loja_fechada|acesso_negado|nao_finalizada, mas o Promotor publica realizada|loja_fechada|acesso_negado (modules/promotor/contracts/eventos.ts, T-0040). Toda visita normal vira 'invalido' e somem trade, visitas_loja, ruptura_recorrente, visita_curta e fotos_sem_gps (RF-GES-10, RN-PRO-02/07). Correção: importar os schemas de @macuxi/promotor/contracts (a fronteira permite) e apagar o espelho.
2. 🔴 modules/gestor/contracts/eventos-consumidos.ts:25 — core.cliente.atualizado@1 publicado é { cliente_id, campos[], origem } (modules/core/contracts/eventos.ts:47); o espelho exige vendedor_id e ativo. Todo evento real fica 'invalido', a carteira fica vazia e RN-GES-01/02 nunca disparam. Correção: ler a carteira do contrato público do Core (modules/core/contracts/carteira.ts ou rota de API) ou o Core acrescentar ao @1 os campos opcionais vendedor_id, ativo, frequencia_visita e na_carteira_desde (recado separado ao modulo-core). Sem isso o alerta cliente_sem_visita não funciona.
3. 🔴 modules/gestor/contracts/eventos-consumidos.ts:47-53 e domain/projecao.ts:185-189 — core.visita.checkout@1 publica fechada_por usuario|auto e permanencia_s, não encerramento. O campo extra é descartado e o padrão 'normal' entra: visita fechada pelo servidor conta no tempo em cliente (fere RN-CORE-11). E o contrato (eventos.md, Sprint 1) diz que o checkout do usuario substitui o auto e nunca o contrário; a projeção mantém o carimbo maior, então um checkout real do aparelho com ocorrido_em anterior perde para o auto. Correção: importar VisitaCheckoutSchema do Core, tratar fechada_por=auto como automatico, usar permanencia_s, dar precedência ao usuario e cobrir a ordem auto→usuario e usuario→auto em teste.
4. 🟡 domain/projecao.ts:246 e contracts/eventos-consumidos.ts:228 — promotor.tarefa.concluida@1 grava por tarefa_id, mas no payload publicado tarefa_id é a campanha (repete em todas as lojas) e a chave da execução é execucao_id. Cada campanha conta uma vez só, e tarefas_concluidas sai menor. Correção: chave execucao_id (vem junto com o import do item 1).
5. 🟡 contracts/eventos-consumidos.ts:66 — core.meta.definida@1 já é publicado (T-0020) como { usuario_id, periodo, indicador, valor, ... }; o espelho { mes, meta_cents } não confere e o evento continua em EVENTOS_PROPOSTOS e fora do consome. Correção: importar MetaDefinidaSchema, filtrar indicador=venda_cents, chave usuario|periodo, entrar no consome do manifest.ts (RN-CORE-21/22).
6. 🟡 domain/alertas.ts:186-189 — o alerta pedido_aguardando_aprovacao não usa o mesmo filtro da fila (aprovacoes.ts:100, NIVEIS_DO_GESTOR): solicitação de nível analista (fila do BKO do Vendedor, RF-VEN-09) gera alerta crítico para a equipe, que não vê nem decide o item. regras.md §5 diz que a pendência segue a seção 6. Correção: exportar e reaproveitar o filtro (nível supervisor|gerente) e cobrir em teste.
7. 🟡 domain/equipe.ts:33 — um ciclo de superior_id em qualquer ponto do tenant lança RangeError em construirArvore, e quebra escopoDoUsuario, fila, ranking, registrarDecisao e pedido em nome de todos os gestores. regras.md §3 diz que dado corrompido não pode travar o painel. Correção: tirar da árvore só os membros do ciclo (com aviso para o BKO) e manter o resto do escopo; teste com ciclo num ramo vizinho.
8. 🟡 Falta teste de conformidade com os publicadores: nenhum teste do Gestor faz parse de um payload válido no schema do dono, e foi assim que os itens 1 a 5 passaram. Correção: importar de modules/<dono>/contracts os eventos já publicados (core, vendedor, promotor, pesquisa, treinamento; o vendedor.pedido.faturado@1 ainda é cópia em :107) e deixar espelho só para core.rota.dia_planejado@1, que ainda não é publicado.
9. 🟡 domain/projecao.ts:172-176 — entradas_carteira fica com o mínimo por cliente|vendedor: se o cliente vai de A para B e volta para A, a carência da RN-GES-02 conta da entrada antiga de A (regras.md: trocar de vendedor reinicia a carência). Correção: guardar o instante da troca mais recente para o vendedor atual (o primeiro evento do trecho contínuo atual).

Sugestões:
10. 🟢 domain/alertas.ts:219 — compara registrado_em como texto; ISO com e sem milissegundos ordena errado (o contrato aceita os dois). Correção: usar instanteMs.
11. 🟢 domain/horario-comercial.ts:29 e :63 — Intl.DateTimeFormat e feriadosNacionais são recriados a cada dia do laço (msUteis, somarDiasUteis). Correção: cache do formatador por fuso e do conjunto de feriados por ano.
12. 🟢 domain/alertas.ts:202 — a mensagem traz as horas de espera, então toda reconciliação gera atualizar para todo vencido. Correção: atualizar só quando muda a hora inteira, ou tirar o número da mensagem.
13. 🟢 domain/projecao.ts:166 e painel/ranking — o estado único copia processados a cada evento (O(n²)) e as funções varrem o tenant inteiro (o ranking fica em O(membros × pedidos)). Correção: na T-0015, documentar em regras.md o recorte que cada função precisa (janela do alerta, mês do painel) para a API carregar só isso.
14. 🟢 domain/painel.ts:263 e alertas.ts:162 — meta e ritmo (RN-CORE-22) usam seg–sex com só os feriados do tenant, sem dias_semana e sem os feriados nacionais; está documentado, mas fica inconsistente com o prazo da RN-GES-03. Resolver quando @macuxi/comum tiver os nacionais (item da lista abaixo).

Dono diferente:
- modulo-core (modules/core/contracts/eventos.ts): item 2, acrescentar ao core.cliente.atualizado@1 os campos opcionais vendedor_id, ativo, frequencia_visita e na_carteira_desde (compatível, continua @1), ou confirmar que a carteira vem por contrato de leitura.
- engenheiro-software (packages/comum/src/calendar.ts e .coord/contratos/eventos.md): pendências minhas — feriados nacionais em @macuxi/comum (R-20261101-042400 item 1, base para o item 14 e para apagar domain/feriados.ts); registrar no eventos.md a decisão do item 2 e a precedência usuario>auto do checkout para todos os consumidores.

Pontos positivos: domain puro e bem testado (projeção idempotente e testada fora de ordem, prazo em dias úteis com fuso e horário de verão, desempate total no ranking, RN-GES-04/07/08 fiéis); o manifesto separa a leitura do tenant (painel_tenant.ver) das ações da equipe.

Pronto quando: os espelhos dos eventos já publicados forem trocados por imports de modules/<dono>/contracts, com teste de parse de payload real (itens 1 a 5 e 8); os 🟡 6, 7 e 9 tiverem teste citando a RN; e os 🟢 estiverem feitos ou no backlog.
