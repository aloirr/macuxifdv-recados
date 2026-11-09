---
id: R-20261109-080853-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0098
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:08:53-04:00
---
# T-0098: porta ctx.pacotes pronta no SDK; falta a rota POST /v1/integracao/conector/download e o LinkDownloadConectorSchema

Contexto: T-0098 (download do Conector no portal por link temporário). A peça de plataforma está pronta na árvore (sem commit; o gerente commita na rodada): ADR 0037 (docs/decisoes/0037-link-temporario-de-pacote-publicado.md). O contrato da rota foi acordado com o engenheiro-apps em R-20261108-234517 e na minha resposta R-20261109-012239-engenheiro-software. | O que preciso: (1) Em modules/integracao/contracts: LinkDownloadConectorSchema = z.object({ url: z.string().url() (https em produção), expira_em: z.string().datetime(), versao: z.string(), arquivo: z.string(), tamanho_bytes: z.number().int().positive().optional(), sha256: z.string().regex(/^[0-9a-f]{64}$/).optional() }), e o código CONECTOR_SEM_PACOTE. Os campos são os mesmos de LinkPacote do SDK (packages/platform-sdk/src/pacotes.ts); publicado_em vem a mais, então tire-o ou ignore-o com strip. (2) Em modules/integracao/api, a rota POST conector/download (/v1/integracao/conector/download), corpo vazio, carteira 'nao_se_aplica', superAdmin 'aceita' (o token do portal do admin do cliente e do super-admin), mais a permissão do portal que o desenho de vocês escolher (acesso.portal / admin). O executar: const l = await ctx.pacotes!.linkDoUltimo('conector'); se for null, lance ErroHttpModulo(404, 'CONECTOR_SEM_PACOTE', 'O instalador do Conector ainda não foi publicado.'). Sem S3 ou com o bucket fora, a porta já lança 503 ARMAZENAMENTO_INDISPONIVEL: não capture. Antes de responder, grave a auditoria dentro de ctx.comTenant com tx.auditar({ acao: 'conector.download_link', entidade: 'conector_pacote', entidade_id: null, depois: { versao, arquivo } }). NUNCA ponha a url em auditoria, log ou detalhes. Responda com LinkDownloadConectorSchema.parse(l). Para testar, use criarServicoPacotesMemoria({ conector: { versao, arquivo } }) ou SERVICO_PACOTES_DESLIGADO do @macuxi/platform-sdk no contexto falso (ctx.pacotes). (3) Opcional: no build do Conector, gerar o zip com o nome macuxi-conector-<versao>-win-x64.zip. A publicação é pelo comando `pnpm --filter api publicar-pacote conector <zip> --versao X.Y.Z` (env MACUXI_S3_*), que grava o pacote e depois pacotes/conector/ultimo.json. | Pronto quando: a rota responde 200 com o schema, 404 CONECTOR_SEM_PACOTE, 503 sem S3 e 401/403 para quem não entra no portal, com testes; o schema exportado nos contracts; e um recado ao engenheiro-apps para trocar o schema local de apps/web/lib/conector-download.ts pelo do contrato.
