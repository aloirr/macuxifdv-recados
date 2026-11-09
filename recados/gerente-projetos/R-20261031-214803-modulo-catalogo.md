---
id: R-20261031-214803-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0021
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:48:03+00:00
---
# T-0021 ajustes: decisões do Alexandre aplicadas no Catálogo (RN-CAT-03..08)

## Contexto
T-0021 (ajustes): aplicadas as 5 decisões do Alexandre sobre as premissas P-1..P-11 do Catálogo. Branch nuvem/T-0021-ajustes, trailer "Agente: modulo-catalogo". Escopo: modules/catalogo/{domain,contracts,manifest.ts} e docs/modulos/catalogo/regras.md.

## O que preciso / o que mudou
1. **Acesso (RN-CAT-04/05)**: domain/visibilidade.ts (novo) — `podeVerPrecoEstoque`, `itemVitrineParaPerfil`, `filtrosParaPerfil`; parâmetro `promotor_ve_preco_estoque` [false]. Promotor vê ficha e fotos com `price`/`availability` nulos e `price_stock_visible: false`; sem filtro/ordem por preço ou estoque. Manifesto: nova ação `produto.ver_preco_estoque` (todos menos promotor). Contrato `ItemVitrine`: `price` e `availability` anuláveis + `price_stock_visible` (padrão true), com refine.
2. **Preço (RN-CAT-06)**: item fora da tabela do cliente → `notice` "Sem preço para este cliente.", `sellable: false`, sem cair na padrão. Contrato `PrecoVisivel` ganhou `notice` (padrão null, compatível).
3. **Estoque (RN-CAT-07)**: baixo até [10], número exato [sim], desatualizado após [24 h]; `updated_at` sempre presente; `rotuloAtualizacaoEstoque` ("Atualizado às 10:30" / "Atualizado em 30/10 às 23:00", fuso do tenant); `AVISO_ESTOQUE_DESATUALIZADO`.
4. **Limite de IA (RN-CAT-03 revisada)**: `verificarConsultaIa` (antes, não consome) + `registrarDesfechoIa(desfecho)` (depois; só `respondida` consome). `interpretarBusca` devolve `desfecho` (respondida | erro | tempo_esgotado | nao_chamada) e `consomeCota`; `tempo_limite_ms` opcional e `ErroTempoEsgotadoIa`.
5. **Ranking (RN-CAT-08)**: pesos e cache atuais mantidos como padrão parametrizável, calibração no critério da Sprint 3 (regras.md §3).

**Texto para o doc 03 (§ Catálogo):**
- RN-CAT-03 Limite de consultas de IA por usuário/dia [200] para controle de custo; só consulta respondida pelo provedor conta. Falha do provedor (erro ou tempo esgotado), resposta do cache, busca offline e busca simples não consomem. O dia vira no fuso do tenant.
- RN-CAT-04 Consulta do catálogo (busca, ficha, fotos, "pergunte ao catálogo") para todos os perfis; conteúdo, sinônimos, destaques e termos sem resultado só analista e admin.
- RN-CAT-05 O promotor vê a ficha e as fotos, mas não vê preço de tabela nem estoque, nem filtra/ordena por eles [promotor_ve_preco_estoque = não]; com o parâmetro ligado, vê como o vendedor.
- RN-CAT-06 Item fora da tabela de preço do cliente em contexto aparece como "Sem preço para este cliente" e não é vendável; nunca cai na tabela padrão do tenant.
- RN-CAT-07 Estoque: "baixo" de 1 até [10] unidades, número exato visível [sim], "desatualizado" depois de [24 h] sem atualização; a tela sempre mostra "atualizado às hh:mm" (fuso do tenant).
- RN-CAT-08 Ranking da busca: pesos [semântico 0,4; estoque 0,10; mais vendido 0,10; campanha 0,05] e cache [10 min, a partir da 2ª repetição] são parâmetros do tenant; serão calibrados no critério de aceite da Sprint 3.
- Parâmetros novos na tabela do doc 03 e linha do Catálogo na matriz §2: ver docs/modulos/catalogo/regras.md §9.

**Testes**: módulo 206 → 236 (15 arquivos) verdes; lint, typecheck e test da raiz verdes; pnpm fronteiras sem violação. Testes antigos ajustados: ia.test "o provedor falhou" (antes consumia; agora não, decisão 4), ia.test "LLM devolveu lixo" (+ desfecho respondida), contracts "item de vitrine" (`price?.` porque ficou anulável), parametros.test (só o título: premissa → RN-CAT-07).

**Premissa assumida**: resposta do provedor fora do formato conta como respondida (houve custo; evita abuso).

**Pendências (fora do meu escopo)**: (a) gerente: RN-CAT-03..08 e parâmetros no doc 03 + linha na matriz §2; (b) engenheiro-software: `produto.ver_preco_estoque` em .coord/contratos/modulos.md e manifestos-referencia.test.ts; (c) API/sync (modulo-core/engenheiro): não mandar `tabela_preco_item`/`estoque_saldo` ao aparelho do promotor quando o parâmetro estiver desligado; (d) banco-dados: origem de vendas recentes e campanha para o ranking (antiga P-11).

## Pronto quando
RN-CAT no doc 03 e quadro atualizados pelo gerente.
