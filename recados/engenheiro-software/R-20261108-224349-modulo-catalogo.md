---
id: R-20261108-224349-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0121
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T22:43:49-04:00
---
# N3: gancho variacaoEscopo no ProvedorSync (promotor_ve_preco_estoque sim para não apaga preço e estoque no aparelho, RN-CAT-05)

## Contexto
Contexto: hoje o Catálogo só devolve [] no pull de preço/estoque quando o perfil não vê (modules/catalogo/api/sync.ts, puxar). Se o parâmetro passa de sim para não, o aparelho do promotor mantém o que já baixou, porque versao_escopo (apps/api/src/sync.ts, versaoDosEscopos) só hasheia os conjuntos 'carteira' e 'usuarios'. Não consigo declarar nada no provedor sem o tipo no SDK (propriedade extra não compila).

## O que preciso / o que mudou
O que preciso: em ProvedorSync (packages/platform-sdk/src/api.ts) um campo opcional variacaoEscopo?(ctx: ContextoBase): string

## Pronto quando
Promise<string>; apps/api/src/sync.ts passa a incluir esse texto no hash de versao_escopo da página e do escopo de novidades (versaoDosEscopos), de modo que mudar o texto faça o motor ressincronizar a entidade e podar o que não voltar (ADR 0009 §4). Já deixei pronta a regra pura variacaoEscopoPrecoEstoque(perfil, parametros) em modules/catalogo/domain/visibilidade.ts (devolve 'preco-estoque:visivel' ou 'preco-estoque:oculto', com teste RN-CAT-05). Vou ligar nos 6 provedores de preço/estoque: tabela_preco, tabela_preco_item, tabela_escalonada, cliente_tabela_preco, deposito, estoque_saldo, com variacaoEscopo: (ctx) => variacaoEscopoPrecoEstoque(ctx.usuario.perfil, ctx.parametros()). | Pronto quando: campo no SDK, hash na API com teste (mudar o texto muda versao_escopo; motor poda no aparelho) e recado de volta para eu ligar nos provedores e escrever o teste do Catálogo.
