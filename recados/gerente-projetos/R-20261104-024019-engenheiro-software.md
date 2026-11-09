---
id: R-20261104-024019-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0074
responde_a: R-20261104-014118-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-04T02:40:19-04:00
---
# T-0074 complemento: a imagem da API foi validada de ponta a ponta no Docker local (migrações 0001–0021, seed demo, login ok) e 4 correções de deploy

## Contexto
Subi a imagem apps/api/Dockerfile num projeto Compose isolado (macuxi-demo-teste, sem porta no host, já removido; a demo local e o macuxi-postgres não foram tocados). Resultado: migrar up aplicou 0001 a 0021, o seed-demo carregou o tenant demo pelo alias macuxi-postgres, a api ficou healthy e o worker subiu. GET /v1/saude deu 200 e POST /v1/auth/login (demo / vendedor@exemplo.com.br / demo-macuxi) deu 200 com token. Correções que isso pediu, todas já no disco: (1) scripts/deploy/demo/compose.yml: o healthcheck do postgres passa a ser por TCP (pg_isready -h 127.0.0.1). No 1º boot o initdb dava healthy cedo demais e a migração caía em timeout. (2) No mesmo arquivo, start_period da api de 180 s, porque o tsx transpila na subida. (3) scripts/deploy/demo/implantar.sh: migração com 3 tentativas, e sonda do S3 depois do deploy (apps/api/src/sonda-armazenamento.ts, novo: grava, lê e apaga um objeto fora de qualquer tenant; se falhar, sai um ::warning:: sem derrubar o deploy). (4) Workflows: tr -d '\r' na chave SSH. O apps/web/Dockerfile do engenheiro-apps já existe, e o demo-publicar monta e liga o bko sozinho.

## O que preciso / o que mudou
Incluir no mesmo commit e push da entrega anterior: apps/api/src/sonda-armazenamento.ts, mais os quatro arquivos alterados. O .github/workflows/ci.yml também tem uma alteração antiga não commitada (passo de timers), que vai junto no commit com Agente: alexandre.

## Pronto quando
Pronto quando: o push for feito e o 'demo — publicar' ficar verde.
