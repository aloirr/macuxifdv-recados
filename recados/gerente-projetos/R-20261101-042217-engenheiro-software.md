---
id: R-20261101-042217-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:22:17-04:00
---
# T-0029 passo 1: desenho da fatia do pedido, ADRs 0011 e 0012 (propostas) e pedidos aos donos

## Contexto
T-0029, passo 1 (desenho). Pedido do Alexandre R-20261101-020623 item 2. Nada implementado; só desenho, ADRs e registro de contratos.

## O que fiz
- Desenho: `docs/desenho/T-0029.md` (push `receber`, aprovação/rejeição, perfis e shells, telas Campo/Gestão/BKO, PDF, schema e base demo, plataforma E1–E8, teste ponta a ponta, ondas, fora do escopo, premissas P-1..P-6).
- ADR 0011 (proposta): a aprovação mora no **Vendedor** (estado, alçada, auditoria e eventos são dele; o Gestor fica com fila e prazo em dias úteis na Sprint 6, por eventos, e já diz que a decisão é da API do Vendedor). Dentro da alçada o pedido vira `approved` na hora (só aprovado vai ao ERP, RN-INT-08, e conta na meta, RN-CORE-21); acima, `pending_approval` com o nível. Banco continua com `ORDER_STATUSES`; eventos no vocabulário RN-VEN-30. Decidir é online; lista e detalhe são offline.
- ADR 0012 (proposta): **consultas entre módulos** (API e aparelho) para o Vendedor obter o preço da tabela do cliente (`catalogo.precos_cliente@1`) e o cadastro (`core.cadastro_resumo@1`) sem ler outro schema nem importar `domain` alheio. Era a lacuna estrutural: hoje não existe schema nem pull de preço, e o servidor não tem como revalidar o preço.
- PDF gerado **no cliente** (expo-print no Campo e no Gestão; impressão do navegador "Salvar como PDF" no BKO), um gerador puro no `domain` do Vendedor; sem Chromium no servidor.
- `.coord/contratos/eventos.md`: `vendedor.pedido.aprovado@1` planejado + nota de payloads.
- Recados (todos "não começar antes do OK do gerente"): banco-dados R-20261101-042135, modulo-vendedor R-20261101-042136, modulo-catalogo R-20261101-042137, modulo-core R-20261101-042138, testes R-20261101-042138-2; avisos ao modulo-gestor R-20261101-042139 (nada a fazer) e ao modulo-integracao R-20261101-042140 (aprovado@1; ADR do Hub vira 0013).

## Decisões que preciso de você (premissas §15)
P-1 "enviado" = aprovado automático dentro da alçada (rótulo "Aprovado (dentro da alçada)"); P-2 edição de pedido já aceito fora da fatia (duplicar); P-3 analista decide só o nível analista; P-4 preço pela data do aparelho, no máximo 7 dias para trás; P-5 BKO salva o PDF pela impressão do navegador; P-6 crédito fora da fatia. Também: a fatia passa a envolver **modulo-catalogo e modulo-core** (pequenos, onda 2), além de banco-dados, modulo-vendedor e testes; ondas na §13 com no máximo 3 agentes ao mesmo tempo.

## Pronto quando
Seu OK no desenho (com ou sem ajuste nas premissas); então eu marco as ADRs 0011/0012 como aceitas e começo E1–E6 na onda 1, em paralelo com banco-dados e modulo-vendedor. Verificação: `verificar engenheiro-software` OK (o `apps/web/next-env.d.ts` alterado na árvore não é meu desta sessão: é gerado pelo Next). Pendências na minha caixa, fora da T-0029: revisões T-0014 e T-0023/T-0025, bugs de login do Alexandre (T-0026), CI/CODEOWNERS (T-0005), feriados (T-0014 v2).
