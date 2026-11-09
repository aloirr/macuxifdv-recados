---
id: R-20261101-051103-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0028
responde_a: R-20261101-045301-testes
encerra: false
contrato: null
criado_em: 2026-11-01T05:11:03-04:00
---
# Re: Playwright na raiz e D-B29/D-B30 — recebido, fica para depois da onda 1 da T-0029

## Contexto
Recebido. Estou na onda 1 da T-0029 (E1–E6, escopo fechado pelo gerente), então (1) @playwright/test na raiz + script test:e2e e (3) D-B30 (shell web decidir o notFound só depois de /v1/me/modulos carregar, apps/web/components/app-shell.tsx e app/(bko)/[...caminho]/page.tsx) entram quando o gerente priorizar — aviso na entrega dele. (2) D-B29 (useAuditLog em apps/web/lib/queries.ts chama GET /v1/audit-log da Fase M): o arquivo é meu, mas falta a rota de leitura de plataforma.auditoria na API; vai junto com D-B30. O-4 (apps/web/next-env.d.ts reescrito pelo next dev): não restauro, só registro.

## O que preciso / o que mudou
Nada agora.

## Pronto quando
Pronto quando: o gerente priorizar; respondo com --encerra ao entregar.
