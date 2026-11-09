---
id: R-20261031-193859-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0013
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T19:38:59-04:00
---
# Revisão do Conector (T-0013) para a sessão da T-0023: sem 🔴, 3 🟡 e 4 🟢

Contexto: revisão do engenheiro da T-0013 (Conector v1, apps/conector), só leitura porque apps/conector está travado pela T-0023. Veredito: sem 🔴. Fronteiras ok (só @macuxi/integracao/contracts), segredos fora do YAML e por stdin no PowerShell, URL do Hub exige https (exceto localhost), idempotência por SHA-256 do conteúdo canônico, dois cursores com confirmação em ordem (RN-INT-05) e trava de inativação só avisada (RN-INT-06). Lockfile: conferido (pnpm install --frozen-lockfile ok; o "-166 packages" é a poda do node_modules hoisted, o lock só ganhou linhas).

| Achados para a sessão da T-0023 (dono: modulo-integracao):
🟡 1. apps/conector/src/log/mascara.ts:52 (mascararValor): chave sensível com valor NUMÉRICO passa sem máscara (`typeof valor !== 'number'`). latitude/longitude, cpf/cnpj/telefone guardados como número no ERP vão crus para o log (CLAUDE.md regra 8). Mascarar número também quando a chave é sensível (manter só boolean); teste com { latitude: -3.1, cpf: 12345678901 }.
🟡 2. apps/conector/src/sincronizador.ts:115 (`if (m.repetidas === pagina.length) return false`): com temMais = true a entidade para em silêncio para sempre (relê a mesma página a cada ciclo, sem bloqueio nem log). Acontece quando mais de `maxLinhas` linhas caem no mesmo cursor por precisão (timestamp com microssegundos truncado em ms). Nesse caso (temMais && repetidas === tamanho) aplicar o mesmo bloqueio "a leitura não avança" da linha 146, com log.erro.
🟡 3. apps/conector/src/pedidos.ts:86 (gravar): a idempotência no ERP depende de o cliente escrever o SQL com IF NOT EXISTS (conector.md §166). Defesa barata: rodar a consulta `numeroErp` ANTES de gravar quando local.tentativas > 0 ou o último erro foi de conexão (janela "commit aplicado, resposta perdida"); se já houver número, só anotar `gravado` e enfileirar `integrado`. Teste: falha de conexão depois do COMMIT não duplica o pedido.
🟢 4. apps/conector/src/util/sqlite.ts: no Node 24 (engines da raiz >=24.7) o node:sqlite não emite mais ExperimentalWarning; a troca temporária de process.emitWarning (global) pode sair ou ficar só como defesa — se ficar, documente que é para Node 22.
🟢 5. apps/conector/src/hub/cliente.ts:126: Retry-After em formato data HTTP é ignorado (só segundos). Aceitar Date.parse do cabeçalho também.
🟢 6. apps/conector/src/erp/postgres.ts:68: `ssl` desligado por padrão; para host fora de localhost/LAN, sugerir no assistente `ssl: true` (senha do ERP trafega em claro sem TLS).
🟢 7. turbo.json: a sugestão "@macuxi/conector#test" com cache false e env MACUXI_PG_* é minha (raiz); entra junto com a correção da intermitência da T-0023 — me avise quando a T-0023 for ao main que eu ajusto, ou ajuste lá e eu reviso.

| Pronto quando: itens 🟡 corrigidos ou recusados com motivo na entrega da T-0023; 🟢 a critério do modulo-integracao. A lista do que o Hub precisa expor (R-20261031-192144 item 4) fica registrada para o desenho da tarefa da API do Hub.
