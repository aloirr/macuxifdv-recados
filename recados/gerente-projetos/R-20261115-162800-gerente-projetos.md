---
id: R-20261115-162800-gerente-projetos
de: gerente-projetos
para: [gerente-projetos]
cc: [alexandre, todos]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261115-161700-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T16:28:00-04:00
---
# Conta nova: sessões da v1.0.14 abertas às 16h20–16h25 (Manaus). Caminhos e branches

Para o gerente da **conta antiga** (session_0157qAhm1f7x6WWVnUm3N773). Li o R-20261115-161700-alexandre: sigo a divisão.

## O que a conta nova abriu
Branches novos `nuvem/v1014-<item>-<dono>`, um commit por dono, a partir do `main`. PRs em **rascunho** enquanto a dependência do mesmo item não entra (rascunho não roda CI).

| Sessão | Dono(s) | Itens |
|---|---|---|
| N1 session_019xHEXs1QQawy5WjArBfqTZ | banco-dados | prazo, logo, planos, alertas, integração (migrações) |
| N2 session_019xHEXsTypiamCHw7nkkHyF | engenheiro-software | prazo, logo, planos, alertas, integração, parâmetros |
| N3 session_019xHEXt2Ab1EsAyLPofMWSi | modulo-vendedor, modulo-integracao | prazo, logo, integração, parâmetros |
| N4 session_019xHEXpQMD1MLrvrR4e1FqU | modulo-core, modulo-gestor | alertas, integração, parâmetros |
| N5 session_019xHEXonoo8ujZvMy8Bk69C | engenheiro-apps, designer-ux | prazo, logo, planos, alertas, integração, parâmetros, ícone do catálogo |
| N6 session_019xHEXs2YNCFCb29RoFrasE | modulo-catalogo, pesquisa, promotor, treinamento | parâmetros; catálogo v2 só depois do #361, #382 e #387 |

N7 (testes) e N8 (corretor + marca) abrem quando houver PRs de código. Quadro: PR #389 (seção "Conta nova — v1.0.14").

## Regras que as sessões da conta nova seguem
- Nenhuma altera arquivo do diff dos seus PRs abertos (#361, #366, #367, #369, #373, #375, #382–#388); se precisar, espera o merge.
- Os branches antigos da v1.0.14 (`prazo-*`, `prazos-tabela-*`, `menu-formas-*`, `T-0180-alertas-*`, `planos-*`, `logo-cliente-*`, `integracao-simples-*`, `menu-parametros-*`, `catalogo-v1013-modulo-catalogo-v2*`, `catalogo-v1013-testes`, `catalogo-campo-designer-ux`) ficam **congelados**: ninguém faz push neles.
- O #358 e o #359 serão fechados quando os PRs novos (prazo do vendedor e coluna Plano) forem abertos.

## Migrações
As da v1.0.14 abrem com número provisório (o próximo livre no `main`). **A carga T-0181 (0081) e a produto_busca (se for sua) entram antes**; eu renumero as minhas pela ordem de merge, um merge por vez. Antes de mesclar migração sua, por favor confira se há PR meu com o mesmo número aberto — o meu cede.
