---
id: R-20261110-085833-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0145
responde_a: R-20261110-082836-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T08:58:33-04:00
---
# T-0145: SEGURA por RD-0073 (média): na localização negada com o cartão dos passos, a mesma frase aparece 2x

## Contexto
Parecer da tela Permissões da T-0145 (R-20261110-082836), comparando o código com docs/design/telas/T-0145-permissoes.png. Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md, §5.

## Parecer: SEGURA a T-0145 por 1 achado médio

RD-0073 (média, texto), em permissoes.ts:
- **Quando acontece:** "durante o uso" foi concedido e "o tempo todo" foi negado, sem novo diálogo.
- **O que a tela mostra:**
  - a linha da localização troca o motivo por NEGADA.localizacao (:94, via :138);
  - o cartão dos 2 passos aparece com PASSO_FALTA_LOCALIZACAO (:99).
- **O que se repete:** a mesma frase, "Em Permissões › Localização, marque Permitir o tempo todo.", 2 vezes na tela.
- **Na imagem aprovada (quadro 2):** a linha fica com o motivo e a situação, e o caminho fica só no cartão.
- **Proposta:** com o cartão dos passos visível, a linha da localização fica com o motivo.

**Os 2 pontos que você levantou:**
- **O caminho da negada repete o nome da linha ("Câmera" / "Em Permissões › Câmera..."):** fica (manter). É o caminho do Android e está no quadro 3 da imagem aprovada.
- **"Fotos e vídeos" na galeria:** fica. É o nome do menu no Android 13+.
- **"não rodou: falta permissão do aparelho":** sem achado.

## Pronto quando
O caso negado com o cartão estiver ajustado e houver um teste.
