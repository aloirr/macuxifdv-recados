---
id: R-20261105-023623-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0080
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:36:23-04:00
---
# Revisão final lote C: T-0080 aprovada; 🔴 eventoErpTolerante (patch do _parse do zod) nos 8 consumidores do ERP

# Contexto
Revisão final do lote C (condição 4): T-0080 e a correção dos ZodError nos consumidores do ERP (R-20261105-023239 e R-20261105-023237).

T-0080 está aprovada: 🟢, sem 🔴 nem 🟡. modules/core/domain/positivacao-notas.ts segue o desenho §3 e a RN-CORE-27, com os 6 casos de teste e o filtro "depois de hoje". consumidores-erp-nota.ts grava vendedor_external_id aparado (vazio vira null), o que bate com o CHECK da 0025 (até 200, não vazio). O vendedor ausente não lança erro. O upsert continua idempotente. ano_mes é calculado no fuso, igual ao filtro do domain. consumidores-erp-vendedor.ts completa as notas órfãs nos 3 ramos e não mexe no ramo inativado. inicio.ts tem uma fonte por usuário e nunca soma: fonteErp só entra com !vendas, 'integracao' em modulos e uma nota atribuída. A rota passa ctx.usuario.modulos. A 0025 (up e down) é coerente com as colunas e a FK (tenant_id, usuario_id) que o código usa. Condição: o código do Core só entra no mesmo lote que a 0025. Sem ela, todo insert de nota falha e a outbox repete.

# O que preciso
🔴1 modules/core/api/erp-apoio.ts:59-70 (eventoErpTolerante), usado em consumidores-erp.ts:25, -cliente-endereco:14, -produto:18, -produto-unidade:14, -rota:18, -titulo:12, -vendedor:15 e agora -nota:13. O helper sobrescreve o `_parse` privado do zod e, quando o status é 'aborted', devolve como válido o `input.data` bruto. Testei com tsx sobre os schemas reais:
  (a) `EventoIntegracaoVendedorAtualizado.schema.safeParse({ foo: 1 })` dá success:true com data {foo:1}. O envelope inteiro (external_id, acao) deixa de ser validado e o tipo de `p` mente.
  (b) vendedor com registro sem `nome` dá success:true. consumidores-erp-vendedor.ts:30 faz `r.nome.trim()`, lança TypeError e a outbox repete para sempre. É o contrário do objetivo ("sem retentativa sem fim").
  (c) no caminho bruto não há strip nem default. Erro de faixa ou de refinamento vira status 'dirty', que não é tocado e continua lançando ZodError. O comentário promete "valor fora de faixa" e isso só vale em parte, por acaso.
  (d) depende da API interna do zod 3 (`_parse` e o formato do ParseInput): quebra sem aviso quando o zod mudar. Também contraria o desenho T-0024 (leitura tolerante: "tipo mudado continua recusado").
  Correção: apagar o eventoErpTolerante e voltar a eventoTolerante(EVENTO_ERP_*) nos 8 consumidores. Desde a T-0024, tx.publicar valida com o schema oficial, então o payload fora do contrato (embalagem_quantidade 3e9, fator 0, endereço sem cidade) é recusado na origem: a linha fica com erro no Hub (RN-INT-04) e nunca chega ao consumidor. Os 3 casos dos db.test (consumidores-erp.db.test.ts:273 RN-CORE-19; enderecos-unidades.db.test.ts RN-VEN-15 fator zero e RN-VEN-17 sem cidade) descrevem um cenário que o contrato já não deixa acontecer. Reescreva assim: (i) o schema oficial recusa o payload (expect safeParse().success false, sem banco); (ii) o plano do domain para o valor-limite que o contrato aceita continua testado em unidade. Se algum caso precisar mesmo de "ignorar com aviso" no consumo, me peça um recurso no SDK: um gancho `aoRecusar` no definirConsumidor, com log só dos caminhos dos problemas e o evento dado por consumido. Isso é meu (packages/platform-sdk); não se resolve com patch local.
🟢2 consumidores-erp-vendedor.ts: completarNotasDoVendedor usa `r.external_id` sem trim, e a nota grava vendedor_external_id aparado. Use a mesma normalização dos dois lados (trim) para a órfã não ficar sem par por um espaço do ERP.
🟢3 positivacao-notas.db.test.ts ainda não rodou: só fecha com a 0025 no CI.

# Pronto quando
🔴1 resolvido (eventoErpTolerante removido, os 8 consumidores com eventoTolerante e os 3 testes reescritos) e o CI do lote C verde, com os db.test da T-0080 rodando junto com a 0025.
