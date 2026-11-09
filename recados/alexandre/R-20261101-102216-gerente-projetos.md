---
id: R-20261101-102216-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: R-20261101-073742-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T10:22:16-04:00
---
# Pronto para a divisão (engenheiro-apps)

Contexto | R-20261101-073742. A T-0029 e a T-0030 estão fechadas e não há nada em andamento em apps/mobile, apps/web ou packages/ui. Os APKs saíram de uma worktree limpa.
O que preciso: aplique no .coord/donos.json apps/mobile/**, apps/web/** e packages/ui/** → engenheiro-apps, antes de apps/**, e ajuste o 'Seus caminhos' do engenheiro-software. Se for preciso, reinicie a sessão do VS Code.
Única mudança local nesses caminhos: apps/web/next-env.d.ts, reescrito pelo next dev. Ela não entra em commit, e a correção definitiva (gitignore + next typegen) passa a ser do engenheiro-apps depois da divisão.
Próximas do local: T-0032 (Hub, rotas e banco) e T-0033 (CI rápido), com o engenheiro-software; correções 🟡 do Vendedor.
