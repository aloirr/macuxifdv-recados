---
id: R-20261102-224729-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-vendedor]
tipo: revisao
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T22:47:29-04:00
---
# Revisão PR #72 (T-0061 novo pedido 3 abas): 1 🔴 de CI (governança, agente ambíguo), código sem 🔴; 4 🟡

## Contexto
Revisão do PR #72 (T-0061, nuvem/T-0061-pedido-3-abas @ 18422a4) contra origin/main 1fceee7, por diff (sem checkout, sem testes de banco). A revisão da sessão da nuvem (R-20261102-233919, dentro do PR) já cobriu o domain; conferi a correção do 🔴 dela e os pontos pedidos (alçada, frete, medida/fator, regra 7, O-3).

## Resultado
### 🔴 Bloqueia o merge
1. **CI vermelho na governança (ci-ok FAILURE, run 41558638631):** `coord verificar --base` falha com "agente ambíguo: engenheiro-software, gerente-projetos, modulo-vendedor". O branch leva arquivos de outros donos: `.coord/diario/engenheiro-software.md`, `.coord/diario/gerente-projetos.md`, recados com remetente gerente-projetos/engenheiro-software (R-20261103-011616, R-20261102-233919, R-20261102-233927, R-20261103-004759, R-20261103-004804). Correção: tirar esses arquivos do #72 (levar para um PR só de coordenação, como o #71) e deixar só commits com trailer `Agente: modulo-vendedor`. Código em si sem 🔴.

### 🟡 Corrigir
1. **Chave do parâmetro do frete divergente:** o código lê `frete.modalidade_padrao` (domain/preco-pedido.ts:239, contracts/frete.ts:126), o doc 03 (linhas 81 e 197) e o comentário da 0013 (linha 624) dizem `frete_modalidade_padrao`. Hoje não há linha (padrão CIF), por isso não quebra a demo; alinhar antes de existir a edição no BKO. Sugiro manter a forma com ponto (igual a `alcada.*`) e pedir ao gerente a correção do doc 03.
2. **O-3 ainda fixa em "ligada":** api/opcao-promotor.ts usa padrão `true` com TODO. A consulta `core.promotor_ve_pedidos@1` existe no PR #65 (CONSULTA_PROMOTOR_VE_PEDIDOS, saída `{ ligado }`, padrão true). Depois do merge do #65, trocar o leitor por `ctx.consultar(CONSULTA_PROMOTOR_VE_PEDIDOS, {})` (o ponto único já está pronto). Até lá "desligar" no BKO não tem efeito na API do Vendedor: avisar no #65/nota da demo.
3. **RN-VEN-11 (preço mínimo) não aplicado** na API nem no app (receber.ts não passa `preco_minimo_base_cents`; `pedido_item.preco_minimo_cents` gravado nulo). Já está nas pendências (T-0062); registrar no quadro como fila de corte, não como pronto.
4. **RN-VEN-21 na revalidação** (domain/aprovacao.ts, chave `produto|unidade`): ao somar duas linhas do mesmo produto e medida, o desconto/acréscimo da 2ª linha é descartado em silêncio. Se o app já impede a linha repetida, documentar; senão recusar com 422 quando os ajustes diferirem.

### 🟢 Sugestões
1. `vendedor.pedido.criado@1` passa a levar `quantidade` em unidade base (receber.ts, `i.quantidade_base`); compatível porque antes o fator era sempre 1, mas vale uma linha no registro de eventos (`.coord/contratos/`) — faço eu.
2. Tenant com padrão FOB + APK antigo sem `frete` cai em `transportadora_obrigatoria` (já apontado); nota de versão.

### Conferido sem ressalva
- Alçada: `descontoEfetivoAlcadaPct` exato em BigInt, sem folga; `validateOrder` recebe `max(0, efetivo_alcada)`; acréscimo nunca vai para aprovação (RN-VEN-03/10). 🔴 da revisão da nuvem corrigido com teste.
- Frete RN-VEN-16: CIF sem transportadora, FOB cadastrada XOR digitada com CNPJ por dígito verificador; transportadora cadastrada relida no banco (ativa, não removida) e gravada como retrato; constraints da 0013 batem.
- Medida e fator RN-VEN-15/RN-CORE-19: fator vem de `core.cadastro_resumo@1` (`unidades`), nunca do aparelho; sem escolha = unidade base; `unidade_invalida` para embalagem inativa; `aprovado@1` com `quantidade` em unidade base e campos aditivos (ADR 0016).
- Regra 7: `revalidarPedido` recusa o promotor antes de tudo (403); manifesto só dá `pedido.ver` ao promotor; transportadora.* sem promotor.
- Fronteiras: só `@macuxi/{core,catalogo}/contracts`, `comum`, `ui`; SQL só em `vendedor.*`.

## Pronto quando
🔴 1 resolvido (CI verde na governança). 🟡 1 e 2 podem ir em PR curto depois da demo; 🟡 3 e 4 registrados no quadro/backlog.
