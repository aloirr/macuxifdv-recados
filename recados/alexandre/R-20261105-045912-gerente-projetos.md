---
id: R-20261105-045912-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T04:59:12-04:00
---
# Status das 5h: 5 lotes e 3 PRs no main (aab84fa→af6c368); build final Campo/Gestão do af6c368; roteiro e decisões

## Contexto
Status das 5h e fechamento da noite autônoma de 04→05/11.

## Entrou no main nesta noite (regra do doc 07 e regra A)
| Lote / PR | Hashes | Conteúdo |
|---|---|---|
| Lote 3 | aab84fa..312c2a3 | T-0073 passo 7 (parâmetros do Início no BKO), coordenação (T-0078/T-0079, travas da nuvem, anexos) |
| PR #91 promotor | 7f97cd2 | visual novo (regra A, revisões sem 🔴) |
| PR #92 treinamento | 0be65bf | visual novo; quiz com folha "Enviar assim" |
| PR #93 pesquisa | ae7b7ce | visual novo; "Enviar resposta" com confirmação |
| Lote B | ae7b7ce..b0e0462 | expo-haptics + vibração; T-0079 (base recriada, 0022); T-0078 parte API + 0024 LGPD/RLS + testes L1/C1; T-0039 checkout na API; T-0073 positivação (0023); T-0077 item 6 e acabamento de Pedidos; ícones do kit; 🟡 de UX dos 3 módulos |
| Lote D | 6113a9b..af6c368 | **T-0039 completa:** tolerância no checkout ligada na API (pendência gravada, baixa pela resposta da pesquisa, dispensa manual por supervisor/admin com auditoria, prazo configurável), alerta de 24h pelo agendador novo do worker (ADR 0022, tarefas periódicas dos módulos, nunca < 15 min), 0026/0027, BKO da pendência, testes TP-01..TP-17 verdes no CI |
| Lote C2 | b0e0462..6113a9b | T-0024 completa; T-0078 log seguro (sem dado pessoal no 500) e carga; D-T0039a (push na ordem da fila); consulta pesquisa.etapas_checkout@1; T-0080 positivação pelas notas com Vendedor desligado (0025); 0026 e regra pura da tolerância; seed demo corrigido; telas do Gestão/Promotor/Pesquisa; kit |

Cada lote: CI completo verde no commit exato, fast-forward sem force, verificar --por-commit OK, revisões do engenheiro-software e do designer-ux sem 🔴. Deploy da demo do mesmo commit.

## Builds
- **BUILD FINAL (lote D, af6c368 — tudo o que entrou na noite; mesmo commit do deploy da demo: CI e "demo — publicar" verdes, api-demo /v1/saude 200, bko-demo 200):**
  - Campo: APK https://expo.dev/artifacts/eas/LhOnvxic_0a63--wIxgv0plcjlQInWaV0yr82o2mql0.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/1853bfdd-688d-41ec-ad43-50793bd34525
  - Gestão: APK https://expo.dev/artifacts/eas/XWW8OZ6cS35uVFHJjRLG1_NPia6ETrWsd3T3TZumkxs.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/19ccf727-8221-414c-bbc6-20160dd51d32
- Build do lote C2 (6113a9b), anterior:
  - Campo: APK https://expo.dev/artifacts/eas/zS6GWe9kcPPSp0Cjdji8a7f9olNf-U-3s1DUKS3oD1g.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/97efbbf3-25d9-4e49-a92f-b3b4d7c2c751
  - Gestão: APK https://expo.dev/artifacts/eas/n8UsMzz0Z8YDVnxgY_EZ3iq2WqXr8AeSEhWUyWOWGbM.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/7769a77f-1704-4714-afd5-60d80a1f2f36
- Anterior (lote B, b0e0462): Campo https://expo.dev/artifacts/eas/Yms5ftWzSyREgLxuN8z0dQ0AX68XZFpneC_bmLzHNQU.apk · Gestão https://expo.dev/artifacts/eas/WvPT97pfXk4sNlk8nrLfUZ0iAsQWJYY0E1iIucgNaRo.apk

## Roteiro de teste do build final
docs/testes/roteiro-build-05-11.md (34 passos). Comece desinstalando o APK antigo (pedido fantasma 000011). Os passos marcados "lote C" valem para este build.


## O que ficou para depois
Chip "Etapa pendente" na Rota do Campo e acabamento do Core no app (travados pelo #94); selo no Cliente 360 (§3.3); alerta na aba Alertas do Gestão (opcional); 🟢 do Dockerfile (pnpm fetch).

## O que travou
- **T-0008 (expo-sqlite):** o install mexeu no drizzle-orm da API e exigiu um .pnpmfile.cjs; nada disso foi ao main. A tela de medição está pronta e revisada.
- **#94 (visual do Core):** sem a marca de pronto; modules/core/app travado (chip "Etapa pendente" na Rota e acabamento do Core esperam).
- **Docker do PC desligado:** testes de banco só no CI; d40267d (backup no deploy) bloqueado.
- Lotes A, A2, C e C2 tiveram CI vermelho antes de subir (seed fora do contrato, remendo nos consumidores do ERP — 🔴 do engenheiro-software —, testes de índice instáveis, preparo de teste); todos corrigidos pelos donos antes do main.
- Erro meu: por alguns minutos, 5 agentes ao mesmo tempo (limite 4).

## % por sprint
Sprint 0 100% · Sprint 1 94% (T-0008 bloqueada pela decisão do expo-sqlite) · **Sprint 2 96%** (T-0024 concluída nesta noite; T-0039 completa no main af6c368, em teste — só falta o chip da Rota, travado pelo #94) · Sprint 3 100% · Sprint 4 80% (T-0071, T-0072 — espera o #94 —, T-0073 em fechamento) · Sprints 5–8 100% · Sprint 9: 0/7 concluídas, mas T-0076, T-0077, T-0079, T-0080 em teste no main; T-0078 com tudo no main menos o C1 com Postgres; T-0074 com o d40267d bloqueado (Docker); T-0075 depois de 06/11.

## Decisões que deixei para você (premissas)
1. **expo-sqlite:** (a) aceitar o .pnpmfile.cjs (o drizzle da API deixa de puxar expo/react-native) ou (b) desfazer e buscar outra saída. Sem isso a T-0008 não mede no aparelho.
2. **T-0039:** no servidor, etapa de outro módulo que ainda não chegou não recusa o checkout: aceito com pendência, alerta em 24h; dispensa manual por supervisor/admin com justificativa; Descartar pede confirmação; supervisor de outra equipe recebe 404 (complemento da RN-CORE-12 no doc 03).
3. **T-0080 / RN-CORE-27:** com o Vendedor desligado, positivação = cliente com nota faturada não cancelada no mês, uma vez; lida na hora das notas; vale a licença de Integração do **tenant**; devolução não retira.
4. Vibração desligada com "reduzir movimento"; "A faturar" inclui enviado ao ERP e integrado; motivo desativado depois do checkout é aceito; consumidores importam o contracts do dono por caminho relativo.
5. **T-0078:** retenção do backup 7 × 30 dias (G1) e termo de uso do dado do ERP (G3).
