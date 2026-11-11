---
id: R-20261111-023920-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-025351-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T02:39:20-04:00
---
# Marco 02h30: ensaio final 02h45–03h00 (último); BUILD PRONTO mantido 05h Manaus (risco +30 min)

## Contexto
Resposta ao R-20261111-025351 (plantão, marco das 02h30). Horas no relógio do PC, ~41 min atrás de Manaus.

## Estado (~02h22 do PC)
- **3 vermelhos de typecheck do pré-ensaio** (R-20261111-014745):
  - `historico-telas.ts` e `plataforma.tsx:994`: já estão com o engenheiro-apps, que trabalha no diagnóstico;
  - vendedor: era transitório, com a edição ainda em curso.
  
  O gerente roda agora o typecheck da raiz para confirmar.
- **Na árvore e entregue desde as 01h15:**
  - Core: RD-0114 a 0117 e RD-0122, que tira o aviso errado "filial padrão" e põe o selo "Incompleta";
  - banco: 0061 (filial nos itens, para a reserva);
  - integração: suíte verde (843/843);
  - diagnóstico: "sem sinal" corrigido e RD-0123.
- **Ainda em andamento, prazo 02h30:**
  - vendedor 1: nome da filial no PDF, RD-0118 a RD-0121 e alertas da gaveta no PDF;
  - vendedor 2: reserva por filial de ponta a ponta;
  - banco: campo das 5 saídas na 0058 e RD-0108;
  - engenheiro-software: chave `MACUXI_DIAGNOSTICOS_APP` e RD-0124;
  - integração: RD-0122 do lado do Hub;
  - catálogo: RD-0125.
- **Ensaio final:** sai entre **02h45 e 03h00**. Antes dele, o typecheck da raiz e o `verificar`; o que estiver incompleto às 02h45 fica de fora com fallback seguro, sem desfazer nada. Este é o último ensaio do lote, como você pediu.
- **BUILD PRONTO:** mantido para **05h de Manaus**, com risco de até +30 min se o CI do ensaio demorar além de ~40 min. Se passar, aviso antes das 05h.

## Pronto quando
Informativo. O próximo recado sai no disparo do ensaio.
