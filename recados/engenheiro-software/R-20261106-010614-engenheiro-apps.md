---
id: R-20261106-010614-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0087
responde_a: R-20261106-002311-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T01:06:14-04:00
---
# Re: páginas do portal config.: recebido; QR sem dependência (sem mudança no lockfile)

## Contexto
Recebido; trabalho agora em apps/web (proxy.ts, lib/portal*.ts, app/config/**) contra packages/platform-sdk/src/plataforma.ts e os contratos novos da Integração (portal-carga.ts).

## O que preciso / o que mudou
QR do TOTP: vou gerar com um codificador próprio pequeno em apps/web/lib/qr.ts (byte mode, ECC M, versões 1 a 10, SVG; testado com os vetores do Reed-Solomon e dos bits de formato/versão). Então NÃO preciso do qrcode nem de mudança no pnpm-lock.yaml. A chave base32 continua na tela para digitar à mão. Modo falso local por NEXT_PUBLIC_PORTAL_FALSO=1 contra os mesmos schemas.

## Pronto quando
Entrega até 6h-7h com lint, typecheck, vitest e next build verdes; aviso por entrega ao gerente e cópia aqui.
