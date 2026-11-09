---
id: R-20261107-143019-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:30:19-04:00
---
# Chat do dono do produto, 07/11 (14h45–15h30): senhas, acesso por perfil, anexos — registro literal

Registro literal das mensagens do dono do produto no chat com o gerente-projetos, 07/11/2026, das 14h45 às 15h30, com o que foi feito.

[~14h50] "R-20261106-225242 que recado é esse. e o item 5 o que significa tambe"
→ Explicado: é o recado do Billing de 06/11; o item 5 são os 4 anexos de .coord/recados/anexos/.

[~14h55] "arquive esse recado. nao quero mais ele pendente. o dono da pasta anexo sou eu. finaliza essa pendencia"
→ Recado marcado como lido pelo gerente. O commit dele foi barrado pelo guardião nesta sessão, e o dono do produto commita com um comando. O engenheiro-software prepara o diff de governança: donos.json com .coord/recados/anexos/** → alexandre, e coord-lib tratando a pasta como comum. O gerente aplica com 'Agente: alexandre'.

[~15h] "como evitar as violacoes, e porque o verificar iria apontar violacao?"
→ Explicado: o verificar tratava a pasta anexos como destino de recado inválido; o diff acima resolve.

[~15h05] "SECRET CRIANDO NO GITHUB, COM O DEMO_SUPERADMIN_CONVITE"
[~15h10] "AJUSTEI. ESTAVA HTTPS"
→ A rota config-demo do túnel estava com HTTPS; corrigida para HTTP, ela responde 200 ("Entrar · Portal de implantação Macuxi").

[~15h15] "Senhas deve ter no minimo 8 caracteres com letras, numeros e caracteres especiais. 12 é muito. pra que codigo do convite? isso não é rede social. meu cliente ou meu time apenas vai inserir as senhas cadastradas no banco de dados para acessar o config. retirar o QR CODE NO APP AUTHENTICATOR.
para meu cliente acessar a config, basta ele inserir o usuario (e-mail dele) e a senha conforme as regras acima. ao logar, caso esse usuario pertenca a mais de uma empresa, aparecerá a opção de escolher a empresa a qual ele quer se logar."
→ T-0093 aberta. Regra RN-CORE-32 no doc 03. Desenho com o engenheiro-software. O 1º acesso com convite no config-demo NÃO deve ser feito: o fluxo vai sair.

[~15h20] "VENDEDOR E SUPERVISOR NUNCA VAI TER ACESSO AO BKO NEM CONFIG. O que acontece é que o BKO vai cadastrar o usuario e a primeira senha no bkoffice, e o vendedor vai alterar no primeiro uso, após cadastrar a senha é enviada ao email do vendedor. no app deve ser a opção de esqueci a senha, onde a nova senha vai para o email dele. BKO pode alterar a senha do vendedor, supervisor, gerente no bko web tambem.
o primeiro login a ser criado deve ser o de admin do cliente. a partir dele serão criado as demais senhas como bko, gerente, supervisor, vendedor etc. o normal é criar o admin e depois ele criar o bko e demais acessos na tela do bko web.
ainda nao decidi como vai ser a tela interna do macuxifdv, mas acredito que la em config.macuxifdv.com.br ao cadastrar os dados do cliente, eu já possa definir um login e senha master inicial para ele"
→ T-0094 aberta (perfis × BKO e config, senha inicial por e-mail, troca no 1º uso, Esqueci a senha, reset pelo BKO). RN-CORE-33 e RN-CORE-34 no doc 03, e o doc 03 corrigido: supervisor não usa o BKO. A senha master inicial do admin no portal entrou na T-0093.

[~15h25] "Tudo que eu falar aqui grave sempre os recados para o agente do claude por ler"
→ Regra permanente no CLAUDE.md: tudo o que o dono do produto disser no chat com o gerente vira recado 'aviso' para 'todos', com o texto literal. Este recado e o anterior cumprem a regra para 07/11.
