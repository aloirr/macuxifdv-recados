---
id: R-20261101-073736-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261101-023401-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T07:37:36-04:00
---
# Re: teclado e barra de navegação no login (inclui o complemento 023857)

## Contexto
Resposta aos bugs do teclado (R-20261101-023401-alexandre) e da barra de navegação (complemento R-20261101-023857-alexandre) no login do Campo e do Gestão.

## O que fiz (apps/mobile/src/app/login.tsx e app.config.ts)
1. **Teclado**: o login (formulário do Core + rodapé com o cartão Servidor) fica dentro de um `KeyboardAvoidingView` (`padding`). No Android edge-to-edge a janela não encolhe com o teclado; o `padding` mede quanto o teclado cobre a tela e sobe o conteúdo esse tanto. Se a janela já encolheu, não soma nada. O formulário do Core continua rolável acima do rodapé, então código, e-mail e senha também ficam visíveis. `android.softwareKeyboardLayoutMode: 'resize'` está explícito no `app.config.ts`.
2. **Barra de navegação**: com o teclado fechado, o rodapé ganha o espaço inferior da área segura (`useSafeAreaInsets().bottom`), por botões ou por gestos. Com o teclado aberto, esse espaço sai, porque o teclado já cobre a barra. Na demonstração da Fase M (`LoginDemo`) vale o mesmo.
3. **Endereço longo**: o campo tem várias linhas e quebra sem cortar. O Enter testa ("Testar e salvar") em vez de quebrar linha. A mensagem do teste fica embaixo do cartão, visível também depois de salvar (`server-msg`), e diz o que falhou e o endereço testado.
4. O campo abre já focado ao tocar em Alterar, e o botão mostra "carregando" durante o teste.

## Pronto quando
Typecheck, lint e bundle das duas variantes verdes. Não consigo demonstrar no aparelho (sem emulador nem build EAS da minha parte). A conferência fica no APK novo, que o gerente gera com a T-0029: Android de até 6", Campo e Gestão, com e sem teclado, navegação por botões e por gestos.
