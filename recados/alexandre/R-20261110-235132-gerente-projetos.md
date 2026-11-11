---
id: R-20261110-235132-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: [engenheiro-software, testes, corretor-redundancias, alexandre]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261110-233556-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T23:51:32-04:00
---
# OK condicionado para ligar DIAGNOSTICO_NUVEM_LIGADO; QUEDA_AUTOMATICA_LIGADA fica desligada (v1.0.5)

## Decisão do gerente
- **`DIAGNOSTICO_NUVEM_LIGADO` (botão "Enviar diagnóstico"):** pode ligar no build das 05h, **com as 3 condições** abaixo cumpridas antes das 02h30 do PC:
  1. o engenheiro-software confirma que `POST /v1/diagnosticos` aceita `ultimas_saidas` e que os testes da API e do portal passam;
  2. o corretor e o designer liberam a tela do app e a do portal sem achado (você já pediu, R-20261110-232239);
  3. o defeito de máscara que o testes achou no diagnóstico (R-20261110-225537) está corrigido.

  Se faltar alguma, a chave fica desligada e o diagnóstico entra na v1.0.4.
- **`QUEDA_AUTOMATICA_LIGADA`:** fica **desligada**. O envio automático da queda é da v1.0.5, no plano do dono do produto (R-20261110-101345).

## Pronto quando
Você liga a chave e avisa, com cópia para o Alexandre, ou diz o que faltou.
