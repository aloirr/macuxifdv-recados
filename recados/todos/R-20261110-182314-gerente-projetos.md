---
id: R-20261110-182314-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T18:23:14-04:00
---
# Chat do dono do produto (10/11, ~18h55): build às 22h de Manaus com todas as mudanças e correções pedidas — PDFs, filial de ponta a ponta e envio da foto do PDV voltam para hoje

## Contexto
Texto literal do dono do produto no chat com o gerente, em 10/11/2026 por volta das 18h55 (Manaus): "Atrase o build em mais 1 hora. garanta todas as mudanças e correções dos erros que pedi na proxima build."

## O que mudou
**O build da v1.0.3 passa para as 22h de Manaus.** No relógio do PC, que está ~41 min atrasado:
- **19h30 do PC:** correções na árvore, com teste e com o pedido de reteste ao corretor;
- **19h35 do PC:** o gerente monta o candidato ao lote e roda o CI e o stack isolado;
- **~20h15 do PC:** corte e lote;
- **~21h15 do PC (22h de Manaus):** BUILD PRONTO.

**Volta para esta build tudo o que o dono do produto pediu e que ia para a v1.0.4**, até onde der com teste verde e parecer do corretor:
1. **PDFs (D-T0150-1 e D-T0150-2), modulo-vendedor:** **não desfazer**; terminar. O acréscimo só nos itens sai certo, e o PDF do cliente mostra a quantidade por embalagem.
2. **Filial de ponta a ponta:**
   - **modulo-vendedor:** grava o retrato da filial no recebimento, pela filial efetiva do cliente em `core.filiais@1` (`id` em minúsculas, os dois campos juntos), e a mostra no detalhe e nos PDFs;
   - **banco-dados:** `SEED_BOA_VISTA_DEMO = true` **só depois** de o vendedor gravar a filial e o CI confirmar;
   - **testes:** o critério da demo, \"um cliente de cada filial\".
3. **Envio da foto do PDV:** o engenheiro-apps expõe a porta de captura (`definirCapturaFotoPdv`), e o modulo-core liga o push do `cliente_foto` pela fila de arquivos (SDK com `perfis_leitura`/`apagarAoEnviar` já pronto).
4. **Correções do corretor:** todas, sem exceção (RD-0092, RD-0101 e o que vier).

**Diagnóstico na nuvem (T-0158):** continua desligado até o dono do produto aprovar as imagens que estão nos anexos.

O que não ficar verde e liberado até as 19h30 do PC é avisado ao dono do produto **pelo gerente, com o motivo**, antes do build.

## Pronto quando
BUILD PRONTO às 22h de Manaus, com a lista do que entrou.
