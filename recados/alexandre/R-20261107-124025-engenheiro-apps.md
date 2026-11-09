---
id: R-20261107-124025-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [gerente-projetos]
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: R-20261107-092152-alexandre
encerra: false
contrato: null
criado_em: 2026-11-07T12:40:25-04:00
---
# BUILD PRONTO d1e0d2a — Campo e Gestão (preview), sem recriar a base

## Contexto
Build único de preview pedido no R-20261107-092152. As 5 condições foram confirmadas pelo gerente-projetos: #95, #96, #97 e #99 estão no main; o atalho "Ver por linha" está no main; o CI do main (run 42393652386) e o "demo — publicar" (run 42394436158) passaram verdes no commit exato d1e0d2ada0336e8ef128570d62dedfcda1c34c07; não há lote nem tarefa em andamento mexendo no app; não chegou nenhum bug do teste do e9a65286.
Os dois APKs saíram de um checkout limpo do d1e0d2ad (C:\macuxifdv-check, pnpm install --frozen-lockfile ok), e não do working tree local. Antes do envio, o bundle local das variantes campo e gestao ficou verde. O Expo registrou o commit d1e0d2ad nos dois builds. A parte nativa é a mesma do e9a65286: entre os dois commits, o lock só ganhou dependências de desenvolvimento do módulo Integração.

## Links
- Campo (campo-preview), FINISHED em 22 min
  - APK: https://expo.dev/artifacts/eas/mYUJapRgUkLSqQrOh8y0ACLnNZ-d_qfQuTzjbD2PDCU.apk
  - Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3c7f7285-9bda-4a15-b9a0-e82063eb76c9
- Gestão (gestao-preview), FINISHED em 23 min
  - APK: https://expo.dev/artifacts/eas/bnwAb51ekkzPhxTay-3JjurO610EoBDNie0Te01QuN0.apk
  - Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/c84eb531-b475-46a8-b377-56674bef2b6d

Para instalar, basta atualizar por cima do e9a65286: os dados do aparelho são mantidos.

## Base da demo
Não é preciso recriar. A base foi recriada hoje e nenhuma migração nova entrou: `git diff --name-only e9a65286 d1e0d2ad -- db/migrations` não lista nada.

## Roteiro: só o que mudou desde o e9a65286
1. Aba Catálogo, atalho "Ver por linha". Ele aparece entre a busca e a trilha, mas só quando a busca está vazia, fora do pedido e se o catálogo tem árvore de linhas. Toque nele e confira se abre a lista por linha.
2. Lista "Por linha" (sistema › grupo › linha). Navegue pelos níveis, abra um produto e volte. Teste também com o cliente escolhido e no modo avião.
3. Pedidos:
   - etiqueta e resumo do vendedor quando há busca;
   - o período não aparece mais nos chips A faturar/Em aberto;
   - avisos de sem sinal num aviso com ícone (sem sinal = wi-fi cortado; o relógio só aparece em "organizando");
   - texto novo do vazio sem sinal;
   - "Remover filtro <nome>".
4. Novo pedido: as pendências do pedido agora aparecem acima do Avançar e, no Resumo, acima do Cancelar/Salvar. Com uma pendência (por exemplo, falta de forma de pagamento), o toque leva à aba Detalhes.
   Atenção: "No pedido" abaixo da busca e o prazo médio do cliente no cabeçalho já estavam no e9a65286 (commit e604a3dd). Não mudaram neste build, mas pode reconferir se quiser.

## Pronto quando
Se algo do roteiro falhar, mande o passo e o aparelho (Campo ou Gestão) que eu encaminho ao dono da tela.
