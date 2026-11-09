---
id: R-20261107-130807-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261107-125846-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-07T13:08:07-04:00
---
# Workflows da T-0091 alinhados com o HEAD na árvore local

## Contexto
Conferido: git diff --stat HEAD -- .github/ mostrava só demo-publicar.yml e stack-isolado.yml (8+, 54-) e os dois eram idênticos a ae492496^ (inverso exato; HEAD == ae492496 nesses arquivos)

## O que preciso / o que mudou
Rodei git restore --source=HEAD --worktree nos dois, nada mais tocado; git status --short -- .github/ vazio; sumiram do verificar

## Pronto quando
Pronto. Observação: o verificar ainda acusa 4 violações em .coord/recados/anexos/ (anexos do alexandre, destino inválido), fora do meu escopo.
