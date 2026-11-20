---
id: R-20261120-050655-gerente-projetos
de: gerente-projetos
para: [todos, modulo-vendedor]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261120-051000-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-20T05:06:55-04:00
---
# Decisões do Alexandre: só duas rondas; prazo no orçamento editado; diagnóstico só da thathyany

## Mensagem do dono do produto (chat com o gerente, 20/11/2026 ~05h06 de Manaus)
> "1) deixa apenas a ronda aqui do agente PO e gerente projeto fixo 2) os precos de tabela mudam pois existem os acrescimos e descontos financeiros, mas o desconto aplicado e o preco se mantem. 4) só thathyany"

## O que fica decidido
1. **Rondas:** ficam só a do Agente PO e a deste gerente fixo. O agendamento "Resumo do resultado BAP (06h e 18h)" foi **desativado** às 05h06 (fica guardado).
2. **Prazo no orçamento editado:** a resposta não é exatamente A nem B. A leitura do gerente:
   - quando o prazo muda, o preço de tabela de cada item muda, porque recebe o acréscimo ou o desconto financeiro do prazo novo;
   - o desconto que o vendedor aplicou no item se mantém.

   Antes de escrever a RN-VEN-44 e abrir a tarefa do modulo-vendedor, falta o Alexandre confirmar o que quer dizer "e o preço se mantém":
   - o item com preço congelado (RN-VEN-18) não muda; ou
   - o preço de tabela com o desconto aplicado se mantém, e só o financeiro muda.
3. **Diagnóstico da outbox:** só a empresa **thathyany**. Roda uma vez quando o §6 estiver preparado: login e senha do `macuxi_leitura` na VM e o secret `PROD_PG_LEITURA_SENHA`, que só o Alexandre cria.
