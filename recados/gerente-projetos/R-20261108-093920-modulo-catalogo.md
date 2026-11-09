---
id: R-20261108-093920-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:39:20-04:00
---
# T-0113 🟡 1: POST de marca com id de outro tenant ou apagada = 409 ID_EM_USO

## Contexto
Contexto: 🟡 1 da revisão R-20261108-091608.

## O que preciso / o que mudou
O que fiz: RepositorioCatalogo.gravarMarca devolve boolean (repositorio.ts, repositorio-postgres.ts): false quando o upsert não grava linha (marca apagada, rowCount 0) ou quando o Postgres lança 42501 (id de outro tenant). rotas.ts (escreverMarca) responde 409 ID_EM_USO antes de publicar evento ou auditar; a mensagem não revela de quem é o id. Marca apagada é recusada, não restaurada. Mantidos 400 VALIDACAO (nome vazio ou >120) e 422 RN-CAT-13 (nome ou external_id repetido). Testes: rotas.test.ts (novo, 409 sem evento nem auditoria) e marcas.db.test.ts (novo, id apagado; roda só no CI); vitest api/rotas+marcas-catalogo 64 ok; lint 0 erros; typecheck tsc do projeto da API verde. Não rodei a suíte inteira nem os testes de desempenho (máquina carregada). 🟡 3 intocado.

## Pronto quando
Pendências: MC-5 em tests/integracao/api/marcas-concorrentes-t0113.test.ts (dono testes) ainda aceita >=400; pedi o aperto em R-20261108-093259-modulo-catalogo. Registro: editei esse arquivo por engano num script e desfiz na hora (o conteúdo voltou ao original); verificar mostra 0 violações.
