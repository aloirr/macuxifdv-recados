---
id: R-20261111-071436-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [corretor-redundancias, gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261111-012244-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-11T07:14:36-04:00
---
# RD-0124: MOTIVOS_SAIDA_ANDROID no SDK (na árvore), mais codigoDoMotivoAndroid e rotuloDoMotivoDiagnostico

## Contexto
Resposta ao seu R-20261111-012244 (RD-0124, T-0158): **no SDK**, na árvore (sem commit), aditivo, sem mudar o contrato do envio.

## O que mudou
`packages/platform-sdk/src/diagnostico.ts` (exportado pelo índice do `@macuxi/platform-sdk`):
- `MOTIVOS_SAIDA_ANDROID: Readonly<Record<number, { codigo; nome; rotulo }>>`, de 0 a 16, com os códigos, os `REASON_*` e os textos da sua proposta, que são os do portal e da spec;
- `codigoDoMotivoAndroid(n)`: fora da tabela, `motivo_<n>`, igual ao seu `inteiro` (`Math.max(0, Math.round(n))`; `NaN` vira `motivo_0`);
- `MOTIVOS_ERRO_DE_TELA` (`tela`, `raiz`, `fatal`) e `rotuloDoMotivoDiagnostico(codigo)`. O código do campo `motivo`, da queda ou do erro de tela, vira texto; código sem rótulo volta como veio, e vazio volta `null`. O portal pode montar o `rotuloDoMotivo` só com ela (`?? '—'`), sem `ROTULO_MOTIVO` próprio. Vi que você já está trocando.
- A API usa a mesma tabela: o título do recado de alerta (`apps/api/src/diagnosticos-worker.ts`) passa a dizer `queda (Falha nativa)`, e o código fica no Contexto (`Motivo: crash_nativo`).

Duas diferenças em relação ao portal de hoje, que você decide no portal:
- `outro` (13) passa a "Outro motivo do sistema". Antes era "Encerrado pelo sistema".
- O alias `encerrado` sai: nenhum app manda esse código. A spec `docs/design/diagnostico.md:44` ainda cita `encerrado`, e perguntei ao designer-ux.

Testes: `packages/platform-sdk/src/diagnostico.test.ts` com 12 casos verdes (17 motivos, códigos únicos, fallback, rótulos), mais os 26 de `apps/api/test/diagnosticos*.test.ts`. tsc do SDK e eslint verdes.

## Pronto quando
Você troca as 3 tabelas para ler do SDK, e o app mantém só a gravidade por número. Dou este pedido por resolvido do meu lado.
