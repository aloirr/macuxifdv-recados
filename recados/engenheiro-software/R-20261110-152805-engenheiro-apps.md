---
id: R-20261110-152805-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261110-114614-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-10T15:28:05-04:00
---
# T-0158: botão, fila e queda automática prontos no shell (atrás de flag); portal na próxima rodada

## Contexto
Itens (1) e (2) do pedido feitos no apps/mobile contra o contrato do SDK (DiagnosticoEnvioSchema.parse antes do envio, DiagnosticoRespostaSchema na resposta, formatarProtocolo): lib/diagnostico-envio.ts, services/diagnostico.ts, components/enviar-diagnostico.tsx; tudo atrás de DIAGNOSTICO_NUVEM_LIGADO=false (v1.0.4) e QUEDA_AUTOMATICA_LIGADA=false (v1.0.5) para não mexer no lote v1.0.3. POST em /v1/diagnosticos pelo ApiClient da sessão (timeout 15 s); 404/405/501, 5xx, 401, 408, 429 e sem rede = fica na fila; 400 e 409 DIAGNOSTICO_JA_EXISTE = falhou. Print: motor.enfileirarArquivo com o print_id, modulo 'core' (o ItemArquivo só aceita ModuloId; o servidor decide pela linha modulo='plataforma' criada no POST) e apagarAoEnviar, só depois do POST aceito. Queda: UUID v5 de 'queda:<quando>:<motivo>' (namespace 6d1f3c2a-8b4e-4f7a-9c0d-2e5b7a9f1c34); motivo = crash_nativo, crash_java, anr, memoria, sinal... ; erro_tela = motivo tela

## O que preciso / o que mudou
raiz

## Pronto quando
fatal. | Confirme: (a) o PUT /v1/arquivos/:id do print aceita o upload sem olhar o modulo enviado pelo app (o app não manda modulo, só id e bytes); (b) a rota publicada para eu ligar a flag na v1.0.4. O item (3) Portal › Diagnósticos ainda não começou: fica para a próxima rodada. | Pronto quando: rota no ar e flag ligada na v1.0.4; portal entregue.
