---
id: R-20261031-182141-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0024
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T18:21:41-04:00
---
# T-0024: padrão do payload dos eventos no contracts e ordem por módulo (para registrar na tarefa)

## Contexto
T-0024, passo 1 (engenheiro): padrão e ordem por módulo para cada dono publicar o payload dos seus eventos no próprio `contracts`, sem implementar. Hoje existem 4 formatos: o Core usa `XxxSchema` + `EVENTO_X = definirEvento(...)`; o Vendedor, `PedidoFaturadoEvento` (só o schema); Pesquisa e Treinamento, `XxxV1` + nome em string; a Integração, `XxxEvento`. O Gestor mantém cópias em `modules/gestor/contracts/eventos-consumidos.ts`. Peço que registre o texto abaixo na `.coord/tarefas/T-0024.md` (o arquivo é seu).

## O que preciso / o que mudou
**Padrão (vale para todo evento de `.coord/contratos/eventos.md`):**
1. Lugar: `modules/<m>/contracts/eventos.ts`, reexportado em `contracts/index.ts`. Só Zod + `definirEvento` do `@macuxi/platform-sdk` (fronteira permitida).
2. Por evento, três exports: o schema do payload `<Entidade><Fato>V<N>` (ex.: `PedidoCriadoV1`); o tipo `type <Entidade><Fato>V<N> = z.infer<…>`; e a definição `EVENTO_<ENTIDADE>_<FATO> = definirEvento('<m>.<e>.<f>@N', <schema>)`. Os nomes já publicados pelo Core (`VisitaCheckinSchema`…) ficam como estão. O que vale como contrato é o `EVENTO_*`: o publicador usa em `tx.publicar` e o consumidor lê `EVENTO_*.schema`.
3. Lista do módulo: `export const EVENTOS_<M> = [EVENTO_…] as const`. Um teste da plataforma (engenheiro, depois que os donos publicarem) confere `manifest.publica` × `EVENTOS_<M>`: nada publicado sem schema, nada no schema fora do `publica`. Isso cobre o critério 1.
4. Forma do payload: snake_case; ids `*_id` UUID; dinheiro `*_cents` inteiro; instantes `*_em` ISO UTC com Z; datas civis `AAAA-MM-DD`; enums em português. Sem dado pessoal além de ids (nada de nome, telefone ou e-mail). O envelope (`evento_id`, `tenant_id`, `ocorrido_em`, `usuario_id`, `request_id`) é do SDK e não se repete no payload.
5. Compatibilidade dentro do `@N`: só se ACRESCENTA campo `.optional()`. Remover, renomear, mudar tipo ou tornar obrigatório = `@N+1` + ADR + recado aos consumidores, com as duas versões publicadas na transição.
6. Leitura tolerante: o consumidor importa `EVENTO_*.schema` do `contracts` do dono e usa `z.object` padrão (ignora campo novo), nunca `.strict()`. Campo opcional ausente tem tratamento explícito no domínio do consumidor. Falha de parse vai para o tratamento de erro do despachante (T-0022), nunca derruba o consumidor.
7. Teste no publicador: `contracts/eventos.test.ts` com um exemplo válido por evento (`EXEMPLOS_<M>`), que os consumidores reaproveitam nos próprios testes.
8. Registro: depois de publicar, o engenheiro acrescenta a coluna "Schema" (export) em `.coord/contratos/eventos.md`.

**Ordem por módulo (Sprint 2, como a tarefa já está):**
1. modulo-vendedor: `pedido.criado`, `status_alterado`, `aprovacao_solicitada` e `faturado` (ajustar ao padrão). Destrava a maior parte do Gestor: `vendedor_id`, `autor_id`, `total_cents`, `total_tabela_cents`, `tipo` e os opcionais `credito{…}` e `historico{…}` da aprovação (RF-GES-04, RN-VEN-03, RN-VEN-30).
2. modulo-promotor: os 6 `promotor.*`, com `fotos_total`/`fotos_sem_gps` e `permanencia_min` em `visita_loja.concluida` (RN-PRO-02). As fotos agora existem na plataforma (ADR 0010), então as contagens têm fonte.
3. modulo-core: `rota.dia_planejado@1` e `meta.definida@1` (payloads pedidos pelo Gestor em R-20261031-191106), junto com a T-0020. Os 5 já publicados só ganham `EVENTOS_CORE`. Fica depois da T-0018 para não pesar no caminho crítico. O Gestor espelha `encerramento normal|automatico`; o Core publica `fechada_por: usuario|auto`, e quem se alinha ao Core é o Gestor.
4. modulo-pesquisa e modulo-treinamento: já têm schema; só trocam o nome em string por `definirEvento` + `EVENTOS_<M>` (pequeno).
5. modulo-integracao e modulo-catalogo: só depois que saírem as travas da nuvem (T-0023 e ajustes da T-0021); a Integração já tem os schemas, só ajusta ao padrão.
6. modulo-gestor e modulo-treinamento: trocar as cópias pelos imports (critério 2), um módulo de cada vez, depois de 1–3.
7. engenheiro: teste `publica` × `EVENTOS_<M>` e coluna "Schema" no registro (critério 1).

## Pronto quando
O padrão e a ordem estiverem no histórico da T-0024. Implementação fica na Sprint 2 (não comecei).
