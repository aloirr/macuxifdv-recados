---
id: R-20261109-100244-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:02:44-04:00
---
# coord.mjs enviar passa de 120 s: varredura dos 4.704 recados a cada comando (2x com --responde-a); proposta sem editar

## Contexto
Desde o corte dos recados (ADR 0035, junções `.coord/recados` e `.coord/lidos` para `C:\macuxifdv-recados`), `node scripts/coord.mjs enviar` às vezes passa de 120 s (timeout do Bash dos agentes). Medi hoje, 09/11, das 09h às 10h, sem editar nada (`scripts/coord*.mjs` são seus).

**Medidas (Node, `readFileSync` de cada arquivo):**
| O quê | Resultado |
|---|---|
| `caixa engenheiro-software` | 80 s |
| `readdir` das 18 pastas de recados (4.704 arquivos, 9,9 MB) | 61 ms |
| Ler os 4.704 recados pela junção `.coord/recados` | 134 s (28,6 ms por arquivo) |
| Ler os mesmos pelo caminho real `C:\macuxifdv-recados\recados` | 124 s (26,4 ms por arquivo) |
| `.md` do repositório de código (`docs/`, `.coord/tarefas`) | 3,8 a 4,7 ms por arquivo |
| `.ts` de `modules/` | 1,6 ms por arquivo |
| Cópia de 600 recados no TEMP (`.md`, `.txt`, `.ts`, `.dat`) | 11 a 22 ms por arquivo (a extensão não importa) |
| `git status` no clone | 1,5 a 2 s |

**Causa:**
1. **Principal: varredura completa a cada comando.** `enviar` chama `todosRecados()`, que abre e interpreta os 4.704 arquivos de todas as pastas. Chama uma vez para gerar o id sem colisão (`scripts/coord.mjs`, linha ~534) e **outra** quando há `--responde-a` (linha ~521). Por isso o `enviar --responde-a` é o que mais passa de 120 s. `caixa`, `pendencias`, `ler`, `fio` e `lido` também leem tudo.
2. **Agravante: abrir arquivo no clone custa de 4 a 7 vezes mais** que no `C:\macuxifdv`. Não é a junção (pelo caminho real o tempo é o mesmo) nem o git (`enviar` não chama git; `git status` do clone leva 2 s). A hipótese mais provável é o antivírus em tempo real: a pasta `C:\macuxifdv` deve estar excluída ou já analisada, e o clone novo não. Não consegui confirmar, porque ler as exclusões do Defender exige administrador e o meu comando foi barrado. A carga da máquina, com 7 agentes rodando testes, faz o custo variar de 12 a 29 ms por arquivo.
3. Antes do corte já era O(N): com 4.600 arquivos a 4 ms, uns 18 s por comando. O corte só multiplicou o custo de cada arquivo.

## O que preciso / o que mudou
Proposta de correção em `scripts/coord.mjs` (só você edita), em ordem de ganho:
1. **`enviar` sem varredura.** O id é único se não existir `PASTA/<pasta>/<id>.md` em nenhuma das ~18 pastas (`existsSync`, 18 stats). O mesmo vale para o `--responde-a`, porque o nome do arquivo é o id. São zero leituras e menos de 0,5 s.
2. **`ler <id>`** pelo mesmo caminho direto (`existsSync` nas pastas). O `fio` usa o índice do item 3.
3. **Índice de metadados por nome de arquivo** para `caixa`, `pendencias`, `fio` e `lido`. Como recado é imutável, o conteúdo de um nome nunca muda, e o cache pode ser só por nome, sem `stat`:
   - grava em `node_modules/.cache/macuxi-coord/recados.json` (ignorado pelo git e fora do clone) os campos `{ nome: { meta, titulo, pastas } }`, sem o corpo;
   - a cada comando: `readdir` das pastas (60 ms), lê só os nomes novos e tira do índice os que sumiram;
   - recado que não interpreta não entra no cache (é lido de novo na próxima vez);
   - um `--sem-cache` reconstrói o índice.
   Estimativa: `caixa` de 80 s para menos de 1 s; a primeira execução depois do clone paga a leitura uma vez.
4. **Opcional, no seu PC, como administrador:** `Get-MpPreference | Select-Object -ExpandProperty ExclusionPath`. Se `C:\macuxifdv` estiver na lista, inclua `C:\macuxifdv-recados` do mesmo jeito. Isso só reduz o custo por arquivo; a correção de verdade são os itens 1 a 3.

**Testes** (`scripts/coord-verificar.test.mjs`):
- `enviar` não lê nenhum recado: espião de `readFileSync` ou pasta com um recado ilegível que não pode quebrar o envio;
- id duplicado no mesmo segundo vira `-2`;
- `--responde-a` inexistente falha;
- o índice inclui o recado novo e tira o apagado;
- `caixa` com índice dá o mesmo resultado que sem índice.

## Pronto quando
- `enviar` (com e sem `--responde-a`) roda em menos de 2 s;
- `caixa` roda em menos de 3 s na segunda execução, com os 4.700 recados de hoje;
- os testes do `coord` estão verdes.
Se quiser, eu escrevo o patch num arquivo fora do repositório para você aplicar. Diga e eu mando por recado.
