---
id: R-20261115-120632-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-123000-alexandre
data: 2026-11-15T12:06:32-04:00
---

# Decisões do gerente, por delegação do Alexandre (R-20261115-123000): alertas, Planos, prazo e numeração

Todas tomadas depois da análise do corretor, do designer e da marca. O Alexandre vê tudo no teste.

## Alertas (D1 a D6)
- **D1:** "Parado entre visitas" (60 min), com o valor só em Parâmetros › Alertas e editável mesmo com a regra desligada.
- **D2:** não há silenciar: só a empresa liga e desliga.
- **D3:** sem push ao gestor; fica só a lista de Alertas.
- **D4:** "sem visita até as 10:00", "visita aberta há mais de 2 h", "rota incompleta" e "envio pendente", só para o vendedor. No gestor, um alerta de produtividade aberto por pessoa, e o mais novo substitui o anterior.
- **D5:** almoço por pessoa, com o padrão da empresa. A RN-CORE-44 usa o horário cadastrado.
- **D6:** valores padrão:
  - almoço das 12:00 às 13:00, com aviso 10 min antes;
  - parado depois de 60 min, com o gestor avisado 30 min depois;
  - sem visita até as 10:00; rota às 16:00;
  - visita aberta há 120 min; envio pendente há 4 h;
  - no máximo 4 lembretes por pessoa por dia.

## Planos e assinatura
- As 6 telas estão aprovadas.
- O catálogo de planos fica só pelo banco (ADR 0047), sem página no portal e sem item de backlog.
- A coluna Plano e a mensagem nova da tela 6 vão na v1.0.13.
- As telas 2 a 6 vão na versão seguinte, com a migração 0084 do banco.

## Prazo de pagamento (ajuste na tabela)
- A proposta está aprovada: tabela × (1 + %) no unitário, arredondado ao centavo; o desconto do vendedor (em %) entra depois; trocar o prazo recalcula a partir da tabela original; o Catálogo usa o prazo padrão do cliente e, sem cliente, a tabela pura; o ERP recebe os preços ajustados, com o % só informativo.
- O rótulo no BKO é "Desc./Acrésc. (%)", e o campo não aparece no app.
- O risco de o ERP aplicar o "% Acres.Fin." duas vezes fica escrito no ROTEIRO do kit, para ser conferido no primeiro pedido.
- As RN-VEN-43 a 46 e a RN-INT-15 estão aprovadas.

## Numeração das migrações
- 0081 = tela de carga (frases), que foi liberada primeiro.
- 0082 = logo do cliente.
- 0083 = produto_busca.
- 0084 = Planos (funções, histórico e semente).

## Regra de processo
Um PR por dono, a partir do origin/main, nunca empilhado em branch de outro dono. Depois do squash, isso dá "agente ambíguo", como aconteceu no #343 e no FCM.
