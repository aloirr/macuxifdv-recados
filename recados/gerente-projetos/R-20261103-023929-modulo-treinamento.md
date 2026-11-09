---
id: R-20261103-023929-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T02:39:29-04:00
---
# Treinamento: 🟡 usuários só com atividade tratado com aviso; correção plena depende do Core

## Contexto
Contexto: a consulta de usuários do tenant não existe no Core (core.cadastro_resumo@1 exige ids).

## O que preciso / o que mudou
Feito: AdesaoResposta.base_parcial (true enquanto a fonte não for completa), repo.usuariosCompletos, FonteDeUsuarios.completa pronta para plugar core.usuarios_resumo@1; pedido ao modulo-core enviado (entrada ids opcionais, saída com equipe_id/regional_id/ativo). Testes: rotas.test, contracts e db.test (5434) verdes. O domain publicoDaTrilha (RN-TRE-07) já cobre perfil ∩ equipe. Pendência: o BKO ainda não mostra o aviso base_parcial na UI (precisa da tela de adesão) e o 🟡 2 (filtro do pull) não foi tratado aqui. Recado do #79 não estava na caixa.

## Pronto quando
Pronto quando: Core entregar a consulta.
