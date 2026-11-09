---
id: R-20261105-085214-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:52:14-04:00
---
# Status das 8h (05/11): APKs com a tela de medição, % por sprint e o que falta para fechar a Sprint 9

## Contexto
Status das 8h de 05/11, atualizado às 08h55 e enviado por recado como você pediu. Os próximos (10h, 12h…) também vão por recado.

## Builds do 68ea7d9 com a tela de medição (T-0008)
O build troca a parte nativa do app (expo-sqlite 57.0.4 com busca de texto ligada). Instale o APK novo; só abrir o app não basta.
- Campo: APK https://expo.dev/artifacts/eas/l9FbLcq9oyNsYODSjdBi-FHrZCDEfWw53cKr4TZaqRI.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/c6277df9-ced1-43d0-a471-bcab4c2da9e9
- Gestão: APK https://expo.dev/artifacts/eas/VTG1rmcDXlmeB2OJ-T5_ExVttahZoWNTLrebwntHOvY.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3db52299-4d9d-48c2-9c33-ea9b4deb1689

## Como abrir a tela oculta de medição (Campo)
1. Abra o Perfil.
2. Toque 7 vezes na linha da versão, com no máximo 3 s entre os toques.
3. Toque em "Rodar medição". Ela carrega 20 mil produtos e 500 clientes e mede a busca.
4. Mande os números que aparecerem na tela (tempo de carga e p95 da busca).
A tela só existe nos builds de preview e de desenvolvimento.

## % por sprint (tarefas concluídas no quadro)
| Sprint | Concluídas | % |
|---|---|---|
| 0 | 7/7 | 100% |
| 1 | 15/16 | 94% (1 bloqueada) |
| 2 | 26/27 | 96% (1 em teste) |
| 3 | 2/2 | 100% |
| 4 | 12/15 | 80% (3 em andamento) |
| 5 a 8 | 6/6 | 100% |
| 9 | 0/10 | 0% de tarefas fechadas (4 em teste, 5 em andamento, 1 aberta) |

## O que falta para fechar a Sprint 9
- **T-0081 Farol de clientes:** pronta, com UX e revisão final sem 🔴. Falta o CSV protegido contra fórmula (o modulo-core está fazendo agora), a revisão técnica do engenheiro-apps e o lote ao main.
- **T-0082 Plano de RV:** API, domain e página do BKO prontos, com a revisão final sem 🔴. Faltam os 4 🔴 de UX da página, em correção pelo modulo-core, e a conferência do designer. A RN-CORE-29 ganhou a regra do gatilho no mês aberto: venda e visitas pela projeção. A tela de RV no app espera o #94.
- **T-0083 Onboarding de tenant:** o `pnpm tenant:criar` grava no Postgres no CI, e a 2ª rodada não duplica nada. Do isolamento do tenant novo, 10 de 11 casos passaram. O O-06 era erro do teste (o atraso de 2 s do pull, que é o comportamento desenhado) e já foi corrigido; falta confirmar no CI.
- **T-0039 alerta de etapa pendente:** revisão sem 🔴, com os 🟡 do Gestão resolvidos. A migração 0030 (subtipo da notificação) está pronta e revisada. Falta o Core gravar o subtipo e dar baixa na notificação.
- **T-0075 DBaaS:** compatível só com o plano B. A ADR 0024 ficou como **proposta** e vira aceita com três condições:
  - os ajustes B0, B1 e B2 no código (o banco-dados faz as migrações 0031 e 0032 agora);
  - a 3ª execução com a suíte de banco;
  - **o custo do BV1-4-10, que preciso que você confira no console**.
- **T-0008 expo-sqlite:** build pronto. Faltam os seus números da medição.
- **Travados pelo #94** (ainda sem a marca de pronto): o chip "Etapa pendente" na Rota, o selo no Cliente 360 (§3.3), o acabamento do Core e a RV no app.

## DBaaS (T-0075), resumo
- **Passou:**
  - alcance pela VPC, TLS 1.3, PG 16.14;
  - vector 0.8.5 criada direto, pela whitelist pgextwlist;
  - índice HNSW usado, com p95 de 2 ms em 5 mil vetores;
  - migrações 0001..0027;
  - RLS FORCE em 115 tabelas e RLS na prática;
  - papéis da aplicação sem BYPASSRLS.
- **Só pelo plano B:** seed, funções DEFINER e exclusão de tenant. O admin não é superusuário.
- **O único ❌ é falso positivo:** duas funções do pgaudit do próprio provedor.
- **Sugestão:** mantenha a instância até a 3ª execução, prevista para hoje, depois das migrações 0031 e 0032. Se preferir apagar agora, a ADR fica com o resultado de hoje.

## Main e demo
- O main está em **c6a60b5**: os lotes F e G subiram às 08h45 (workflow e script do DBaaS, ADR 0024, 0028 e 0029), com o CI verde no commit exato e a revisão de banco sem 🔴.
- O CI do main e a publicação da demo desse commit estão rodando.
- **Próximo lote:** Farol, Plano de RV, alerta do Gestão, comando de criação de tenant, 0030, B0 e a correção da tabela do kit.

## Premissas para você confirmar
- Farol: limites de 30/45 dias e 70/50%.
- RV:
  - 4 indicadores, calculados na hora;
  - só analista e admin editam;
  - um plano novo vale a partir do mês atual.
- Tenant novo no fuso America/Sao_Paulo.
- Instância do DBaaS mantida até a 3ª execução.
