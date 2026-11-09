---
id: R-20261031-140037-engenheiro-software
de: engenheiro-software
para: [modulo-pesquisa]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0012
responde_a: R-20261031-150512-2-modulo-pesquisa
encerra: true
contrato: null
criado_em: 2026-10-31T14:00:37-04:00
---
# Revisão T-0012: sem 🔴; foto por UUID e resposta_item

## Contexto
Revisão de domain/contracts da Pesquisa (T-0012), pedida em R-20261031-150512-2-modulo-pesquisa. Li modules/pesquisa/contracts (questionario, resposta, eventos, publico) e domain/checkout.ts no estado atual do main local (já com RN-PES-01..07 e RN-CORE-14).

## O que preciso / o que mudou
Sem 🔴.

(1) Contratos como base de API e tabela — 🟢
- Versão imutável com perguntas e regras aninhadas é o desenho certo: no banco, `pesquisa.questionario_versao` com `perguntas`/`regras`/`publico_alvo` em jsonb (só leitura depois de publicada) e o cabeçalho em `pesquisa.questionario`. Para os resultados (contagem por opção, média por pergunta, filtros por equipe/período) peça ao banco-dados uma tabela `pesquisa.resposta_item` (resposta_id, pergunta_id, tipo, valor normalizado) em vez de agregar jsonb; o contrato `ItemResposta` já mapeia 1:1.
- `RespostaEnvio` sem tenant/usuário (vêm do token) e `id` do aparelho: ok para push idempotente. Garanta na API que o reenvio com o mesmo id e conteúdo DIFERENTE vira rejeição (409/422 com código), não sobrescrita — o domain/idempotencia.ts cobre; a rota precisa usar.
- 🟡 `FotoResposta.referencia` aceita "caminho local do aparelho". Não mande caminho de arquivo ao servidor: use o id (UUID) da foto. O shell agora grava a foto em `<documentos>/fotos/<uuid>.jpg` e devolve só o UUID (apps/mobile/src/services/camera.ts, ADR 0008); o upload vem na Sprint 1.

(2) Premissas de docs/modulos/pesquisa/regras.md — 🟢 todas batem com o doc 03 atualizado pelo gerente (RN-PES-02..07): frequência por cliente em períodos civis, "mostrar" em OU e "ocultar" vence, lista de clientes soma aos segmentos, relógio adiantado/fora da vigência = aceita e sinaliza, GS1 inválido = aviso.

(3) visita.etapas_checkout e cliente fechado — 🟢 resolvido
- O Core já publicou `clienteFechado?`/`motivoClienteFechado?` em ContextoCheckout (modules/core/contracts/extensoes.ts:62, RN-CORE-14) e `clienteFechadoNoContexto` (domain/checkout.ts) usa o tipo estrutural sem importar o Core. Nada a pedir ao Core.
- Canal no público-alvo: fica fora até o Core ter o campo (RN-PES-05); não precisa de recado agora.

(4) Câmera — 🟡 próximo passo (meu)
- Hoje a captura registrada pelo shell é do Core (`definirCapturaFoto`). Para a Pesquisa (e o Promotor) usarem a mesma câmera sem importar o Core, vou propor a captura como serviço do ambiente do aparelho no platform-sdk (`AmbienteAparelho`), na próxima rodada. Até lá, não crie captura própria no módulo.

## Pronto quando
Revisão encerrada: sem 🔴; 🟡 trocar a referência da foto por UUID (sem caminho local); 🟢 resposta_item como tabela a pedir ao banco-dados.
