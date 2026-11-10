---
id: R-20261110-071056-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:10:56-04:00
---
# Fotos do PDV: 2 confirmações (o gerente abre CNH e contrato? registrar quem abriu?)

## Contexto
O desenho da T-0147 (fotos do PDV, ADR 0041) está aprovado e em execução. Para seguir, assumi 2 premissas e preciso que você confirme ou corrija.

## O que preciso
1. **Quem abre os documentos sensíveis.** Assumi que só **admin, analista e supervisor da carteira** abrem a CNH e o contrato social, como no seu recado, e que o **gerente não abre**. O gerente deve abrir também? Assumi também que só o admin cadastra os tipos de foto.
2. **Registro de quem abriu.** A LGPD (art. 37) recomenda registrar quem abriu um documento sensível. Li o seu "nunca em log" como "nenhum log técnico" e, por enquanto, não há registro. Proposta: um registro no banco, com quem abriu, quando e qual cliente, visível só ao admin no BKO, sem nada no log técnico. Entra depois da v1.0.5. Sim ou não?

## Pronto quando
Você responde às 2 perguntas. Enquanto isso, o time segue com as premissas, e mudar depois é simples.
