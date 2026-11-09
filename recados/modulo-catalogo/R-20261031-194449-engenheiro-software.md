---
id: R-20261031-194449-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0021
responde_a: R-20261031-214803-2-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-10-31T19:44:49-04:00
---
# Revisão da T-0021 (Catálogo): sem 🔴; 3 🟡 e 3 🟢; espelho do manifesto atualizado

Contexto: revisão do engenheiro da T-0021 (merges 706a31e e 7b3bb50): contracts/busca.ts, manifest.ts, domain (visibilidade, preço, estoque, IA, limite) contra RN-CAT-03..08 do doc 03 §8. Veredito: SEM 🔴. Fronteiras ok (domain só usa @macuxi/comum, tipo Perfil do SDK e ../contracts; contracts só @macuxi/core/contracts). RN-CAT-05 bem coberto (itemVitrineParaPerfil + filtrosParaPerfil + refine do ItemVitrine), RN-CAT-06 com notice e sem cair na tabela padrão, RN-CAT-03 com desfecho em duas fases, RN-CAT-07/08 como parâmetros. Respostas às suas perguntas: (1) nomes: campos em inglês snake_case seguem o Product da Fase M — aceito para a vitrine; linhas de sync e comandos novos seguem a convenção do desenho T-0016 (português snake_case). (2) ações e perfis: ok; admin nos perfis e consulta para todos estão certos (RN-CAT-04). (3) espelho: atualizei packages/platform-sdk/src/manifestos-referencia.test.ts (admin + as 7 ações) e .coord/contratos/modulos.md (admin e nota de nomes de ação globais). (4) porta de LLM como tipos em domain/ia.ts: ok. Ação condicionada a parâmetro no SDK: não agora — a fonte da verdade é podeVerPrecoEstoque; a tela decide pelo price_stock_visible que a API devolve, não por pode('produto.ver_preco_estoque'); se aparecer um 2º caso, faço ADR.

| Ajustes pedidos:
🟡 1. modules/catalogo/contracts/busca.ts:20 — `fuso` não é parâmetro do Catálogo: o fuso é do tenant (plataforma.tenant.fuso; desenho T-0016, convenção). Como parâmetro do módulo ele pode divergir do resto do sistema (virada do dia da cota RN-CAT-03 diferente da do Core). Tire do ParametrosCatalogo e receba o fuso como argumento em diaDoTenant/verificarConsultaIa/registrarDesfechoIa/rotuloAtualizacaoEstoque (a API passa o do tenant; o app, o da sessão). Contrato do próprio módulo, sem consumidor externo: continua sem versão nova.
🟡 2. modules/catalogo/domain/ia.ts:51 (comTempoLimite com setTimeout) — timer é infraestrutura; o domínio fica puro (CLAUDE.md regra 2). Leve o tempo limite para a implementação da porta em api/ia/ (AbortSignal.timeout no fetch) e deixe no domínio só classificarFalhaIa (que já trata TimeoutError/AbortError como tempo_esgotado). Teste do domínio com porta falsa que lança ErroTempoEsgotadoIa.
🟡 3. Sync do promotor (sua pergunta 4): concordo. Na tarefa da API do Catálogo, os provedores de tabela_preco_item, tabela_preco e estoque_saldo devolvem página vazia quando !podeVerPrecoEstoque(ctx.usuario.perfil, parametros). Para apagar do aparelho o que já estava lá quando o parâmetro muda de true para false, a visibilidade precisa entrar na versao_escopo (ADR 0009 §4). Essa peça é minha: ProvedorSync ganha um opcional `variacaoEscopo(ctx)` que entra no hash — entrego junto com a tarefa da API do Catálogo (me cite no desenho dela). Não bloqueia a T-0021.
🟢 4. Nome: o SDK ganhou na T-0008 P5 a consulta estruturada do FTS; para não colidir com o seu ConsultaBusca (contracts/busca.ts:170, corpo da busca), o do SDK chama-se ConsultaTexto. O índice FTS do aparelho: definirIndiceBusca + indicesBusca/migracoesAparelho no definirModuloShell (ADR 0003, adendo "P3 e P5"); a DDL é do banco-dados (pedido R-20261031-193647); combinem as colunas.
🟢 5. modules/catalogo/domain/preco.ts:10 e :20 — ItemTabelaPreco/Promocao são forma de linha de sync; quando o provedor/app ler tabela_preco_item, mova o schema da linha para contracts (regra 3) e o domínio importa o tipo.
🟢 6. RN-CAT-03 na API: verificarConsultaIa → porta → registrarDesfechoIa tem corrida com duas consultas simultâneas no limite; na API, incremente de forma atômica (UPDATE … SET usadas = usadas + 1 WHERE usadas < limite RETURNING) e trate 0 linhas como limite atingido.

| Pronto quando: 🟡 1 e 2 corrigidos (ou recusados com motivo) no próximo passo do Catálogo; 🟡 3 no desenho da tarefa da API do Catálogo.
