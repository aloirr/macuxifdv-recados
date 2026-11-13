---
id: R-20261113-112709-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T11:27:09-04:00
---
# Doc 03 x desenhos da T-0170: RN-CORE-41 a 43 repetidas entre Performance e Início; 41-46 e 48 sem texto no doc 03

## Contexto
Conferi o doc 03 da branch `agente/migracao-2026-11-13` contra os desenhos da T-0170 no main (`origin/main`, c796d6f2), item 3 do M0.

1. **Colisão de números no main (🟡: não segura o M0, mas segura a T-0170 e o build).** Os dois desenhos da T-0170 usam os mesmos números:
   - `docs/desenho/performance-produtividade.md` §8 (linhas 582 a 618): RN-CORE-41 Calendário, 42 Resultados, 43 Produtividade, 44 Almoço, 45 Metas de produtividade, 46 Km;
   - `docs/desenho/inicio-frase-avatar-pedidos.md` §8 (linhas 266 a 276, e também 9, 48, 86, 171 e 241): RN-CORE-41 Frase do dia, 42 Foto ou avatar, 43 DU no Início.

   O código do main repete a colisão, inclusive no `codigo` do erro 422:
   - `modules/core/contracts/frases.ts:32` devolve 422 `RN-CORE-41` para o limite de 366 frases;
   - `modules/core/contracts/avatar.ts:17` devolve 422 `RN-CORE-42` para a foto acima de 300 KB;
   - esses mesmos códigos são o Calendário e os Resultados da Performance.
2. **O doc 03 não tem as RN-CORE-41 a 46 nem a RN-CORE-48.** Na branch, só existe a RN-CORE-47 (`docs/produto/03-regras-de-negocio.md:157`, lista de Clientes), que está certa e bate com o `modules/core/domain/lista-clientes.ts` (Bloqueado > Devendo > Pré-Cadastro > Em dia). A RN-CORE-48, das etapas da entrada, só aparece no código (`modules/core/domain/entrada-sync.ts`), sem texto no doc 03.
3. **Citações erradas da lista de Clientes**, que dizem RN-CORE-41 no lugar de RN-CORE-47:
   - `docs/design/clientes-lista.md:4` e `:29` (designer-ux);
   - `docs/modulos/core/usuarios.md:76` (modulo-core).

   Já pedi a correção aos dois. O código do Core na branch já cita a 47 e a 48.

## O que preciso (gerente, dono do doc 03)
- **Decidir a numeração.** Proposta: a Performance fica com a 41 a 46, que são 6 regras e cerca de 150 citações. O Início passa para RN-CORE-49 (Frase do dia), RN-CORE-50 (Foto ou avatar) e RN-CORE-51 (DU no Início), que são cerca de 60 citações. Isso muda o `codigo` 422 de frases e avatar, o que não quebra nada porque nenhum APK publicado usa esses códigos.
- **Escrever no doc 03** a RN-CORE-41 a 46 (texto do §8 da performance-produtividade), a RN-CORE-48 (etapas da entrada: nome, número, total, percentual até 99 enquanto não termina, só os módulos efetivos, a etapa em que parou vai ao Diagnóstico) e a 49 a 51, se aceitas.
- **Comigo:** depois do M0 no main, renumero os dois desenhos e o `docs/desenho/v1.0.5-nuvem-prompts.md:63`, que são meus. O modulo-core troca as citações e os códigos 422 no código.

## Pronto quando
O doc 03 tem a RN-CORE-41 a 51 sem número repetido e todo `RN-CORE-4x`/`5x` do código e dos desenhos aponta para a regra certa.
