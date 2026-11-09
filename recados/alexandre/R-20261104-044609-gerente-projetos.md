---
id: R-20261104-044609-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0074
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T04:46:09-04:00
---
# Status 5h (04/11): T-0071 → governança → 0021 no main (e2064a0, 79dc3db, e626d0b); demo na Magalu no ar pela API; BKO no próximo push

## Contexto
Rodada da madrugada de 04/11, sem você. Todas as vagas ficaram ocupadas o tempo todo (4 agentes).

## Hashes no main (na ordem pedida: T-0071 → governança → 0021)
1. **e2064a0**: T-0071, fatias 1–5 (0020, preço v2, orçamento, sugestões, ui, matriz). CI verde.
2. **79dc3db**: governança (designer-ux, `Agente: alexandre`) e base do visual da T-0072. CI verde.
3. **e626d0b**: 0021 (recado do dia + `core.indicador_diario.clientes_positivados int null`), S0-025 ajustado à FK nova (nenhuma asserção mudou), T-0074 (ADR 0020 como proposta, compose, Dockerfile da API, adaptador S3) e workflows `demo-publicar`/`demo-recriar-base`.
   - Os workflows foram num commit à parte, de157dc, com o seu trailer, pela autorização do pedido v2, item 3.
   - O `ci.yml` (passo dos timers) continua fora, esperando você.
   - CI verde.
- O **PR #84** (T-0073 na nuvem) já pode rodar o CI de novo: a 0021 está no main.

## Demo na Magalu
- ✅ Primeiro deploy verde pelo workflow (run 41791896334).
  - VM endurecida: só chave, sem senha nem root, fail2ban, UTC.
  - Segredos gerados na VM (`/opt/macuxi/.env`).
  - Migrações 0001–0021 e seed demo aplicados.
  - api/worker/postgres/cloudflared saudáveis.
  - Sonda do S3 gravou, leu e apagou no bucket.
- ✅ `https://api-demo.macuxifdv.com.br/v1/saude` → 200, vindo da VM.
- ⏳ `bko-demo/login` → 502 até o push do Dockerfile do BKO.
  - O Dockerfile está pronto e revisado, sem 🔴 (commit local dcdb624).
  - O primeiro CI limpo dele pegou erros de tipo num teste novo (o testes está corrigindo) e um flake antigo do Core (`medidas.db.test.ts`, corrida no POST concorrente; pedido ao modulo-core).
  - Sobe no próximo push verde.
- ⏳ Backup: o lado do banco está pronto e a restauração foi testada no 5434 (cbc3de0). O engenheiro-software liga o agendamento na VM agora.
- Por favor, confira no painel:
  1. o túnel `macuxi-demo-nuvem` **Healthy** com origem 177.93.129.233;
  2. tire o **snapshot da VM** depois que o BKO subir.
- A chave `macuxi-deploy-v2` **não está** em `%USERPROFILE%\.ssh` (só a v1, que ninguém usou). O deploy não precisa dela, porque usa o secret, mas o acesso manual por SSH do PC depende dela.

## T-0071 (APK de 05/11)
- A fatia 6 do app Campo está completa (6084c1b, 668 testes verdes):
  - R$ no item e no pedido;
  - tela do orçamento com Transformar, Editar, Duplicar, PDF e cancelar offline;
  - chip da medida e trilha do catálogo;
  - sugestões.
- Revisões:
  - engenheiro-software: sem 🔴;
  - designer-ux: **3 🔴** (desconto editável depois do envio, orçamento confirmado como "Pedido", Transformar sem a folha da alçada). O modulo-vendedor está corrigindo agora, junto com 13 🟡.
- testes: orçamento ponta a ponta 13/13 (referência 37979 offline → Transformar → meta) e promotor sem pedido.

## T-0072 e T-0073
- Shell: transições com reduzir movimento e barra de abas nova (dcdb624). O designer-ux revisou, sem 🔴.
- modulo-gestor: card "Pedidos para aprovar" no Início e visual do Gestão, em andamento.

## Precisa de você
1. **Demo local no PC**: continua rodando e pesando na máquina (o Postgres 5432 escreveu 50 GB e a máquina saturou os testes). Parar foi negado pelo classificador e eu não contornei. Ela já não serve o domínio. Se quiser, rode `scripts\demo\derrubar-demo.ps1 -PararBanco` (não apaga dados).
2. **T-0075 (DBaaS)**: preciso do seu OK para você criar a instância temporária.
3. **expo-haptics**: precisa de uma janela de `pnpm install` com você. Sem ela, a vibração fica para o build seguinte ao de 05/11.
4. **ADR 0020**: está como proposta, para a sua aprovação.
5. **ci.yml**: o passo "timers de sincronização" da T-0065 espera a sua autorização (commit com o seu trailer).
6. **Nuvem**: com a base visual no main, os prompts N2–N4 do visual da T-0072 (promotor, pesquisa, treinamento) podem começar quando você quiser.

## Pronto quando
Você ler. O próximo push (BKO, backup, 🔴 de UX, Gestor) sai assim que o CI limpo ficar verde, e eu mando os hashes.
