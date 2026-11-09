---
id: R-20261108-161441-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:14:41-04:00
---
# T-0124 Frente B: auditoria do Início do Campo entregue (RD-0002 a RD-0013, 6 recados; 2 decisões suas)

## Contexto
T-0124, Frente B: 1ª auditoria de redundâncias do Início do Campo (vendedor), no escopo do R-20261108-135658 (só excessos, duplicidades e redundâncias; o RD-0001 ficou fora, com o testes e o engenheiro-apps). Conferi no código atual, já com a correção do RD-0001 (R-20261108-154308). Os achados RD-0002 a RD-0011 continuam valendo, alguns com contagem menor.

## O que preciso / o que mudou
**Entregue:**
- Relatório: docs/qualidade/redundancias/2026-11-08-inicio-campo.md.
- Catálogo: docs/qualidade/redundancias/catalogo.md, com o RD-0001 marcado "fora" e o número reservado, RD-0002 a RD-0011, e mais 2 achados de código lidos à mão:
  - RD-0012 (média): o shell reimplementa regras do Core em contornos que nunca rodam (saudação, recados, sem cópia, % do mês).
  - RD-0013 (baixa): `VisaoInicio.sincronizacao` não tem leitor.
- Recados, com cc para você:
  - engenheiro-apps: R-20261108-161014 (RD-0002 a RD-0010 e RD-0012).
  - modulo-core: R-20261108-161023 (número por dia útil pronto, `recados_hoje.total`, campos obrigatórios, RD-0013).
  - modulo-vendedor: R-20261108-161030 (RD-0010 e RD-0011).
  - designer-ux: R-20261108-161038 (prop de aviso no BotaoSincronizar e docs/design/inicio.md).
  - banco-dados: R-20261108-161050 (título do seed "Prioridade de hoje").
  - testes: R-20261108-161059. É defeito funcional, não RD: um recado antigo aparece só com a hora, sob "de hoje".
- jscpd 5.4.2 (via pnpm dlx; o pnpm redundancia:codigo não roda porque o jscpd não está em node_modules) em apps/mobile/src, modules/core/app e modules/vendedor/app: 29 clones, nenhum nos arquivos do Início. O knip não rodou, pelo mesmo motivo.

**Correção ao despacho:** quem desenha o cartão Meta (com Positivação, Visitas e Cobertura), Recados, Boas-vindas e o aviso de dado antigo é o **shell** (apps/mobile, dono engenheiro-apps), não o Core. O Core só entrega dados prontos. Por isso a maior parte dos achados foi para o engenheiro-apps.

**Decisões suas:**
1. **RD-0002, dia útil.** A proposta do dono do produto faz do cartão principal um cartão **do mês** também em dia útil, com "Meta de hoje R$ X" numa linha. Assim, o "realizado de hoje" sai do Início, e isso muda a referência aprovada na T-0076 (docs/design/inicio.md §1.3). Pedi ao engenheiro-apps que espere o seu ok para a parte do dia útil. O domingo pode seguir já.
2. **RD-0007.** Visitas e Cobertura vêm do mesmo fato, o check-in (RN-CORE-20), e cada uma tem meta própria (RN-CORE-21). Fundir as duas ou manter é decisão de produto. Por ora proponho só `0% de 90%` e, como opção, o rótulo `Cobertura da rota`.

## Pronto quando
- O reteste é meu. Ele vem quando cada dono entregar, com print do APK antes e depois (domingo e dia útil), e fecha os RD no catálogo.
- O `node scripts/coord.mjs verificar corretor-redundancias` está OK, sem violações.
