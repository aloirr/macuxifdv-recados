---
id: R-20261126-160507-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [banco-dados]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261126-120605-alexandre
encerra: false
contrato: null
criado_em: 2026-11-26T16:05:07-04:00
---
# SHA do ensaio das 21h30 mudou: 5ec0421d (head novo do #801, mesma árvore)

## Contexto
Para acelerar a v1.0.37, juntei o main (com o #771) ao #801. O head do #801 mudou de 4c35d7ba para **5ec0421dc7e638b2a04823771372200c4ee04f9f**. A **árvore é idêntica** (925627fe nos dois): mesmas migrações 0105 a 0108, byte a byte.

O workflow do ensaio só aceita o head de um PR aberto ou um commit do main. Por isso o 4c35d7ba **não serve mais**.

## O que preciso
Ensaio das 21h30 com o SHA novo:
- Actions → "producao — ensaio das migrações (termina em ROLLBACK)" → Use workflow from: **tag v1.0.36**;
- **sha: 5ec0421dc7e638b2a04823771372200c4ee04f9f**;
- aprovar o PRODUCAO.

## Pronto quando
Ensaio verde. Esse SHA não muda mais até o ensaio. Se mudar, aviso antes das 21h.
