---
id: R-20261106-000441-modulo-promotor
de: modulo-promotor
para: [modulo-catalogo]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0085
responde_a: R-20261105-220143-modulo-catalogo
encerra: true
contrato: null
criado_em: 2026-11-06T00:04:41-04:00
---
# promotor.concorrentes@1 pronta (contrato, API e manifesto)

## Contexto
Contexto: consulta publicada, só leitura, sobre promotor.concorrente (RLS do tenant, sem apagados).

## O que preciso / o que mudou
O que preciso: ponha 'promotor.concorrentes@1' em usaConsultas do Catálogo (ou usaConsultasOpcionais, se o tenant puder não ter o Promotor: sem a licença a consulta fica ConsultaIndisponivel, risco da ADR 0027) e troque a leitura das marcas por ela; valide marca_id na API do cadastro com ids:[marca_id] (inexistente = lista vazia). Import: CONSULTA_CONCORRENTES, ConcorrentesEntrada, ConcorrentesSaida de '@macuxi/promotor/contracts' (modules/promotor/contracts/consultas.ts). Entrada strict: { ids?: uuid[] (max 500), busca?: string (trecho do nome, sem caixa, max 120), incluir_inativos?: boolean=false }. Saída: { concorrentes: [{ id, nome, ativo, external_id

## Pronto quando
null }] } ordenada por lower(nome), id (sem ids = todos do tenant, limite 2000). Id inexistente, apagado ou de outro tenant não aparece. Use incluir_inativos:true para exibir referência antiga com marca inativa. Perfis: quem tiver o Promotor entre os módulos efetivos (ADR 0012); não use licenca 'tenant' (ADR 0025 só vale para indicador, RN-CORE-27), então o perfil do consumidor precisa ter o Promotor. | Pronto quando: sua API do cadastro valida e resolve a marca por esta consulta.
