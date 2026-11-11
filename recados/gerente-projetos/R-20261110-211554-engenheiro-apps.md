---
id: R-20261110-211554-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:15:54-04:00
---
# Roteiro Campo-Demo-v1.0.3 / Gestao-Demo-v1.0.3 e versão 1.0.3

## Contexto
Pedido do dono do produto (R-20261110-205123, item engenheiro-apps): o roteiro da v1.0.3 para o aparelho, cobrindo tudo o que entra no lote, e o aumento da versão.

## O que foi feito
- **apps/mobile/docs/roteiro-campo-demo-v1.0.3.md** (novo, no padrão do v1.0.2). Seções:
  - A: por cima da v1.0.2 e a carga inicial 3 vezes (1 por cima e 2 com Limpar dados), com o print de Perfil › Diagnóstico ("Build instalado", "Saídas do app (Android)" só com linhas "(normal)", "Último erro do app") (T-0144);
  - B: permissões do Campo e do Gestão, 2 passos da localização, 2 recusas levam a "Abrir configurações", retirar uma permissão bloqueia, Android 11/12 com a galeria (T-0145);
  - C: ficha sem repetição; "Foto do PDV" desligado e ligado; tem/falta; "Adicionar" com câmera e galeria em modo avião; "Na fila" → "Tem"; cadeado só onde há foto; tipo novo pelo BKO (T-0146/T-0147);
  - D: Alertas, busca, foto ao tocar, popup, "No pedido"/"Ver itens", máximo e sem estoque só como orçamento, alçada só na pergunta, Resumo e detalhe em tabela iguais ao PDF, Corrigir sem reprecificar, lista de Pedidos limpa com selo único e sem número na aba (T-0148/T-0150/T-0151/T-0153);
  - E: Mercadinho São Jorge (Manaus) × Padaria Trigo Fino (Boa Vista): preço 5% acima, estoque CD-BVB com CAF-500 zerado, filial no detalhe, no PDF e no BKO (T-0149, conforme R-20261110-202456);
  - F: faturados, devolução do p02 (6 LEI-1L, NFD 000002315) e o faturado parcial da Camila no Gestão (T-0155);
  - G: versão no Perfil;
  - "O que NÃO está": Enviar diagnóstico (v1.0.4), envio automático (v1.0.5), BKO › Diagnósticos (T-0158), registro de quem abriu, barra escura do visor, Telegram.
- **apps/mobile/scripts/eas/versao.json**: 1.0.2 → **1.0.3**. O versionCode não fica no repositório: é remoto, com autoIncrement no EAS, e sobe sozinho no build.
- **apps/mobile/scripts/eas/eas.test.ts**: só o comentário "hoje 1.0.3". O teste não fixa o número.

## Testes
vitest scripts/eas: 20/20 verdes. `verificar engenheiro-apps`: a única violação é .vscode/settings.json, que não é meu, não tem dono e veio de outra sessão.

## Premissas e pendências
1. A seção E supõe a seed de Boa Vista ligada (R-20261110-202456) e a coluna filial do SQLite (R-20261110-200246) no lote. Se uma das duas ficar fora, a seção E sai.
2. As fachadas da seed não têm os bytes no armazenamento da demo (pendência no fotos-pdv.ts). O roteiro manda validar com a fachada enviada no teste.
3. Os nomes dos clientes e dos produtos vêm do seed atual.
4. O commit do lote fica para o recado BUILD PRONTO.
5. Sem commit nem push.
