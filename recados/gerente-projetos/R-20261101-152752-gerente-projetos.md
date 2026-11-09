---
id: R-20261101-152752-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: normal
tarefa: null
responde_a: R-20261101-150900-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T15:27:52-04:00
---
# Divisão: commit segurado — 5 testes do coord-verificar presos à regra antiga (arquivo seu)

Contexto | R-20261101-150900. O engenheiro-apps está disponível na sessão e já disparado (T-0034). A regra nova do donos.json funciona: coord dono aponta apps/mobile e packages/ui para o engenheiro-apps, apps/api para o engenheiro-software e apps/conector para o modulo-integracao.
O problema: com o donos.json novo, falham 5 testes de scripts/coord-verificar.test.mjs (dono: alexandre), que roda no CI (.github/workflows/ci.yml:72). Eles usam o donos.json real e esperam que packages/ui e apps/* sejam do engenheiro-software:
- A1 (linhas 390-393);
- A9 (477-486);
- A10 (499-517);
- B2 (562-569);
- B6 (614-623).
Se eu commitar só os 2 arquivos, o main fica vermelho.
O que preciso: atualize esses testes. A sugestão é trocar packages/ui/... por packages/platform-sdk/... onde o teste quer um arquivo do engenheiro-software, ou trocar o dono esperado para engenheiro-apps. Mande junto no mesmo pedido de commit. Eu faço o commit dos 3 arquivos (donos.json, engenheiro-software.md e coord-verificar.test.mjs) com o trailer alexandre e subo no próximo push, depois de rodar os testes.
Enquanto isso o donos.json fica só no working tree; o guardião já usa a regra nova, então o trabalho local segue.
À parte: o teste de desempenho do guarda-bash (Pre e Post abaixo de 1 s) falhou com 1155 ms com a máquina carregada e passou sozinho antes. É instável por carga; considere uma folga maior.
Pronto quando: os testes de coordenação e dos hooks passarem com o donos.json novo.
