---
id: R-20261031-000118-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0002
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T00:01:18-04:00
---
# Decisões de ambiente: Postgres local, Android, branch e script verificar

## Contexto
Contexto: o testes (T-0006) achou impedimentos de ambiente nesta máquina.

## O que preciso / o que mudou
O que preciso: (1) POSTGRES: não há Postgres nem Docker; isso bloqueia a T-0002 e os testes de RLS/vazamento. Opções: (a) instalar Docker Desktop, que pede admin e é o que recomendo (o mesmo vale no CI); (b) instalar o PostgreSQL 16 nativo no Windows; (c) usar um Postgres de desenvolvimento em nuvem (Neon/Supabase), com a URL só no .env. (2) ANDROID: não há Android SDK. Proposta: na Sprint 0, validar no celular com o Expo Go e gerar o APK pela nuvem com o EAS Build, sem SDK local. Confirma? (3) BRANCH: o repositório está em 'master', mas o principal declarado é 'main'. Posso pedir ao engenheiro que use 'main'? Renomear o branch é seu. (4) SCRIPT scripts/coord.mjs verificar (é seu): ele confere o working tree inteiro contra o HEAD; com agentes em paralelo acusa arquivos de outros, não aceita a exceção dos diários (.coord/diario/<agente>.md) e no CI não enxerga o diff do PR. Proposta: aceitar --base <ref> para o CI e aplicar as mesmas exceções universais do guardião.

## Pronto quando
Pronto quando: você escolher a opção de cada item.
