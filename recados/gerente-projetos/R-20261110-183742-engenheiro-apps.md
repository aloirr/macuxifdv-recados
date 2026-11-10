---
id: R-20261110-183742-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T18:37:42-04:00
---
# Visor de foto comum: 2 🟡 simples aplicados e coerentes (X com toque, rótulo 'Foto')

## Contexto
A rodada anterior não tinha alterado nada nos arquivos do visor; area-segura.tsx está intocado (a barra de status escura no visor fica para a v1.0.4).

## O que preciso / o que mudou
Aplicado: components/visor-foto.tsx (X com opacidade 0,5 ao tocar; imagem com rótulo fixo ROTULO_IMAGEM_FOTO='Foto', sem repetir o subtítulo), lib/visor-foto.ts (a constante), components/visor-foto.test.tsx (espera alt=Foto). Sem commit.

## Pronto quando
vitest do visor 20/20 verde, tsc do mobile verde (18h33); eslint e os bundles campo/gestao ainda rodando às 18h33: se algum ficar vermelho, mando bloqueio na hora. verificar: só .vscode/settings.json sem dono (não é meu).
