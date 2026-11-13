---
id: R-20261112-205503-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0170
responde_a: R-20261112-204134-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T20:55:03-04:00
---
# Desenho das tarefas do consultor pronto (T-0170, Recados e tarefas)

## Contexto
Pedido do Alexandre no R-20261112-204134-alexandre, itens 2 e 3: o sino em todas as telas e a tela "Recados e tarefas", com tarefas cadastradas no BKO. Fiz só o desenho, na nuvem: nenhum código, migração, contrato ou tela mudou, então não colide com o trabalho sem commit do PC.

- **Arquivo:** `docs/desenho/tarefas-consultor.md`
- **Branch:** `nuvem/T-0170-tarefas-consultor` (commits 2bb1e7e e 24190ee): https://github.com/aloirr/macuxifdv/tree/nuvem/T-0170-tarefas-consultor

## O que o desenho decide
- **Módulo:** a tarefa fica no **Core**, ao lado das notificações. A lista "Recados e tarefas" é do Core e o Core é obrigatório, então não há licença nova nem leitura entre schemas.
- **Uma lista só, sem duplicar o modelo:**
  - a tarefa cria um aviso em `core.notificacao`, com `tipo = 'sistema'`, `subtipo = 'tarefa'` e a coluna nova `tarefa_id`;
  - o sino continua somando as notificações não lidas, e o push e a leitura são os de hoje;
  - a execução (prazo, situação, foto, pesquisa, cancelamento) fica em `core.tarefa` e `core.tarefa_destinatario`;
  - não uso um `tipo` novo porque ele quebraria o pull das notificações nos aparelhos com a v1.0.5.
- **Tabelas:**
  - `core.tarefa` e `core.tarefa_destinatario`, com as colunas comuns, RLS e índices de sync, de abertas e de acompanhamento;
  - as fotos vão em `plataforma.arquivo` (ADR 0010).
- **Contratos:** `CriarTarefa`, `EditarTarefa`, `CancelarTarefa`, `TarefaSync` (pull) e `ConclusaoTarefa` (push, comando com UUID do aparelho).
- **Eventos:** `core.tarefa.criada@1`, `core.tarefa.concluida@1` e `core.tarefa.cancelada@1`, sem título no payload.
- **Tarefa com pesquisa:**
  - ela se conclui sozinha pelo `pesquisa.resposta.registrada@1`, que o Core já consome;
  - o contrato da Pesquisa não muda;
  - entram 2 consultas novas da Pesquisa.
- **Offline:** a conclusão vai para a fila e é idempotente pelo `conclusao_id`. A conclusão que chega depois de um cancelamento é aceita, para não travar a fila, mas não conta nos números.
- **Permissões:**
  - criar, editar, cancelar e acompanhar: gerente, analista e admin, no escopo (RN-CORE-04);
  - concluir: vendedor e promotor;
  - o promotor recebe tarefas, mas nenhuma tarefa abre ou exige pedido (RN-PRO-01, pelo perfil, com guarda no domain).
- **RN:** 12 propostas, com números provisórios `RN-CORE-TAR-01..12`. Cobrem prazo vencido, consultor desligado, tarefa de equipe, tarefa cancelada, edição, cliente fora da carteira e módulo desligado.
- **Plano:** 12 passos, **cerca de 58 h**, de 3 a 4 dias úteis de esteira, para a v1.0.6.
  - Caminho crítico: gerente → ADR 0044 → banco-dados → modulo-core → telas → testes → corretor → revisão.
  - Risco principal: colidir com a frente do Início e do sino no PC. Os passos 7 e 8 têm de ir em sequência com ela.

## O que preciso
**Alexandre, decida (minha recomendação entre parênteses):**
- **D1.** O supervisor não entra no BKO (RN-CORE-33). Quem cria a tarefa? (Gerente, analista e admin no BKO; o supervisor pelo app Gestão numa entrega seguinte.)
- **D2.** Na tarefa de equipe, quem entra na equipe depois recebe? (Não: vale a equipe do dia da criação.)
- **D3.** Na tarefa de equipe, cada um faz a sua ou basta um? (Cada um faz a sua.)
- **D4.** O consultor pode desmarcar uma tarefa já sincronizada? (Não: só antes de sincronizar. Depois, o BKO reabre, em P1.)
- **D5.** A tarefa com foto e cliente exige check-in aberto no cliente? (Não.)
- **D6.** Lembrete de prazo por push? (Depois da v1.0.6.)
- **D7.** A tarefa de campanha do Promotor (RF-PRO-10) e a tarefa do consultor: juntar ou manter as duas? (Manter as duas na v1.0.6, com nomes distintos, e reavaliar.)

**Gerente:**
- depois das decisões, leve o RF-CORE-18 ao doc 02 e as RN ao doc 03, com o número final;
- crie as tarefas do plano (§9);
- faça o merge da branch no `main` (só doc).

## Pronto quando
As decisões D1 a D7 estiverem respondidas e as tarefas do §9 estiverem no quadro.
