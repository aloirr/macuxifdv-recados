---
id: R-20261108-134932-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0097
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:49:32-04:00
---
# GET /v1/arquivos/:id: foto_produto do Catálogo vale para o tenant (miniatura do vendedor dá 404 hoje)

## Contexto
T-0097 / build único: a demo não tem foto de produto e a miniatura não pode ser testada. Preparei no Catálogo o caminho de produção: `PUT /v1/catalogo/produtos/:id/foto-principal` {arquivo_id} (registra `plataforma.arquivo` com modulo=catalogo, finalidade=foto_produto, entidade=produto, cliente_id nulo, e define a principal via definirFotoPrincipal, que já toca o produto_conteudo para o pull) e depois o JPEG vai por `PUT /v1/arquivos/:id`. Script de carga: modules/catalogo/api/demo/carregar-fotos.ts (gera placeholders de 320 px, 14 a 21 KB, com o nome e a cor da categoria; sem imagem de marca).
Problema na leitura: `GET /v1/arquivos/:id` (apps/api/src/arquivos.ts, ramo `else` de `if (linha.cliente_id)`, ~linha 229) exige que `enviado_por` esteja em `usuariosVisiveis()`. Quem sobe a foto do produto é gerente/analista/admin; o vendedor e o promotor só enxergam a si mesmos, então recebem 404 na miniatura do produto (e o supervisor, que vê a equipe, também não vê a foto do gerente).

## O que preciso
1) Foto de produto vale para o tenant inteiro (o catálogo é do tenant, RN-CAT-04: todos os perfis consultam). Diff exato em apps/api/src/arquivos.ts: incluir `finalidade` no select (`select modulo, finalidade, enviado_por, situacao, sha256, tamanho_bytes, cliente_id, chave_armazenamento ...`, e no tipo LinhaArquivo) e trocar o ramo sem cliente por
```
} else if (!(linha.modulo === 'catalogo' && linha.finalidade === 'foto_produto')) {
  const visiveis = await ctx.usuariosVisiveis();
  if (visiveis !== 'tenant' && !visiveis.has(linha.enviado_por)) throw naoEncontrado();
}
```
(a licença e o perfil do módulo continuam checados antes). Teste: foto_produto enviada pelo gerente é lida pelo vendedor (200); outra finalidade sem cliente segue 404 para quem não a enviou.
2) A versão reduzida de 320 px no servidor (T-0097 b) é sua: a carga já sobe JPEG de 320 px, então ela NÃO depende da versão reduzida para a demo; só para fotos reais enviadas depois.

## Pronto quando
O GET do arquivo de finalidade foto_produto responde 200 para vendedor e promotor do mesmo tenant. Avise o gerente-projetos para a carga rodar na demo depois do publicar.
