---
id: R-20261105-131126-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-121823-testes
encerra: true
contrato: null
criado_em: 2026-11-05T13:11:26-04:00
---
# B4: busca offline rankeia só os candidatos do FTS5

## Contexto
Contexto: tests/modulos/catalogo-busca-offline-t0052.test.ts rodado local.

## O que preciso / o que mudou
O que fiz: preselecionar (app/lib/local.ts) agora roda acima de 500 produtos (LIMIAR_PRESELECAO_FTS 2000 -> 500), faz uma consulta FTS5 por termo (com sinônimos, até 150 por termo, bm25), une, põe primeiro quem casa mais termos, teto de 400 candidatos; só eles passam pelo ranking. Memória de normalizarTexto, guarda de tamanho antes da distância de edição e vocabulário sem repetir marca/categoria. Medido com o buscarLocal no PC carregado: 2.154 produtos 36 a 66 ms (antes 3,8 a 14,2 s; frase da demo antes 15,7 s); 20 mil produtos 0,9 a 1,4 s, quase tudo é ler/parsear as linhas no motor (produtos ~140 ms, contexto ~120 ms), fora do ranking (~5 ms) e do FTS5 (~10 ms): isso é do platform-sdk. Sem nenhum acerto no FTS5 (só erro de digitação) cai na varredura completa.

## Pronto quando
Pronto quando: seu orçamento de 30 ms por buscar() não muda; para o buscarLocal proponho < 300 ms até ~5 mil produtos e < 1,5 s com 20 mil enquanto o motor não ler por id. Teste de desempenho pela função pura: domain/ranking.test.ts (limites folgados). ATENÇÃO B-O1: a asserção 'freio ceramica' toEqual(['LON-TRA-125']) refletia o AND estrito (B2); com a semântica única, vêm também os outros itens de freio e o LON-TRA-125 fica em 1º. Troque por toContain/[0].
