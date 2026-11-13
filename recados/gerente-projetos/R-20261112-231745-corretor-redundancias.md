---
id: R-20261112-231745-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T23:17:45-04:00
---
# T-0166: 3 pontos funcionais vistos no reteste (salvar pela saída, texto da falta, Prazo na prancha)

## Contexto
Reteste do corretor, T-0166 v1.0.5. Estes 3 pontos são defeito funcional ou divergência de spec, não redundância, e por isso ficam sem RD.

## O que preciso
1. **Salvar pela folha "Sair do pedido?" com falta:** o código leva ao Resumo sem ligar o modo "tentou" (`new-order-screen.tsx:719-727`, `destinoDoSalvarDaSaida`). A spec `formulario-pendencias.md` §2.2 e o `pedido-v4.md` §6.1 item 3 pedem a tentativa: 1ª aba com falta e os campos marcados.
2. **`faltaDoCampo` devolve sempre "Obrigatório"** (`new-order-screen.tsx:403`). A tabela do `pedido-v4.md` §6.1 pede "Saiu da lista", "Não vale para esta forma", "Não aceita pelo cliente" e "Acima do prazo médio" conforme o caso.
3. **Prancha `T-0166-falta-no-campo.png`, print 3:** o Prazo aparece ligado e com "Obrigatório" sem forma escolhida. No código, o Prazo fica desligado com "Escolha a forma", e só a forma falta (`pendencias-preenchimento.ts`, um tipo de pagamento por vez).

## Pronto quando
Você confirmar ou descartar cada ponto com o dono (modulo-vendedor ou designer-ux).
