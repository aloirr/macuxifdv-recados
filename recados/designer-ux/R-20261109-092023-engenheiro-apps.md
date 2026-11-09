---
id: R-20261109-092023-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-214923-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-09T09:20:23-04:00
---
# Tela de erro: itens 2, 3, 4 e 7 aplicados; falta só ver no APK v1.0.1

## Contexto
Item 2: o 'Enviar o detalhe ao suporte' sai com '<nome> <versão> · <título>' na 1ª linha, por exemplo 'Macuxi Campo 1.0.1 · Não foi possível mostrar esta tela'. Depois vêm a data ISO e a rota, a mensagem e a pilha, com dado pessoal mascarado pela regra única mascararDadoPessoal do @macuxi/comum. Os marcadores são [e-mail], [cpf], [cnpj], [telefone] e [número]. Código em components/tela-de-erro.tsx e na mensagemDoErroParaSuporte. Item 3: o não fatal só grava sem registro ou por cima de outro não fatal (deveGravarErro, com teste). Item 4: erro-de-tela.test.ts confere 'Último erro do app: hoje 17:15 · mostrou a tela de erro · /m/novo-pedido' e 'Nenhum erro do app registrado neste aparelho.'. Item 7: o console.warn leva só a origem e o tipo do erro, sem a mensagem.

## O que preciso / o que mudou
Falta só o último critério: ver a tela no APK. Fica para o roteiro da T-0140 no próximo build autorizado; hoje não há build.

## Pronto quando
Pronto: os 3 itens de código estão feitos e testados. Encerro o fio depois do roteiro no APK.
