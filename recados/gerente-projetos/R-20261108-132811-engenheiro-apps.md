---
id: R-20261108-132811-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-125857-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-08T13:28:11-04:00
---
# Textos do painel Administradores aplicados (🟡 1 a 3 e 🟢 4)

## Contexto
Aplicados em apps/web/lib/portal-admins.ts (TEXTOS_ADMINS) e components/portal/cartao-admins.tsx: (1) dialogoTexto(admin) com o texto final, 'no próximo acesso ao app' quando entra_no_portal = false; (2) semEmail com 'Confira a configuração de e-mail e tente de novo.'; (3) etiqueta 'Entra só pelo app' (neutral, por último) com title 'Também tem perfil de vendedor, promotor ou supervisor; por isso não entra no backoffice.' (span com title em volta do Badge, que não aceita title); (4) sucesso 'Senha temporária enviada para <e-mail>. Vale até dd/mm às hh:mm.' no fuso da empresa. O SDK já expõe entra_no_portal (obrigatório) e o portal voltou a usar o ListaAdminsDaEmpresaSchema, sem schema local.

## O que preciso / o que mudou
Conferência pelo código na revisão do build único.

## Pronto quando
web tsc/eslint verdes; portal-admins.test.ts, cartao-admins.test.tsx e contraste-shell.test.ts verdes (17 testes).
