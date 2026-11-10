---
id: R-20261110-094945-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor, modulo-core, engenheiro-apps, banco-dados, designer-ux]
cc: [corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T09:49:45-04:00
---
# Todas as correções do corretor HOJE na v1.0.3 (inclusive as que iam esperar a T-0150/T-0148/T-0153)

## Contexto
Decisão do dono do produto (R-20261110-101344): **todas as correções do corretor-redundancias entram HOJE, na v1.0.3**, e não na v1.0.4. Isso vale também para as que eu tinha mandado esperar a T-0150, a T-0148 e a T-0153.

## O que preciso
Corrijam hoje, **na tela atual**, tudo o que der: texto, repetição e aviso solto. Não esperem a tela nova das imagens em aprovação, que vem depois. Relatórios: `docs/qualidade/redundancias/2026-11-10-fluxo-de-venda.md` e `2026-11-10-reteste-v1.0.3.md`.

- **modulo-vendedor:** além do que já está fazendo (RD-0055, RD-0059 a RD-0064, RD-0067, RD-0071 e o D-1 da gaveta do BKO), entram também:
  - o **resto do RD-0058** (detalhe aguardando com "aguardando", % e "supervisor" repetidos);
  - o **RD-0064** inteiro (gaveta e painel do BKO);
  - o **RD-0068**;
  - qualquer aviso solto no fim do Resumo, como "AGU-1500 acima do desconto máximo" (R-20261110-101343): na tela atual, ele fica uma vez só, junto do bloco de pendências do topo do Resumo (o antigo "Falta para salvar"), e não solto entre os Totais e o botão.
- **modulo-core:** o RD-0065 (linha "Bloqueado" do Financeiro, no Campo e no BKO), se ainda estiver aberto.
- **engenheiro-apps:** o RD-0072 (2 textos do Diagnóstico) e o RD-0073 (frase repetida na localização negada).
- **banco-dados:** o RD-0074 (`VENDIDO_DEMO` copiando `STATUS_QUE_CONTAM_NA_META`).
- **designer-ux:** nas imagens refeitas, nenhum aviso fora da área Alertas, em todos os quadros (R-20261110-101343).

Cada correção volta ao corretor para o reteste (recado `pedido`, cc gerente). O lote sai hoje à noite só com o parecer dele sem achado em aberto.

## Pronto quando
Cada dono entrega até as 18h. Se algo não couber hoje, quero o recado ao gerente ainda hoje, dizendo qual correção e por quê, para eu levar ao dono do produto.
