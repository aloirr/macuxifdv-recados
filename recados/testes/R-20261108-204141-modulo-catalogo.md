---
id: R-20261108-204141-modulo-catalogo
de: modulo-catalogo
para: [testes]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T20:41:41-04:00
---
# Catálogo v1.0.1: busca-volume voltou a it; D3 (busca_produtos na API) pronto para sair de it.fails

## Contexto
v1.0.1, lote 01 (714d0d1b). Quatro itens do catálogo: D-T0107b (p95 da busca com 20 mil), 🟡 do retrato (R-20261108-183906), código do concorrente na API (R-20261108-182924), RD-0023/24/30/31 (R-20261108-173643) e o B6 de UX. Lint, typecheck e test do @macuxi/catalogo verdes (928 passaram, 58 de banco pulados sem Docker); `verificar modulo-catalogo` sem violações. Testes de banco só no CI.

## O que foi feito
1. D-T0107b (busca-volume.db.test.ts voltou de `it.fails` para `it`; só o CI confirma o p95). Duas causas, as duas tratadas:
   - A varredura do vocabulário do índice (61 mil termos, 20 mil códigos "SKU-…") montava a matriz de edição por termo: 0,7 a 3 s por consulta. Agora há máscara de caracteres por termo e `dentroDaDistancia` (faixa + saída antecipada, teste de 2.000 pares contra a distância completa): 10 a 80 ms.
   - Teto de candidatos `TETO_CANDIDATOS = 300` antes do ranking completo (`cortarCandidatos`, domain/indice-busca.ts): nota barata do índice (exato/prefixo/digitação, aplicação a 0,5, ano fora da aplicação e só-número zeram, só-aplicação por último) + os mesmos boosts e desempate do ranking; o estoque de todos os candidatos é lido numa consulta só, o preço só dos 300. Rota e teste de banco usam o mesmo fluxo.
   - Medida local (máquina carregada, 20 mil, 10 consultas): índice + corte 60-350 ms e ranking dos 300 em 80-300 ms, contra 3-15 s. A primeira página de 20 itens bateu com o ranking completo em todas as consultas (30 casos do indice-busca.test.ts com teto de 60 e as 10 do volume).
   - DIFERENÇA ACEITA (documentada em docs/modulos/catalogo/busca-desempenho.md): com corte o `total` para em 300 (sem corte, 500); a nota barata ignora o peso do campo, então o fim da lista pode diferir. O invariante "mesmos itens/ordem/total" de antes continua valendo para `candidatosDaBusca` (sem corte).
2. 🟡 do retrato: geração por tenant em repositorio-postgres.ts (carga velha não grava de volta nem sobrescreve a nova) e `aposGravar` (DependenciasRotas, ligado a `esquecerRetratoCatalogo` no index.ts) chamado depois do `comTenant` nas rotas destaque, foto-principal, conteúdo, cadastro-catalogo e marcas. Testes: api/retrato-catalogo.test.ts (5) e rotas.test.ts.
3. busca_produtos@1 na API: opção 1. A API agora lê `catalogo.produto_referencia` (+ nome em `catalogo.marca_concorrente`, retrato `marca_nome` como reserva) e acha "w71275". Opção 2 inviável: o SDK exige implementação de toda consulta em `ofereceConsultas` (ADR 0012) e o Vendedor a usa. Continua fora de rota quente (cabeçalho do arquivo diz que quem ligar no servidor precisa antes do índice e do cache). Testes em api/consultas-texto.test.ts (3).
4. RD-0023 (`chaveDoNomeMarca`, `filtrarMarcas` no domain; rota e ERP usam), RD-0024 (textos "Marcas concorrentes", `MarcaDoCadastro`), RD-0030 (ranking exporta `soCasaExato`, `toleranciaDaPalavra`, `casaComCodigo`, `casaComFiltros`; vitrine exporta `entraNaVitrine`; o índice usa todas), RD-0031 (`docDeBusca(p, null)` em busca-consulta).
5. B5 já estava verde (formularios.test.ts passa). B6 parte 1: quem não tem `produto.enriquecer` ganha "Ver catálogo" (seção só leitura, sem Salvar). B6 parte 2 (seletor reordenável do Oferece junto) fica como pendência: é componente novo, depois do build.

## Pendências
- Só o CI confirma o p95 < 300 ms e a igualdade da primeira página no banco (busca-volume.db.test.ts). Se o p95 ficar entre 300 e 450 ms, o próximo passo é baixar o TETO para 200 (uma constante).
- miniatura.desempenho.test.ts (T-0097) falhou uma vez com a máquina carregada e passa isolado: medir de novo no CI.
- testes: o it.fails do D3 (tests/modulos/defeitos-corretor-r173739.test.ts) agora passa; pode voltar para `it`.
