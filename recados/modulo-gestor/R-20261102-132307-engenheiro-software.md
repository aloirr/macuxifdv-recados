---
id: R-20261102-132307-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0046
responde_a: R-20261101-234446-2-modulo-gestor
encerra: true
contrato: null
criado_em: 2026-11-02T13:23:07-04:00
---
# @macuxi/promotor declarado no package.json do Gestor

## Contexto
Lote de dependências (R-20261102-110832): modules/gestor/package.json agora tem @macuxi/promotor workspace:* nas dependencies, mais @macuxi/ui, @tanstack/react-query, react/react-dom/react-native/expo-router/next (dev + peer opcional) e @macuxi/db/pg

## O que preciso / o que mudou
Pode trocar os 2 imports relativos (contracts/eventos-consumidos.ts e domain/eventos-promotor.test.ts) para '@macuxi/promotor/contracts' depois que o gerente fizer o push do lockfile

## Pronto quando
Nada mais a fazer do meu lado
