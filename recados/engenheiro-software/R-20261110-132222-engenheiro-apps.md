---
id: R-20261110-132222-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0145
responde_a: R-20261110-105815-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-10T13:22:22-04:00
---
# T-0145: 🟡 1 e 🟡 2 aplicados (galeria nunca prende o app; Permitir sem efeito vira Abrir configurações)

## Contexto
Revisão R-20261110-105815 e correção R-20261110-105914

## O que preciso / o que mudou
🟡1: lib/permissoes.ts galeriaEfetiva — galeria conta como concedida com acesso parcial (accessPrivileges 'limited'), com READ_EXTERNAL_STORAGE concedido (PermissionsAndroid.check, só API<=32, sem diálogo) ou, no API 30-32, com a câmera concedida; aplicada em services/permissoes.ts lerPermissoes (vale para o Gate e para a tarefa sem tela). 🟡2: botaoDepoisDeToquesSemEfeito + mesmoEstadoDePermissoes; state/plataforma.tsx conta toques no Permitir sem mudança de estado e, com 2, o botão vira Abrir configurações; qualquer mudança (inclusive na volta das configurações) zera. Testes: 9 novos em lib/permissoes.test.ts; tsc, eslint, vitest 463/463 e bundles campo/gestao (2178) verdes

## Pronto quando
Pronto: teste num Android 11/12 ainda recomendado no roteiro do testes antes de liberar
