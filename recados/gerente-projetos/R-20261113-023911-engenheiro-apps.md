---
id: R-20261113-023911-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T02:39:11-04:00
---
# T-0172 (engenheiro-apps): ícones e splash por variante, tela única de entrada com sincronização, marca no portal e no BKO; etapas provisórias até o export do Core

## Contexto
T-0172, parte do engenheiro-apps (R-20261112-192545, retransmitido do design-de-marca). Também atende o R-20261112-205820 (tokens web e faixa) e o R-20261112-235025 (spec docs/design/entrada-sync.md) do designer-ux. Sem commit e sem build EAS. Ativos copiados de b9a0827 (docs/marca/ativos/2026-11-12-v1/), sem alteração.

## O que fiz
1. **Ícones e splash** (apps/mobile/app.config.ts e assets/images/):
   - Campo: ícone e adaptativo com fundo `#1E3350` e splash `#1E3350` com o logo negativo;
   - Gestão: fundo e splash `#F8F6F1` com o logo positivo;
   - monocromático novo; notificação `icone-notificacao.png` com a cor `#1E3350`;
   - logo da splash com 168 dp;
   - saíram icon.png, android-icon-foreground/background.png e splash-icon.png.
2. **Tela única de entrada** (components/tela-entrada.tsx e lib/entrada.ts), pela spec entrada-sync.md e pelos tokens `temaDaEntrada` do kit:
   - o logo empilhado fica parado no centro da janela, no lugar e no tamanho da splash;
   - abertura: só o logo e o nome do app no rodapé, e a splash nativa some quando o logo do JS está desenhado;
   - antes do login: "Atualizando o app" (a passagem dos dados do aparelho; a TelaPreparoAparelho saiu) e "Conferindo o servidor" (uma vez por abertura, barra depois de 400 ms, no máximo 5 s; servidor fora = login com o aviso que já existe);
   - depois do login (/sync, components/tela-carga.tsx): "Olá, nome", "Etapa n de N · nome", percentual e lista (feita, atual, falta, parou). A lista sai na tela baixa;
   - pronto: o Início abre sozinho em 600 ms, sem botão;
   - parou: "Sem internet na etapa n de N" ou "Parou na etapa n de N", com "Tentar de novo", "Desligar modo sem sinal" (só no modo sem sinal) e "Trocar usuário";
   - a faixa da barra de status ganha o fundo da tela (`useCorDaFaixa` em area-segura.tsx);
   - saíram as frases que se alternavam e o aviso "Mantenha o app aberto" (frases-carga.ts ficou só com a mensagem do Perfil), além do `cargaRetomada`.
3. **Início:** a barra da meta e os pontos dos recados passam a `colors.grafico` (lib/inicio.ts).
4. **Web:**
   - `MarcaNaFaixa` (components/marca-faixa.tsx): logo negativo na faixa Azul noite, no portal (`Marca` de components/portal/base.tsx) e no login do BKO;
   - favicon.ico com a arte de 48 e de 192 px, em /favicon.ico, que o proxy do host config. já deixa passar;
   - themeColor `#1E3350`;
   - globals.css com os tokens do item 1 do R-20261112-205820;
   - menu grafite do BKO: o símbolo negativo no lugar do quadrado "M" e foco branco nos links e no "Trocar perfil".

## Testes (no PC)
- apps/mobile: tsc 0 erro; eslint 0 erro; vitest com 126 de 126 nos arquivos tocados (entrada, tela-carga, login-tela, preparo-aparelho, carga, frases-carga, armazenamento-aparelho, inicio, inicio-tela, area-segura, eas).
- apps/web: tsc 0 erro; eslint 0 erro; vitest de contraste-shell, sessao-sem-conexao, ciclo-senha e portal.
- Bundle do Android do Campo (expo export): não terminou em 10 min com o PC carregado e parou no limite de tempo, sem erro de bundle. O bundle das duas variantes precisa ficar verde antes do build v1.0.5.

## Pendências
1. **Etapas:** o modulo-core publicou `progressoDaEntrada` só no domain, e o shell não alcança o domain (pedido R-20261112-220743, para exportar pelo `@macuxi/core/app`). Até lá a tela usa `progressoProvisorio` (lib/entrada.ts), com o mesmo tipo `ProgressoEntrada` e os mesmos nomes. A etapa em que parou ainda não vai ao Diagnóstico (`paradaParaDiagnostico`), pela mesma razão.
2. **"Continuar sem sincronizar":** não entrou. Com carga anterior, o app já entra direto no Início (T-0059).
3. **Prints:** sem build não há print do aparelho. A revisão foi pedida ao designer-ux e ao corretor pelo código e pelos testes; a validação do design-de-marca fica para o print do build v1.0.5.
4. **Fora desta rodada** (R-20261112-205820 e R-20261112-235025):
   - o cabeçalho Azul noite das telas do shell (Início, Perfil e Mais com `Screen cabecalho`);
   - a barra superior do BKO: o shell não tem barra, o título é o PageHeader do kit.
5. **Verificação:** o `verificar engenheiro-apps` acusa `.vscode/settings.json`, sem dono e não tocado por mim (pasta .vscode/ nova, não rastreada).

## Pronto quando
Pareceres do designer-ux e do corretor sem achado, export do Core trocado no shell, e prints do build v1.0.5 validados pelo design-de-marca.
