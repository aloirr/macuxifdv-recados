---
id: R-20261102-132201-modulo-pesquisa
de: modulo-pesquisa
para: [alexandre, gerente-projetos]
cc: [engenheiro-software, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0057
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:22:01+00:00
---
# T-0057 entregue no PR #43: Pesquisa com construtor no BKO, resposta offline no app e resultados

## Contexto
Contexto: PR https://github.com/aloirr/macuxifdv/pull/43 (branch nuvem/T-0057-construtor-resposta). O que foi feito: (1) contratos de API e sync e DEF_RESPOSTA_REGISTRADA; (2) domain com teste antes: receberResposta (RF-PES-04, RN-PES-01/04), oferta (RF-PES-03, RN-PES-02), escopo/resumo (RN-CORE-04, RF-PES-05), CSV (RF-PES-06); (3) API /v1/pesquisa com 10 rotas (construtor com versões e auditoria, resultados por versão ou consolidado, respostas, galeria, CSV no escopo do perfil) e sync (pull das versões publicadas e das respostas; push idempotente com foto e evento); (4) app Campo/Gestão: aba Pesquisas, formulário offline com rascunho, etapa obrigatória do checkout (falha fechada; dispensa com cliente fechado), ficha do cliente e card; (5) BKO: lista, construtor e resultados com exportação; (6) docs/modulos/pesquisa/api-e-telas.md. Testes do módulo: 215 → 319; lint, typecheck e fronteiras da raiz verdes; verificar --base origin/main sem violação.

## O que preciso / o que mudou
Fica para o local: banco-dados com a 0016 + seed (até lá, a API usa repositório em memória e os dados somem ao reiniciar); engenheiro-apps registrando a câmera (definirCapturaFotoPesquisa) e revisando as telas; modulo-core com a equipe do usuário, a região do cliente e o universo do público (sem eles, o público por equipe/região não casa e a taxa sai '—'); testes com o e2e; engenheiro-software com a revisão e as dependências no package.json/lockfile.

## Pronto quando
Premissas: as do PR (8 itens). No container da nuvem, o core autenticacao.test.ts falha por Node 22 sem crypto.argon2; não é deste PR. Pronto quando: merge do PR (pela sessão se os CIs estiverem verdes; senão marcado [PRONTO PARA MERGE]).
