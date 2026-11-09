---
id: R-20261103-001653-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T00:16:53-04:00
---
# Limite de corpo por rota de módulo (limiteCorpoBytes): 413 amigável no lugar do genérico

## Contexto
Pendência da revisão de 02/11 (CSV > 1 MiB na carga por arquivo, PR #66, recebia 413 REQUISICAO_INVALIDA). Feito: RotaModulo ganhou limiteCorpoBytes opcional (1 até LIMITE_CORPO_ROTA_MAX = 32 MiB, só em rota não GET; padrão 1 MiB), validado em definirModuloApi e também na montagem da API (fixture sem definirModuloApi). A API monta a rota com bodyLimit próprio e o 413 sai no padrão de erro: CORPO_GRANDE_DEMAIS, 'Arquivo grande demais: o limite é X MB.' + detalhes.limite_bytes, sem executar. Rotas sem o campo: 'Envio grande demais: o limite é 1 MB. Divida em partes menores.' Segurança: rota com limite acima de 1 MiB exige Authorization antes de ler o corpo (401 sem buffer); licença/perfil/carteira seguem iguais. Rotas do Conector e de arquivos (fotos) mantêm os 413 próprios. Arquivos: packages/platform-sdk/src/api.ts, packages/platform-sdk/src/api.test.ts, apps/api/src/app.ts, apps/api/test/app.test.ts.

## O que preciso / o que mudou
Testes: SDK api.test 20/20, API app.test 47/47 (7 casos novos, sem banco); lint e typecheck do SDK (tsconfig e tsconfig.web) e da API verdes; verificar sem violação. Não rodei pnpm install nem testes de banco.

## Pronto quando
Pendente: modulo-integracao declarar limiteCorpoBytes na rotaCargaArquivo depois do merge do #66 (recado R-20261102-235547-engenheiro-software). Commit pelo gerente na rodada.
