---
id: R-20261031-220811-2-modulo-integracao
de: modulo-integracao
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0023
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:08:11+00:00
---
# Revisão da T-0023 e o que o Hub precisa expor (política de versão, chave por Conector, linhas inválidas, itens_faturados)

## Contexto
T-0023 entregue (Conector v1.1.0, Oracle, contratos aditivos que continuam v1). Peço revisão do Conector e dos contratos/domain tocados, e deixo a lista do que o HUB (apps/api e modules/integracao/api, fora do meu escopo e ainda sem rotas) precisa expor. Detalhes em docs/modulos/integracao/conector.md §9 e desenho.md §11.1.

## O que preciso
A) Revisão (sem 🔴): modules/integracao/contracts/{conector.ts,lote.ts,pedido.ts,eventos.ts}; modules/integracao/domain/estados.ts (transicionarRetornoPedidoErp, chaveNotaRetorno - único toque no domain, só para o item da 2ª nota parcial); apps/conector/** (principalmente src/erp/oracle.ts, src/politica.ts, trocar-chave em src/comandos.ts, src/mapeamento.ts).
B) O que o Hub precisa expor/fazer:
1. Política de versão do Conector: na RESPOSTA do POST /integracao/v1/sinal devolver RespostaSinal { politica_versao?: { versao_minima, versao_recomendada, mensagem?, pacote?{versao,url?,sha256,assinatura?,chave_publica_id?} } } (por tenant/Conector). Receber SinalConector { conector_id, versao_conector, versao_contrato, em, fila[], entidades[], parado_por_versao? } e guardar versão/último sinal. Opcional: recusar com 426 quem enviar lote abaixo da mínima. Telas no BKO: cadastro da política e destaque de Conector parado por versão.
2. Chave por Conector: cadastro de Conector (identificador conector_id), geração da chave (mostrada uma vez, só hash guardado - ChaveConectorCriada), rotação com janela anterior_valida_ate, revogação; autenticar por Authorization: Bearer <chave> + cabeçalho X-Macuxi-Conector-Id, escopo fixo integracao.v1 (a chave não abre outra rota), tenant e licença do módulo. Constantes CABECALHO_CONECTOR_ID/CABECALHO_CONECTOR_VERSAO em contracts/conector.ts. Isso afeta o desenho de conector/credencial (banco-dados): pedir a tabela/colunas.
3. Linhas inválidas: LoteEnvelope.linhas_invalidas (até 500) e linhas_invalidas_omitidas, conector_id, versao_conector (todos opcionais). Gravar como lote_linha_erro com origem 'conector' (sem valor), contar em com_erro, resultado concluido_com_erros; devolver em LoteResultado.erros[].origem = 'conector' (indice = posição em linhas_invalidas) e invalidas_omitidas. registros continua exigindo >= 1 linha (RN-INT-01).
4. itens_faturados no POST /pedidos/{uuid}/retorno: [{ sequencia, produto_external_id?, quantidade (int>0), valor_cents? }], só em faturado_parcial/faturado_total; resolver o produto_id interno pela sequencia do pedido enviado; validar sequência existente e soma faturada <= quantidade enviada (R-20261031-123752 item 3, que NÃO fiz); repassar a vendedor.pedido.faturado@1; integracao.pedido.retorno_erp@1 agora repete itens_faturados (opcional).
5. Idempotência do faturamento (RN-INT-08): aplicar transicionarRetornoPedidoErp(estadoAtual, {status, nota}, notasJaAplicadas); faturado_parcial com nota (número+série) diferente é fato novo e publica; mesma nota é repetida: true. Guardar as notas aplicadas por pedido (pedir ao banco-dados).
6. Dependências/pnpm: oracledb 26 (thin) em apps/conector; pnpm run falha com ERR_PNPM_IGNORED_BUILDS enquanto pnpm-workspace.yaml não decidir o build de oracledb (sugestão: oracledb: false em allowBuilds, thin não precisa do script). pnpm-lock.yaml ficou alterado no meu working tree por pnpm (aditivo) - mesmo conteúdo do PR do lockfile.

## Pronto quando
Revisão sem 🔴 devolvida em recado; as rotas do Hub (itens 1-5) entram na tarefa da API de integração com estes contratos como fonte da verdade.
