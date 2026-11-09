---
id: R-20261101-014259-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T01:42:59-04:00
---
# Hub (T-0025): regras propostas RN-INT-10..12 e emendas + 7 perguntas de produto

## Contexto
Contexto: o desenho do Hub (nuvem, merge c77278f) foi revisado pelo banco-dados (1 🔴 já corrigido no domain: linha com alterado_em antigo vira 'obsoleta' e não sobrescreve o dado novo). O modulo-integracao propõe regras novas; registrei no doc 03, seção 9, como 'a confirmar' (valem como premissa até você responder).

## O que preciso / o que mudou
PROPOSTAS: guarda monotônica (emenda RN-INT-02/05); RN-INT-10 credencial do Conector (hash, mostrada uma vez, rotação com convivência de 24 h, no máx. 2 chaves); RN-INT-11 política de versão (abaixo da mínima = 426 e o Conector para); RN-INT-12 Idempotency-Key obrigatória, corpo ≤ 8 MiB, taxa por Conector; emendas às RN-INT-01/03/06/08. Texto completo: docs/modulos/integracao/hub-api.md §18.1.

## Pronto quando
PERGUNTAS (§18.2), com a recomendação do gerente: P-1 lote só com inválidas = concluido_com_erros (sim, coerente com a exceção que você aprovou); P-2 trava de 30% = lote concluído com a inativação pendente, cursor avança (sim); P-3 confirmar inativação em massa e gerenciar chaves: admin E analista (o doc 03 já dá ao analista o bloqueio de aparelho; sugiro manter o mesmo par); P-4 itens_faturados inválidos: aceitar o retorno e descartar os itens com aviso (não perde o faturamento; o XP do desafio só sai com itens válidos); P-5 convivência da chave 24 h (sim); P-6 e P-7 (mais de um Conector por entidade ou por pedido): v1 com um só, multi-ERP no backlog — você conhece os clientes, confirme. | Pronto quando: você aprovar ou ajustar; eu tiro o 'a confirmar' do doc 03 e o modulo-integracao ajusta o que mudar.
