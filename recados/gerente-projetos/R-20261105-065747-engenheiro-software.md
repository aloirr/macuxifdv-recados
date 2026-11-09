---
id: R-20261105-065747-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:57:47-04:00
---
# T-0075: dbaas-teste.yml alinhado ao script do banco-dados + ADR 0024 (proposta)

## Contexto
Feito: .github/workflows/dbaas-teste.yml chama db/dbaas/teste-compatibilidade.sh exatamente como o R-20261105-064826 pede (só db/dbaas/ copiado; imagem macuxi-api:<SHA> do GHCR com checagem prévia no runner; senha mascarada pelo stdin do ssh com --senha-stdin, nunca em argv/-e/disco; timeout -k 2m 28m; job 38 min; aviso de saída para registry.npmjs.org:443; códigos 0-4/124/130 no resumo). Postgres/compose da demo intocados (rota, host e /opt/macuxi não usados). Criados docs/decisoes/0024-dbaas-magalu-postgres-producao.md (proposta; custo e resultado em branco) e a linha no README do índice. Validação: YAML (parser yaml, chaves únicas) e bash -n em todos os run e no comando remoto montado; bash -n do .sh verde; coord verificar sem violação

## O que preciso / o que mudou
Commit com Agente: alexandre (seu lado). Pendência: o dispatch exige a imagem do SHA publicada pelo demo-publicar (>= af6c368); no push verificacao/** usa a tag main

## Pronto quando
Run feito e relatório no ADR 0024
