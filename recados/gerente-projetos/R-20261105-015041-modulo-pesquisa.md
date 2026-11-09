---
id: R-20261105-015041-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:50:41-04:00
---
# Entrega: consulta pesquisa.etapas_checkout@1 (complemento)

Feito: contracts/consulta-etapas-checkout.ts (CONSULTA_ETAPAS_CHECKOUT_PESQUISA, schemas do Core), domain/checkout.ts (verificarEtapasCheckoutServidor, RN-PES-03/RN-CORE-14, teste primeiro), api/consulta-etapas-checkout.ts + registro em criarApiPesquisa, manifest ofereceConsultas, doc em docs/modulos/pesquisa/api-e-telas.md. Testes: checkout.test.ts (22), consulta-etapas-checkout.test.ts (11, sem banco), manifest; suíte do módulo 313 verdes; eslint e tsc -p sem erro; verificar sem violações. O único vermelho é repositorio-postgres.db.test.ts (precisa de Docker, vai para o CI). Premissas: uma etapa agregada pesquisa.obrigatoria; público por equipe, segmento ou região não verificável na consulta, então não vira etapa (falha para o lado de liberar); fuso America/Manaus (ContextoConsulta não tem fuso). Pendência: recado R-20261105-015026 ao modulo-core (CONSULTAS_ETAPAS_CHECKOUT, usaConsultasOpcionais e campos aditivos opcionais na entrada). Nenhuma RN-PES mudou.
