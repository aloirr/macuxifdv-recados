---
id: R-20261128-003852-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: resposta
prioridade: alta
tarefa: T-0209
responde_a: R-20261128-003454-alexandre
encerra: false
contrato: null
criado_em: 2026-11-28T00:38:52-04:00
---
# 123 A e nenhuma

## Contexto
Resposta às decisões 122 A (R-20261128-000314), 123 A (R-20261128-002948, -003031 e -003116) e 125 B, e à regra "nenhuma tela pede a empresa" (R-20261128-003300 e R-20261128-003454). Relógio: 00h40 de 28/11 (Manaus).

## v1.0.42: ainda esperando o PO
A issue **#871** segue sem o "aprovado v1.0.42" às 00h38. O liberar está verde desde 00h16, e o atraso foi avisado às 00h31 (R-20261128-003135). Contando do comentário: no ar em +9 min e APKs em +34 min.

## 123 A + "nenhuma tela pede a empresa": T-0209
**T-0209: Login só com e-mail e senha, 1 usuário = 1 empresa, sem código da empresa em nenhuma tela, e avisos sem prefixo.** ADR **0078** reservada; a 0077 ficou com o ST/IPI da T-0208.

**Escopo**, conforme o contrato da T-0133 do ERP e os textos finais do 003116, letra por letra:
1. **Telas sem o campo da empresa:**
   - entrada do Campo, do Gestão e do BKO;
   - "Esqueci a senha", que pede só o e-mail e responde sempre igual;
   - troca de senha e primeiro acesso;
   - seleção de empresa ou servidor no app;
   - e-mails (o "Seu acesso ao Macuxi" leva hoje o código da empresa, RN-CORE-32);
   - o `localStorage` do código no BKO (`apps/web`, `login-screen.tsx`).
2. **E-mail único entre as empresas:** normalizado, recusado no cadastro e no lote da integração com o ERP, com a mensagem exata. O superadmin fica fora da unicidade, como no ERP.
3. **Login:** "E-mail ou senha inválidos.", com o mesmo tempo de resposta. A empresa suspensa só aparece com a senha certa.
4. **Migração segura:** conta os e-mails repetidos entre as empresas e, se houver algum, aborta sem alterar nada e mostra só o número. A decisão volta ao Alexandre.
5. A sessão já aberta no aparelho continua valendo.
6. **Avisos sem prefixo** ("Erro.", "Aviso.", "Atenção.", "Pronto." e "Sucesso."), com a regra no componente de aviso do `packages/ui`, para não voltar.
7. **Rodada do corretor** em todas as telas no ar (Campo, Gestão, BKO e config.), com prints: um RD por lugar que ainda pede a empresa e por aviso com prefixo.

**Donos:**
- engenheiro-software: ADR 0078 e contrato;
- banco-dados: migração e índice único;
- modulo-core: login, esqueci, cadastro e e-mails;
- modulo-integracao: recusa no lote;
- engenheiro-apps: telas do app e do BKO;
- designer-ux: simulação e `packages/ui`;
- design-de-marca, testes e corretor.

**Ordem e previsão** (estimativa do dono +15%). Ela não passa na frente da v1.0.42 nem do core da v1.0.43. Começa às ~03h30, quando o core da v1.0.43 entrar (R-20261127-235223):

| Etapa | Dono | Estimado | +15% | Hora (28/11) |
|---|---|---|---|---|
| ADR 0078 e contrato | engenheiro-software | 1h00 | 1h09 | 04h39 |
| Simulação das entradas do Campo, do Gestão e do BKO (1366 e 390), sem o campo e com os 4 textos | designer-ux | 1h30 | 1h44 | **06h23, ao Alexandre pelo PO** |
| Rodada do corretor, com prints, em paralelo com a simulação | corretor | 1h30 | 1h44 | 06h23 |
| Depois da aprovação: migração e índice | banco-dados | 1h30 | 1h44 | aprovação + 1h44 |
| core e integração | modulo-core, modulo-integracao | 4h00 | 4h36 | aprovação + 6h20 |
| telas e `packages/ui` | engenheiro-apps, designer-ux | 3h00 | 3h27 | aprovação + 9h47 |
| testes, corretor, marca e engenheiro | — | 2h00 | 2h18 | aprovação + 12h05 |

**Versão:** **v1.0.44**, com a simulação aprovada até ~08h. Se o PO decidir que passa na frente, vira a v1.0.43b e a T-0201 e a T-0206 descem uma versão.

## 122 A: escopo da T-0203, da T-0204, da T-0205 e da T-0207
As 4 tarefas passam de "bloqueada" para "aberta" no próximo PR do quadro, com o escopo, o dono e a versão do recado:
- T-0203: CNPJ no cadastro, modulo-core, 4h36, v1.0.44;
- T-0204: rodapé legal na entrada, 2h20, v1.0.44;
- T-0205: galeria do produto, 11h30, v1.0.45;
- T-0207: Vendas do mês, 1h45 + 1h45, v1.0.44.

**T-0207:** conferi às 00h25 os 2 branches de 25/11:
- `nuvem/v1036-modulo-gestor-apuracao` @ ddfeaaef (8 arquivos);
- `nuvem/v1036-modulo-core-base-vendas` @ 1d6e617a (4 arquivos).

Os dois estão sem conflito com o main de hoje e sem colisão de caminho com o core da v1.0.43.

A **T-0204** (rodapé legal na entrada) mexe nas mesmas telas da T-0209. Por isso entra no **mesmo** lote e na mesma simulação, para a entrada não ser refeita duas vezes.

## 121 A
O PostgreSQL 16.15 portátil já está de pé no notebook, com os servidores 5432 e 5433.

## Pronto quando
A T-0209 estiver no quadro e a simulação ao Alexandre às ~06h23.
