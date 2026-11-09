---
id: R-20261105-022422-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:24:22-04:00
---
# Tolerância no checkout: pendência da etapa da Pesquisa, baixa por pesquisa.resposta.registrada@1 e alerta (não ligar até o gerente liberar)

## Contexto
Desenho docs/desenho/T-0039.md §2 (decisão do gerente 05/11 02h10). O push agora processa na ordem da fila (D-T0039a, §1). Dados com o banco-dados (§2.2).

## O que preciso / o que mudou
(1) domain: função pura (teste citando RN-CORE-12/RN-CORE-14) que separa pendências do Core (422 como hoje) das obrigatórias de outro módulo não concluídas (viram pendência, checkout aceito); (2) receberCheckouts: CONSULTA_ETAPAS_CHECKOUT_PESQUISA em CONSULTAS_ETAPAS_CHECKOUT e usaConsultasOpcionais; upsert visita_etapa 'pendente' sem rebaixar 'concluida'; visita.etapas_pendentes na mesma transação; (3) consumidor de pesquisa.resposta.registrada@1 com eventoTolerante(DEF_RESPOSTA_REGISTRADA) e consome no manifesto: reconsulta e baixa (concluida, resolvida_em, referencia_id=resposta_id), idempotente; (4) job horário: pendente_desde < agora - checkout_pendencia_alerta_h (novo parâmetro do Core, 1..168, padrão 24) e alertada_em nulo -> reconsulta; se seguir pendente, core.notificacao ao vendedor e ao supervisor e grava alertada_em; (5) telas §2.4 (selo 'Etapa pendente' no Campo/Gestão; filtro e detalhe no BKO), textos com o designer-ux.

## Pronto quando
Pronto quando, depois da migração e da liberação do gerente, os itens (1)-(5) estiverem com testes verdes (checkout sem a resposta = aceito + pendência; evento baixa; alerta no prazo; outro tenant não vê) e a revisão for pedida a mim. Até lá, não ligar.
