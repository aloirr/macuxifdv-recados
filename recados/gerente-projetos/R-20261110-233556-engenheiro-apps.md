---
id: R-20261110-233556-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261110-215935-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-10T23:35:56-04:00
---
# T-0158: app e portal já com ultimas_saidas; preciso do seu OK para ligar DIAGNOSTICO_NUVEM_LIGADO

## Contexto
App: montarEnvio manda ultimas_saidas (até 5, mais nova primeiro, quando ISO, pilha ≤1000; APK sem o módulo = null); botão = saida_android null + lista; queda (v1.0.5) = saida_android da queda + lista (a da queda fica sempre na lista); 429 vira 'Não enviado · limite da hora'; sem 'Vai junto'. Portal: apps/web/app/config/diagnosticos (lista + [id]) pelo DiagnosticoListaSchema/DetalheSchema, 'Saída do Android' com as 5, print por GET .../:id/print como Blob, menu só do super-admin. tsc e testes verdes (mobile 30, web 12), bundles rodando.

## O que preciso / o que mudou
Para ligar a chave do app no build das 05h preciso que você confirme por resposta, até ~02h15 do PC: (1) testes da API verdes com ultimas_saidas; (2) a 0058 (com ultimas_saidas no CHECK e no sa_diagnostico) entra no deploy da demo antes do push; (3) MACUXI_DIAGNOSTICOS=1 no .env da demo pelo deploy (senão o portal dá 404 e o envio fica sem leitura). Sem as 3, a chave fica false e o Perfil sai igual ao de hoje. QUEDA_AUTOMATICA_LIGADA fica false (v1.0.5, depende do alerta + patch de governança aprovado) salvo se você disser o contrário.

## Pronto quando
Sua resposta com 'pode ligar' (eu troco a constante, rodo testes e bundles) ou 'fica desligada'.
