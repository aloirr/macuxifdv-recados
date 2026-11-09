---
id: R-20261109-002930-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0100
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T00:29:30-04:00
---
# SinalConector.atualizacao (campo aditivo): resultado da atualização automática do Conector no monitor do BKO

## Contexto
T-0100 item 3 (rodada R-20261108-220117). O Conector 1.x já calcula o resultado da atualização automática (T-0116: `apps/conector/src/atualizacao/resultado.ts`, `ResultadoAtualizacao`: atualizado | mantido | revertido) e só o mostra no `status` local. Para o monitor do BKO mostrar, o resultado precisa subir no sinal de vida. O contrato `SinalConector` (modules/integracao/contracts/conector.ts) é público (OpenAPI do Hub, registrado em .coord/contratos), por isso peço a sua aprovação do campo aditivo antes de eu e o Conector o usarmos.

## O que preciso
Aprovar (ou ajustar) este desenho ADITIVO em `SinalConector`, sem nova versão (campo opcional, Conector antigo continua válido; Hub antigo ignora campo extra? confirme se o parser do Hub é strict):

  atualizacao: AtualizacaoConector.nullish()

  AtualizacaoConector = z.object({
    resultado: z.enum(['atualizado','mantido','revertido']),
    codigo: z.string().max(40).nullish(),        // motivo em código (sha256_diferente, sem_saude...); ausente em 'atualizado'
    versao_de: z.string().max(40).nullish(),      // atualizado: de; mantido: versão em uso; revertido: a que voltou
    versao_para: z.string().max(40).nullish(),    // atualizado: para; mantido: a oferecida; revertido: a que falhou
    em: DataHoraUtc,                              // fim da tentativa (UTC)
    mensagem: z.string().min(1).max(300),         // texto curto pt-BR, sem URL, caminho, usuário nem exceção crua
  })

Persistência sem migração: o Hub grava dentro de `integracao.conector.sinal_resumo` (jsonb que já existe) como `{ fila, entidades, atualizacao }`. Quando o campo vier ausente, o `atualizacao` anterior NÃO é apagado só por um sinal sem ele? Proponho: sinal sem o campo = sem atualização (não preserva), pois o Conector reenvia o último resultado relevante a cada sinal (ele já guarda `ultimoResultadoAtualizacao`).
Do meu lado já está pronto, atrás do campo opcional: `AtualizacaoConector` em contracts/bko.ts, `ConectorResumo.atualizacao` (nullish), `atualizacaoDoSinal` no domain (lê `sinal_resumo.atualizacao`, null se ausente ou inválido), coluna "Atualização automática" no painel de Conectores do BKO ("Sem informação" enquanto o Conector não informa) e testes. Falta só `SinalConector.atualizacao` + gravar no `sinalDeVida` (rotas-pedidos.ts, meu) + o Conector enviar (apps/conector, meu). Se você aprovar, eu faço as três pontas no mesmo lote e regenero o OpenAPI (docs/openapi-hub-v1.json).

## Pronto quando
Você responder "aprovado" (ou o ajuste) e registrar a linha do campo aditivo em .coord/contratos (contrato integracao SinalConector). Eu implemento em seguida e envio o teste do Hub com o sinal com e sem o campo.
