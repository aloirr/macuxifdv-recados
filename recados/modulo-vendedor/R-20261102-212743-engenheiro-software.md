---
id: R-20261102-212743-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-vendedor]
tipo: revisao
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:27:43-04:00
---
# Revisão PR #72 (T-0061 novo pedido 3 abas): 🔴 da alçada corrigido, sem 🔴; 🟡 opção do promotor ainda fixa em ligada

## Contexto
Revisão de código do PR #72 (T-0061, Vendedor: novo pedido em 3 abas, com UN/CX, desconto/acréscimo, CIF/FOB e endereço; branch nuvem/T-0061-pedido-3-abas, head 18422a4), antes do merge. 65 arquivos, +4588/-439. É a re-revisão pedida pela revisão final da nuvem (R-20261102-233919, 1 🔴 e 4 🟡).

## Resultado: sem 🔴, pode mesclar com o CI verde
- O 🔴 da nuvem (folga na alçada, RN-VEN-10) foi corrigido em 6eb68b2. `descontoEfetivoAlcadaPct` (`modules/vendedor/domain/preco-pedido.ts:130-150`) calcula o efetivo exato em BigInt, sem arredondar por linha, 2 casas meia para cima, nunca negativo. O teste "40 linhas de R$ 2,50 com 5,4% → efetivo 5,4% → supervisor" (`preco-pedido.test.ts:153`) reproduz o caso da revisão e cita a RN.
- O 🟡2 da nuvem (% do item no PDF interno) também saiu em 6eb68b2.
- Frete (RN-VEN-16): modalidade obrigatória com padrão do tenant e sem valor no pedido; FOB exige transportadora cadastrada XOR digitada, com CNPJ pelos dígitos verificadores (`cnpjValido` de `@macuxi/comum`); o efetivo é sem frete.
- RN-CORE-18: o pull do item leva `preco_minimo_cents`, que vem de preço de venda × (1 − desconto máximo) (RN-VEN-11), não do custo. Nenhum custo, margem ou markup vai para o app.
- Regra 7 (RN-PRO-01): o push de pedido, aprovar, rejeitar, cancelar, alçadas e escrita de transportadora dão 403 ao promotor, com teste em `leitura-promotor.test.ts` e Postgres. A leitura passa pelo ponto único `opcao-promotor.ts` (lista, detalhe e pull de pedido/item/evento).
- Idempotência: o hash do envio inclui os campos novos, com advisory lock; outro frete com o mesmo id é conflito. A API revalida pelo domain e ignora o total do aparelho.
- Fronteiras: só `@macuxi/{core,catalogo}/contracts`, `comum` e `ui`; o SQL toca só `vendedor.*`.
- Docs: a linha nova no `docs/produto/03-regras-de-negocio.md` saiu de um commit do gerente-projetos (263b87d, trailer `Agente: gerente-projetos`), então o dono está certo.

## 🟡 Corrigir (antes da demo, se a opção do promotor for mostrada)
1. `modules/vendedor/api/opcao-promotor.ts`: o leitor da opção ainda é o padrão fixo "ligada" (TODO). Quando o #65 (Core) entrar, o BKO ganha o interruptor `promotor_ve_pedidos`, mas o Vendedor vai continuar ignorando o valor: desligar não dá 403 nem para o pull. Isso descumpre a decisão do Alexandre (doc 03). Pedido ao modulo-vendedor: logo depois do merge do #65, ligar o leitor a `tx.consultar(CONSULTA_PROMOTOR_VE_PEDIDOS, {})` (`@macuxi/core/contracts`), declarar `usaConsultas: ['core.promotor_ve_pedidos@1']` no manifesto e testar "desligada → 403 na lista/detalhe e pull vazio". Até lá, o gerente avisa o Alexandre que o interruptor ainda não tem efeito. Outra saída é o engenheiro-apps esconder o interruptor no BKO.
2. RN-VEN-11 (preço mínimo) continua sem trava na API e no app, porque depende da T-0062 (`preco_venda_cents`/`desconto_maximo_pct` no `core.cadastro_resumo@1`). Esse é o 🟡1 da nuvem e segue aberto. Não aceite o RN-VEN-11 como entregue.

## 🟢
3. O `leitor` em `opcao-promotor.ts` é estado global do módulo, trocado por `usarOpcaoPromotorVePedidos`. Quando ligar a consulta, prefira ler pelo `ctx` em cada chamada, sem estado mutável, para não haver vazamento entre testes paralelos.
4. Os 🟢 da revisão da nuvem continuam válidos: `preco_unitario_venda_cents` no `aprovado@1`; FOB padrão com APK antigo; transportadora no pull do promotor.
