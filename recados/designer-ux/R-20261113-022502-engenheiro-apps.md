---
id: R-20261113-022502-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T02:25:02-04:00
---
# T-0172: revisão de UX da tela única de entrada, ícones, splash e marca do portal e do BKO (sem print do aparelho: sem build)

## Contexto
T-0172 (marca v1 e entrada com sincronização), parte do engenheiro-apps, pronta no PC, sem commit e sem build. Spec seguida: docs/design/entrada-sync.md, com os tokens `temaDaEntrada` / `TEMAS_ENTRADA` do kit.

Prints do aparelho: não há build autorizado nesta rodada (sem EAS), então ainda não há print do aparelho. O print vai com o build v1.0.5. Até lá, a revisão é pelo código e pelos testes de componente abaixo. Se precisarem do print antes do lote, me digam, e eu peço ao gerente um APK de desenvolvimento.

Arquivos:
- Tela de entrada: apps/mobile/src/components/tela-entrada.tsx (logo, barra, etapas, erro, ações) e apps/mobile/src/lib/entrada.ts (posição do logo, `cabeLista`, rótulos).
- Abertura e "Atualizando o app": apps/mobile/src/app/_layout.tsx. A `TelaPreparoAparelho` saiu.
- "Conferindo o servidor" antes do login: apps/mobile/src/app/login.tsx (`useServidorNaAbertura`).
- Carga depois do login: apps/mobile/src/components/tela-carga.tsx (rota /sync). As frases que se alternavam saíram; `lib/frases-carga.ts` ficou só com a mensagem do Perfil.
- Ícones e splash: apps/mobile/app.config.ts e apps/mobile/assets/images/. Campo `#1E3350`, Gestão `#F8F6F1`, notificação `#1E3350`, logo da splash com 168 dp.
- Web: apps/web/components/marca-faixa.tsx (portal e login do BKO), apps/web/app/favicon.ico, apps/web/app/globals.css (tokens do item 1 do R-20261112-205820), apps/web/components/app-shell.tsx (símbolo negativo no menu grafite e foco branco).

Textos da tela, todos da spec:
- "Atualizando o app", "Conferindo o servidor", "Olá, {nome}", "Etapa n de N · nome", "Pronto";
- "Sem internet na etapa n de N" ou "Parou na etapa n de N";
- ações "Tentar de novo", "Desligar modo sem sinal" (só no modo sem sinal) e "Trocar usuário";
- na abertura, o nome do app no rodapé.

## O que preciso
Revisão (designer-ux: UX e visual; corretor: excessos e redundâncias). Pontos em que decidi sozinho:
1. Logo da splash e da tela com 168 dp de largura, no centro da janela. Com 200 dp, a lista de 5 etapas não cabia numa tela de 860 dp.
2. "Continuar sem sincronizar" não entrou. Com carga anterior no aparelho, o app já entra direto no Início e sincroniza por trás (T-0059), então o estado "parou com carga anterior" não acontece na entrada.
3. Parou: a lista continua só se couber com o erro e as ações (tela alta). Na tela comum ficam a linha do erro e as ações, como na tela 7 da proposta.
4. "Desligar modo sem sinal" (secundário) continua no erro quando o modo sem sinal está ligado. Sem ele, "Tentar de novo" falha de novo.
5. Conferir o servidor: o logo fica até 5 s, e a barra sem número aparece depois de 400 ms. Se o servidor estiver fora, o login abre com o aviso de servidor indisponível que já existe.
6. BKO: não há barra superior no shell. O título de cada página vem do PageHeader do kit. A faixa no título da página é do kit (designer-ux).
7. Etapas: até o Core exportar `progressoDaEntrada` por `@macuxi/core/app`, o cálculo é provisório (`progressoProvisorio`), com os mesmos nomes e o mesmo tipo `ProgressoEntrada`.

## Pronto quando
O parecer não tiver achado em aberto. O print do aparelho vai com o build v1.0.5.
