---
id: R-20261109-132526-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0143
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T13:25:26-04:00
---
# T-0143: patch dos recados direto no GitHub para você aprovar (coord, guardião, settings e CI)

## Contexto
Seu pedido de 09/11 ~12h30 ("programe os recados para serem enviados diretamente ao macuxi recados sempre"). A tarefa do Agendador nunca foi cadastrada: às 12h50 o clone C:\macuxifdv-recados tinha 193 recados e 11 arquivos de lidos (88 linhas) que nunca chegaram ao GitHub. E a caixa levava 5 min 17 s, porque o coord lê os 4.700 recados do disco a cada comando.
Desenho: docs/desenho/T-0143.md · ADR 0039 (altera a 0035 §2, §4 e a volta) · patch: docs/desenho/T-0143.patch (sobre o main 9d097404).

## O que preciso / o que mudou
Sua aprovação do patch de governança (arquivos seus: scripts/coord*.mjs, .claude/, .github/). O que ele muda:
1. `enviar` grava um commit direto no aloirr/macuxifdv-recados (GraphQL createCommitOnBranch). Um arquivo por destino, tudo ou nada, sem sobrescrever. Se outro agente gravou no meio, o GitHub recusa e o coord relê e tenta de novo. Só diz "enviado" com o commit confirmado. Sem rede: "recado NÃO enviado (nada foi gravado)".
2. `lido` acrescenta as linhas em lidos/<agente>.txt no GitHub, sem perder linha de quem marcou ao mesmo tempo.
3. `caixa`, `pendencias`, `ler` e `fio` leem o main do GitHub na hora (inclui formulário e Telegram), com uma cópia local por commit para ficar rápido. Sem rede, mostram a cópia com um aviso.
4. Token: no PC, o do gh, que já está logado. Na nuvem e no CI: MACUXI_RECADOS_TOKEN. Recomendo criar também no PC um token fine-grained só com Contents read/write neste repositório: poupa 4 a 5 s por comando. Nada de token em arquivo nem em log.
5. Saem o hook de sincronização (início e fim de sessão) e o C:/macuxifdv-recados do settings.json. O guardião passa a barrar gravar em .coord/recados e .coord/lidos no disco, porque o arquivo se perderia. A guarda de merge lê a sua autorização direto do GitHub, nunca da cópia local.
6. Subida única dos pendentes: node scripts/recados/subir-pendentes.mjs --simular e depois sem --simular. Um commit só, nunca sobrescreve: conflito fica listado. Lidos são unidos.
7. O Telegram continua: o aviso dispara no push de recados/alexandre, e o commit pela API é um push.

Medição no seu PC, com os 7 agentes rodando:
- caixa: de 5 min 17 s para 8 s (13 s pelo gh);
- enviar: hoje passa de 120 s. Este recado foi enviado pelo código novo, direto no GitHub, e o tempo dele está no desenho (seção Medições, linha "enviar").

## Pronto quando
Você responde "aprovo o patch da T-0143" ou pede ajuste.
Depois o gerente segue o passo a passo do desenho (seção Corte):
1. alinhar .claude/ do disco ao main (recomendado; o patch aplica mesmo sem isso);
2. git apply;
3. subir-pendentes;
4. rmdir das junções;
5. commit com Agente: alexandre e CI verde antes do main.

Como testar:
- node --test scripts/coord-recados.test.mjs (19 testes, sem rede, com um GitHub de mentira; inclui 4 envios e 3 lidos ao mesmo tempo);
- depois do corte: caixa sem "Atenção", um enviar de teste e o aviso no Telegram.

Como voltar: variável MACUXI_RECADOS=local, clone e junções de volta e o Agendador, em minutos e sem mexer no código. Ou git revert do commit.
