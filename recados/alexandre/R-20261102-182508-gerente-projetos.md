---
id: R-20261102-182508-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261102-180754-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T18:25:08-04:00
---
# STATUS 18h + #49 mesclado (da0e0a5968fe7cceec1bd28e852abd2ceac94c26): o que entra no build das 22h e o que fica fora

## Contexto
Contexto

## O que preciso / o que mudou
Seus R-20261102-175845 (Firebase já configurado — obrigado, eu tinha perdido o seu R-132716) e R-180754 (seeds e repositórios). #49 (0015 Promotor) mesclado pela regra A em da0e0a5 e puxado; #46 (0014) em 5a450aa. JÁ NO MAIN OU COMMITADO (entra)

## Pronto quando
sincronização: carga não prende em 100%, frases, retoma de onde parou; RN-CORE-23: botão Sincronizar, novidades (1 req sem mudança), puxar = Sincronizar, segundo plano, push com o Firebase (aprovado/rejeitado/para aprovar, meta, rota; token troca de dono e logout apaga no servidor); cadastro mínimo (etiqueta + observação); produto no BKO (custo, margem, preço mínimo); aba Catálogo + árvore + busca; telas do Gestor (#40), Promotor (#41), Pesquisa (#43), Treinamento (#42), Vendedor partes 1 e 2 (#39, #44), monitor do Hub (#38); consumidores do ERP; área segura. Smoke da demo 9/9 (testes). EM CURSO, entra se fechar até 20h45 | correções do Vendedor (PDF travado no Campo, PDFs com CNPJ/tabela/distribuidora/Medida/frete, nome do vendedor no card, pedido de outubro some da lista, puxar para baixo, timers) — modulo-vendedor; seed do Gestor no demo.ts + licença (banco-dados) e repositório SQL do Gestor (modulo-gestor) — crítico para a Renata ver a equipe; seed do Promotor (banco-dados); logout chamando o DELETE do token + revisão de telas (engenheiro-apps). FICA FORA (proposta) | repositório SQL do Promotor, da Pesquisa e do Treinamento (as 4 vagas estão ocupadas; Promotor entra se uma vaga abrir até ~19h30); Pesquisa (0016, #47) e Treinamento (0017, #48) dependem das sessões resolverem conflito: sem seed até 21h, licença desligada na demo; novo pedido em 3 abas (T-0061 lado Vendedor: UN/CX, desconto/acréscimo, frete na tela) e cadastro de medidas (T-0063) — sprint de 03/11; teste de carga 10k; passo 'pnpm timers' no ci.yml (governança, sua autorização); carga por arquivo e e2e do ciclo com ERP simulado (T-0032) — proponho corte para o backlog. HORÁRIO | 20h45 entregas → 21h00–21h30 commit + validação (lint/typecheck em worktree limpo) + push + CI do main → 21h30 subir-demo (migrações + seed) e smoke + roteiro M-D13..M-D19 → 22h00 build EAS das duas variantes do commit verde → APKs por volta de 22h30. Se o CI não ficar verde até 21h50, aviso e o build sai do último main verde. Pronto quando | status das 22h com o link dos APKs.
