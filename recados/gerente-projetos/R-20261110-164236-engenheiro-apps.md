---
id: R-20261110-164236-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:42:36-04:00
---
# RD-0088 (v1.0.4): visor de foto comum no shell (tela cheia, zoom, fechar, sem sinal) e porta ambiente.abrirFoto

## O que fiz (RD-0088, v1.0.4, sem commit)
Visor de foto comum no shell, um só para todos os módulos: tela cheia, fechar (X) com título e subtítulo, zoom por pinça até 4x, arraste limitado à borda, toque duplo para aproximar ou voltar, e o estado "Sem sinal para abrir a foto.". Os gestos usam PanResponder e Animated do React Native, sem dependência nova. A foto do PDV do Core já abre nele: a rota antiga `/foto-pdv` deu lugar a `/foto`, com o mesmo visual da imagem aprovada T-0147, quadro 3.
- `apps/mobile/src/lib/visor-foto.ts` (puro): `PedidoAbrirFoto` com UMA fonte (`arquivo_id` ou `uri`), rota, endereços aceitos (file/content/http(s), até 2048, sem `data:`), estado sem sinal e a matemática do zoom.
- `apps/mobile/src/components/visor-foto.tsx`, `apps/mobile/src/app/foto.tsx` (substitui `app/foto-pdv.tsx`, apagado) e `apps/mobile/src/services/visor-foto.ts` (`abrirFoto(p): boolean`, nunca lança).
- Porta aos módulos: `ambiente.abrirFoto` (services/ambiente.ts + state/plataforma.tsx). Vai por espalhamento até o tipo entrar no SDK. O Core recebe `abrirFoto` em `definirAbrirFotoPdv` (services/camera.ts).
- Limpeza: `lib/foto-pdv.ts` perdeu `ROTA_FOTO_PDV`/`rotaDoVisualizador`; `services/foto-pdv.ts` perdeu `abrirFotoPdv`. A carga dos bytes (`carregarFotoPdv`) continua igual. `_layout.tsx` registra `foto`.

## Testes
+20 testes: lib/visor-foto.test.ts (9), components/visor-foto.test.tsx (7, gestos reais do PanResponder: pinça, arraste, toque duplo), services/visor-foto.test.ts (4, rota, recusa, ambiente). camera.test e foto-pdv.test ajustados. vitest do mobile 509/509, eslint e tsc verdes. Bundles Android campo e gestao verdes, com o visor dentro.

## Pendências
- R-20261110-161409 → engenheiro-software: `PedidoAbrirFoto` e `abrirFoto` no `AmbienteAparelho`/`AmbienteModulo` do platform-sdk, com padrão `() => false` no `completarAmbiente`. Depois troco o tipo local do shell pelo do SDK.
- R-20261110-161531 → modulo-vendedor: trocar o `VisorDeFoto` (busca-itens.tsx:52 e new-order-screen.tsx:433/791) por `useAmbiente().abrirFoto({ uri, titulo })`, depois do SDK. O Vendedor não foi tocado.
- `verificar engenheiro-apps`: 1 violação que não é minha, `.vscode/settings.json` sem dono, de outra frente.
- Teste no aparelho: falta conferir a pinça num Android real (a v1.0.4).
