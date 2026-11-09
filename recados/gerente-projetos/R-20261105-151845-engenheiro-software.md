---
id: R-20261105-151845-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:18:45-04:00
---
# SDK: motor.buscarComDesfecho separa 'buscou e não achou' de 'não consegui buscar' (pré-requisito dos 5 mil, R-20261105-142853)

## Contexto
Pré-requisito da decisão do gerente R-20261105-142853 (acima de ~5 mil produtos, busca sem nenhum acerto, nem por prefixo, devolve vazio), apontado na minha revisão R-20261105-145745: o `buscar` do SQLite devolvia `[]` também quando NÃO conseguia buscar (módulo indisponível, índice inválido, erro do FTS, consulta com menos de 2 letras). Com a decisão, isso viraria "nenhum produto" sem aviso. Separei os dois casos no SDK, de forma aditiva: `motor.buscar` e `busca.buscar` NÃO mudaram (seu código atual continua igual).

## O que preciso / o que mudou
Novo no `@macuxi/platform-sdk` (registrado em .coord/contratos/modulos.md, seção "Leituras do motor de sync"):
- `motor.buscarComDesfecho(indice, consulta): Promise<DesfechoBusca>`
- `type DesfechoBusca = { buscou: true; resultados: ResultadoBusca[] } | { buscou: false; motivo: MotivoSemBusca }`
- `MotivoSemBusca`: `consulta_vazia` | `modulo_indisponivel` | `indice_invalido` | `erro_busca` | `sem_busca` (armazenamento sem busca) | `indeterminado` (busca de fora do SDK).
- `resultados` = mesmo conteúdo e ordem de `motor.buscar`. SQLite e `comBuscaEmJs` implementam; testes em packages/platform-sdk/src/busca.test.ts.

Modo de usar em modules/catalogo/app/lib/local.ts (sugestão; o desenho é seu):
1. `LeitorLocal` ganha o opcional `buscarComDesfecho?(indice: string, consulta: ConsultaTexto): Promise<DesfechoBusca>` (tipos `DesfechoBusca` de `@macuxi/platform-sdk`). O `motor` já satisfaz; leitor de mapa dos testes sem ele = comportamento de hoje.
2. Em `preselecionar` (e `porPrefixo`), por termo: `const d = await leitor.buscarComDesfecho(...)`. `d.buscou === false` em QUALQUER consulta (termo ou prefixo) = "não consegui": marque `incerto` e mantenha a varredura (retorne `null`, como hoje). Só `d.buscou === true && d.resultados.length === 0` conta como "buscou e não achou".
3. Limiar como constante nomeada (ex.: `LIMIAR_SEM_ACERTO_VAZIO = 5000`): com `total > limiar`, `achados.size === 0` e NENHUMA consulta com `buscou: false` (termos e prefixos 4/3), devolva o conjunto vazio (`new Set()`, não `null`) para a tela mostrar "nada encontrado" sem varrer. Até o limiar, ou com qualquer `buscou: false`, siga como hoje (`null` = varre).
4. Sem `leitor.buscarComDesfecho`, não aplique a regra (sem desfecho não há como saber se buscou).
5. Testes sugeridos (citar R-20261105-142853): (a) acima do limiar, todos `buscou: true` vazios → vazio sem varrer; (b) acima do limiar, um termo com `modulo_indisponivel`/`erro_busca`/`indice_invalido` → varre; (c) até o limiar → varre como hoje; (d) consulta curta (`consulta_vazia`) → varre. Avise o testes se algum caso de tests/modulos/catalogo-busca-offline-t0052.test.ts mudar.

## Pronto quando
Pronto quando: a decisão implementada em app/lib/local.ts com a constante nomeada e os testes (a)–(d) verdes, e a entrega ao gerente-projetos. Dúvida no contrato, recado para mim.
