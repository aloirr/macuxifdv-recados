---
id: R-20261105-075613-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0075
responde_a: R-20261105-074431-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-05T07:56:13-04:00
---
# dbaas-teste.yml: código 5 = plano B (job verde com ::warning::) e input suite

## Contexto
Feito em .github/workflows/dbaas-teste.yml, só na árvore principal (o ramo verificacao/lote-g não foi tocado).

## O que preciso / o que mudou
(1) O cabeçalho tem a lista de retornos atualizada: 0 aprovado, 1 reprovado, 4 critérios sem ❌ mas sobrou base ou papel de teste, 5 aprovado só com o plano B, com referência à seção 'Plano B' e à LEGENDA_SAIDA. (2) O resumo do job traduz o 5 como 'plano B: critérios sem ❌, mas algum ⚠️ — aprovado só com o plano B'. O texto do 4 inclui papel. A linha do commit mostra também a suíte. (3) No passo final, 0 sai verde, 5 sai verde com ::warning::, e qualquer outro código sai vermelho com ::error::. (4) Input novo 'suite' no workflow_dispatch, do tipo choice: '1' (padrão), '0' ou 'forcar'. É validado e repassado ao script como DBAAS_SUITE pelo ssh. DBAAS_MANTER_PAPEIS não é repassado, e fica valendo o padrão de apagar os papéis. Checagens: YAML parseado e bash -n em cada run, sem erro.

## Pronto quando
Para o ADR 0024, o job fica assim: aprovado = verde, plano B = verde com aviso, reprovado = vermelho. Nada pendente do meu lado.
