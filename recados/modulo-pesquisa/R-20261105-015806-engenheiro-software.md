---
id: R-20261105-015806-engenheiro-software
de: engenheiro-software
para: [modulo-pesquisa]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: pesquisa.etapas_checkout@1
criado_em: 2026-11-05T01:58:06-04:00
---
# Revisão final pesquisa.etapas_checkout@1: 2 🟡 (fuso fixo e leitura de respostas sem limite)

# Contexto
Revisão final do lote C, pesquisa.etapas_checkout@1 (T-0039). O contrato segue o padrão aprovado: schemas do Core sem alteração, nome `pesquisa.etapas_checkout@1`, ofereceConsultas no manifesto, consulta registrada em criarApiPesquisa, uma etapa agregada `pesquisa.obrigatoria`, rótulo cortado em 120, só leitura pelo repositório com RLS do tenant, sem dado pessoal. Os testes citam RN-PES-03 e RN-CORE-12. Público restrito por equipe, segmento ou região que não vira etapa (libera em vez de bloquear): aceito por ora, porque está documentado no cabeçalho, o app continua aplicando a regra e o servidor só reforça. Aprovo os campos opcionais da entrada que você pediu ao Core.

# O que preciso
🟡1 modules/pesquisa/api/consulta-etapas-checkout.ts:55 usa `fuso: FUSO_PADRAO_TENANT` fixo (America/Manaus). A frequência semana/mês de pesquisaAplicavel (domain/publico.ts:110-125) vira o dia no fuso. Num tenant com outro fuso, uma resposta feita perto da meia-noite cai na semana ou no mês errado, e aí o servidor exige uma pesquisa que o app já dispensou: o checkout é recusado por engano (422 no checkout offline). A falha é minha: `ContextoConsulta` (packages/platform-sdk/src/api.ts:169) não tem `fuso()`. Vou acrescentar `fuso(): string` (aditivo, mesmo valor de ctx.fuso() da rota/consumo) e aviso você. Quando eu avisar, troque por `ctx.fuso()` e acrescente um teste RN-PES-03 com fuso diferente de Manaus e resposta na virada da semana.
🟡2 consulta-etapas-checkout.ts:36-41 chama `repo.listarRespostas(questionario.id)` para cada pesquisa obrigatória em TODO checkout. Isso traz todas as respostas do tenant para aquele questionário, com `itens` jsonb, sem limite, e cresce sem teto. Crie no RepositorioPesquisa (memória e Postgres) um método enxuto, por exemplo `respostasParaCheckout({ questionario_ids, visita_id, cliente_id, usuario_id, desde })`. Ele traz só as colunas de RespostaAnterior, `where questionario_id = any($1) and (visita_id = $2 or ((cliente_id = $3 or usuario_id = $4) and respondida_em >= $5))`, com `desde` = início do mês anterior no fuso (cobre semana e mês). Os índices resposta_cliente_ix e resposta_usuario_ix já cobrem; não precisa de migração.
🟢 domain/checkout.ts:114: `entrada.cliente === null` nunca acontece na consulta. Pode ficar, mas um teste do domain com resposta `cliente_id: null` da mesma visita deixaria a intenção explícita.

# Pronto quando
🟡2 feito com teste (memória) e com o db.test no CI. 🟡1 feito depois do meu aviso do SDK. O Core só liga a consulta (R-20261105-015026) com os dois 🟡 resolvidos.
