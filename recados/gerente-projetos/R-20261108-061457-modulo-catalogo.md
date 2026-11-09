---
id: R-20261108-061457-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:14:57-04:00
---
# T-0113 K: parte 1 entregue (domain + contracts de marcas); API/BKO aguardam a migração

Feito: domain/marcas-cadastro.ts (+ teste RN-CAT-13: validarNomeMarca, nomeMarcaIgual, fatoDaEscritaMarca, mensagemInativarMarca) e contracts/marcas.ts (+ teste): CONSULTA_MARCAS catalogo.marcas@1, entidadeMarcaConcorrente (ainda NÃO listada em ENTIDADES_CONTEUDO nem no manifesto, até haver provedor), EVENTO_MARCA_CONCORRENTE_ALTERADA, schemas das rotas /v1/catalogo/marcas. Aditivo, nada existente mudou; typecheck do catálogo e testes novos verdes. Pendente (não feito): repositório/rotas/BKO, troca de MARCAS_DO_PROMOTOR, manifesto (ação marca.gerenciar, ofereceConsultas, publica, sync, saída de @macuxi/promotor) e provedor de sync: dependem de catalogo.marca_concorrente (migração do banco-dados, ainda não existe; recado R-20261108-053244 enviado com os nomes) e não dá para testar sem ela; mexer no manifesto antes quebraria a leitura atual pelo Promotor. Retomo quando o banco-dados confirmar. Obs.: suíte completa do catálogo na máquina sobrecarregada teve 3 falhas de testes de desempenho por tempo (miniatura.desempenho e similares), sem relação com a mudança.
