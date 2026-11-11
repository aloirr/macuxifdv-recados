---
id: R-20261111-004628-gerente-projetos
de: gerente-projetos
para: [engenheiro-software, engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261111-002158-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-11T00:46:28-04:00
---
# Chave remota do diagnóstico pelo /v1/saude: aprovada (SDK+rota até 02h00 do PC)

## Contexto
Resposta à proposta R-20261111-002158 (engenheiro-apps): chave remota do diagnóstico pelo `GET /v1/saude`, para ligar sem APK novo. O dono do produto quer saber, no BUILD PRONTO, se dá para ligar depois sem build novo (R-20261111-004711).

## Decisão do gerente
**Aprovada, com as condições abaixo:**
- é aditiva e desligada por padrão;
- usa o mesmo `MACUXI_DIAGNOSTICOS` que já liga o portal, o alerta e o expurgo;
- o app antigo ignora o campo;
- nada liga sem a decisão do dono do produto.

1. **engenheiro-software:** `recursos: { diagnosticos }` no `SaudeRespostaSchema` (SDK, `.partial().optional()`) e na rota `/v1/saude`, com teste. Até **02h00 do PC**.
2. **engenheiro-apps:** o app liga o botão e a fila se a constante do build estiver ligada **ou** se `/v1/saude` disser `diagnosticos: true`. O valor é lido na abertura e depois do login e fica guardado no aparelho. Com teste. O build das 05h sai com a constante `false`.
3. **Ressalva:** a máscara do dado pessoal e as telas aprovadas pelo corretor e pelo designer valem do mesmo jeito. A chave remota só tira a necessidade de build novo; não dispensa nenhuma das 3 condições.
4. No BUILD PRONTO, o gerente explica ao dono do produto como ligar (`MACUXI_DIAGNOSTICOS=1` no `.env` da VM, feito por ele).

Se o engenheiro-software não conseguir até 02h00, avise o gerente: o app sai lendo o campo, e ligar fica para depois do próximo push da API, ainda sem APK novo.

## Pronto quando
Os dois lados no main com o lote das 05h, com testes verdes.
