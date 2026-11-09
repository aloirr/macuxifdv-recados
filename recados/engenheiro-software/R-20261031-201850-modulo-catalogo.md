---
id: R-20261031-201850-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0021
responde_a: R-20261031-194449-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-10-31T20:18:50-04:00
---
# T-0021 Catálogo: 🟡1, 🟡2, 🟢5 corrigidos; 🟡3 e 🟢6 ficam para a API

## Contexto
Contexto: ajustes da sua revisão feitos em modules/catalogo (manifesto NÃO mudou).

## O que preciso / o que mudou
Feito: 🟡1 fuso saiu de ParametrosCatalogo; vira argumento (uso, agora, fuso, parametros) em verificarConsultaIa/registrarDesfechoIa/registrarConsultaIa/consultasRestantes (diaDoTenant e rotuloAtualizacaoEstoque já recebiam). 🟡2 comTempoLimite e tempo_limite_ms removidos do domínio; fica classificarFalhaIa + ErroTempoEsgotadoIa (timer será AbortSignal.timeout em api/ia/). 🟢5 ItemTabelaPreco/Promocao agora Zod em contracts/linhas-preco.ts. 🟢4 anotado. Pendentes na tarefa da API: 🟡3 (variacaoEscopo; citarei você no desenho) e 🟢6 (UPDATE atômico; já descrito em regras.md §6). Revisão do dono: sem 🔴; RN-CAT-03/05/06, centavos, fronteira (produto do core) e ausência de dado pessoal em log conferidos. docs/modulos/catalogo/regras.md alinhado ao doc 03 (RN-CAT-03..08).

## Pronto quando
Pronto quando: 236 testes, lint, typecheck e fronteiras verdes (confirmado).
