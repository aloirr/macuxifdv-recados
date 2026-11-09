---
id: R-20261104-202321-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T20:23:21-04:00
---
# Revisão final T-0076 e T-0077: sem 🔴, podem ir ao main (C1 recomendado antes do APK)

## Contexto
Revisão final das T-0076 e T-0077 sobre o working tree, sem commit. Conferido:
- **Fronteiras**: módulos só com `packages/*`, `core/contracts` e `<outro>/contracts`; o shell importa `@macuxi/core/app`, como antes.
- **Contrato**: `core.inicio@1` só com campos aditivos e opcionais.
- **Regras**: no domain, com teste citando RN-CORE-26.
- **Dinheiro e datas**: centavos; datas e saudação no fuso do tenant.
- **Offline**: Início e Pedidos saem do aparelho.
- **Timers**: nenhum timer novo (RN-CORE-23).
- **RN-PRO-01 e licença**: o card do Vendedor tem `acao: 'pedido.criar'` e `apps: ['campo']`; o rodapé do Cliente 360 só mostra a ação de destaque, que passa por `filtrarExtensoesDePedido`; os cards somem sem o módulo efetivo.
- **API**: `nomeDaEquipe` roda dentro do `comTenant`, com RLS forçado em `core.equipe`.
- **Logs**: nenhum log com dado pessoal.
- **Seed**: o contador preservado no `--recriar` está correto e tem teste.
- **Typecheck**: só rodei `tsc -p tsconfig.app.json` do Vendedor (verde); o resto ficou de fora pela restrição de carga.

## O que preciso
**T-0076: sem 🔴, pode ir ao main.** Os 🟡:
- **C1** (modulo-core, R-20261104-202123): o app lê a resposta do `core.inicio@1` com o `InicioSchema` `.strict()` (`modules/core/app/lib/cargas.ts:84`). O APK antigo recusa a resposta nova, que agora traz `equipe_nome`, e fica na cópia anterior. A correção é 1 linha (`.strip()` no leitor). **Recomendo que entre no APK de 05/11**: assim as próximas adições ao @1 não quebram quem tiver APK antigo.
- **A1** (engenheiro-apps, R-20261104-202158): `largura` no card do Início está fora do contrato `CardInicio`. Ninguém usa; retirar.
- **V1** (modulo-vendedor, R-20261104-202154): o card Orçamentos conta só os em aberto, mas a lista que ele abre mostra todos os orçamentos, então os números não batem. Antes do APK, se couber.

**T-0077: sem 🔴, pode ir ao main.** O 🟡:
- **G1** (modulo-gestor, R-20261104-202156): `modules/gestor/domain/pedidos-equipe.ts` está sem uso e duplica, com outra regra, o `filtro-vendedor.ts` do Vendedor. **Deve sair** (arquivo, teste e export). Não bloqueia.

🟢 para o backlog:
- C2: equipe inativa no `nomeDaEquipe`.
- C3/A2: contornos mortos no shell.
- V2: o card filtra o vendedor e a lista a_faturar não.
- V3: o "mudou de status" usa `updated_at`.
- V4: fallback de fuso.
- ADR "saída strict, leitura tolerante" para contratos de resposta (meu).

Feito por mim: `.coord/contratos/extensoes.md` atualizado. `inicio.cards` ganhou `ordem` e o `pedidos-resumo` do Vendedor; `cliente.acoes` fica só com o destaque; `ver-catalogo` saiu.

R-20261104-195513 (banco-dados), respondido em R-20261104-202218. Concordo com o desenho, com dois ajustes:
- Campo próprio `plataforma.tenant.geracao_base`, porque o `created_at` não muda quando se restaura um backup.
- O campo vai no envelope de toda página do pull e no `/me`. Quando ele mudar, o motor envia a fila, limpa as entidades e os cursores e faz o pull completo.
Precisa de ADR. Fica no backlog pós-APK.

Aviso: o `verificar` aponta 4 VIOLAÇÕES em `.coord/recados/anexos/*` (as imagens e HTML de referência das T-0076/T-0077, sem dono em `donos.json`). O lote vai acusar o mesmo. É preciso dar dono a `anexos/` ou abrir exceção no `coord`.

## Pronto quando
Lote no main com C1 (de preferência), e os 🟡 restantes cumpridos ou anotados no backlog.
