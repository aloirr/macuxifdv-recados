---
id: R-20261105-100046-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:00:46-04:00
---
# Status das 10h (05/11): lotes F, G e I no main, demo no fb1ef19, o que falta para a Sprint 9

## Contexto
Status das 10h de 05/11. O próximo sai às 12h, também por recado.

## Entrou no main desde as 8h (regra do doc 07: CI verde no commit exato, sem force, verificar --por-commit OK, revisão sem 🔴)
| Lote | Hashes | Conteúdo |
|---|---|---|
| F + G | 68ea7d9..c6a60b5 | Workflow e script do teste do DBaaS, ADR 0024 (proposta), 0028 core.plano_rv (T-0082), 0029 provisionar_tenant (T-0083) |
| I | c6a60b5..fb1ef19 | 0030 subtipo da notificação (T-0039); plano B do DBaaS: B0 (papéis sem ALTER de atributo, senha SCRAM), B1 0031 (papel de manutenção, nunca herdado pela aplicação), B2 0032 (exclusão de tenant em ordem de FK, sem superusuário); testes up/down ajustados |

Demo publicada do **fb1ef19** (CI e "demo — publicar" verdes; api-demo /v1/saude 200; bko-demo 200). As migrações 0028 a 0032 rodaram na VM.

## Builds
Os APKs do 68ea7d9 com a tela de medição seguem valendo (links no status das 8h, R-20261105-085214). Nada do que entrou depois mudou o app. O próximo build sai com o lote J (Gestão com o alerta de etapa pendente).

## % por sprint (tarefas concluídas no quadro)
- Sprints 0, 3 e 5 a 8: 100%.
- Sprint 1: 94% (15/16).
- Sprint 2: 96% (26/27).
- Sprint 4: 80% (12/15).
- **Sprint 9: 0/10 fechadas, mas 6 em teste** (T-0008, T-0039, T-0081, T-0082, T-0083 e T-0079/T-0080/T-0076/T-0077, que já estavam em teste). Em andamento: T-0074, T-0075 e T-0078.

## O que falta para fechar a Sprint 9
- **Lote J (Farol T-0081, Plano de RV T-0082, onboarding T-0083 e o alerta da T-0039 no app):**
  - Feito:
    - UX e revisões finais anteriores sem 🔴;
    - 🟡 técnicos corrigidos;
    - CSV protegido contra fórmula.
  - Falta:
    - corrigir D-T0081a/D-T0082a (prioridade alta): o Farol e a RV usavam os módulos de quem consulta, e não a licença do tenant (RN-CORE-27). Para a mesma pessoa, o analista via R$ 600,00 e o admin R$ 0,00. O modulo-core está corrigindo;
    - a revisão final do engenheiro sobre o que mudou depois (em andamento);
    - o CI do lote.
- **T-0075 DBaaS:** a 3ª execução fica pronta depois do lote J. A suíte de banco roda na VM por uma imagem de teste publicada no GitHub, então **não precisa liberar nada no console**. Também entram 3 itens que faltavam na ADR: restaurar o nosso backup, a versão da vector e a collation.
- **T-0071 pedido em 3 abas (Sprint 4):** o Vendedor está completo. Falta a integração ponta a ponta do orçamento (o testes está fazendo), a conferência do APK contra as 5 telas da referência e o campo `bloqueado` no Core (T-0073).
- **Travados pelo #94** (ainda aberto, sem a marca de pronto; voltei a acompanhar): o chip "Etapa pendente" na Rota, o selo no Cliente 360, o acabamento do Core no app e a RV no app.

## Preciso de você
1. **Custo do BV1-4-10** no console da Magalu, para a ADR 0024.
2. **Números da tela de medição** (APK do 68ea7d9).
3. **Instância do DBaaS:** mantenha até a 3ª execução, prevista para o início da tarde.
4. Se a 1ª publicação da imagem de teste der 403: GitHub → Packages → macuxi-api-teste → Manage Actions access → Write para o repositório macuxifdv.

## Premissas (sem mudança desde as 8h)
- Farol com limites de 30/45 dias e 70/50%.
- RV com 4 indicadores calculados na hora; só analista e admin editam; um plano novo vale a partir do mês atual.
- No mês aberto, o gatilho de venda e visitas vale pela projeção (RN-CORE-29).
- Tenant novo no fuso America/Sao_Paulo.
