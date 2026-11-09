---
id: R-20261107-125723-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T12:57:23-04:00
---
# T-0085: veredito da lista por linha com 20 mil — sem 🔴, 🟡 de desempenho resolvido; decisão pendente sobre itens além de 100

# T-0085: veredito da reconferência da lista por linha com 20 mil produtos

**Sem 🔴. O 🟡 de desempenho do R-20261107-111809 está resolvido e pode ir ao main.** Revisão detalhada ao modulo-catalogo em R-20261107-125710-engenheiro-apps.

## Números (Node/V8 no PC, carregado pelo build em paralelo)
| abertura | antes | teste oficial (memória) | minha sonda (leitor tipo SQLite, com JSON.parse) |
|---|---|---|---|
| raiz fria | 1.422 ms | 94–100 ms | melhor 164–306 ms, mediana 183–361 ms |
| raiz quente / voltar | 105 ms | 1 ms | 0,1–0,2 ms, 0 leituras |
| sistema | 97 ms | 22–67 ms | 35–70 ms |
| grupo | 22 ms | 8 ms | 12–19 ms |
| linha de 539 | 18 ms | 16–25 ms | 13–31 ms |

Na sonda, só ler e fazer o parse das 40 mil linhas (`produto` e `produto_no`) leva de 159 a 265 ms. O cálculo da raiz ficou em cerca de 100 ms, abaixo da meta de 300 ms, e o que sobra é leitura. A medição no aparelho (Hermes) fica para o roteiro do próximo preview com carga.

## O que você pediu para conferir
- **Ordenação sem Intl.Collator, com acento**: correta. Na linha, os 100 primeiros saem 100/100 iguais ao `Intl.Collator('pt-BR')`. Numa lista de 25 nomes acentuados, 23/25 saem iguais. A única diferença é o empate "Água" × "agua": mesma chave, desempate pelo código. O `hermesc` compila `/\p{M}/gu`, que já roda no app em `domain/marcas.ts`.
- **Voltar e cache por nó**: funcionam. Voltar ao grupo, ao sistema e à raiz leva 0,1–0,2 ms, sem leitura, com resultado idêntico ao da ida. Depois de um sync, o cache invalida: raiz 20.000→20.001, linha 539→540. Linha removida → "Voltar um nível" vai ao grupo pai.
- **Itens além dos 100**: **não aparecem ao rolar.** A lista corta em 100 e mostra "539 produtos · mostrando 100". É o comportamento do #95 e da spec (`docs/design/catalogo-por-linha.md:77`, "como está"), então não é regressão. Com 20 mil produtos, porém, linha com mais de 100 itens vai ser comum. Marquei 🟡 antes do piloto e preciso de uma decisão sua e do designer-ux entre duas opções: (a) "Mostrar mais 100" ou rolagem infinita, barato porque os candidatos já estão ordenados no cache do nó; (b) manter e dizer na tela "busque para ver os demais".
- **Gestão**: nada quebra. A tela e a página não mudaram, o perfil gerente funciona na sonda e o bundle do gestao está verde.

## Verificações
- eslint dos 4 arquivos limpo.
- `tsc` app e node limpos.
- vitest `modules/catalogo/app`: 12 arquivos verdes (1 pulado, de banco).
- Teste de desempenho verde (raiz 94–100 ms com teto de 400 ms; linha 16–25 ms com teto de 750 ms).
- Bundles do working tree: verdes, 2072 módulos cada, com o código novo (contarSistemas, memo lista-no:) e sem Collator('pt-BR').
- Sem EAS. Não toquei no checkout do build.

## 🟢 (ao modulo-catalogo)
- LRU no cache por nó: abrir os 440 nós retém 21 MB, e as entradas velhas ficam até o nó ser reaberto.
- Se o aparelho passar de 300 ms na raiz fria, pedir ao SDK uma leitura só de ids.
- Teste unitário de ordenação com acento.
- Remover `porNome`, que não é mais usado.

## Premissas
- Medi o working tree de 07/11 às 12h40, com os índices v4 do `db/aparelho.ts` presentes mas não exercitados: a sonda simula o índice.
- PC com carga paralela: valem os "melhor de".
