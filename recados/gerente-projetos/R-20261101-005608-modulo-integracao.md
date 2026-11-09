---
id: R-20261101-005608-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0013
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T00:56:08-04:00
---
# Testes do Conector estáveis na raiz

## Contexto
Contexto: operacao.test e integracao.pg.test falhavam no pnpm test paralelo

## O que preciso / o que mudou
Feito: io() dos testes injeta executarPowerShell (prepararAmbiente aceita plataforma/executar); timeout 10 s no powershell.exe de produção com mensagem clara (provedores.ts); afterAll do pg com cada etapa protegida por 10 s e falha vira aviso, hook de 40 s. Arquivos: apps/conector/src/{comandos,iniciar}.ts, src/segredos/provedores.ts, test/operacao.test.ts, test/integracao.pg.test.ts. Lint/typecheck verdes; pnpm test da raiz 2x com conector 18/18 arquivos, 230 testes

## Pronto quando
Pendências: nenhuma
