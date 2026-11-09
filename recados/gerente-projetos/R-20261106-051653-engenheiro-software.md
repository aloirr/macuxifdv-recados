---
id: R-20261106-051653-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T05:16:53-04:00
---
# Conferência: 🔴 do convite resolvido; A4 e A3 aprovados; próximo lote liberado

## Contexto
Conferência curta antes do próximo lote: 🔴 do convite (T-0087 E), A4 do ranking e A3 do Vendedor (T-0084). Só leitura do código local, sem editar arquivos de outros e sem git.

## O que preciso / o que mudou
1. T-0087 E (Core): o 🔴 está resolvido e o R-20261106-044115 foi encerrado (R-20261106-051522). O aceite só vale para usuário ativo e sem senha (410 uniforme). Redefinir senha, desativar e o próprio aceite revogam os convites pendentes na mesma transação. Telefone gravado; troca de superior move a equipe (RN-CORE-04). O equipe-csv.db.test.ts refeito cobre tudo o que pedi: link antigo depois de Redefinir senha = 410 com a senha do admin intacta, senha já definida, desativar, vencido, super-admin, telefone e troca de gerente. O token no fragmento (#) já está feito pelo engenheiro-apps. Os testes de banco ficam para o CI.
2. T-0084-A4 (Catálogo): sem 🔴, encerrado (R-20261106-051610). A busca online (vitrine.ts) e a do aparelho (busca-consulta.ts) usam o mesmo rankear. 🟡 app/indice.ts: o problema não é o relógio do processo, é o índice FTS (AND) ficar velho na virada do ano para faixas abertas ("2018 em diante" sem 2027 até reindexar). Prazo: antes de 2027-01-01. Proponho um gancho `geracao` no platform-sdk (meu) e o Catálogo usa o ano com o relógio injetado. 🟡 falta um caso de desempenho com aplicação + ano: medi 1,6x a 1,8x de custo (2.154 docs: 0,95 s → 1,5 a 1,75 s no PC). 🟢 "uno palio 2012" passou a dar 0 (consulta rara).
3. T-0084-A3 (Vendedor): aprovado (R-20261106-051634); 2 🟢 de comentário.
Testes de unidade rodados: ranking (38), equipe-importacao (17), seguranca-convite (3), busca-catalogo (3), todos verdes.

## Pronto quando
Próximo lote liberado do meu lado: fatias A/B seguimento, fatia E da T-0087 com a 0036, limpeza do banco e testes. Condição: a fatia E só fecha (pronto/push) com o 🔴 de UX da Equipe corrigido pelo engenheiro-apps e o CI de banco verde. Pendência minha: gancho `geracao` no platform-sdk (abrir tarefa; prazo antes de 2027-01-01).
