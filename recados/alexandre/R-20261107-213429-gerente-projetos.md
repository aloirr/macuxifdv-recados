---
id: R-20261107-213429-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0094
responde_a: R-20261107-195349-alexandre
encerra: false
contrato: null
criado_em: 2026-11-07T21:34:29-04:00
---
# Status 21h45: queda de energia sem dano; agentes retomados; #100 no main, #104 entra pela opção (a), demais aprovados; build ~08h de 08/11

QUEDA DE ENERGIA (~21h): sem dano.
- Git íntegro: sem lock, e o main local igual ao remoto. Nenhum arquivo vazio ou corrompido entre os 386 alterados.
- Backup da árvore em backup/arvore-2026-11-07-2120.
- Os 4 agentes que caíram no meio foram retomados de onde pararam, sem refazer:
  - modulo-core: fatia C da T-0094, mais os 3 🟡 da T-0095 e o typecheck do Core;
  - banco-dados: 0041 (perfis e multiperfil);
  - engenheiro-apps: fatia W da T-0094;
  - testes: fatia T da T-0094.

PRs DA NUVEM (#100 a #105)
- #100 T-0109 (nome e versão dos builds): integrado em 01993ec3. Aceito os arquivos em apps/mobile/scripts/eas e apps/mobile/docs.
- #104 T-0094 (e-mail): segui a sua recomendação (a). Ele entra como está quando puxar o main.
  - A troca da porta e da fila para a outbox email_saida fica com o engenheiro-software local, na fatia S.
  - NÃO crie MACUXI_EMAIL_CHAVE: a chave sai do MACUXI_JWT_SEGREDO (HKDF).
  - (Eu tinha devolvido o PR antes de ver o seu recado aos agentes; corrigi no PR.)
- #101, #102, #103 e #105: conferidos e aprovados. Cada um está nos seus caminhos, sem conflito entre si, e o contrato do #102 é só aditivo. Pedi que puxem o main e remarquem; o merge sai em seguida.
  - Para não entrar em ciclo (cada merge deixa os outros um commit atrás), peço autorização para integrar, sem repuxar, os PRs com arquivos que não se cruzam e CI verde sobre o mesmo main recente. O CI do main depois do lote é a conferência final.
- As pendências que as sessões deixaram estão nas tarefas, com dono:
  - T-0097: o resolvedor de foto no shell, a versão de 320 px e o tocarConteudoPelaMidia;
  - T-0096: o teste desempenho-busca quebrado desde a T-0085;
  - T-0094: os testes de e-mail fora do CI e a porta 465;
  - T-0099: a versão do Conector no release e o conector.md;
  - T-0109: veja abaixo.
- #85 a #89 (de 04/11): o conteúdo seguiu pelos lotes e o main evoluiu depois. Ficam na conferência da T-0110 (backlog antigo), que fecha um a um com o motivo.

T-0109, APK COM NOME LEGÍVEL
Recomendo o bucket da DEMO, num prefixo privado apks/, com link temporário. Não precisa de bucket nem de secret novo (o workflow usa os DEMO_S3_* que já existem). Falta o seu ok no apps/mobile/scripts/eas/T-0109-workflow.diff.

T-0111 (DESENHO APROVADO)
As telas começam quando abrir a próxima vaga, depois da fatia C do Core e da 0041, que são a base delas: o modulo-core faz a página e o designer-ux a spec visual. Entram no build único se ficarem prontas a tempo; o motor e os valores de fábrica entram de qualquer jeito.

PREVISÃO (a queda custou ~1 h)
- Lote único (T-0093 + T-0095 Core + T-0094 B/C/S/W/T + 0041): ~01h–02h de 08/11.
- "demo — super-admin": logo depois desse lote. Aviso com o sha.
- Build único Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0: ~07h30–08h30 de 08/11.

O QUE PRECISO DE VOCÊ
1. Autorização para integrar PRs disjuntos sem repuxar o main (ver acima).
2. Ok no T-0109-workflow.diff, se quiser o APK com nome legível no bucket.
3. Confirmar a RN-CORE-35 (vendedor + promotor vende pelo perfil de vendedor; R-20261107-203854).
