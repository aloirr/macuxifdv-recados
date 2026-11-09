---
id: R-20261105-071459-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0008
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:14:59-04:00
---
# Builds preview Campo e Gestão do 68ea7d9 (lote E, expo-sqlite + tela de medição) disparados

## Contexto
Pedido do dono do produto (R-20261105-054146): build de preview do main 68ea7d97a598c9cfef56e98a815fbc6662ac86e4, mesmo do deploy da demo. Worktree limpo C:\macuxifdv-check nesse commit; pnpm install --frozen-lockfile verde (lock com expo-sqlite 57.0.4, resolvido em node_modules/expo-sqlite); bundles Android das duas variantes verdes (expo export, preview; Campo 2007 módulos, .hbc 5,7 MB). Plugin nativo conferido: expo config da variante resolve ['expo-sqlite', {enableFTS: true}] na lista de plugins, então o build é nativo (prebuild + autolinking), não só JS. A Expo registrou gitCommitHash 68ea7d97a598c9cfef56e98a815fbc6662ac86e4 nos dois builds (status IN_PROGRESS ao enviar).

## O que preciso / o que mudou
Campo (campo-preview, br.com.macuxi.campo): https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/c6277df9-ced1-43d0-a471-bcab4c2da9e9 ; Gestão (gestao-preview, br.com.macuxi.gestao): https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3db52299-4d9d-48c2-9c33-ea9b4deb1689 . Como abrir a tela de medição (T-0008 P7, só builds preview/desenvolvimento): 1) instalar o APK e entrar normalmente (servidor da demo e login); 2) ir à aba Perfil; 3) rolar até o fim, onde aparece 'Macuxi Campo · versão 1.0.0'; 4) tocar 7 vezes seguidas nesse texto, sem passar de 3 s entre os toques (pausa maior zera a contagem); 5) abre a tela 'Diagnóstico de carga': tocar 'Rodar medição' (20 mil SKUs, 500 clientes, busca p95) e aguardar; 'Rodar de novo' repete.

## Pronto quando
Pronto quando os dois builds terminarem FINISHED na Expo e o dono do produto medir no aparelho. Nada alterado no repo, sem commit/push, sem segredo em log. Pendência: nenhuma minha; se algum build falhar, eu investigo pelo log da Expo.
