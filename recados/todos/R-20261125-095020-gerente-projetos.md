---
id: R-20261125-095020-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-25T09:50:20+00:00
---
# Perfis sem perfil base — pausa: estado dos branches (S7 arquivada; v1.0.37)

Pausa por ordem do Alexandre (25/11, "Suba o 1.0.35 com apk e pause"). A sessão S7 parou às 05h55 (Manaus) e foi arquivada. Estado dos perfis sem perfil base (ADR 0073), agora na **v1.0.37** (decisão 1 A do Alexandre). Numeração: perfis **0105–0107** e catálogo v2 **0108** (0103 = senha do admin, v1.0.35; 0104 = fração, v1.0.36).

Já no main: #770 (E1), #775 (E3 do SDK), #776 (E3 do core), #772 e #777 (pareceres do corretor).

| Branch | SHA | Estado / falta |
|---|---|---|
| nuvem/v1035-perfis-banco-dados (#771 aberto) | 43fbfb4e46ac05500078189f8b26ec8e5a645a93 | renumerar para 0105–0107; perfis-sem-base-migracao.db.test.ts tolerante a migrações seguintes |
| nuvem/v1035-perfis-banco-dados-wip | 0eaebedcaba066d7402eac90e9c56f5f7357a687 | OBSOLETO (renumeração para 0104–0106); só referência |
| nuvem/v1035-perfis-banco-dados-2 | 88b23c06f1f364869d1ea3e4b81d0be0fa5562c9 | 0108 (catálogo v2), testes APROVADO, corretor LIBERADO; reaplicar sobre o #771 renumerado e abrir PR |
| nuvem/v1035-perfis-engenheiro-software-4 (#782 aberto) | 49323bea9d18cdf41329372550331c5bbd904122 | catálogo v2; testes APROVADO, corretor LIBERADO |
| nuvem/v1035-perfis-engenheiro-software-5 | 2481442496407bad27728b7176038ad4cd50409e | retirada de ACOES_DA_TRANSICAO e CHAVE_DA_PENDENTE; falta relatório do engenheiro, testes no combinado e corretor |
| nuvem/v1035-perfis-modulo-core-2 | 49413d87b67d9da4ca54bc7a325f25a2d0f06c8f | acao nas 9 rotas do core; reconferência do corretor e testes no combinado |
| nuvem/v1035-perfis-modulo-pesquisa | a781bea7e8b70725a5ed1f0f239fcf184161b675 | acao nas 2 rotas; idem |
| nuvem/v1035-perfis-modulo-promotor | ac62a1559ef4da8f1b1e339084e945fd9168c651 | acao nas 9 rotas; idem |
| nuvem/v1035-perfis-corretor-redundancias-3 | 97fe532afca9b0c940a8099751b20c0b895b69e6 | pareceres RD-3703 a RD-3711; falta a rodada final |

Os PRs dos 3 módulos e o da retirada das listas entram JUNTOS (um sem o outro quebra o teste de igualdade). Depois: E4 (engenheiro-software) e E4b (modulo-core). Antes do liberar: diagnóstico e begin/migrações/rollback numa cópia de produção.
Pendências registradas pela S7: porta de CEP no SDK; JSDoc em FarolSchema.clientes; RD-3081/3087/3088 (só teste/comentário); Voltar do navegador no Farol; KpiCardGrupo/DicaInfo; docs/desenho/T-0094.md:136; `atualizado_em` com offset no contrato V2. Faixa RD da S7: 3700–3749.
