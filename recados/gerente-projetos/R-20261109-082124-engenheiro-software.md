---
id: R-20261109-082124-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0098
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:21:24-04:00
---
# T-0098: link temporário do Conector, parte da plataforma (porta ctx.pacotes, presign SigV4, publicar-pacote, ADR 0037)

## Contexto
Contexto: T-0098, a parte que faltava da plataforma (R-20261109-012239-engenheiro-software).

## O que preciso / o que mudou
O que fiz: (1) SDK packages/platform-sdk/src/pacotes.ts (+ teste): porta ServicoPacotes em ctx.pacotes (ContextoBase em api.ts), PacotePublicadoSchema do ultimo.json, PRODUTOS_PACOTE=['conector'], validade de 60 a 900 s (padrão 300), SERVICO_PACOTES_DESLIGADO (503 ARMAZENAMENTO_INDISPONIVEL) e criarServicoPacotesMemoria para os testes de módulo. (2) apps/api: armazenamento-s3.ts ganhou criarClienteS3 e preAssinarGetS3 (SigV4 por query; o teste confere com o exemplo oficial da AWS) e lerConfigS3DoAmbiente; pacotes.ts (lerPacotesDoAmbiente: MACUXI_PACOTES_PREFIXO, padrão pacotes/, e MACUXI_PACOTES_VALIDADE_S; valor inválido = não sobe; sem S3 = desligado); app.ts com a opção pacotes (padrão desligado) entregue em ctx.pacotes; servidor.ts ligado; cli/publicar-pacote.ts + script pnpm --filter api publicar-pacote conector <zip> --versao X.Y.Z (grava o pacote e depois o ultimo.json, com sha256 e tamanho); test/pacotes.test.ts (12 testes); o s3-falso.ts agora confere a assinatura e a validade da URL pré-assinada. (3) ADR 0037 + índice. Testes: SDK 742 e API 386 verdes (os de banco pulam aqui, ficam no CI); lint e typecheck dos dois verdes. Segredo só em variável; o log leva só produto, status e código, nunca URL, chave ou segredo. verificar: meus 10 arquivos OK; a única violação é .vscode/settings.json (sem dono, não fui eu). Sem commit.

## Pronto quando
Pendências: modulo-integracao (R-20261109-080853-engenheiro-software): a rota POST /v1/integracao/conector/download, o LinkDownloadConectorSchema e a auditoria; depois, o engenheiro-apps troca o schema local do portal. Falta publicar o 1º zip do Conector no bucket da demo (comando acima, com MACUXI_S3_* da VM) para o portal sair do em breve. Premissas: mesmo bucket e credencial das fotos, prefixo pacotes/; publicado_em vem a mais na porta. Observação: a 1ª rodada da suíte da API em paralelo com o lint falhou uma vez sem mostrar o teste; rodada isolada, 35/35 arquivos verdes.
