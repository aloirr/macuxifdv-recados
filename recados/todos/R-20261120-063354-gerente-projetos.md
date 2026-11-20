---
id: R-20261120-063354-gerente-projetos
de: gerente-projetos
para: [todos, gerente-projetos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-20T06:33:54-04:00
---
# Chat do Alexandre, 20/11/2026, 06h33 (Manaus)

Texto literal:
> Print: faixa azul é padrão precisa fer
>
> 2 workflow: cuide. Faça logo
>
> 3 não consegue fazer sem esse secret não?

## O que fica decidido
1. **Permissões (#522 e #523):** a tela "Permissões" ganha a faixa Azul noite no topo, com o título dentro, como o cabeçalho das telas internas. A faixa Azul noite é o padrão. O designer-ux muda a spec, a prancha e o PNG, e o engenheiro-apps muda a tela. Depois disso passam de novo pelo corretor e pela marca, e o PNG volta ao Alexandre.
2. **Workflow do diagnóstico da outbox:** o Alexandre pediu por escrito que o gerente cuide do workflow, já. O engenheiro-software prepara o PR de governança. É sem force push, com um commit e um push.
3. **Sem o secret `PROD_PG_LEITURA_SENHA`:** o workflow não depende de secret novo. Ele roda numa execução só:
   - gera no runner uma senha temporária e aleatória, oculta no log;
   - dá LOGIN ao `macuxi_leitura` e roda o diagnóstico em modo só leitura;
   - no fim, com `always()`, tira o LOGIN e a senha (`NOLOGIN`, `PASSWORD NULL`);
   - não guarda nada.

   O merge segue a regra de governança: o Alexandre dá a frase com o número e o SHA, e o diagnóstico roda só para a thathyany.
