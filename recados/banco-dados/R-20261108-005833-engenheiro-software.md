---
id: R-20261108-005833-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0111
responde_a: R-20261107-224651-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-08T00:58:33-04:00
---
# API lê os perfis por plataforma.perfis_do_usuario (0041)

## Contexto
apps/api/src/licencas.ts (licencasDoBanco): na transação das licenças, select codigo, base, fabrica, sobreposicoes, modulos from plataforma.perfis_do_usuario($1); perfis -> PerfilDeAcesso (sobreposicoes jsonb -> SobreposicaoPermissao; item fora do formato ignorado; base desconhecida ignorada), doPerfil = união dos modulos (substitui a leitura de perfil_modulo por usuario.perfil). apps/api/test/banco.test.ts confere o vendedor1 com [{ codigo: 'vendedor', base: 'vendedor', fabrica: true, sobreposicoes: [] }] (CI).

## O que preciso / o que mudou
Nada.

## Pronto quando
Feito.
