---
id: R-20261108-150827-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos, modulo-vendedor]
cc: [testes]
tipo: entrega
prioridade: normal
tarefa: T-0128
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T15:08:27-04:00
---
# Entrega T-0128 (shell): useBloquearSaida na barra inferior e no Voltar do Android; recados T-0087/T-0089/T-0094 tratados

# Entrega T-0128 (shell): useBloquearSaida ligado na barra inferior e no Voltar do Android; recados antigos tratados

## Contexto
T-0128, Frente E, RN-VEN-38 (spec docs/design/formulario-pendencias.md §2.1/§2.5; contrato combinado com o modulo-vendedor em R-20261108-125643/130452). O ponto de extensão é reutilizável por qualquer formulário.

## O que fiz
1. **Hook no SDK** (a fronteira exige: o módulo só importa packages/*). Desenho exato pedido ao engenheiro-software (R-20261108-141717), feito e encerrado por ele (R-20261108-144304): `useBloquearSaida(alterado, aoTentarSair)` e `ProvedorBloqueioDeSaida` em packages/platform-sdk/src/react/bloqueio-saida.tsx, exportados de '@macuxi/platform-sdk/react'. O SDK só guarda o registro em contexto: sem RN, sem expo-router e sem hook dinâmico (React Compiler).
2. **Shell** (apps/mobile):
   - src/lib/bloqueio-saida.ts (novo, puro): registro, `tentarSair(seguir)`, Voltar do Android por formulário registrado, `prosseguir` que vale uma vez, foco pelas telas de módulo (`historico.fora`);
   - src/state/bloqueio-do-shell.ts (novo): `bloqueioDoShell` com BackHandler e roteador (o `prosseguir` do Voltar faz `router.back()`, ou `BackHandler.exitApp()` na raiz);
   - src/components/tab-bar.tsx: todo toque na barra passa por `tentarSair`, inclusive tocar de novo na aba em uso; a pilha da aba é lida só no `prosseguir`;
   - src/app/_layout.tsx: `<ProvedorBloqueioDeSaida value={bloqueioDoShell}>` dentro do ShellProvider (valor estável: singleton do módulo).
   Ordem do Voltar: o ouvinte do shell é assinado quando o formulário monta, depois do ouvinte do roteador, então trata antes dele. O ouvinte da própria tela (abas internas do Novo pedido) continua antes do shell. Folha, diálogo e menu (Modal do kit) fecham antes pelo onRequestClose.
3. **Avisos**: modulo-vendedor (R-20261108-145629: troca o adaptador modules/vendedor/app/lib/bloquear-saida.ts por re-export do SDK, mais 2 notas); designer-ux (R-20261108-150206 encerra o R-20261108-112827); pedido ao designer-ux (R-20261108-150213) para o BackLink do kit passar pelo bloqueio, por provedor ou prop aoVoltar. Este pedido não bloqueia: o Novo pedido já segura o cabeçalho com o VoltarDoFormulario.
4. **Recados antigos**:
   - R-20261106-023316 (T-0087): já resolvido; o 🟡 1 da reconferência está aplicado em cartao-base.tsx:25. Encerrado (R-20261108-142516).
   - R-20261108-125732 (T-0094): os 🟡 1-3 e o 🟢 4 estão aplicados em portal-admins.ts. Encerrado (R-20261108-142530).
   - R-20261106-073350 (T-0089 A1): o menu fica em Administração, porque o SDK não tem grupo "Parâmetros". Teste novo: apps/web/lib/menu-formas-pagamento.test.ts (5). Encerrado (R-20261108-144228).
   - R-20261106-201027 (T-0089): revisão técnica no código atual, sem 🔴; 3 🟡 ao modulo-vendedor (ERP editável no BKO, setTimeout 80 ms depois do Keyboard.dismiss, setTimeout 0 no salvar da edição). Encerrado (R-20261108-144134). C3 (Core) e K3 (Catálogo) não foram revisados nesta rodada.

## Testes
- apps/mobile: tsc verde, eslint verde, vitest 38 arquivos / 341 testes verdes. Novos: src/lib/bloqueio-saida.test.ts (14) e src/components/tab-bar-bloqueio.test.tsx (11, com a TabBar e o registro reais). Cobrem: com alteração, a barra (Início, Mais, a aba em uso) e o Voltar do Android não navegam e chamam a tela; o `prosseguir` libera uma vez; sem alteração, sai direto; desmontar e ficar fora de foco liberam; na raiz, sai do app. O hook em si é testado no SDK (bloqueio-saida.test.ts do engenheiro-software).
- Bundles export:embed android (perfil preview): Campo verde (2119 módulos) e Gestão verde (2121 módulos).
- apps/web: vitest do teste novo (5) e eslint verdes.
- `node scripts/coord.mjs verificar engenheiro-apps`: OK, sem violações.

## Pendências / premissas
- "Voltar do stack": não há header de stack (headerShown false). O voltar do cabeçalho é o BackLink do kit (pedido ao designer-ux) ou o da própria tela (VoltarDoFormulario do Vendedor).
- A retomada depois que o sistema fecha o app ficou com o Vendedor (card do Início), sem sinal do shell, como ele pediu.
- Falta o re-export no Vendedor e o reteste no APK (passo 5 do roteiro dele). testes em cópia para a regressão.
- Novos na caixa, fora desta tarefa: RD-0001 da T-0124 (Meta de hoje em dia não útil, texto do shell em apps/mobile/src/lib/inicio.ts:211-214 e components/inicio.tsx:113/127; respondi "recebido" em R-20261108-144728) e R-20261108-142901 (T-0133). Aguardo a ordem.
