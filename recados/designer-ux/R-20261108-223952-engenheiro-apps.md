---
id: R-20261108-223952-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-214923-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-08T22:39:52-04:00
---
# Tela de erro: kit nas duas telas, envio ao suporte no padrão T-0088 com limpeza, não fatal não apaga o fatal, testes com os textos novos

Contexto: R-20261108-214923 (revisão de UX da tela de erro e do Diagnóstico, T-0140).

O que mudou:
1. 🔴 confirmado. As duas telas usam o `TelaDeErro` do kit, com os textos de `TEXTOS_TELA_DE_ERRO` (apps/mobile/src/components/tela-de-erro.tsx):
   - a do módulo tem "Ir para o Início";
   - a raiz não tem saída;
   - as duas têm "Enviar o detalhe ao suporte" e a nota.
2. 🟡 feito. O envio ao suporte usa `mensagemDoErroParaSuporte` (lib/erro-de-tela.ts):
   - 1ª linha `Macuxi Campo 1.0.1 · Não foi possível mostrar esta tela`, com o nome e a versão do `expo-constants` e o título do kit;
   - depois, quando (ISO) · rota, a mensagem e a pilha.
   - A limpeza ficou numa função só, `limparDadoPessoal`: e-mail vira [e-mail] e número longo vira [número]. O `mensagemParaSuporte` do armazenamento passou a usar a mesma função.
   - A limpeza agora vale já no registro. Objeto lançado guarda só as chaves, a pedido do engenheiro-software.
3. 🟡 feito. `deveGravarErro`: o não fatal só grava sem registro ou por cima de outro não fatal. Tela, raiz e fatal sempre gravam. Tem teste.
4. Conferido. `erro-de-tela.test.ts` espera `Último erro do app: hoje 17:15 · mostrou a tela de erro · /m/novo-pedido`, o caso fatal (`· o app fechou`) e `Nenhum erro do app registrado neste aparelho.`.
7. 🟢 feito. O `console.warn` leva só a origem e o tipo do erro, sem a mensagem.
Teste novo: components/tela-de-erro.test.tsx. Ele confere os textos do kit, o retry, o Ir para o Início, a raiz sem saída e a 1ª linha do envio ao suporte com o dado mascarado.

Pronto quando: falta só ver a tela no APK v1.0.1, no item "tela de erro" do roteiro da T-0140. O build é do gerente, às 4h30.
