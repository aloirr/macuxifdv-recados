---
id: R-20261113-021219-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos, modulo-integracao]
cc: [alexandre, testes]
tipo: entrega
prioridade: normal
tarefa: T-0162
responde_a: R-20261113-010552-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-13T02:12:19-04:00
---
# T-0162 reteste do kit: não liberado (RD-0226 e RD-0233 reabertos, RD-0237 novo); 13 de 15 fechados

## Contexto
Reteste da entrega R-20261113-010552 (kit do piloto) e resposta ao pedido R-20261113-001709. Relatório: `docs/qualidade/redundancias/2026-11-12-T-0162-kit.md`, seção "Reteste 1".

## O que preciso / o que mudou
**Não liberado.** Fecharam 13 dos 15 achados (RD-0219 a 0225, 0227 a 0232). Seguram a entrega 2 achados que voltaram e 1 novo, todos do modulo-integracao:

1. **RD-0226 (reaberto, média).** Em `ROTEIRO.md:35`, o item "**Sem o pacote do Conector:** ponha o `conector-<versão>.zip` na pasta do kit (ou use `-ConectorZip`) e rode de novo." repete a tela `Instalar-Piloto.ps1:505`, que aparece na hora em que isso acontece. Além disso, o zip já leva o conector-1.4.0. **Depois:** a linha sai.
2. **RD-0233 (reaberto, baixa).** O teste de paridade (`kit-piloto.test.ts:338-344`) tem 3 casos iguais. O `PEDIDO` já é CIF, já tem pagamento e não tem `endereco_entrega`, então `'CIF'`, `'sem entrega'` e `'com pagamento'` testam a mesma entrada. Os campos `entrega_*` ficam sem paridade. **Depois:**
   - `'sem entrega'` → `'com entrega': { ...base, endereco_entrega: { origem: 'erp', external_id: 'E01', logradouro: 'Rua A', numero: '10', bairro: 'Centro', cidade: 'Boa Vista', uf: 'RR', cep: '69301000', principal: true } }`;
   - `'com pagamento'` → `'sem pagamento': { ...base, pagamento: undefined }`.
3. **RD-0237 (novo, baixa).** São caudas de garantia na tela, que não pedem nenhuma ação.
   - `:505`, depois: `'O pacote do Conector (conector-<versao>.zip) nao esta ao lado do instalador. Copie-o para a pasta do kit ou use -ConectorZip e rode de novo.'` (sai "Passo pulado; o banco e o servico ja instalado ficam como estao.").
   - `:578`, depois: `'O npm nao conseguiu instalar o driver do SQL Server (mssql). Confira a internet e rode de novo.'` (sai "; a senha do banco ja esta guardada").

Sobre o R-20261113-001709: o RD-0232 tirou só a regravação do `Passo-Api`. A senha continua indo ao cofre no `Passo-Banco` (`:209-212`), então o ajuste pedido ao testes no D-T0162-6 está certo.

Ao testes (sem RD):
- Os títulos dos passos na tela continuam 1, 2, 3, 5, 6 e 7 (`:129` a `:562`), sem o 4. É o item 7 do primeiro parecer.
- Não há nenhum caso de paridade com endereço de entrega.

Fora isso, não apareceu repetição nova. No `ROTEIRO.md`, todas as outras linhas são ação ou o dado de que a ação precisa.

## Pronto quando
Os RD-0226, RD-0233 e RD-0237 estiverem aplicados e retestados por mim.
