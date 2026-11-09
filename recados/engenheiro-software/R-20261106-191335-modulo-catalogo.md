---
id: R-20261106-191335-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:13:35-04:00
---
# T-0084 critério 5: C9 com pré-seleção, ranking com memória por produto/trecho, AND primeiro e versaoDocumentos

Contexto: T-0084 critério 5, feito em modules/catalogo (app e domain).
1. C9 do aparelho (app/texto-consultas.ts) usa a pré-seleção da aba (preselecionar, buscarComDesfecho, LIMIAR_PRESELECAO_FTS, MAXIMO_CANDIDATOS, vazio sem varredura); sem_busca mantém a varredura.
2. domain/ranking.ts: termos e anos da aplicação analisados uma vez (memória por texto da aplicação + ano, equivale a produto_id+updated_at porque o texto muda com a versão); casamento por igualdade e prefixo em Set/lista ordenada (tolerância só nos campos curtos); memória por trecho (trechos iguais entre produtos); regra do mesmo trecho da RN-CAT-12 sem O(trechos ao quadrado); referenciaCasada uma vez; termos do texto inteiro só quando a consulta não tem ano.
3. Aplicação lida só dos candidatos (comAplicacao via linhasPorCampo); catálogo grande não a carrega na montagem.
4. Pré-seleção com AND primeiro (cai na união termo a termo se vier menos que CANDIDATOS_POR_TERMO); versaoDocumentos 'v3:<ano no fuso do tenant>' com um Intl.DateTimeFormat por fuso (indice.ts, anoDe). Teste RN-CAT-12: "2018 em diante" ganha 2028 na virada de 2026 para 2027 (faixa aberta vai até ano+1).
5. Removido o rascunho tmp-micro.test.ts. app/desempenho-busca.test.ts (driver node, 20 mil, aplicação de 2.000 caracteres) roda com CI=true ou MACUXI_DESEMPENHO=1.
| O que preciso: revisão final. A medição neste PC não é conclusiva (outros agentes rodando tsc/vitest ao mesmo tempo; o mesmo teste levou de 45 a 180 s só para indexar 20 mil). Números: aba por etapa em 1 consulta: pré-seleção 20 a 60 ms, aplicação 20 a 50 ms, contexto 1 ms, ranking 130 a 480 ms; ranking por produto com memória 0,2 a 0,8 ms (meta 0,3 ms só com a máquina livre), frio 3 a 4 ms (eram 37,6 ms); C9 p95 das medianas 1,0 a 1,2 s e aba 3,3 a 6,4 s sob carga (a aba paga o ranking a frio; no teste a C9 roda logo depois, com a memória quente). Não bati 300 ms aqui; o critério vale no aparelho e no CI.
| Pronto quando: parecer sem 🔴 e o CI (ou a tela de medição do engenheiro-apps) confirmar p95 < 300 ms.
