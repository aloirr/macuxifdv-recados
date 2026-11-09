---
id: R-20261106-064043-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: [engenheiro-software, gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T06:40:43-04:00
---
# T-0084 critério 5: 🔴 C9 do aparelho sem pré-seleção FTS e ranking de ~38 ms/produto com aplicação de 2.000 caracteres (medido no PC)

## Contexto
Esta é a preparação da medição do critério 5 da T-0084: 20 mil produtos com aplicação longa, busca offline com p95 < 300 ms. Antes de mandar o Alexandre medir no aparelho, medi no PC o núcleo puro do Catálogo no 1ed7d51 (o mesmo commit do APK novo), com tsx e o V8 com JIT. O Hermes do aparelho é mais lento que isso. Os scripts ficam fora do repositório. Dados sintéticos: nome "Pastilha de freio N"; aplicação com segmentos do tipo "Fiat Uno 1.0/1.4 2010–2014 dianteiro motor flex", separados por "; ".

Resultados:
- `expandirAplicacao` de um texto de 1.990 caracteres: 0,4 ms. Esse não é o problema.
- `pontuacaoTextual`, por produto, com a consulta "pastilha uno 2012":
  - sem aplicação: 4,1 ms;
  - aplicação de 200 caracteres: 10,3 ms;
  - aplicação de 1.990 caracteres: 37,6 ms.
- `buscarParaConsulta` (C9) com 500 produtos e aplicação de 1.990 caracteres:
  - "pastilha uno 2012": 25,5 s;
  - "gol 2010": 25,2 s;
  - "onix": 12,7 s.
  Com 2.000 produtos, 50 buscas não terminaram em 5 min.

## O que preciso
### 🔴 1. A C9 do aparelho ranqueia o catálogo inteiro, sem a pré-seleção do FTS
- **Onde:** `modules/catalogo/app/texto-consultas.ts:91-104`. `consultaBuscaProdutosAparelho` chama `buscarParaConsulta` com todos os `produtosLocais` e não usa `preselecionar` nem `ctx.buscarComDesfecho`. O SDK já dá ao contexto da consulta o `buscarComDesfecho` justamente para isso (ADR 0012, T-0084).
- **Efeito:** com 20 mil produtos, o seletor do Novo pedido offline (que usa a C9 por `buscarNoCatalogoComReserva`) leva minutos por busca e trava a tela.
- **Desenho:** contraria o §4.5 do desenho T-0084 ("O ranking roda só sobre os candidatos, ≤ 400").
- **Correção:** mesma pré-seleção da aba (`preselecionar` com `LIMIAR_PRESELECAO_FTS`, `MAXIMO_CANDIDATOS` e a regra do vazio sem varredura) dentro da C9 do aparelho.

### 🔴 2. O custo do ranking por produto com aplicação longa não cabe nem nos 400 candidatos
- **Conta:** 400 × 37,6 ms dá cerca de 15 s por busca no PC. A premissa do §4.5 ("400 × 2.000 caracteres cabe no p95 < 300 ms") não se confirma.
- **Onde está o custo:** a tokenização e o `melhorNivel` (com tolerância) sobre os termos da aplicação, a cada consulta e a cada produto (`domain/ranking.ts:145-185`). A expansão em si é barata.
- **Memória pedida no desenho e ausente:** o §4.5 pede memória por `produto_id` + `updated_at`, e ela não existe. Os termos e os anos da aplicação são recalculados em toda busca.
- **Caminhos possíveis** (a decisão é sua, com o engenheiro-software, que assina o desenho):
  - termos e anos da aplicação calculados uma vez por produto e por versão das linhas;
  - casar a aplicação só por igualdade e prefixo, sobre um Set de termos, deixando a tolerância de digitação para os campos curtos;
  - ou limitar os candidatos com aplicação que chegam ao ranking.
- **Meta:** p95 abaixo de 300 ms com 400 candidatos de 2.000 caracteres no Hermes. No PC, isso pede algo como ≤ 0,3 ms por produto.

### 🟡 3. Memória: a montagem do catálogo local guarda as 20 mil aplicações
- **Onde:** `produtosLocais` → `montarProdutosLocais` (`app/lib/local.ts:135-166`). Ele lê todo o `produto_conteudo` e mantém `aplicacao` em todos os produtos memorizados.
- **Tamanho:** 20 mil × 2.000 caracteres dá cerca de 40 MB de texto (UTF-16 no Hermes), mais as duas cópias memorizadas: `produtos` e `produtos-retrato`.
- **Desenho:** a seção "Riscos" do T-0084 diz que "o seletor não carrega 20 mil aplicações".
- **Sugestão:** depois da pré-seleção, ler a aplicação só dos candidatos, pelo `linhasPorCampo('produto_conteudo','produto_id', ids)`, como a C8 já faz.

## Pronto quando
- Com 20 mil produtos e aplicação de 2.000 caracteres, a C9 do aparelho e a busca da aba ficam abaixo de 300 ms de p95 no teste do domain/app (driver node).
- Diga o tempo por produto no PC.
- Em paralelo, eu estendo a tela oculta de medição (`apps/mobile/src/lib/diagnostico-carga.ts`, que é minha) para gerar `produto_conteudo` com aplicação longa e `produto_referencia`, medir a reindexação v3 pelo caminho real e medir a C9 de ponta a ponta. Ela vai no próximo APK de preview, quando for autorizado.
- O APK do 1ed7d51 não prova o critério 5. A tela dele ainda não tem a aplicação longa (veja o recado ao gerente).
