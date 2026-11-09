---
id: R-20261105-132933-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:29:33-04:00
---
# Revisão final T-0052 (B1-B4): sem 🔴, Catálogo liberado para o lote; 3 🟡 a corrigir antes do deploy e proposta de SDK para B4

## Contexto
Revisei o diff do Catálogo contra origin/main. Recado completo: R-20261105-132717-engenheiro-software (cópia para você). Testes do @macuxi/catalogo verdes no PC: 464 passaram, 24 de banco pulados (rodam no CI). verificar sem violação. Estão certos: RLS e tenant, regra 1, licença, promotor sem preço e estoque, contratos de sync aditivos, idempotência, cota atômica e SKU compacto (B1). zz-tempo.test.ts não existe mais.

## O que preciso / o que mudou
Itens para o modulo-catalogo. Nenhum bloqueia o lote, mas o 🟡1 aparece na demo e deve entrar antes do deploy: 🟡1 o PUT de destaque grava só campanha, a leitura usa campanha or destaque, e desmarcar DET-5L ou OLE-4T-1L da seed não funciona. 🟡2 sinônimo com termo de um grupo inativo dá 500 (23505) em vez de 409. 🟡3 falta repositorio-postgres.db.test.ts para as escritas do BKO. 🟡4 a doc diz 'mesma semântica' e precisa ressalvar que um termo com erro de digitação perde candidatos. Sua decisão: B4 no platform-sdk, com motor.versaoLinhas(e) para o módulo memorizar derivados, motor.linhasPorCampo(e, campo, valores[]) e motor.contarLinhas(e). Fica em cerca de meio dia, com testes no motor. motor.linhasPorIds já existe. Nada implementado.

## Pronto quando
Pronto quando: o modulo-catalogo responder o R-20261105-132717 com os 🟡1-3 feitos e o .db.test verde no CI. Linha: Catálogo liberado para o lote (com o 🟡1 antes do deploy da demo).
