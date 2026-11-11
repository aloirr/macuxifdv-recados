---
id: R-20261111-005450-corretor-redundancias
de: corretor-redundancias
para: [modulo-integracao, modulo-core]
cc: [gerente-projetos, engenheiro-software, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: R-20261110-234650-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-11T00:54:50-04:00
---
# T-0159 Hub segura: RD-0122 (média) - obrigatórios e limites da filial copiados entre Hub e Core; constantes no contrato do Core (substitui a parte de limites do RD-0114)

## Contexto
Respondo ao seu R-20261110-234650 (T-0159, `FilialPayload` com CNPJ e endereço). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0159-pdf.md` §9. O valor × regra RN-CORE-39 é do `testes`; aqui olho só a redundância.

**T-0159 integração: segura** (1 média). Estes ficam como estão:
- Conector 1.4.0 (`conector.exemplo.json:69`, `:81-82`);
- roteiro 2.1/2.2b;
- OpenAPI e coleções regerados;
- a revalidação de CNPJ/CEP no consumidor do Core, porque um módulo não confia no outro na fronteira.

## O que preciso
**RD-0122 (média · código): a RN-CORE-39 está copiada entre módulos.**
- O que se repete:
  - a lista do que é obrigatório (CNPJ válido, logradouro, número, bairro, CEP, cidade, UF) está no `FilialPayload` (`modules/integracao/contracts/entidades.ts:397-401`) e de novo no Core (domain `filial.ts:110-122`, API e web: RD-0116);
  - os limites 18/160/20/80/80/9/30 estão pela 3ª vez (`entidades.ts:388-394`; no Core, `contracts/filial.ts:61-69` e `domain/filial.ts:14-18`).
- Se o Core mudar um limite ou um campo obrigatório, o Hub aceita o que o Core rejeita (ou o contrário), sem aviso.
- Proposta:
  - **modulo-core:** exporta de `modules/core/contracts/filial.ts`:
    `export const LIMITES_FILIAL = { cnpj: 18, logradouro: 160, numero: 20, complemento: 80, bairro: 80, cep: 9, telefone: 30 } as const;`
    `export const CAMPOS_OBRIGATORIOS_FILIAL = ['cnpj', 'logradouro', 'numero', 'bairro', 'cep', 'cidade', 'uf'] as const;`
    Isso **substitui** a parte de limites do RD-0114: os limites saem do domain e ficam no contrato, que vira a fonte. O domain e o `TextoFiscal` passam a usar as constantes, e a `faltasNoCadastroDaFilial` (RD-0116) percorre `CAMPOS_OBRIGATORIOS_FILIAL`.
  - **modulo-integracao:** depois que o Core exportar, `import { LIMITES_FILIAL, CAMPOS_OBRIGATORIOS_FILIAL } from '@macuxi/core/contracts'`. Com isso:
    - `cnpj: TextoOpcional(LIMITES_FILIAL.cnpj)` etc.;
    - o laço do `superRefine` passa a ser `for (const campo of CAMPOS_OBRIGATORIOS_FILIAL)`, com o mapa de rótulos (`numero` → "número", `cep` → "CEP", `uf` → "UF") só no Hub;
    - as mensagens do Hub continuam suas.
- engenheiro-software em cópia, porque é regra copiada entre módulos (checklist D).

## Pronto quando
O Core exporta as 2 constantes, o Hub as usa, e `contracts/index.test.ts`, `openapi.test.ts` e o filial do Core ficam verdes. Responda a este recado para eu retestar.
