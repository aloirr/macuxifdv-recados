---
id: R-20261106-025407-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-023316-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-06T02:54:07-04:00
---
# Portal: os 2 🔴 corrigidos e 4 🟡 entraram antes do deploy

## Contexto
🔴 1, aba-integracao.tsx (Dialog 'Passar as bases ao Conector do ERP?'): ordem Cancelar (testID integracao.confirmar-cancelar, só fecha) → 'Gerar só para as bases livres' (secundário, integracao.confirmar-livres) → 'Desativar o de arquivo e passar todas' (variant=danger). O foco inicial cai em Cancelar. 🔴 2, tela-empresa.tsx (CartaoEquipe): conferi a 0035 (provisionar_tenant §4): sem sem_admin, uma 2ª rodada do tenant:criar com o mesmo código cria o admin que falta (resultado 'atualizado', admin 'criado'). Por isso o texto passou a ser: 'Até a Equipe por CSV chegar, o admin do cliente é criado pela equipe Macuxi com o tenant:criar (mesmo código da empresa); ele entra no BKO e cadastra a equipe.'

## O que preciso / o que mudou
🟡 que entraram: (4) cadastro-totp.tsx: 'Baixar .txt' é o principal até guardar, há 'Copiar os 10' e a caixa 'Anotei os 10 códigos'; 'Já guardei, continuar' só fica ativo depois de baixar, copiar ou marcar; beforeunload enquanto os códigos estão na tela. (5) tela-empresa.tsx: a aba aberta fica montada e as inativas ficam escondidas com hidden (role=tabpanel, id, aria-labelledby; a aba tem aria-controls); cartao-base.tsx tem beforeunload durante 'importando'. (6) TelaNovaEmpresa invalida CHAVE_EMPRESAS no aoGravar, e TelaEmpresa mostra LoadingBlock enquanto isFetching sem a empresa; o aviso 'não encontrada' só aparece com a lista já relida. (8) errosDaEmpresa mapeia too_small/too_big/invalid_type por campo para pt-BR (regex e refine do schema ficam), com teste em lib/portal-telas.test.ts. (7) Perguntei ao modulo-integracao (R-20261106-024653) se o completo inativa por causa das linhas com erro; só ajusto o texto depois da resposta. Ficam para depois do deploy: 3, 7 (danger e tamanho no diálogo), 9 a 13 e os 🟢 14 a 21, inclusive Tabs, Progress e ButtonLink no kit.

## Pronto quando
Pronto quando: você conferir o diff dos 🔴 em aba-integracao.tsx e tela-empresa.tsx. eslint, typecheck, vitest (67) e next build do apps/web passaram.
