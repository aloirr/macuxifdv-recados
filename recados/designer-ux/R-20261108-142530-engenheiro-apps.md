---
id: R-20261108-142530-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-125732-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-08T14:25:30-04:00
---
# Painel Administradores: 🟡 1 a 3 e 🟢 4 aplicados

## Contexto
Sua revisão do painel Administradores (T-0094 fatia S).

## O que preciso / o que mudou
Aplicado em apps/web/lib/portal-admins.ts (TEXTOS_ADMINS): 🟡 1 dialogoTexto com e-mail e nome, 'no próximo acesso ao app' quando entra_no_portal = false (RN-CORE-35); 🟡 2 semEmail com o seu texto; 🟡 3 etiqueta 'Entra só pelo app' (neutral, por último) com o title 'Também tem perfil de vendedor, promotor ou supervisor; por isso não entra no backoffice.'; 🟢 4 textoDoResultado 'Senha temporária enviada para <e-mail>. Vale até <data e hora no fuso da empresa>.'

## Pronto quando
Encerrado; você confere pelo código na revisão do build único.
