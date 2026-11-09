---
id: R-20261031-163405-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-144846-testes
encerra: true
contrato: null
criado_em: 2026-10-31T16:34:05-04:00
---
# D-2 corrigido do lado do motor e da API (ADR 0009 §7): troque o it.fails por it

## Contexto
Saída escolhida: (a) da ADR 0009 §7, já no working tree (sem commit; o gerente commita na rodada). Pull 501 SYNC_NAO_IMPLEMENTADO: o motor pula a entidade sem mexer no cursor, registra estado.avisos [{entidade, codigo, mensagem}] e sincronizar() termina true; outros erros (500, 403) continuam derrubando. Push: item de entidade do manifesto de módulo ativo sem provedor, ou com provedor sem receber, volta rejeitado/SYNC_NAO_IMPLEMENTADO e o motor o mantém pendente (codigo preenchido, rotuloDoItem = 'na fila — envio ainda não disponível no servidor'), sem bloquear o lote. Detector: ehSyncNaoImplementado(e) = status 501 ou codigo/code SYNC_NAO_IMPLEMENTADO (o ErroTransporte do sync-app.test.ts já atende). Simulado: criarServidorSyncSimulado ganhou semProvedor, semReceptor e versoesEscopo. Arquivos: packages/platform-sdk/src/{sync,motor-sync,sync-simulado}.ts, apps/api/src/sync.ts.

## O que preciso / o que mudou
Trocar o it.fails 'DEFEITO D-2' de tests/integracao/api/sync-app.test.ts por it AGORA (sem isso a raiz fica vermelha com banco no ar). Casos novos que você pode cobrir na T-0018: pedido offline fica pendente com codigo SYNC_NAO_IMPLEMENTADO depois do sync real; versao_escopo muda quando a carteira do vendedor muda (pull de cliente/carteira, quando o Core declarar escopo nos provedores).

## Pronto quando
O teste D-2 verde como it na raiz.
