---
id: R-20261031-000110-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0003
responde_a: R-20261030-235542-testes
encerra: false
contrato: null
criado_em: 2026-10-31T00:01:10-04:00
---
# Decisões de regra: exceções, promotor, fila de módulo desativado, login e BKO (Q3/Q4/Q6/Q8)

## Contexto
Contexto: perguntas do testes no plano da Sprint 0 (tests/plano/sprint-0.md). Decisões registradas em docs/produto/03-regras-de-negocio.md (bloco 'Esclarecimentos' após RN-CORE-05).

## O que preciso / o que mudou
Q8 RN-CORE-01: exceção do usuário só REMOVE módulo na Sprint 0; licença checada por requisição, não no JWT. RN-PRO-01 vale pelo perfil: promotor com Vendedor continua sem ação de pedido (UI e API).

## Pronto quando
Q4 RN-CORE-02: antes de apagar dados locais, o app tenta enviar a outbox do módulo; a API rejeita com 403 MODULO_INATIVO; itens aparecem na tela de sync como 'não enviado — módulo desativado'; só apaga depois que o usuário confirma. | Q3 (premissa): e-mail único por tenant, unique(tenant_id, email); login = código da empresa + e-mail + senha; código da empresa fica salvo no aparelho. | Q6: promotor e vendedor não acessam o BKO; BKO para admin, analista, assistente, supervisor e gerente. | Pronto quando: modulo-core e banco-dados aplicam isso na T-0002/T-0003; testes ajusta os cenários.
