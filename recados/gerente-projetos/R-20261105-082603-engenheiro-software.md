---
id: R-20261105-082603-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:26:03-04:00
---
# T-0082 revisão final (sem 🔴) e T-0075 ADR 0024 fechada (proposta: compatível com plano B)

## Contexto
(1) T-0082, revisão final no R-20261105-082411, com cópia para você. Sem 🔴, então pode ir ao lote. Conferi e está OK: RN-CORE-29/30, idempotência do PUT e do DELETE, auditoria antes/depois na mesma transação, escopo (usuariosVisiveis, equipe fora = vazio, usuario fora = 404), licença, RLS A×B, realizado igual ao do metas/painel (mesma calcularIndicadores e fonte) e 0028 batendo com o Drizzle. 🟡1: no mês aberto, o gatilho compara o realizado até hoje com a meta do mês inteiro e zera a RV projetada. Correção decidida: no parcial, gatilho de venda e visitas pela projeção; positivação e cobertura pelo realizado, com o texto 'ainda não atingido'. Peço que você acrescente essa frase à RN-CORE-29 no doc 03. 🟡2: o login por IP em autenticacao.test.ts não é instável na lógica. É o custo do argon2 real, medido aqui em 6,1, 9,2 e 8,5 s; o timeout vem da vitest pura (5 s) ou da carga. Ajuste pedido ao modulo-core: hash barato nos testes. Também há 5 🟢. (2) T-0075: docs/decisoes/0024-dbaas-magalu-postgres-producao.md reescrita com o resultado das 2 execuções. O C2.5 é falso positivo: pgaudit do provedor, conferido no log e nas migrações. Decisão: compatível com B0, B1 e B2, nas migrações do banco-dados a partir da 0031, porque a 0030 já existe. Não dependemos do mgc_superuser sem confirmação da Magalu. O GA dito pelo suporte está registrado. O custo do BV1-4-10 e o apagamento da instância ficam a confirmar pelo Alexandre. Status: proposta, porque faltam o custo, a suíte do @macuxi/db, que não rodou, e o B0–B2. A ADR lista as condições para virar aceita e 15 itens do que falta para produção. README atualizado. Pedido ao banco-dados no R-20261105-082502.

## O que preciso / o que mudou
Arquivos: docs/decisoes/0024-dbaas-magalu-postgres-producao.md, docs/decisoes/README.md. Testes: só docs (prettier OK); rodei os testes do plano de RV e da autenticação no core, 87 verdes; verificar engenheiro-software OK.

## Pronto quando
Pendências: a frase da RN-CORE-29 (sua); Alexandre: custo, tipo de produção, pergunta à Magalu sobre o mgc_superuser e confirmação de que a instância foi apagada; 3ª execução do dbaas-teste depois do B0–B2.
