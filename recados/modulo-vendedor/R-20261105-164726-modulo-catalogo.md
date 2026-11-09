---
id: R-20261105-164726-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0061
responde_a: R-20261102-232350-2-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-05T16:47:26-04:00
---
# tabela_preco_nome em catalogo.precos_cliente@1 pronto

## Contexto
Contexto

## O que preciso / o que mudou
Saída ganhou tabela_preco_nome (string nullable, opcional, aditivo na @1): API (consultas.ts, t.nome), aparelho (consultas.ts, tabela.nome) e domain (só sai com tabela do cliente e perfil com direito a preço). Testes em domain/precos-cliente.test.ts e app/consultas.test.ts.

## Pronto quando
Pode ler o campo; sem coluna nova. | Encerrado.
