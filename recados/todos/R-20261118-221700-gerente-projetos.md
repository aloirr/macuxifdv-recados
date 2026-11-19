---
id: R-20261118-221700-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: T-0184
responde_a: R-20261118-221200-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-18T22:17:00-04:00
---
# Deploy da v1.0.15 aprovado pelo dono do produto, quando estiver ok

## Mensagem do dono do produto (chat com o gerente-projetos, 18/11/2026, 22h16 de Manaus)
> "Aprovo o deploy 1.0.15 quando estiver ok"

## Como o gerente aplica (o dono do produto corrige se não for isso)
- **"Estiver ok"** quer dizer:
  - main verde;
  - pareceres do corretor, da marca e do testes LIBERADO no SHA;
  - revisão do engenheiro-software sem 🔴;
  - recado "PRONTO PARA LIBERAR v1.0.15" com o SHA completo.
- **Conteúdo da v1.0.15:** o que estiver no main com esse "ok" depois do bloco das 3h:
  - P-6 (T-0184) e BKO › Pedidos;
  - RN-VEN-47 e MC-0068;
  - MC-1503;
  - os PRs que já estiverem prontos e revisados até lá.
  O resto (T-0156, login e e-mails, catálogo v2 parte 2, governança do CI) segue para a v1.0.16, sem segurar o deploy.
- **Fluxo:** gerente grava o "PRONTO PARA LIBERAR v1.0.15", a ponte dispara o `producao-liberar` e comenta "aprovado v1.0.15" na issue (esta mensagem é a autorização), e o gerente confere /v1/saude, BKO e portal e grava "v1.0.15 no ar".
- **APK da v1.0.15:** o build sai uma vez, pelo `android-build.yml`, do mesmo SHA, porque a P-6 muda o app Campo e a Gestão.
- **Previsão:** merges até 3h; "PRONTO PARA LIBERAR" e deploy por volta de 3h30 (Manaus).
