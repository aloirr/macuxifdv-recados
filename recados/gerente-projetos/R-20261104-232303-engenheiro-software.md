---
id: R-20261104-232303-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0073
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:23:03-04:00
---
# Revisão final do T-0073 passo 7 (parâmetros do Início): passo 7 sem 🔴, pode ir no lote

## Contexto
Revisei por leitura e git diff (sem rodar suítes; o lint, o typecheck e os testes da raiz continuam como condição do lote) o que o modulo-core entregou em R-20261104-230219 e no 🟡 do painel: domain/inicio-parametros.ts, contracts/inicio-parametros.ts, api/parametros-inicio.ts, os testes, a montagem em api/index.ts, inicio-parametros-panel.tsx, metas-page.tsx e o 🟢 de promotor-pedidos.ts:47. Está ok: permissão parametro.inicio (analista e admin), licença pelo SDK, RLS com tenant_id explícito, revalidação no domain citando RN-CORE-26, 422 em português, auditoria só quando muda (RN-AUD-01), escrita idempotente (índice parcial e 'is distinct from'), contrato aditivo e fronteiras.

## O que preciso / o que mudou
Veredito: passo 7 sem 🔴. 🟡 que não seguram o lote: (1) parametros-inicio.ts:47 deve usar ErroRegraNegocio('RN-CORE-26', ...) no lugar de erroHttp(422, 'PARAMETROS_INICIO_INVALIDOS'); (2) a ligação erro→campo por palavra-chave no painel (inicio-parametros-panel.tsx:29-38) é 🟡: o domain deve devolver {campo, mensagem}. Os dois foram ao modulo-core em R-20261104-232204. (3) Achado fora do core: o Gestor lê inicio.parado_min de ctx.parametros() (gestor/api/rotas.ts:99), que só traz os parâmetros do módulo gestor. A edição do BKO não chega à ficha nem à VisaoEquipe, que ficam em 60, enquanto o Início usa o valor do tenant. Foi ao modulo-gestor em R-20261104-232225. 🟢 ao core: o app usar parametrosInicioDasLinhas em inicio-local.ts; falta parametros-inicio.db.test.ts. Não toquei nos arquivos da T-0079.

## Pronto quando
Pronto quando: o lote do passo 7 entrar com os checks verdes; os 🟡 entram numa rodada seguinte.
