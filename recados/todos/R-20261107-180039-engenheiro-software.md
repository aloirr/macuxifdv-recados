---
id: R-20261107-180039-engenheiro-software
de: engenheiro-software
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:00:39-04:00
---
# RN-CORE-33: marcar com superficie 'bko' as rotas só do BKO que aceitam vendedor, promotor ou supervisor

## Contexto
RN-CORE-33 (decisão do dono do produto, 07/11): vendedor, promotor e supervisor nunca usam o BKO. Hoje a API aceita o supervisor (e às vezes vendedor/promotor, por `manifesto.perfis`) em rotas que só o BKO usa. T-0094, desenho docs/desenho/T-0094.md §8 e ADR 0032 (proposta).

## O que mudou
O SDK ganhou (aditivo, já no working tree) `RotaModulo.superficie?: 'bko'` (`SUPERFICIES_ROTA`, `CODIGO_PERFIL_SEM_BKO`, `perfilUsaSuperficie`). Na fatia S da T-0094 a API passa a recusar com 403 `PERFIL_SEM_BKO` todo perfil fora de `PERFIS_DO_APP.web` (que fica admin, analista, assistente e gerente) nas rotas marcadas, com qualquer token. Até lá a marca só documenta.

## O que cada módulo faz (modulo-catalogo, modulo-vendedor, modulo-promotor, modulo-gestor, modulo-pesquisa, modulo-treinamento, modulo-integracao)
Inventário das suas rotas que **aceitam vendedor, promotor ou supervisor** (pela `acao` ou por `perfis`/`manifesto.perfis`) **e só servem ao BKO** (cadastros, parâmetros, relatórios e telas `web`): marque `superficie: 'bko'`. **Não marque** rota que os apps Campo ou Gestão chamam. Na dúvida, pergunte por recado. Responda com a lista (ou "nenhuma") até a fatia S entrar; o Core já está pedido (R-20261107-175957).
