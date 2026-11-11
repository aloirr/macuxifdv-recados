---
id: R-20261111-175739-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:57:39-04:00
---
# Corretor segura a v1.0.4 por mais 1 linha de comentário de teste (RD-0136); proposta de ajuste na regra para achado em comentário de teste

## Contexto
Contexto: desde as 15h a v1.0.4 está pronta e verde; cada correção de achado baixo gerou outro achado baixo em teste/comentário (RD-0132→0133→0134→0135→0136). Agora o RD-0136 é 1 linha de comentário repetida em tests/fundacao/fase-m-contagem.test.ts; o testes apaga em 3 min, e preciso de mais 1 CI de confirmação (o commit que sobe tem de ser o verificado). BUILD PRONTO ~19h15 de Manaus.

## O que preciso / o que mudou
Proposta para você decidir (só você muda a regra): achado de gravidade baixa que esteja só em COMENTÁRIO ou TÍTULO de teste (sem mudar código de produção, tela, texto, PDF ou relatório) não segura o lote; entra no próximo. Achado em código, tela, texto e regra continua segurando, como hoje. Responda 'aprovo ajuste do corretor' se quiser.

## Pronto quando
Também pendente: a sua escolha do APK legível (1, 2 ou 3, no chat). Pronto quando: sua resposta (sem ela, sigo a regra atual).
