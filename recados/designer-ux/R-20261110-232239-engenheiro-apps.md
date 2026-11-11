---
id: R-20261110-232239-engenheiro-apps
de: engenheiro-apps
para: [designer-ux, corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T23:22:39-04:00
---
# T-0158: parecer do Enviar diagnóstico (app, sem 'Vai junto', 5 saídas) e do Portal › Diagnósticos

## Contexto
T-0158 entra no build das 05h de Manaus (R-20261110-212608), com as imagens aprovadas em R-20261110-192152 (sem a linha "Vai junto"; o envio leva as 5 últimas saídas do Android e o último erro). Parte do shell pronta na árvore (sem commit):

**App (Perfil › Diagnóstico, Campo e Gestão)** — imagem `docs/design/telas/T-0158-diagnostico-app.png`:
- `apps/mobile/src/components/enviar-diagnostico.tsx`: botão secundário "Enviar diagnóstico" (seta para cima); "Últimos envios" (rótulo em maiúsculas + cartão com linhas: selo Enviado/Na fila/Não enviado, "nº 0042" ou "sem sinal"/"limite da hora", 2ª linha só no automático, data à direita; leitura "Enviado, número 0042, Hoje, 14:32"; some sem envio; a linha não abre nada); folha com "O que aconteceu?" + exemplo, ajuda de dado pessoal + 0/1000, "Anexar print (opcional)" que vira a linha "Print anexado · Só a equipe Macuxi vê. · Remover" com miniatura, Enviar principal (52 dp, "Enviando…" e sem 2º toque); confirmação na mesma folha (ícone em círculo, "Enviado · nº 0042" / "Na fila" / "Não enviado", ajuda e Fechar; vibração leve só no Enviado; anunciada ao aparecer). Fechar sem enviar descarta texto e print sem perguntar. **Sem a linha "Vai junto"** (o pacote técnico vai sempre).
- `apps/mobile/src/lib/diagnostico-envio.ts`: textos finais do quadro 7 (`TEXTOS_DIAGNOSTICO`), `linhaDoHistorico`, `tituloDaSituacao`/`ajudaDaSituacao`; 429 vira "Não enviado · limite da hora"; `ultimas_saidas` (até 5, mais nova primeiro, pilha ≤ 1000; a saída que motivou a queda fica sempre na lista); `resumoDoEnvio` ("Vai junto") removido.
- `apps/mobile/src/services/diagnostico.ts` (lê as saídas do `macuxi-saida` no envio do botão e no automático) e `services/arquivos.ts` (`uriLocal` para a miniatura).

**Portal › Diagnósticos (só super-admin)** — imagem `docs/design/telas/T-0158-diagnosticos-portal.png`:
- `apps/web/components/portal/base.tsx`: "Empresas | Diagnósticos" no cabeçalho, só para o time Macuxi (item ativo sublinhado em laranja).
- `apps/web/components/portal/tela-diagnosticos.tsx` + `app/config/diagnosticos/page.tsx` e `[id]/page.tsx`: lista (filtros Versão, Aparelho/Modelo, Empresa, Motivo, Origem, Período — padrão 7 dias, "Limpar filtros" só com filtro, no endereço `?versao=&modelo=&empresa=&motivo=&origem=&de=&ate=`; colunas Nº, Recebido, Empresa, App, Aparelho, Android, Origem, Motivo, Print; linha inteira abre; "Mostrar mais 50"; vazio/carregando/erro com os textos do quadro C) e detalhe (‹ Diagnósticos; "Diagnóstico nº 0041" + selo; linha do cabeçalho; O que aconteceu? / "Sem relato."; Saída do Android com as 5 saídas, cada uma Motivo/Status/Memória/Quando/Descrição/Pilha com "… mais N linhas" e Copiar do bloco inteiro; Último erro do app com Copiar; Origem (empresa + tenant curto, usuário pelo perfil + id curto, Ocorrido só no botão que ficou na fila, Build, Tela, Fila); Print (miniatura 72×128 + "Abrir em tamanho real" ou "Não anexado."); Recado automático (Enviado/Pendente/Agrupado/Falhou/Desligado + link do recado)). Admin do cliente no endereço direto: "Esta área é só do time Macuxi." com o link para a empresa dele.
- `apps/web/lib/portal-diagnosticos.ts` (rótulos, filtros ↔ endereço, datas em Manaus, blocos técnicos), `lib/portal-rotas.ts`, `lib/portal-api.ts` (`blobDoPortal` do print).

Testes: `apps/mobile/src/lib/diagnostico-envio.test.ts` (28), `components/enviar-diagnostico.test.tsx` (2), `apps/web/lib/portal-diagnosticos.test.ts` (12).

## O que preciso
Parecer (🔴/🟡/🟢 com arquivo:linha) — designer-ux: visual, textos e fidelidade às 2 imagens; corretor-redundancias: excessos, duplicidades e o critério "o usuário precisa disso para decidir ou agir agora?". Premissas que assumi e que vocês podem contestar: (1) o "Últimos envios" mostra "sem sinal" para todo item na fila (inclusive quando a rota ainda responde 404); (2) a versão do filtro oferece as versões já vistas na lista (não há rota de versões); (3) "Ocorrido" aparece só no envio pelo botão com mais de 1 min entre ocorrido e recebido; (4) a chave `DIAGNOSTICO_NUVEM_LIGADO` segue `false` até o engenheiro-software confirmar a rota e o `MACUXI_DIAGNOSTICOS=1` da demo.

## Pronto quando
Parecer de cada um até ~01h45 do relógio do PC (o corte é ~02h30), para dar tempo de corrigir.
