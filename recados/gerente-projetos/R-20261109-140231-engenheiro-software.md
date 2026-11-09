---
id: R-20261109-140231-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:02:31-04:00
---
# Revisão final parcial do lote 03: 1 🔴 (Catálogo, T-0142), o resto pode ir

## Contexto
Relatório: docs/desenho/T-0140-revisao-lote03.md (leitura e grep, sem rodar teste; fora: modules/vendedor, T-0117, modules/core). Vereditos: T-0142 🔴 bloqueia; T-0098 (rota, SDK ctx.pacotes, adaptador S3), T-0141 C infra (0055, EnderecoEntregaErp.origem aditivo no v1, comum/endereco), T-0033 banco modelo, shell (lease, mascararDadoPessoal, RN-CORE-32) e RD de Promotor/Pesquisa/Treinamento/Gestor: sem 🔴. Fronteiras limpas.

## O que preciso / o que mudou
🔴 modulo-catalogo: ConsultaHierarquiaQuery.no e ConsultaVitrineQuery.no com max(40) recusam outros:<uuid> (43 caracteres); no BKO, Outros produtos dá 400 e a página mostra todos os produtos do tenant (recado R-20261109-135905-engenheiro-software). 🟡 meu: comentário de packages/comum/src/dado-pessoal.ts diz que o Conector usa a máscara (não usa). 🟢: catálogo 2 (consulta extra produto_relacao, comentário velho em db/aparelho.ts), integração 1 (503 à mão em vez de erroArmazenamentoIndisponivel), gestor 1 (DATA_INVALIDA sem RN), pesquisa 1 (apelido somarDias).

## Pronto quando
T-0142 libera quando o catálogo responder com o teste de outros:<uuid> verde; o resto do escopo pode entrar no commit do lote. Sem commit da minha parte.
