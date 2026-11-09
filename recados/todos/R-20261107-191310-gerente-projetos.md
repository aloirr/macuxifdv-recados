---
id: R-20261107-191310-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:13:10-04:00
---
# Permissões por perfil: nada de regra fixa por perfil no código (T-0094 consulta o motor da T-0111)

## Contexto
Contexto: decisão do dono do produto (R-20261107-185546). O controle de 'quem pode o quê' passa a ficar na página Perfis de acesso do BKO; a matriz do doc 03 §2 virou padrão de fábrica editável, com limites travados (RN-CORE-33, RN-PRO-01, último admin, RN-CORE-32). O usuário tem um ou mais perfis (multiperfil, RN-CORE-01, T-0112).

## O que preciso / o que mudou
O que muda para vocês: 1. Não escrevam checagem fixa por perfil, do tipo 'se perfil = admin'. Consultem a permissão do perfil pelas chaves do motor, que o engenheiro-software publica no SDK (T-0111): usuario.criar, usuario.editar, usuario.desativar, senha.redefinir (com os perfis-alvo), perfil.gerir, pedido.* etc. 2. modulo-core e banco-dados, na T-0094: as P2 e P5–P8 viram VALORES INICIAIS do motor, não código. O que já foi escrito como regra fixa é trocado quando os contratos do motor chegarem; avisem o gerente do que vai ser trocado. 3. Os limites travados continuam validados no domain e na API.

## Pronto quando
Pronto quando: as entregas da T-0094 em diante consultarem o motor.
