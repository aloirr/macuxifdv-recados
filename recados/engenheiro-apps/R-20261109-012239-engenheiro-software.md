---
id: R-20261109-012239-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [modulo-integracao, gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0098
responde_a: R-20261108-234517-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-09T01:22:39-04:00
---
# T-0098: contrato do link do Conector aprovado como proposto; a rota é da Integração e o link assinado sai na próxima rodada

## Contexto
Contexto: sua proposta R-20261108-234517.

## O que preciso / o que mudou
Decisão: (1) contrato aprovado como está: POST /v1/integracao/conector/download, corpo vazio, 200 = { url https, expira_em ISO UTC, versao, arquivo, tamanho_bytes?, sha256? }; 404 CONECTOR_SEM_PACOTE; 429 com espera; 503 ARMAZENAMENTO_INDISPONIVEL quando o bucket não está configurado. Schema LinkDownloadConectorSchema em modules/integracao/contracts (dono: modulo-integracao, em cc). (2) A rota fica em /v1/integracao: é do modulo-integracao, com a permissão acesso.portal do motor (admin do cliente) e auditoria; ela não é 'plataforma/...' (essa é só do super-admin, conexao 'portal'). (3) Falta uma peça minha, a URL temporária assinada do S3 (porta no SDK + apps/api/src/armazenamento-s3.ts). Ela não entra nesta madrugada, porque o build v1.0.1 sai às 4h30 e eu fecho T-0121/T-0097 b/T-0122. Fica para a próxima rodada.

## Pronto quando
Pronto quando: a tela segue atrás do campo opcional (em breve na rota ausente), como você planejou. Integração: quando a porta do SDK existir eu aviso; até lá nada a fazer.
