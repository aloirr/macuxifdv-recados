---
id: R-20261112-091724-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261112-074403-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T09:17:24-04:00
---
# Status: design-de-marca, super-admin, kit do piloto, v1.0.5 (BUILD PRONTO ~21h) e T-0168 na v1.0.6

## Contexto
Resposta à cobrança R-20261112-074403. A sessão local **não parou**. O gerente ficou sem mandar status entre 6h17 e agora, e a falha é dele. Os agentes estão entregando.

## Status, na ordem da cobrança

**1. design-de-marca** (R-20261112-065523 e 065914)
- **Quem:** o gerente, pelo rito de governança: commit com o trailer `Agente: alexandre` citando o seu recado.
- **O que entra:**
  - `.claude/agents/design-de-marca.md` e `.claude/skills/design-de-marca/SKILL.md`, a partir dos anexos;
  - em `.coord/donos.json`: `docs/marca/**` e o diário dele;
  - a regra de cor e layout no CLAUDE.md e no doc 07.
- **Depois:** o agente faz a proposta própria, com 2 a 3 opções, e valida as telas da v1.0.5 antes do build.
- **Previsão:** instalado até 10h. Proposta de marca até 13h.

**2. Super-admin da produção** (R-20261112-072710 e 073908)
- **Deploy v1.0.0 verde.** O `/v1/saude` de produção respondeu `ok: true`, `versao: v1.0.0`, `banco: ok` e `erros_5xx: 0`.
- **O GitHub está oscilando agora** (TLS timeout). Disparei o "producao — super-admin" em simulação e confirmo o run assim que a API responder. Depois rodo de verdade.
- **E-mail do login:** `superadmin@macuxifdv.com.br`, nome "Super-admin Macuxi", com a senha do secret `PROD_SUPERADMIN_SENHA`.
  - Premissa: é um endereço de função no seu domínio, sem dado pessoal.
  - Se preferir outro, me diga e rodo "redefinir" ou "desativar" mais "criar".
- **Fica para depois do super-admin:** conferir bko./login e config. (login errado tem de dar 401) e mandar o aviso "entre no config.".
- O `docs/status/producao.md` já diz: regra do tipo **Tag** e rotas api→:8100, bko/config→:3100.
- **Previsão:** aviso do config. até 9h30, se o GitHub responder.

**3. Kit do piloto** (R-20261112-074226 e 074549, T-0162)
- As duas empresas teste, "Piloto Conector" e "Piloto API", entram na T-0162.
- **Quem:** modulo-integracao (instalador `.ps1`, serviço do Conector, "ERP via API", roteiro e `-Limpar`) e banco-dados (ERP_PILOTO: tabelas, `vw_macuxi_*`, entrada de pedidos, usuário restrito e planilhas-modelo). O testes e o corretor liberam no fim.
- **Lançamento:** agora, logo depois do super-admin.
- **Previsão:** kit no release até as 18h de hoje.

**4. v1.0.5**
- **T-0165 (Novo pedido):** o modulo-vendedor está implementando, com prazo às 16h do PC.
  - O corretor faz o reteste da spec final e o designer-ux alinha a spec.
  - Entram **o lápis Editar em Itens e no Resumo** (R-20261112-082212) e **o PDF do cliente só com o Valor final** (R-20261112-082211). Os dois já estão nas caixas do vendedor, do designer e do testes.
- **T-0166 (menos alertas):**
  - Core, Pesquisa, Gestão, Loja, Treinar e Catálogo já entregaram.
  - Falta o Vendedor, que vem junto com a T-0165.
  - O designer-ux leva o padrão "falta no campo" ao `packages/ui`.
- **T-0167 (busca):**
  - O Catálogo entregou: 20 por vez, código exato no topo, 3 letras e "Você quis dizer".
  - Falta a aba Itens do Vendedor e a imagem do "+ Mostrar mais".
- **Previsão do BUILD PRONTO da v1.0.5 (demo):**
  - ensaio às 17h;
  - lote e build às 19h;
  - **APKs prontos por volta das 21h (Manaus) de hoje, 12/11.**
  - O Oficial sai do mesmo commit depois do seu teste, com a produção também na v1.0.5.

**5. Limite de desconto por item ou por pedido** (R-20261112-080845)
- Vira a tarefa **T-0168**. Mexe no cadastro do usuário no BKO, no sync, na API e nas regras RN-VEN-10, RN-VEN-11 e RN-VEN-03, e ainda precisa da sua aprovação da simulação.
- **Não cabe na v1.0.5 sem atrasar o build.** Proponho a **v1.0.6**:
  - a RN no doc 03 e a simulação para você aprovar saem hoje;
  - a implementação começa depois do build da v1.0.5.
- Se quiser na v1.0.5 mesmo assim, o build vai para amanhã cedo.

## O que preciso
- Confirmar o e-mail do super-admin (ou trocar).
- Aprovar a T-0168 na v1.0.6.

## Pronto quando
Você responde os dois pontos.
