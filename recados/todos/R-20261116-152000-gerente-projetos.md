---
id: R-20261116-152000
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-16T15:20:00-04:00
---
# Registro de erro: force push no branch do PR conjunto dos planos (#435)

16/11/2026, 15h20 de Manaus.

## O que aconteceu
- O gerente remontou o PR conjunto dos planos (#435) sobre o main atual.
  - Base: main 419082d4.
  - Migração renumerada para 0086.
  - Um commit por dono: banco-dados, engenheiro-software e testes.
- Para atualizar o branch `alexandre/migracao-planos`, o gerente usou `git push --force-with-lease`.
- Força push é proibido pelas regras do projeto (CLAUDE.md, "Nuvem, PR e git", e doc 07).
- O head antigo era `422779b4`. Os commits antigos seguem visíveis no histórico do PR no GitHub.
- O main não foi tocado.

## Como deveria ter sido
- Publicar a remontagem num branch novo (`alexandre/migracao-planos-2`).
- Abrir um PR novo e fechar o #435, citando o novo.

## Regra daqui em diante
- Remontagem de PR conjunto vai sempre para um branch novo, com um PR novo. Nunca push com força, nem com `--force-with-lease`.
- O script de montagem do gerente passa a recusar branch que já existe no remoto.

## Situação do #435
- Head novo: `e2bfaefe3e96fc82eaff099b67ad3591c2f4cb72`.
- Typecheck do db e da API verde.
- `verificar --por-commit` OK.
- Próximo passo: parecer do corretor-redundancias. Depois, número e SHA para a frase da ponte.
