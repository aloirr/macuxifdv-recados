---
id: R-20261110-083517-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre, testes, engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:35:17-04:00
---
# T-0145 parte técnica no shell: permissões obrigatórias conferidas a cada abertura, nada sincroniza sem elas; tela simples até a imagem aprovada

## O que fiz (T-0145, parte técnica)
A tela segue o desenho em aprovação do designer-ux (`docs/design/permissoes-e-fotos-pdv.md` §1 e `telas/T-0145-permissoes.png`), em versão simples, ainda sem os ícones das linhas.
- **Regras** (`apps/mobile/src/lib/permissoes.ts`, puras, 10 testes):
  - Campo: notificações, localização o tempo todo, câmera e fotos/galeria; Gestão: só notificações;
  - situação por linha: Permitida, Falta ou Negada; na negada, o motivo vira o caminho nas configurações;
  - **um botão**: pede a próxima que falta, na ordem da tabela, e vira "Abrir configurações" depois de 2 recusas (`canAskAgain` falso) e no passo 2 da localização no Android 11+;
  - cartão dos 2 passos ("Durante o uso" ✓ / "Em Permissões › Localização, marque Permitir o tempo todo.").
- **Aparelho** (`services/permissoes.ts`):
  - leitura: expo-notifications, expo-location (durante o uso e o tempo todo) e expo-image-picker (câmera e galeria; no Android 13+ a galeria não pede permissão);
  - pedido: um passo por toque;
  - `Linking.openSettings()`.
- **Bloqueio** (`state/plataforma.tsx` e `app/_layout.tsx`):
  - as permissões são lidas a cada abertura, junto com a sessão, antes do login, da carga e das abas. Sem todas, o Gate mostra **só** a tela de permissões, sem rotas montadas;
  - `executarSync` e o agendador não sincronizam;
  - a tarefa sem tela pula com "falta permissão do aparelho" (`lib/segundo-plano.ts`, motivo `sem-permissao`);
  - na volta das configurações a tela relê sozinha e, com todas concedidas, segue. Com o app já liberado, a conferência fica para a próxima abertura: retirar uma permissão no meio do uso não desmonta o pedido aberto (critério 5: "bloqueia na próxima abertura");
  - Voltar do Android fecha o app.
- **app.config**:
  - `POST_NOTIFICATIONS`;
  - expo-location com `isAndroidBackgroundLocationEnabled` só no Campo. O plugin também põe `FOREGROUND_SERVICE` e `FOREGROUND_SERVICE_LOCATION`, que serão usados pelo tracking;
  - expo-image-picker com o texto de fotos (galeria liberada; microfone continua bloqueado).
  - `expo config` conferido: o Campo tem `ACCESS_BACKGROUND_LOCATION`, o Gestão não.

## Arquivos
- `apps/mobile/src/lib/permissoes.ts` + `.test.ts`
- `apps/mobile/src/services/permissoes.ts`
- `apps/mobile/src/components/tela-permissoes.tsx`
- `apps/mobile/src/state/plataforma.tsx`
- `apps/mobile/src/app/_layout.tsx`
- `apps/mobile/src/lib/segundo-plano.ts` + `.test.ts`
- `apps/mobile/src/services/segundo-plano.ts`
- `apps/mobile/app.config.ts`

## Pendências
1. Imagem aprovada pelo Alexandre (critério 1): depois dela, ícones e acabamento da tela, sem mudar a lógica.
2. Link "Como usamos a localização": espera o aviso da base LGPD do engenheiro-software (critério 7).
3. Critérios 2 a 5 no aparelho (testes): exigem APK novo, porque as permissões novas são nativas.
4. Parecer do corretor-redundancias e revisão de UX pedidos.

## Testes
- mobile: tsc do shell sem erro, eslint verde (src, index.ts e app.config.ts), vitest 44 arquivos / 433 testes verdes (10 novos em `permissoes`, 1 da tarefa sem tela);
- bundles campo (2161 módulos) e gestao (2162) verdes;
- `expo config` das 2 variantes conferido.
- Recados: designer-ux R-20261110-082820, corretor-redundancias R-20261110-082836.
- Sem commit (seu).
