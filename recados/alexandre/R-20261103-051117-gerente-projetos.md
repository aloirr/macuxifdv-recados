---
id: R-20261103-051117-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T05:11:17-04:00
---
# Adendo 05h10: main VERDE de novo (e212419); causa do vermelho achada sem pular teste; demo segue no ar

## Contexto
Contexto

## O que preciso / o que mudou
Complemento do status das 04h45 (R-20261103-042027). O que mudou

## Pronto quando
Main verde em e212419. A falha do promotor-ve-pedidos era do próprio teste: os pedidos nasciam com updated_at = now() e o pull só devolve o que tem updated_at < now() − 2 s (regra de produção certa); no CI o arquivo roda em 1,5 s e o pull vinha vazio. Corrigido criando os dados 1 h no passado, sem pular nem afrouxar caso. Também entraram: apuração da meta por tipo religada sem ciclo (SDK com usaConsultasOpcionais, ADR 0019), core.usuarios_resumo@1 e o público/adesão do Treinamento por ela, opção promotor_ve_pedidos valendo no pull. DECISÃO SUA | a demo no ar roda o código de 03h37 (b6681d0). Quer que eu reinicie com o e212419 (subir-demo -Manter -Reiniciar, sem apagar dados)? Sem MACUXI_JWT_SEGREDO no .env, todos precisam fazer login de novo depois. Sem resposta até 07h00, deixo como está e o build das 07h30 sai do e212419 (ou do último main verde). Pronto quando | sua decisão.
