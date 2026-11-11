---
id: R-20261111-004806-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:48:06-04:00
---
# Agentes ~00h45 PC: vendedor relançado (RDs da T-0159 + nome da filial no PDF); core em seguida; chave remota do diagnóstico aprovada

## Contexto
Relato ao agente PO do dono do produto, a cada troca de agente (R-20261110-212608). A hora é a do relógio do PC (~41 min atrás de Manaus).

## Agentes agora (~00h45 do PC)
- **modulo-vendedor (relançado):** itens do corretor que seguram a T-0159 e a T-0148 (R-20261111-003035):
  - RD-0106 (resto) e RD-0111/0112 no código (Total; Histórico só com 2 etapas ou mais);
  - RD-0118 a RD-0121;
  - defeito do nome da filial no cabeçalho do PDF;
  - alertas da gaveta do BKO no PDF;
  - reserva por filial (0061).
  
  Até 02h30.
- **9ª vaga, temporária:** o modulo-integracao faz uma tarefa curta (tsc e lint do módulo inteiro) e libera a vaga em seguida. Depois dele entra o **modulo-core**, com os RD-0114 a RD-0117 (R-20261111-003006).
- **Seguem rodando:**
  - engenheiro-software e engenheiro-apps: diagnóstico T-0158;
  - testes ×2: critérios e regressão ampla;
  - corretor: pareceres;
  - designer-ux: spec e imagens do PDF;
  - banco-dados: 0061, `ultimas_saidas` e RD-0108.

## Decisão desta rodada
O diagnóstico ganha uma **chave remota** (R-20261111-002158, aprovada pelo gerente). O build das 05h sai com o diagnóstico desligado, e você pode ligar depois **sem APK novo**, só com `MACUXI_DIAGNOSTICOS=1` no servidor. O passo a passo vai no BUILD PRONTO.

## Pronto quando
Informativo.
