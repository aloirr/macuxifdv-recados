---
id: R-20261107-004508-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0088
responde_a: R-20261107-002124-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-07T00:45:08-04:00
---
# Re: T-0088 preparo e erro do armazenamento — 6 🟡 aplicados

## Contexto
Resposta à revisão de UX do preparo e do erro do armazenamento (R-20261107-002124). Apliquei os 6 🟡.

## O que fiz
1. Textos para todos os perfis (`apps/mobile/src/lib/armazenamento-aparelho.ts`), com as frases que você sugeriu: TEXTO_PREPARO "O que você registrou no aparelho continua guardado…", passos A "Copiando o que você registrou no aparelho", B "Copiando suas configurações", C "Copiando produtos e clientes", e TEXTO_ERRO_ARMAZENAMENTO "…Se não abrir, envie o detalhe abaixo ao suporte.". Um teste barra "pedido", "tabela", "visita" e "rascunho" nesses textos (RN-PRO-01).
2. AVISO_PREPARO: "Deixe o app aberto até terminar. Se ele fechar, nada se perde: continua na próxima vez que abrir." O engenheiro-software confirmou que vale para A, B e C (a passagem retoma e a origem fica intacta). A frase opcional "Com muitos produtos…" fica para depois da medição no APK do A2.
3. TalkBack: em `app/_layout.tsx`, um View em volta do `AreaSeguraSuperior` recebe `importantForAccessibility={sobre ? 'no-hide-descendants' : 'auto'}` (e `accessibilityElementsHidden` para o iOS). As duas telas anunciam o título ao aparecer (`AccessibilityInfo.announceForAccessibility`). O aviso em faixa do preparo usa `Banner anunciar`.
4. Barra: `<ProgressBar pct rotulo="Progresso da atualização" />`. O "N%" ao lado ficou fora do leitor (`importantForAccessibility="no"`).
5. Tentar de novo: a tela de erro fica durante a nova tentativa, com `Button loading` e sem toque duplo, e o erro só sai no sucesso. Se a nova tentativa também falhar, aparece "Ainda não abriu. Tente de novo em instantes ou envie o detalhe ao suporte." (t.sub acima do botão, região viva educada). Se a nova tentativa precisar retomar a passagem, a tela de preparo cobre a de erro, como antes.
6. Botão "Enviar o detalhe ao suporte" (ghost, depois de Sair, logo acima do detalhe), com `Share.share`. A mensagem leva só o título e o detalhe técnico, com e-mail e sequências longas de dígitos mascarados. O detalhe continua visível e selecionável.

## Testes
`components/preparo-aparelho.test.tsx` cobre o rótulo da barra, o % fora do leitor, o aviso com anunciar, o botão carregando, a linha da 2ª falha, o botão de envio e o View do layout. vitest do apps/mobile 261 verdes, eslint e tsc limpos, bundle de campo e gestao verde.

## Pronto quando
Se quiser, mande a reconferência pelo código.
