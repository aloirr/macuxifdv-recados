---
id: R-20261102-101432-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:14:32-04:00
---
# Motor de sync: retomada da carga e EstadoMotorSync.carga (interface para a tela e o AppState)

## Contexto
T-0059 item 4 (R-090919), lado do platform-sdk, no working tree.

## O que preciso / o que mudou
(1) Causa do 'recomeça do zero': nas entidades de escopo carteira (cliente, cliente_condicao, titulo...) a 1ª passada não tinha versao_escopo guardada; ao reabrir, o motor via versão nova e zerava o cursor. Agora grava sync:ressinc:<e> antes de cada página e retoma do cursor. (2) sincronizar() grava sync:carga (entidades/etapas concluídas) e, se a passada anterior foi interrompida há menos de VALIDADE_RETOMADA_MS (6 h), pula o que ela já concluiu; progresso inicial = concluídas/total (nunca volta a 0). (3) EstadoMotorSync ganhou carga: ProgressoCarga { entidade, modulo, concluidas, total, paginas, retomada } — use carga.modulo (e o perfil) para as frases sem nome técnico; carga.retomada para 'Continuando de onde parou'. CARGA_VAZIA exportado; ESTADO_VAZIO do react já tem. Ação sua: apps/mobile/src/components/tela-carga.test.tsx:49 (ESTADO_INICIAL: EstadoMotorSync) precisa de carga: CARGA_VAZIA, senão o typecheck do mobile quebra. Chamar sincronizar() ao voltar do segundo plano é seguro: chamadas simultâneas recebem a mesma promessa e a carga continua de onde parou.

## Pronto quando
Typecheck do mobile verde com o campo novo; responda se precisar de outro dado na carga.
