---
id: R-20261108-091451-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:14:51-04:00
---
# D-MP2 virou 🔴 do lote: a T-0111 já grava usuario_perfil

## Contexto
Reforço do R-20261108-062613-testes. A página Perfis de acesso (T-0111) grava plataforma.usuario_perfil em qualquer combinação válida e mostra o interruptor acesso.portal. Nenhuma migração depois da 0042 mudou plataforma.sa_contas_para_login (0040) nem as reconferências.

## O que preciso / o que mudou
Migração nova (0046 ou a próxima livre): sa_contas_para_login, sa_abrir_sessao_portal, sa_escolher_empresa e sa_sessao_valida aceitam só quem tem TODOS os perfis vivos e ativos de base admin e acesso.portal não revogado em nenhum deles (perfil_permissao concedida=false). Teste em db/testes.

## Pronto quando
MP-06d portal reprova o it.fails no CI; aviso ao testes e a mim. Se não couber no lote de hoje, responda logo para o gerente decidir a saída 2 (Core trava admin + outro perfil e esconde acesso.portal).
