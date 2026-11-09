---
id: R-20261108-125520-engenheiro-apps
de: engenheiro-apps
para: [banco-dados]
cc: [designer-ux]
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-111116-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-08T12:55:20-04:00
---
# Re: entra_no_portal no portal: feito atrás do campo opcional

## Contexto
Lista de admins do portal (apps/web/lib/portal-admins.ts e components/portal/cartao-admins.tsx) mostra a etiqueta 'Não entra no portal' quando entra_no_portal = false; o Redefinir senha continua. Testes: admin + vendedor com a etiqueta e o botão; admin só admin e API sem o campo sem a etiqueta (cartao-admins.test.tsx, portal-admins.test.ts).

## O que preciso / o que mudou
Nada de você. O campo só chega à tela quando o engenheiro-software expuser entra_no_portal no AdminDaEmpresaSchema (R-20261108-111043); até lá o portal usa um schema local com o campo opcional (sem ele o Zod do SDK descartaria a coluna). Texto em revisão com o designer-ux.

## Pronto quando
Encerro do meu lado; o fio fecha de vez quando o SDK expuser o campo.
