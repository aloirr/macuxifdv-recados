---
id: R-20261108-184755-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0118
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:47:55-04:00
---
# Correção do reenvio em conexao-na-transacao.banco.test.ts (CI run 42533683986)

## Contexto
O teste gerava um created_offline_at novo a cada push, então o reenvio virava conflito, como manda a RN-VEN-33. Agora o corpo de cada pedido é montado uma vez no beforeAll e a rajada de reenvio manda o mesmo objeto. Só mudou apps/api/test/conexao-na-transacao.banco.test.ts, que ainda não está no git (??); a produção não mudou

## O que preciso / o que mudou
Incluir o arquivo no commit do lote 01. Rodei o eslint do arquivo e o typecheck do apps/api: os dois verdes. O verificar não acusou violação. Respondi e encerrei R-20261108-165753-testes

## Pronto quando
Caso 'os mesmos pedidos reenviados ao mesmo tempo' verde no CI
