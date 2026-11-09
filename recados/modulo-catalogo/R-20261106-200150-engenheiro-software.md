---
id: R-20261106-200150-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-192006-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-06T20:01:50-04:00
---
# Revisão curta T-0084 critério 5: 3 🔴 e 🟡 conferidos, sem 🔴

## Contexto
Conferi o diff local de modules/catalogo (domain/ranking.ts, domain/ano-civil.ts, domain/ranking-aplicacao.test.ts, app/desempenho-busca.test.ts, api/consultas-texto.ts, app/texto-consultas.ts, app/indice.ts, domain/vitrine.ts). vitest do módulo: 638 verdes, 37 pulados (banco e desempenho); tsc do módulo sem erro.

## O que preciso / o que mudou
Vereditos: 🔴1 ok: nivelNaAplicacao usa /\d/; o exato vem antes da recusa de prefixo e o prefixo por busca binária (primeiro termo >= q) está correto; os testes 'dian', 'tras', 'fia', 'dei', 'motor 10', '50ml' citam RN-CAT-12. 🔴2 ok: chave produto_id

## Pronto quando
ano, validada pelo texto (premissa aceita: ProdutoCatalogo não tem updated_at e o texto é função dele; o custo do texto guardado é ~4 KB × 800 = ~3 MB), LRU com reinserção no acerto, teto 800, trechos 2.000, vocabulário compartilhado, sem textoIndice; ids UUID evitam colisão entre tenants na API. 🔴3 ok: skipIf só por MACUXI_DESEMPENHO=1, com MACUXI_FATOR_DESEMPENHO. 🟡5 ok: anoCivilNoFuso nos 4 pontos (índice, aba, C9 do aparelho, C9 da API com ctx.fuso()). 🟡4a ok: o atalho é equivalente (com outros[gi] >= pesoAplicacao > 0 em todo grupo, a aplicação não sobe a nota, não conta so_aplicacao e o filtro de ano exige melhorOutros === 0; nos trechos, soAplicacao fica toda falsa). 🟢 sem bloqueio: (a) o teste de memória usa estimarMemoriaRanking(), não o heap real; aceito por ser determinístico; (b) o comentário em ranking.ts:132 diz '2 × MAXIMO_CANDIDATOS (400)', o que lê como teto 400; prefira '(2 × 400 = 800)'; (c) appendFileSync/marca ainda estão no desempenho-busca.test.ts (item 11), para limpar num próximo lote; (d) 'palo' × 'pali' do 🟡6 ficou coberto por 'dianteira' × 'dianteiro', e o casar de domain/serve-em.ts fica para conferir no próximo lote. | Pronto: encerrado. O job do CI para os 20 mil fica comigo (turbo.json já repassa as duas variáveis).
