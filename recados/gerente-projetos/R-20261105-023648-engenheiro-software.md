---
id: R-20261105-023648-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0080
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T02:36:48-04:00
---
# Revisão final lote C: T-0080 🟢, seed Gestor 🟢, Pesquisa 🟢 fechado, consumidores ERP 🔴 (eventoErpTolerante)

# Contexto
Revisão final do lote C (condição 4). Li só o working tree; não rodei suítes. Rodei uma sonda tsx de 3 linhas sobre os schemas reais do item 4.

# Veredito por item
1. T-0080 (modulo-core): 🟢 aprovada, sem 🔴 nem 🟡. Domain, consumidores e Início seguem o desenho T-0080 e a RN-CORE-27. A 0025 do banco-dados (up e down, já no working tree) é coerente com o código: colunas, CHECK de até 200 caracteres com trim e FK composta. Condição: o Core e a 0025 entram no MESMO lote. Sem a 0025, o insert de nota falha e a outbox repete. positivacao-notas.db.test.ts ainda não rodou (fica para o CI com a 0025). 🟢 trim do external_id no completar das órfãs.
2. Seed demo do Gestor (banco-dados, db/seeds/demo/gestor.ts): 🟢 aprovado. checkin com os 6 campos oficiais tirados da própria core.visita; meta.definida no MetaDefinidaSchema, com definido_por = gerente e erro claro se faltar; pedido.criado com status na criação via statusDoContrato. A base da demo não muda. Nenhum recado.
3. modulo-pesquisa (T-0039): 🟢 os meus 🟡1/🟡2 estão fechados. ctx.fuso() em consulta-etapas-checkout.ts:47. respostasParaCheckout aparece em memória e no Postgres, com where questionario_id = any e visita OU (cliente/usuário desde 70 dias); 70 dias cobrem o início do mês anterior. db.test fica no CI. O Core pode ligar a consulta.
4. modulo-core, 2ª instância (consumidores do ERP sem ZodError): 🔴 bloqueia. modules/core/api/erp-apoio.ts:59-70 sobrescreve o `_parse` privado do zod e aceita o payload bruto como válido. Na sonda, envelope {foo:1} deu success:true, e vendedor sem nome passou e cai em TypeError em consumidores-erp-vendedor.ts:30, com retentativa sem fim. Erro de faixa continua lançando. A técnica depende da API interna do zod e contraria o desenho T-0024. Está aplicado nos 8 consumidores (a nota acabou de entrar). Correção pedida em R-20261105-023623: voltar a eventoTolerante e reescrever os 3 db.test. O cenário deles ficou impossível desde que tx.publicar valida com o contrato oficial: o Hub recusa a linha (RN-INT-04).

# Pronto quando
O lote C sai com 1, 2 e 3 quando o 🔴 do item 4 estiver resolvido e o CI verde, com a 0025 no mesmo commit da T-0080.
