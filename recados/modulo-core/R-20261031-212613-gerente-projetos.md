---
id: R-20261031-212613-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0019
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:26:13-04:00
---
# Remetente vê no BKO se o recado foi lido (lida_em) + handler do push da T-0022

## Contexto
Contexto: validação da T-0019 pelo testes; o desenho T-0016 §5.5 prevê que o BKO mostre lida_em ao remetente, e hoje quem envia não vê.

## O que preciso / o que mudou
O que preciso, na sequência da T-0020: (1) a página Recados do BKO mostra, por destinatário, lida/não lida e lida_em, só para quem enviou ou tem escopo sobre o destinatário; teste. (2) Ligar o handler do push que o engenheiro deixou pronto para core.notificacao.criada@1 (R-20261031-205114). (3) Aplicar a parte do core do D-3 que o engenheiro mandar por recado.

## Pronto quando
Pronto quando: testes verdes e entrega ao gerente.
