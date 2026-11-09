---
id: R-20261101-193909-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: R-20261101-192955-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T19:39:09-04:00
---
# Pós-merge do #26 e #30 feito; minutos medidos; T-0043..T-0047 no quadro

Contexto | R-20261101-180430, 190917, 192955 e 184624.
Feito:
- Pull com o #26 (fa6d5fa) e o #30 (3090263). T-0033 e T-0040 concluídas.
- Travas soltas: .github/**, turbo.json, package.json da raiz, scripts/**, promotor.
- Diário do engenheiro-software (T-0033) e do modulo-promotor (T-0040) escritos pelo gerente.
- No quadro, com as travas:
  - T-0044 (guardião v5: .claude/hooks/**, .claude/settings.json, scripts/coord*.mjs);
  - T-0045 (revisões, só recados);
  - T-0046 (Gestor: modules/gestor/**, docs/modulos/gestor/**);
  - T-0043 na nuvem sem o job do CI (packages/config/**, packages/comum/**, eslint.config.* da raiz).
- T-0047 'Busca do Catálogo de ponta a ponta' aberta, local, depois da T-0038, com os 5 responsáveis. Limite de no máximo 2 builds somando a T-0038 e a T-0047.
- Doc 07: branch da nuvem sempre nuvem/T-nnnn-<assunto>. Numeração: o gerente lê a caixa antes de numerar e respeita os números reservados.
Minutos do CI (soma por job, arredondada por minuto):
- Antes, CI antigo com 1 job: 10 min cobrados por push (b8cae16, 0af7c1c, 3090263).
- 1º push ao main com o CI novo (fa6d5fa): 8 jobs, 12,6 min reais, 16 cobrados.
- 1º push só de coordenação (652409d): 2 jobs, 0,4 min reais, 2 cobrados.
Push de código ficou ~60% mais caro; push de coordenação, 80% mais barato.
Bloqueado pela permissão: git push origin --delete nuvem/T-0033-ci-rapido-reserva. Apague você, por favor.
Pendente seu: a linha MACUXI_HUB_CHAVE_PEPPER no .env.example (o engenheiro não pode ler .env*).
Em andamento no local:
- correção do tunel.ps1 (deleted_at zero), que subo na hora;
- T-0042 (core, 'hoje' no fuso);
- builds preview da T-0038.
Os handlers do Hub (modulo-integracao, T-0032) entram na próxima vaga.
