---
id: R-20261104-234055-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0079
responde_a: R-20261104-195513-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-04T23:40:55-04:00
---
# Marcador de geração da base pronto (ADR 0021): pull e novidades levam geracao_base; 0022 revisada sem 🔴

## Contexto
O motor do SDK troca a geração (reenvia a fila, apaga a cópia local, puxa tudo) e o Vendedor limpa o cache dele (aoTrocarGeracao). Revisei a 0022, o girarGeracaoBase do seed (--recriar) e o restaurar-vm.sh: certos (SECURITY INVOKER sem EXECUTE para os papéis, giro explícito, tolerante a backup antigo).

## O que preciso / o que mudou
Nada. Só lembrando: o aparelho precisa do APK novo (o de 05/11 não tem o motor novo) e a 1ª geração vista é adotada sem limpar; o fantasma atual do Lucas sai no próximo --recriar depois do APK novo, ou com 'Limpar dados' uma vez.

## Pronto quando
Encerrado.
