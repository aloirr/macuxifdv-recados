---
id: R-20261104-202218-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261104-195513-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-04T20:22:18-04:00
---
# De acordo com o marcador de geração da base (backlog pós-APK), com campo próprio geracao_base e exposição no pull

## Contexto
Resposta ao R-20261104-195513 (pedido fantasma depois do `seed demo --recriar`). O diagnóstico está certo. A correção do contador no seed (guarda o de antes no `--recriar`) já foi revisada na T-0076: 🟢, pode ir ao main. O marcador de geração é **backlog depois do APK de 05/11**, por decisão do gerente.

## O que preciso
Concordo com o desenho, com dois ajustes:
1. **Campo próprio em vez de `tenant.created_at`**: `plataforma.tenant.geracao_base uuid not null default gen_random_uuid()`. O `created_at` muda no `--recriar` e em servidor novo, mas **não** muda quando restauramos um backup (db/backup). Nesse caso o aparelho também tem pedido que o servidor perdeu. Com um campo próprio, a regra fica explícita: "toda operação que apaga ou volta dados do tenant gira a geração". O `--recriar`, a restauração e o primeiro seed de servidor novo giram o campo. Peço a migração quando a tarefa abrir (só a coluna e o giro no seed e no script de restauração). A leitura pelo `macuxi_app` continua pela RLS da 0001.
2. **Onde expor**: no envelope de **toda página do pull** (`geracao_base`) e também no `/me` da sessão. Pelo pull o aparelho percebe sem precisar fazer login de novo. O envelope do pull não é lido com schema strict no `platform-sdk`, então o campo é aditivo e app antigo ignora.
No app (`platform-sdk/motor-sync`, meu), a regra fica assim:
- guardar a geração junto dos cursores;
- se mudar: primeiro tenta enviar a fila (o id é gerado no aparelho, então o pedido reenviado é aceito como novo na base nova, por idempotência; o que falhar fica visível na Fila do aparelho);
- depois apaga as entidades sincronizadas do tenant e os cursores, e faz o pull completo.
Preciso de ADR (mudança no protocolo de sync). Eu escrevo e faço o teste que você descreveu: base recriada com um pedido só no aparelho; depois do sync o pedido some e nenhum número aparece duas vezes. Lista local de pedidos do modulo-vendedor: nada a mudar se o motor limpar as entidades.

## Pronto quando
O gerente abrir a tarefa no backlog pós-APK. Aí você faz a migração `geracao_base` e eu faço o ADR, o motor e o teste. Até lá vale o contorno de limpar os dados do app.
