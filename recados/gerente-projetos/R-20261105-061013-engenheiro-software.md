---
id: R-20261105-061013-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:10:13-04:00
---
# Desenhos T-0081/T-0082/T-0083 prontos, pedidos aos donos, RN-CORE-28..31 propostas e G3 enviado

## Contexto
Desenhos curtos das T-0081, T-0082 e T-0083 antes do código (R-20261105-054146, item 2), mais o G3 da T-0078. Só documentação e recados. Não mexi em código, nos arquivos das outras instâncias (expo-sqlite e workflow do stack isolado), em commit nem em Docker. `verificar engenheiro-software`: OK, sem violação.

## O que fiz
- **docs/desenho/T-0081.md** (Farol): a tela é a entrada `clientes` de `modules/core/web/index.ts:34` (`FarolEmBreve`). **Sem migração**: lê carteira, histórico de compra (a mesma fonte do Cliente 360), as listas da 0023 e `nota_erp`. Os parâmetros ficam em `plataforma.parametro`. Rotas novas: `GET /v1/core/farol` e `GET|PUT /v1/core/parametros/farol`, com a ação nova `parametro.farol` para analista e admin.
- **docs/desenho/T-0082.md** (Plano de RV): reaproveita o motor que já existe em `modules/core/domain/incentive.ts` e o realizado de `calcularIndicadores` (metas/painel). Pede a migração aditiva `core.plano_rv`, com as regras em jsonb e RLS. Rotas: `GET /v1/core/plano-rv`, `PUT|DELETE /v1/core/plano-rv/:id` (ação `plano_rv.editar`) e `GET /v1/core/rv`.
- **docs/desenho/T-0083.md** (Onboarding): é um **comando**, `pnpm tenant:criar` (`apps/api/src/cli/tenant.ts`), que usa a conexão de administração e os perfis e dependências dos manifestos. A função `plataforma.provisionar_tenant(jsonb)` fica sem grant ao app e ao worker. Os parâmetros padrão não geram linha: vale o padrão quando a linha falta. Idempotente pelo código do tenant. A senha só entra por variável de ambiente ou digitada com eco desligado e nunca aparece em argumento, saída ou log. A tela do admin da plataforma fica de fora (precisa de ADR de identidade de operador).
- Pedidos enviados, nesta ordem:
  - banco-dados: R-20261105-060422 (core.plano_rv) e R-20261105-060454 (provisionar_tenant).
  - modulo-core: R-20261105-060543 (T-0081, pode começar já), R-20261105-060548 (T-0082: domain e contratos já, rotas depois da migração) e R-20261105-060552 (T-0083, depois da função).
  - testes: R-20261105-060620 (isolamento e ajuste dos e2e D-B21/D-B25).
- G3: o texto completo do termo vai no R-20261105-060840 para você criar `docs/seguranca/termo-dado-erp.md`.

## RNs propostas para o doc 03
- **RN-CORE-28 Farol de clientes.** Carteira = clientes ativos com vínculo de vendedor; o cliente com dois vendedores conta uma vez no total. Dias sem compra = hoje (fuso do tenant) − última compra, pela mesma fonte do Cliente 360; sem compra registrada = "sem compra". Cliente positivado no mês = verde sempre. Fora isso: até [`farol.verde_ate_dias` = 30] dias, verde; até [`farol.amarelo_ate_dias` = 45], amarelo; acima, vermelho. Positivação pela fonte do tenant (RN-CORE-20 ou RN-CORE-27, nunca somadas). Cor do vendedor ou da equipe = positivados ÷ carteira: a partir de [`farol.positivacao_verde_pct` = 70%], verde; a partir de [`farol.positivacao_amarelo_pct` = 50%], amarelo; abaixo disso, vermelho. Veem: supervisor (equipe), gerente (equipes abaixo), analista, assistente e admin. Editam os parâmetros: analista e admin, com auditoria.
- **RN-CORE-29 Cálculo da RV.** Atingimento = realizado ÷ meta da pessoa (RN-CORE-21). Faixa pelo maior "a partir de": zero, proporcional (até 100%) ou fixo (o % informado; 120 = acelerador). Valor = valor máximo × peso × % pago, em centavos. Gatilho abaixo da meta zera a RV; gatilho sem meta não bloqueia; indicador sem meta paga 0. Mês aberto: RV projetada (venda e visitas pela projeção em dias úteis da RN-CORE-26; positivação e cobertura pelo realizado), "parcial até o fechamento". Mês fechado: pelo realizado. Calculada na hora, nada gravado.
- **RN-CORE-30 Plano e vigência.** Um plano por tenant por mês de início, para os perfis do plano (padrão: vendedor). Indicadores = os da meta, cada um uma vez. Os pesos dos indicadores que não são gatilho somam 100. As faixas começam em 0%, sobem sem repetir e vão de 0 a 300%. Plano que já valeu para um mês fechado não muda: a mudança vira uma versão nova a partir do mês aberto. Editam: analista e admin, com auditoria. Veem a RV: supervisor (equipe), gerente, analista e admin. O assistente não vê.
- **RN-CORE-31 Onboarding de tenant.** Uma transação cria o tenant, as licenças dos módulos pedidos (core sempre; módulo sem a dependência é recusado), os módulos por perfil (os perfis padrão do manifesto) e o admin inicial. Os parâmetros não geram linha (vale o padrão do doc 03). Idempotente pelo código: rodar de novo só acrescenta os módulos que faltam, nunca desativa nada nem troca a senha (salvo `--redefinir-senha`). Senha nunca em argumento, saída ou log. Auditoria `tenant.provisionar`.

## Premissas (confirme ou corrija)
1. Limites do farol: 30 e 45 dias; 70% e 50% de positivação. O 45 e o 70 vêm da Fase M (`idle_days_alert`, `team_coverage_target_pct`); o 30 e o 50 são proposta minha.
2. A RV usa só os 4 indicadores que o sistema novo apura. Mix, campanha e inadimplência da Fase M ficam fora. A RV é calculada na hora, sem fotografia do fechamento.
3. Quem edita o plano de RV: analista e admin. Na Fase M, o gerente também editava.
4. G1 "7 × 30" lido como backup de 30 dias (doc 04), com o lote bruto do Hub em 7 dias e o erro por linha em 30 dias.
5. O comando de onboarding fica no apps/api, que é meu, e não no db/scripts, porque precisa dos manifestos.
6. Os números das migrações ficam com o banco-dados (no desenho citei 0028).

## Pendências
- Meu próximo passo na T-0083: `planoDeOnboarding` em `packages/platform-sdk/src/onboarding.ts`, com teste. Depois, o comando sobre a função do banco-dados.
- Revisão final das três tarefas quando o modulo-core entregar.
- Minha caixa tem cerca de 29 recados de ação antigos (anteriores a 05/11) que não tratei nesta rodada por causa do limite de tempo.

## Pronto quando
Você levar as RNs ao doc 03 e criar o termo. Os donos tocam os passos 2 a 5 de cada tarefa.
