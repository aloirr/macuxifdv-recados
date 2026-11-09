---
id: R-20261031-150512-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0012
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:05:12+00:00
---
# T-0012 entregue: domínio, contratos e manifesto da Pesquisa (200 testes verdes)

## Contexto
T-0012 (pedido direto do Alexandre, sem arquivo em .coord/tarefas): domínio da Pesquisa, sem banco e sem telas. Branch nuvem/T-0012-pesquisa-dominio. Não fiz commit/push.

## O que fiz
- docs/modulos/pesquisa/regras.md: cada regra com exemplo e RF/RN de origem (RF-PES-01..06, RN-PES-01..04, RN-CORE-12, RN-AUD-01, doc 03 §2), tabela de parâmetros com padrão, 11 premissas e pendências.
- modules/pesquisa/domain (funções puras, testes antes, cada `it` cita RN-/RF-): questionario.ts (rascunho editável, publicar congela com Object.freeze profundo, editar cria nova versão mantendo ids, versão vigente, resposta valida contra a versão que cita), resposta-item.ts e resposta.ts (9 tipos: sim/não, única, múltipla, número, texto, escala, data, foto, código de barras; obrigatoriedade; modo rascunho), condicional.ts (só pergunta anterior, ciclo com caminho, aviso de inalcançável, perguntas visíveis, obrigatória oculta não exigida), publico.ts (perfis/equipes/segmento/canal/região/lista, vigência UTC, frequência uma_vez_por_cliente/a_cada_visita/semanal/mensal, pesquisaAplicavel com motivo), checkout.ts (etapa de visita.etapas_checkout: pendente/concluída/dispensada por cliente fechado, bloqueia_checkout), idempotencia.ts (inserir/duplicada/conflito, lote), resultados.ts (contagem por opção, média/min/máx, distribuição da escala, taxa sobre o público, filtro por período e equipe), parametros.ts.
- modules/pesquisa/contracts (Zod): questionário, versão, pergunta (união discriminada por tipo), regra, público, vigência, resposta (envio e gravada com recebida_em), resultado, parâmetros e RespostaRegistradaV1; os tipos do domain vêm daqui.
- manifest.ts: perfis passou a incluir admin; acoes: pesquisa.responder (vendedor, promotor, supervisor, gerente), questionario.criar/editar/publicar/arquivar (analista, admin), resultado.ver/exportar (supervisor, gerente, analista, admin). publica continua só pesquisa.resposta.registrada@1.

## Números e checks
200 testes no @macuxi/pesquisa (contracts 33, domain 159, manifest 8). pnpm --filter @macuxi/pesquisa lint/typecheck/test verdes; pnpm fronteiras sem violação; coord verificar modulo-pesquisa --base origin/main = 0 (34 arquivos); da raiz pnpm lint, typecheck e test verdes (17/17 tarefas cada).

## Premissas (detalhe em regras.md)
Chave de frequência = cliente (qualquer usuário) ou usuário sem cliente; semana segunda-domingo e mês civil no fuso; vários "mostrar" = OU e "ocultar" vence; lista de clientes soma (OU) aos critérios de segmento/canal/região; Core informa equipe do usuário + ancestrais; resposta fora da vigência além de 24 h é recusada e relógio >24 h adiantado também; código de barras EAN/UPC com dígito verificador, outros 3-48 caracteres; limites do construtor (50 perguntas, 20 opções, 10 fotos, 2000 caracteres, escala amplitude 10); rascunho de resposta só local; resultado por versão.

## Perguntas para o Alexandre
1. Frequência "uma vez por cliente"/semanal/mensal conta qualquer usuário no cliente, ou cliente + usuário?
2. Semana/mês civis ou janelas móveis (7/30 dias)?
3. Resposta fora da vigência (além de 24 h) é recusada (hoje) ou aceita com sinalização?
4. Assistente vê resultados? (hoje não, como no Treinamento)
5. Quer evento pesquisa.questionario.publicado@1 (não há base no doc 02; hoje só auditoria RN-AUD-01 pela API)?
6. Pesquisa obrigatória também no check-in? (o Core só tem ponto de extensão no checkout)

## Pendências para outros donos
- modulo-core: informar `cliente_fechado` ao avaliar a etapa de checkout, equipe do usuário com ancestrais e `canal` do cliente (contrato atual tem só `segment` e `region`); contrato novo, sem pedido formal ainda.
- banco-dados: pedido de tabelas só depois da revisão do contrato (perguntas/opções/regras vão aninhadas na versão; o sync do manifesto pode ganhar opcao/regra_condicional).
- Nada foi alterado fora de modules/pesquisa (exceto db/, que é de banco-dados, intocado) e docs/modulos/pesquisa; ajustar modules/pesquisa/manifest.ts incluiu `admin` em perfis (o reference em packages/platform-sdk/src/manifestos-referencia.test.ts é cópia própria e não foi tocado).
