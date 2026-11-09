---
id: R-20261106-052236-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-050553-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-06T05:22:36-04:00
---
# Conferência do R1 (convites seguram a saída do portal) e Y1/Y2; demais 🟡 aplicados

## Contexto
Correção da revisão R-20261106-050553 (cartão Equipe e /convite, T-0087 fatia E, RN-CORE-31). O R1 está corrigido. Junto foram Y1, Y2, Y3, Y4, Y5, Y6, Y7, Y8 (sem o `perfil` do Core), Y9, Y10 e Y11.

## O que preciso
Que você confira o R1 pelo código (e o Y1/Y2, que mexem junto).

R1, onde está cada parte:
- **Pendência de saída:** apps/web/lib/portal-saida.ts. Guarda o que aparece uma vez e ainda não foi baixado (`segurarSaida`, `baixarPendencias`, `descartarPendenciasDeSaida`) e decide o aviso antes do fim da sessão (`avisoDeFimDaSessao`).
- **cartao-equipe.tsx:**
  - os convites da gravação ficam em `convites` (estado próprio), separado de `resposta`;
  - escolher outro arquivo, conferir de novo ou importar de novo não os apaga;
  - uma gravação nova, com convites ainda não baixados, junta os novos aos anteriores (`juntarConvites`);
  - `useSegurarSaida` registra a pendência enquanto não baixa.
- **base.tsx (MolduraPortal):** a marca, o "← Empresas" e o "Sair" abrem o Dialog de packages/ui antes de sair.
  - Título: "Baixar os convites antes de sair?"
  - Texto: "Os links dos convites aparecem só nesta tela. Se sair agora, eles somem e cada pessoa vai precisar de um link novo pelo Renovar."
  - Botões: [Cancelar] [Sair sem baixar] (perigo) [Baixar convites e sair] (principal).
  - Ctrl/Cmd+clique abre outra aba e não pergunta.
  - Desvio do seu texto: o principal se chama "… e sair" porque baixa e já segue a saída pedida.
- **base.tsx (GuardaPortal), fim da sessão:**
  - O `beforeunload` saiu do cartão e foi para a guarda (fechar a aba e F5).
  - Aviso antes do fim, que o relógio local da sessão já calcula:
    - faltam 10 min ou menos para o teto de 8 h: "Sua sessão termina em N min", com [Agora não] e [Baixar convites];
    - token perto do fim sem uso recente: "… por falta de uso", com [Continuar na sessão] (renova) e [Baixar convites].
  - Se a sessão vencer mesmo assim, a tela não vai direto para /entrar: fica o Dialog "Sua sessão terminou", com [Entrar de novo sem baixar] (perigo) e [Baixar convites]. Baixar é local e não usa a rede. Depois de baixar, vai ao login.

Y1 e Y2:
- **Y1:** "Renovar" de convite ainda válido abre o Dialog "Gerar link novo para {nome}?" ("O link enviado antes deixa de valer."), com [Cancelar] e [Gerar link novo]. Convite vencido renova direto.
- **Y2:** os links renovados ganharam "Baixar links renovados (.csv)", gerado na tela (`csvDosConvites`, nas mesmas colunas do Core), e entram na mesma pendência de saída. Com novos e renovados ao mesmo tempo, o botão vira "Baixar os links".

Os outros 🟡:
- **Y3:** "Nenhum convite aguardando a senha."
- **Y4:** com convites por baixar, "Importar equipe" fica secundário e o principal é "Baixar convites". Depois de baixar, aparece o secundário "Baixar de novo (.csv)".
- **Y5:** "tira: Vendedor, Pesquisa", pelo `ROTULO_MODULO`.
- **Y6:** dois parágrafos, começando pela ação, e "da coluna Vale até".
- **Y7:** a mensagem única cita o link incompleto (lib/convite.ts).
- **Y8:** o caminho do celular vem primeiro, num Notice info, com Campo (vendedor e promotor) e Gestão (supervisor e gerente). O botão secundário é "Entrar no Backoffice (computador)". Sem `perfil` no `AceitarConviteResposta`: o schema é `.strict()` e é do modulo-core; não pedi, fica opcional.
- **Y9:** texto trocado.
- **Y10:**
  - erros ligados ao campo por `aria-describedby` em tela-convite (`convite-regra convite-erro-senha` e `convite-erro-confirmar`), no `Campo` do portal e no login;
  - o foco vai ao primeiro campo com erro.
- **Y11:** `accent-accent`; no login, vindo do convite, o foco vai à Senha.

Lacuna conhecida: o botão Voltar do navegador (navegação do Next) não passa pelo Dialog. Interceptar o `popstate` no App Router não é confiável. Os pontos que você listou estão todos cobertos.

## Pronto quando
Você responder com 🟢 no R1 (e no Y1/Y2), ou com o que falta.
