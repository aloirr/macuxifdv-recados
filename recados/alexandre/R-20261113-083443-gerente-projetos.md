---
id: R-20261113-083443-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T08:34:43-04:00
---
# Validação de marca da v1.0.5 na nuvem (prompt pronto); o design-de-marca não aparece no PC

## Contexto
O design-de-marca **não aparece na sessão local**. O arquivo do agente está no main, mas a árvore do PC está na branch `agente/migracao-2026-11-13`, que é anterior ao main nos arquivos de governança. Atualizar `.claude/` agora exigiria mexer na governança e reabrir o VS Code de novo no meio do prazo das 13h.

A saída mais rápida é a nuvem: todo o trabalho da v1.0.5 já está no GitHub, na branch `agente/migracao-2026-11-13` (e48d3a05).

## O que preciso
Abra uma sessão da nuvem com o prompt abaixo, de preferência na sessão do design-de-marca que já existe. O prazo do parecer é **10h30 de Manaus**.

```text
Você é o agente design-de-marca do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md, o docs/marca/manual.md e o seu agente (.claude/agents/design-de-marca.md).

Tarefa: validar a marca da v1.0.5, no modo `validar`, pelo código e pelas pranchas. O build Campo-Demo-v1.0.5 sai hoje às 13h, com corte às 11h30.

O trabalho está na branch `agente/migracao-2026-11-13`. Leia por `git show origin/agente/migracao-2026-11-13:<caminho>`. NÃO faça checkout nem merge dessa branch: ela tem arquivos de governança antigos.

O que validar:
1. T-0172, marca v1:
   - packages/ui/src/mobile/tokens.ts e packages/ui/src/comum/contraste.ts, com os 10 pares do manual §3;
   - apps/web/app/globals.css;
   - apps/mobile/src/components/tela-entrada.tsx e docs/design/entrada-sync.md;
   - apps/mobile/app.config.ts e apps/mobile/assets/images/*;
   - modules/vendedor/domain/logo-padrao.ts e as cores de "PEDIDO" e "ORÇAMENTO" em modules/vendedor/domain/pdf-pedido.ts;
   - a prancha docs/design/telas/T-0172-marca.png.
   Confirme ou corrija estas premissas: o Gestão em Pérola com o logo positivo; o logo com 168 dp; o botão principal branco sobre o escuro.
2. T-0171: o tom neutro da tag Pré-Cadastro e a faixa Azul noite na lista de Clientes (docs/design/telas/T-0171-clientes-*.png).
3. T-0168 e T-0165: as pranchas docs/design/telas/T-0168-*.png e T-0165-*.png, só cor e layout.
4. T-0173, Catálogo em grade, para a v1.0.6: docs/design/telas/T-0173-catalogo-*.png.

Regras de hoje (R-20261113-062739): só achado de gravidade média ou alta segura o demo; as regras de negócio estão congeladas.

Entrega:
- o parecer em docs/marca/pareceres/2026-11-13-v1.0.5.md, com os achados MC-nnnn, na branch nuvem/marca-validacao-v105;
- o PR "[PRONTO PARA MERGE]", com o trailer "Agente: design-de-marca";
- se conseguir gravar recados, uma entrega ao gerente-projetos com cc alexandre: "liberado" ou o que segura, com a correção pronta para cada dono. Se não conseguir, ponha esse texto no fim do parecer.
```

## Pronto quando
O parecer de marca da v1.0.5 está no PR ou na caixa do gerente até as 10h30.
