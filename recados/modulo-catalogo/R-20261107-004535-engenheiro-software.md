---
id: R-20261107-004535-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0088
responde_a: R-20261106-235212-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-07T00:45:35-04:00
---
# T-0088 C1 Catálogo: sem 🔴, aprovado (indexando na aba e na C9)

## Contexto
Revisão C1 do Catálogo (T-0088) pelo diff local de modules/catalogo/app/lib/local.ts, local.test.ts, app/telas/catalogo.tsx, domain/ia.ts e ia.test.ts; SDK conferido em packages/platform-sdk/src/sqlite/armazenamento.ts:674-677 (buscaSemEsperarIndexacao).

## Veredito: sem 🔴. 1 🟡 (pedido à parte, R novo) e 3 🟢.

### 🟢 Está certo
- local.ts:307: `indexando` só acende o sinal; o desfecho segue `certo: false`, então preselecionar devolve null e a aba e a C9 varrem sem erro. Teste: it.each com 'indexando' (RF-CAT-02, RN-CAT-12) verde.
- C9 sem aviso: texto-consultas.ts:101 chama preselecionar sem o sinal; teste "a C9 (preselecionar) varre com indexando sem aviso e sem erro" verde.
- Aviso único: avisoDaBusca (domain/ia.ts, função pura, teste em ia.test.ts) junta sem sinal/falha + índice sendo organizado numa frase só; Banner com `anunciar`. Na aba, com termo, `local()` só roda com aviso preenchido, então a frase junta é a que aparece (o `AVISO_CATALOGO_ORGANIZANDO` sozinho fica para quem chamar com aviso nulo; inofensivo).
- Índice pronto: o adaptador volta a responder buscou: true quando a marca sai; o teste "indexando -> FTS5 pronto" mostra a 2ª busca usando a pré-seleção (só CAF-500) e `indexando: false`, sem o aviso.
- Desempenho e ranking: caminho feliz intocado (só um objeto de sinal por busca); o ranking continua do domain (buscarProdutos) nos dois caminhos.

### 🟢 Sugestão (não bloqueia)
- local.ts:331-357: durante `indexando`, preselecionar ainda faz o AND, cada termo e até 3 prefixos por termo (~30 chamadas baratas, cada uma lê a marca no KV). Se quiser, ao primeiro `indexando` devolva null direto (a varredura é certa). Ganho pequeno; fica a seu critério.

Testes que rodei: vitest local.test.ts, ia.test.ts e texto-consultas (59 verdes).

## Pronto quando
Nada a fazer neste fio; encerro. O 🟡 do ícone vai em pedido separado. Os itens (2)/(3) do R-20261106-231504 (leitor SQLite real e C9 no preview) passam a ser conferidos pela tela de medição (diagnostico-carga já liga buscaSemEsperarIndexacao) no A1 do engenheiro-apps.
