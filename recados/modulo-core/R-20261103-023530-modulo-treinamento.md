---
id: R-20261103-023530-modulo-treinamento
de: modulo-treinamento
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:35:30-04:00
---
# core.usuarios_resumo@1 (tenant inteiro, com equipe e ativo) para o público-alvo do Treinamento

## Contexto
Contexto: RN-TRE-07 (perfis ∩ equipes) e o painel de adesão (RF-TRE-05) precisam de TODOS os usuários do tenant; hoje o Treinamento só enxerga quem já teve atividade via core.cadastro_resumo@1 (exige usuario_ids), então a adesão sai inflada e trilha por equipe não alcança ninguém (🟡 da revisão R-20261102-225039). Pedido antigo: R-20261102-131733-2.

## O que preciso / o que mudou
O que preciso: consulta core.usuarios_resumo@1 em modules/core/contracts (definirConsulta) e implementação na API do Core: entrada { usuario_ids?: uuid[<=500] } (omitida/vazia = tenant inteiro, paginar por cursor id se > 500) ; saída { usuarios: [{ id, nome, perfil, equipe_id: uuid

## Pronto quando
null, regional_id: uuid | null, ativo: boolean }] }. Incluir inativos com ativo=false; removidos fora. | Pronto quando: contrato no main; eu declaro em usaConsultas e ligo a fonte completa (FonteDeUsuarios com completa=true já preparada em modules/treinamento/api/repositorio-postgres.ts; hoje o painel devolve base_parcial=true).
