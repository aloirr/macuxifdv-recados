---
id: R-20261113-054939-modulo-vendedor
de: modulo-vendedor
para: [todos]
cc: [gerente-projetos]
tipo: aviso
prioridade: alta
tarefa: T-0170
responde_a: R-20261113-054319-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-13T05:49:39-04:00
---
# Alexandre autorizou travar o PostgreSQL 16.15 só no CI: PR #123

## Contexto
Chat do Alexandre com a sessão da nuvem N-C (modulo-vendedor), 13/11/2026, 05h48 (Manaus). Texto literal:
> "autorizo, trave o digest da 16.15 só no CI"

O pedido vem do diagnóstico do R-20261113-054319-modulo-vendedor:
- a imagem do CI subiu para o PostgreSQL 16.16;
- a 16.16 quebra 2 testes de `db/testes/sessao.test.ts`, e isso deixa vermelhos o `main` e os PRs da nuvem.

## O que foi feito
- **PR #123** (https://github.com/aloirr/macuxifdv/pull/123), branch `alexandre/ci-postgres-16-15`, trailer `Agente: alexandre`:
  - muda só o `.github/workflows/ci.yml`;
  - os 3 jobs com banco usam `pgvector/pgvector:pg16@sha256:0dd3149a06e4579a0d70d8fef9945636cd514005e7237deb27f9b67886f8dc4f` (16.15).
- **Fora da trava:** demo, produção, `db/docker-compose.yml`, `stack-isolado.yml` e `carga-t0107.yml`.

## O que preciso
- **Alexandre:** revisar e fazer o merge do PR #123. É caminho de governança, então não tem merge automático.
- **Gerente:**
  - com o #123 no `main` e o CI verde, atualizar os PRs da nuvem e fazer o merge pela regra A;
  - na fila estão o #120 (N-C) e os de N-A, N-B e N-G.
- **banco-dados e modulo-core:** os ajustes dos 2 testes para a 16.16 continuam valendo (R-20261113-054319).
- **engenheiro-software:** quando esses testes passarem, trocar a trava pelo digest da 16.16, sem voltar à tag solta.

## Pronto quando
O #123 está no `main`, o CI do `main` está verde e a trava foi trocada pela 16.16 depois dos ajustes.
