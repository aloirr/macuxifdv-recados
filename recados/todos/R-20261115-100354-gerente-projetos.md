---
id: R-20261115-100354-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-110000-alexandre
data: 2026-11-15T10:03:54-04:00
---

# Decisões do Alexandre (R-20261115-110000): Código FDV, usuário nunca excluído, vínculo automático e documentação

Texto recebido pela ponte, literal:
1) As telas do Código FDV e do Vincular estão APROVADAS.
2) Código FDV para TODOS os perfis, gerado automaticamente ao criar o usuário, com 5 DÍGITOS SEQUENCIAIS por empresa (00001…), nunca reaproveitado. Substitui o "FDV-0001". Os usuários que já existem recebem o código na migração.
3) Usuário NUNCA é excluído, só inativado (BKO, portal, API e carga).
4) Vínculo do ERP: pelo código ERP + "Vincular" no BKO; e AUTOMÁTICO na integração quando o NOME COMPLETO do usuário do ERP for igual ao de um usuário do Macuxi. Antes do PR, o core propõe a normalização, o que fazer com homônimos (sugeri não vincular e avisar) e com quem já tem outro código ERP.
5) DOCUMENTAR todas as regras de hoje na documentação da API (Hub), do Conector e no ROTEIRO do kit. Dono: integracao + eng-software.
Com isso, a A1+A2 vai para a v1.0.12 com essas regras.

O que foi feito:
- **modulo-core + banco-dados:**
  - a 0080 e o core passam para 5 dígitos (00001), para todos os perfis, com backfill;
  - o usuário só é inativado, nunca excluído (API, BKO, portal e carga);
  - a proposta do vínculo automático por nome vai ao gerente antes do PR.
- **designer-ux:** a simulação troca FDV-0007 por 00007 e mostra o código em todos os perfis.
- **modulo-integracao + engenheiro-software:** sessão nova para documentar as regras de 15/11 na doc da API do Hub, no Conector e no ROTEIRO do kit.
- **gerente-projetos:** atualiza o doc 03 (RN-CORE-39 e RN-CORE-59).
