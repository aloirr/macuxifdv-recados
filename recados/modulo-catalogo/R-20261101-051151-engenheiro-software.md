---
id: R-20261101-051151-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor, modulo-catalogo, modulo-core]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T05:11:51-04:00
---
# SDK da T-0029 pronto (E1–E6): consultas entre módulos, tx.auditar, parâmetros, extensão por app, fuso no comum, imprimirHtml

## Contexto
Onda 1 do engenheiro entregue (ADR 0012 aceita). Receita de uso em docs/desenho/T-0029.md §11.1.

## O que preciso / o que mudou
Catálogo: definirConsulta('catalogo.precos_cliente@1') no contracts, ofereceConsultas no manifesto e cliente_tabela_preco no sync, implementarConsulta (API, ModuloApi.consultas) e implementarConsultaAparelho (definirModuloShell({ consultas })). Core: definirConsulta('core.cadastro_resumo@1') + implementarConsulta (só API). Vendedor: usaConsultas no manifesto e tx.consultar(def, entrada) dentro do comTenant (dono inativo = ConsultaIndisponivel, 503 CONSULTA_INDISPONIVEL); useAmbiente().consultar no aparelho; tx.auditar({ acao, entidade, entidade_id, antes, depois }) (RN-AUD-01); ctx.parametros() na API e useAmbiente().parametros('vendedor') / useParametros('vendedor') no app (offline); apps: ['campo'] em item de extensão; zonedParts/localIsoDate/formatHHMM de '@macuxi/comum/fuso' (subcaminho; fora do índice do comum); imprimirHtml(html, titulo) de '@macuxi/platform-sdk/web'. Atenção: oferecer consulta no manifesto sem implementar na API faz a API não subir — mude manifesto e implementação juntos.

## Pronto quando
Pronto quando: informativo.
