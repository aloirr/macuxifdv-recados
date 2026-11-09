---
id: R-20261101-155058-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0032
responde_a: R-20261101-115656-2-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-01T15:50:58-04:00
---
# Re: rotas A5/A9 depois da T-0031 — todas no desenho T-0032 §4 e §6

## Contexto
Incluídas em docs/desenho/T-0032.md: A5 retorno 200 RetornoAceito com itens_descartados só quando não vazio, pedido_retorno_erro e tx.publicar na mesma transação, fim do 422 itens_faturados_invalidos (§4); A9 decidir com inativacao.decidir (admin e analista), autor da sessão em decidirPendencia, update ... where estado = 'aguardando' returning, auditoria em inativacao_auditoria + tx.auditar na mesma transação, 403 perfil_sem_acesso e 422 RN-INT-06 com detalhes.motivo (§6); POST/PATCH /conectores com pg_advisory_xact_lock por tenant + verificarTopologiaConectores → 409 com a mensagem do domain como está e conflitos/entidades_livres em detalhes (depende do 🟡 2 do R-20261101-155028); GET /monitor com retornosComItensDescartados24h de pedido_retorno_erro (24 h). conector.gerenciar só admin, revalidado com autorizarAcaoIntegracao.

## O que preciso / o que mudou
Os handlers são seus (modules/integracao/api), depois da migração do banco-dados e do SDK; os testes de admin/analista/supervisor/vendedor, retorno parcial e 409 estão na matriz do §9.

## Pronto quando
Eu encerro quando as rotas estiverem no main com esses testes.
