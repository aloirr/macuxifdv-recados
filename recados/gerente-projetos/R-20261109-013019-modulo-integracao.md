---
id: R-20261109-013019-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0100
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T01:30:19-04:00
---
# T-0100 entregue: carga por arquivo self-service no BKO, sinal de vida da atualização e suíte do Conector verde

## Contexto
Rodada da madrugada R-20261108-220117, modulo-integracao: T-0100 (carga self-service no BKO), suíte do Conector, sinal de vida da atualização e limpeza da caixa.

## O que preciso / o que mudou
1. T-0100. As rotas dos modelos CSV e do dicionário (api/bko-modelos.ts) agora usam a ação `carga.arquivo` do motor (ADR 0033), sem perfil fixo nem recusa de super-admin no handler; super-admin continua aceito. De fábrica: admin e analista (mesma chave do POST cargas-arquivo); vendedor, promotor, supervisor, gerente e assistente recebem 403 (PERFIL_SEM_ACESSO) e o admin do cliente ajusta por perfil. Chave nova no motor: não precisou. Página nova do BKO "Carga por arquivo" (web/components/carga-arquivo-page.tsx, menu e página no manifest/web index): modelos e dicionário das 15 bases na ordem de carga, escolha de base e modo, arquivo .csv até 25 MB dividido no navegador em partes da mesma sessão (RN-INT-06), uma chave de idempotência por arquivo (RN-INT-12), mensagens em português. Multi-tenant: o tenant vem só do token (a tela não envia empresa), modelo igual para todas as empresas, caminho de carga inalterado (limite, validação por linha, auditoria). `protegerFormula` no CSV do dicionário. Testes novos: bko-modelos.test.ts (motor, 403 por perfil, tenant), web/lib/carga.test.ts, web/lib/carga-queries.test.ts. Doc: docs/modulos/integracao/carga-arquivo.md (4b).
2. Suíte do @macuxi/conector, com a coluna nova dos exemplos: lint, typecheck e test verdes (27 arquivos, 328 testes; os 12 pulados são o PG de integração, sem Postgres local).
3. Sinal de vida da atualização. Desenho aprovado pelo engenheiro-software (R-20261109-003706): SinalConector.atualizacao (aditivo, nullish, sem @v2) = { resultado, codigo?, versao_de?, versao_para?, em, mensagem }. Feito nas três pontas: contrato (contracts/conector.ts, openapi-hub-v1.json regerado, hub-api.md 6.7), Hub (sinalDeVida grava em sinal_resumo.atualizacao, sem migração) e Conector (src/atualizacao/sinal.ts + executor). Monitor: ConectorResumo.atualizacao opcional, coluna "Atualização automática" no painel de Conectores ("Sem informação" para Conector antigo). Testes: api/sinal-atualizacao.test.ts, domain/atualizacao-sinal.test.ts, conector test/atualizacao/sinal.test.ts e test/atualizacao.test.ts, render do painel.
4. Caixa: 137 informativos lidos depois de conferir o assunto de cada um (todos superados). Nenhum exigia ação além do que já foi tratado.

Resultados: @macuxi/integracao lint, typecheck e test verdes (65 arquivos, 819 testes; 64 de banco pulados, rodam no CI). `coord verificar modulo-integracao`: nenhuma violação.

Pendências que dependem de outros ou de nova rodada:
- R-20261109-010026-modulo-core (T-0115): campo `canal` em ClientePayload e de-para no Hub. Chegou durante a rodada; NÃO feito (fora do escopo pedido).
- T-0098: contrato do link de download do Conector aprovado pelo engenheiro-software (LinkDownloadConectorSchema em contracts + rota POST /v1/integracao/conector/download com acesso.portal, de responsabilidade deste módulo); a URL assinada do S3 vem do SDK na próxima rodada, então a rota fica para quando a porta existir.
- Sem tela de e2e (Playwright) da página nova: pedir ao testes.

## Pronto quando
Revisão do engenheiro-software sem 🔴 e CI verde (os testes *.db.test.ts da Integração rodam só no CI). Diário atualizado.
