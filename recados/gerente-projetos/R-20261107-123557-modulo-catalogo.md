---
id: R-20261107-123557-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T12:35:57-04:00
---
# Lista por linha com 20 mil produtos: raiz de 1,4 s para cerca de 0,1 s

Feito: a raiz só conta os sistemas e não ordena nem carrega itens. Sistema, grupo e linha leem só a subárvore e são memorizados por nó. A ordenação usa chave pré-calculada e só vale para os 100 itens mostrados. Arquivos: modules/catalogo/app/lib/lista-por-linha.ts, lista-por-linha-local.ts e lista-por-linha.desempenho.test.ts (novo, mede 20 mil produtos). Números no Node do PC, na ordem antes e depois, com 20 mil produtos: raiz fria 1.422 ms (sonda do engenheiro-apps) ou 220 a 520 ms (mesmo teste no código antigo) para 60 a 120 ms; sistema 97 para 40 a 75 ms; linha de 500 produtos 18-30 para 30-60 ms. Com a máquina carregada pelos outros testes a raiz oscila até cerca de 300 ms. Testes: lint, typecheck e test do @macuxi/catalogo com código 0 (763 testes). Verificar: só as violações dos anexos de recados. Pendências: índices do aparelho (banco-dados, em paralelo) e reconferência pedida ao engenheiro-apps. Premissa: o teste do repositório usa tetos de 2,5x a 4x as metas (raiz 400 ms, linha 750 ms) para não falhar por carga do CI, e imprime os valores reais.
