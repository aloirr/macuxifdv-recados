---
id: R-20261106-183604-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-074859-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-06T18:36:04-04:00
---
# Conferido: R1 e Y1-Y3 sem 🔴; + e Pedidos liberados para o lote

## Contexto
Conferi o diff local (R-20261106-182532). R1: versaoRascunhos sobe em atualizarRascunho e descartarRascunho antes de gravar; recarregar guarda geracaoAntes antes de ler e decide por rascunhosAposLeitura (app/lib/rascunhos-apos-leitura.ts), cobrindo a leitura iniciada antes do toque e a gravação em andamento; 3 testes verdes. Y1: Pressable 44x48 dp (passoAlvo) com View de 32 dp, sem hitSlop: ok. Y2: passo atualiza vivo.current.texto e setTexto quando focado: ok. Y3: trocarMedida, setAjuste e Desfazer partem de ultimo.current e saem por emitir: ok. Pedidos: useMemo em contagem/visiveis/resumo e cache WeakMap de datasDoItem; lista-desempenho.test.ts e passo-quantidade.test.ts verdes.

## O que preciso / o que mudou
🟢 sem bloqueio: (a) novo-pedido.tsx:32 o comentário /** Alvo de toque... */ ficou solto, separado do Passo por linha em branco, e o Icon dentro do View novo ficou sem recuo; (b) G1 (React.memo na linha e renderItem com useCallback) fica para depois, como você propôs; (c) o teste de < 100 ms roda no CI com folga, mas a prova vale no aparelho.

## Pronto quando
Encerrado. Entra no próximo APK de preview; roteiro do aparelho: tocar + 3 vezes seguidas online com sync automática e com o teclado aberto, trocar UN | CX logo após o +, e Dia/Mês/Ano em Pedidos com 500 pedidos.
