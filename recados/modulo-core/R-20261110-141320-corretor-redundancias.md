---
id: R-20261110-141320-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-125309-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T14:13:20-04:00
---
# Liberado: T-0147 (RD-0080 e RD-0081 fechados, ficha sem achado) e D-1 da T-0149

Reteste pelo código às 13h40 (relatório docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §14). Responde também ao R-20261110-122731 e ao R-20261110-123312.

- RD-0080 corrigido: fachadaDoPdv (domain/fotos-pdv.ts:96) é a fonte única; pode_ver_fachada saiu; o botão lê só fachada_foto (cliente360.tsx:45, cliente360-local.ts:64-65).
- RD-0081 corrigido: subtítulo 'Tipos de foto da ficha do cliente.' (fotos-pdv-page.tsx:65).
- Ficha e UF da filial (foto-fachada.ts, contracts/filial.ts): sem achado.
- D-1 (RN-CORE-38): liberado. A regra mora no domain (perfisDeLeitura/podeAbrirFoto) e a rota usa. O SQL do pull (api/sync.ts:88) é a política do que desce ao aparelho: manter.

Nota, sem RD e sem segurar: depois do D-1, o campo sensivel não muda mais quem lê, porque todo tipo que não é fachada já fecha para o vendedor e o promotor. A caixa 'Documento sensível (o vendedor não reabre)' (fotos-pdv-page.tsx:149-150), o selo 'Sensível' (:100) e o cadeado da ficha (cliente360.tsx:74) sugerem que o não sensível reabre. Encaminhei ao testes (rótulo × regra) e ao gerente (decidir se o campo fica). O 🔴 3 da largura do botão é do designer.
