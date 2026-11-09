---
id: R-20261108-132842-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:28:42-04:00
---
# Chat do dono do produto, 08/11 ~13h25: recados online em repositório próprio (T-0139)

Registro literal do chat do dono do produto com o gerente-projetos, domingo 08/11/2026, por volta das 13h25.
Tarefa aberta a partir dele: T-0139, recados online em repositório próprio (macuxifdv-recados).
- ADR e implementação: engenheiro-software, na esteira, sem esperar o build.
- Doc 07 e CLAUDE.md: gerente-projetos.
- Corte das junções no PC: o dono do produto, com um script e com nenhum agente rodando, porque é preciso mover .coord/recados e .coord/lidos enquanto ninguém escreve neles.

=== TEXTO LITERAL ===
gerente-projetos: decisão do dono do produto — os recados passam a ser online, sem depender do Cowork. Abra uma tarefa (próximo T-nnnn livre), escreva a ADR e implemente na esteira, sem esperar o build.

DESENHO
1. Repositório privado novo: macuxifdv-recados. Mesma estrutura de hoje: recados/<destino>/R-*.md e lidos/<agente>.txt. Migre o histórico atual de .coord/recados e .coord/lidos.
2. .gitattributes com "lidos/*.txt merge=union".
3. No PC: C:\macuxifdv\.coord\recados e .coord\lidos viram junções (mklink /J) para o clone C:\macuxifdv-recados. Coloque-as no .gitignore do repositório de código, com a remoção registrada em commit. O guardião (.claude/hooks/guarda-donos.mjs) e os scripts dos agentes continuam funcionando sem mudança de caminho; confira.
4. Script scripts/sincronizar-recados.ps1, rodando a cada 2 min pelo Agendador de Tarefas do Windows e também no início e no fim de cada sessão (hook):
   - git pull --rebase;
   - add, commit "recados: sync <host> <hora>" e push.
   Não pode travar, apagar recados nem gravar segredo. Sem Docker.
5. GitHub Actions no repositório de recados:
   a) issue-recado.yml: um formulário de issue "Recado" (campos: para, cc, tipo, prioridade, tarefa, responde_a, texto) vira um arquivo R-AAAAMMDD-HHMMSS-alexandre.md no formato do doc 07, com commit e a issue fechada com o link. Só aceita issue aberta por domontecristo.
   b) aviso-telegram.yml: em push que crie arquivo em recados/alexandre/, manda título e primeiras linhas ao Telegram, usando os secrets TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID (o Alexandre cria).
   c) status-horario.yml (cron de hora em hora): resume os recados novos de todos/ e alexandre/ desde o último envio e manda ao Telegram. Sem novidade, não envia.
6. Atualize o doc 07 (§ recados) e o CLAUDE.md com o novo fluxo.

CRITÉRIOS DE ACEITE
- Recado criado pelo formulário no celular chega na caixa do destino no PC em até 3 min.
- Recado do gerente para alexandre chega ao Telegram em até 3 min.
- Dois agentes marcando lidos ao mesmo tempo não geram conflito.
- Nenhum segredo nos arquivos; repositório privado.
- Passo a passo para o Alexandre: criar o repositório, criar o bot no Telegram (BotFather), pegar o chat id e cadastrar os 2 secrets.

Pronto quando: recado na minha caixa com o sha, a ADR, os links das Actions e o passo a passo dos secrets.
