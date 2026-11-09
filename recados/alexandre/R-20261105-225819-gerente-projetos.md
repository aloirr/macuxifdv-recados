---
id: R-20261105-225819-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:58:19-04:00
---
# Status das 23h (05/11): lotes AB e 86 em verificação, nuvem #98/#99 prontos, 3 confirmações e 3 cortes propostos

## Contexto
Status das 23h de 05/11. Mostra o que subiu, o que está em verificação, o que falta e os cortes que proponho. Os próximos saem às 2h e às 6h, e também quando a produção estiver pronta para ligar.

## Subiu ao main desde as 20h
- **Lote S** (0263f9f..a78ce03): coordenação, mais a T-0084 e a T-0085 abertas com as regras no doc 02 e no doc 03.
- **Lote T** (a78ce03..2b63743):
  - job do CI sem superusuário, verde já na 1ª execução;
  - desenho das fatias;
  - doc 06 com aplicação, referências e oferece junto;
  - checklist de segurança com as provas da T-0078.

## Em verificação agora
| Lote | O que traz | Situação |
|---|---|---|
| **AB** (T-0084 fatia A + T-0085 fatia B) | **Migração única 0033.** **Catálogo:** `expandirAplicacao` (ano dentro de faixa), "Serve em", ranking com o peso da aplicação, referência cruzada e "Equivale a", FTS do aparelho v3, cadastro do Catálogo no BKO. **Vendedor:** caixa por item, retrato em 300, API, PDFs e pedido em nome do vendedor | 1º CI com **3 testes de shell vermelhos**. A causa é o pedido em nome: o supervisor agora tem o novo pedido no Gestão, e os testes esperavam que não. O testes está ajustando sem afrouxar a regra 7. A revisão do engenheiro, por fatia, está em andamento. **Meta 24h: dentro, se a revisão não trouxer 🔴.** |
| **86** (T-0086, produção) | Compose sem Postgres local, `banco-dbaas.sh`, deploy com volta atrás automática, alerta instalado pelo deploy, ADR 0028, workflow "producao — publicar" | CI verde. No ensaio da produção no stack isolado, **todas as etapas reais passaram**: 2 deploys, TLS, admin sem superusuário, volta atrás com imagem quebrada, alerta e tenant:criar. Só falhou o passo que monta o resumo (uma linha), já em correção. O roteiro de ligar está em `docs/status/producao.md`. |

## Nuvem
- **PRONTO PARA MERGE:**
  - **#99**, T-0087 N2 (OpenAPI 3.1 gerado dos contratos e guia do TI);
  - **#98**, T-0087 N3 (carga em partes, 20 mil linhas em 4 partes).

  O merge sai pela regra A logo depois das revisões, nas próximas vagas.
- **Sem a marca de pronto:** #97 (N1, modelos CSV), #96 (C, exportação) e #95 (D, lista por linha). C e D ligam ao contrato real quando o lote AB estiver no main.

## Preciso de você
1. **Confirmar 3 workflows de produção** que a sua mensagem não cita pelo nome:
   - `producao-tenant.yml`: tenant:criar na produção, manual e com a sua aprovação;
   - `producao-ensaio-restauracao.yml`: ensaio de restauração, manual e com a sua aprovação;
   - o job `stack-producao` no `stack-isolado.yml`, que ensaia a produção no CI.

   Estão no ramo de verificação e só sobem ao main com o seu "ok".
2. **Checagem do trailer:** aplicar o patch no `scripts/coord.mjs` (R-20261105-214336).
3. **Mais agentes:** com o limite de 4 agentes locais, este é o gargalo. Se puder liberar 6, não corto nada da T-0087.

## Cortes que proponho (para não adiar em silêncio)
1. **T-0087 até as 12h de 06/11.** Entra:
   - o portal com o passo **Empresa** (tenant:criar por baixo), o acesso de super-admin com 2º fator e a auditoria;
   - os **cartões das bases**: importar, conferir sem gravar, erros por linha, baixar erros e modelo, com o N1 e o N3;
   - a aba **Integração** (credencial, Conector e documentação do N2).

   Corto até a tarde de 06/11:
   - a **Equipe por CSV com convite de 1º acesso**, porque o convite por e-mail pede um envio de e-mail que não existe hoje;
   - o aceite de ponta a ponta com o APK.

   **Motivo:** com 4 agentes, a T-0086 e as fatias A e B têm prioridade até as 8h.
2. **Referência cruzada no servidor (fatia B).** Ela sobe com a referência no aparelho e no BKO. Aceitar a marca na API depende da consulta `promotor.concorrentes@1`, que o Promotor ainda vai publicar. Faço isso logo depois do lote AB, e não às 24h.
3. **Backup diário de produção.** O timer está pronto, e os dois scripts do banco-dados entram antes das 8h. Se não entrarem, a produção liga sem backup e eu aviso na hora.

## Já com você
- custo do BV1-4-10;
- apagar a instância do DBaaS e o secret;
- conferência nos APKs;
- números da medição.
