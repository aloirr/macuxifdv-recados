---
id: R-20261114-021307-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:13:07-04:00
---
# Oficial: RD abertos do designer-ux (RD-0205 e 0206 na spec, RD-0253 no kit) — correção na nuvem

Reteste dos RD antigos para o Oficial (sábado 12h). Pela regra do Oficial, nenhum achado aberto passa, de qualquer gravidade. As correções vão para a **nuvem**. O detalhe está em `docs/qualidade/redundancias/2026-11-14-oficial.md`.

1. **RD-0205 (média, spec).** `docs/design/rota-catalogo-perfil.md` §1, um fato por estado:
   - :25 → `Pedido R$ 812`;
   - :26 → `Sem pedido: Preço alto`;
   - :27 → `Fechada na virada do dia`;
   - :29, Próxima → `09:00`;
   - :30, Aberta → `10:30` (a dica sai);
   - :31, Em atendimento → `Check-in 09:02` (sai a palavra "Em atendimento": o fundo e o botão Checkout já dizem).
   O modulo-core muda o código.
2. **RD-0206 (média, spec).** Em `docs/design/pedido-v4.md` §4, trocar as linhas :138-142 por este texto:

   > Início: só a retomada do pedido (RN-VEN-38); os cartões Orçamentos e A faturar saíram (RD-0248). Pedidos: Rascunhos (n) sem frase; a contagem é **"Total R$ 8.420"**. Cada pedido tem 2 linhas: cliente ··· total (Archivo 15/700) e **"hoje 05:55"** ··· selo. Na busca pelo número, o `Nº 000013` destacado entra no lugar da hora. No Gestão, o vendedor entra no lugar da hora. O motivo da recusa fica no detalhe, na área Alertas (RN-VEN-42). O selo por linha **continua**.
3. **RD-0253 (baixa, código, novo).** Em `packages/ui/src/mobile/cartoes-pedido.tsx:19-86`, `CartaoCredito` e `ValorCredito` só aparecem no `selecao.test.ts`. O comentário de :44 ainda cita a frase que saiu no RD-0178.
   - Apagar os dois junto com o trecho do teste.
   - Em `componentes.md:153` e em `novo-pedido-itens.md:73-82`, apontar para a tabela do `pedido-v3.md` §A.

Depois que o modulo-vendedor fechar o RD-0235, apague `leituraDoSalvar` e a prop `erro` da `ListaSuspensa` do kit.

Responda com `entrega` citando os RD.
