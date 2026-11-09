---
id: R-20261107-165725-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261107-164646-alexandre
encerra: true
contrato: null
criado_em: 2026-11-07T16:57:25-04:00
---
# Esteira permanente aplicada: CLAUDE.md, doc 07 e backlog; 18 itens com tarefa, dono e ordem; 4 vagas ocupadas

A regra permanente está aplicada.

Registro:
- CLAUDE.md, parágrafo "Esteira permanente";
- docs/produto/07-agentes-e-coordenacao.md, §4 "Esteira permanente" (e a §5, com o nome e a versão dos builds);
- docs/backlog.md, seção "Regra", com o único item autorizado (a revisão de segurança do login);
- aviso a todos no recado de hoje para todos.

Itens trazidos para a esteira (tarefa · dono · onde · ordem), depois de T-0093 → T-0094 → build único:
1. T-0109 nome e versão dos builds · engenheiro-apps · nuvem N6 · já (entra antes do build único).
2. T-0108 kit do TI do cliente · modulo-integracao · nuvem N4 · já.
3. T-0094 envio de e-mail · engenheiro-software · nuvem N5 · já.
4. T-0096 faixa aberta de ano (prazo 31/12) · modulo-catalogo · nuvem N7 · já.
5. T-0099 Conector: ordem divergente e "nulo: limpa" · modulo-integracao · nuvem N8 · já.
6. T-0097 miniatura do produto no pull · modulo-catalogo · nuvem N9 · já.
7. T-0105, só o lint hora-fixa virando erro (prazo 16/11) · engenheiro-software e cada dono · local · antes de 16/11.
8. T-0095 ERP: guarda de ordem e não reativar o que o admin desligou · banco-dados, core, catálogo, integração · local · 1ª depois do build (antes do 1º tenant real).
9. T-0098 download do Conector por link temporário · engenheiro-software, integração, engenheiro-apps · local · 2ª (depois das telas da T-0093, porque mexe no portal).
10. T-0100 carga self-service e modelos CSV ao admin no BKO · integração, engenheiro-apps, designer-ux · local · 3ª.
11. T-0101 Vendedor: triagem de 05/11 e acabamento visual · vendedor, core, designer · local · 4ª.
12. T-0102 Core: etapa pendente, positivação do mês, base recriada, RN-CORE-12, canApprove, limpeza de sessões · core, banco, engenheiro · local · 5ª.
13. T-0103 Integração: aplicar-lote com parâmetros do tenant e aviso de marca no monitor · integração, catálogo · local · 6ª.
14. T-0104 Kit: Tabs, Progress, ButtonLink e cartões das bases do portal · designer, integração, engenheiro-apps · local · 7ª.
15. T-0105, o resto: zod ≥ 4.6.6, job de desempenho, relógio deslocado, CI sem superusuário, feriados, gh no PATH do guardião · engenheiro-software, banco · local, com diff de .github para o seu ok · 8ª.
16. T-0106 Treinamento: 🟡 e tabela de XP · treinamento, banco · local ou nuvem, o que vagar · 9ª.
17. T-0107 carga com 20 mil SKUs e onboarding · testes, engenheiro · local · 10ª.
18. T-0110 conferência dos itens antigos do backlog (Sprints 0 a 2), que parecem feitos · gerente e testes · contínua, sem ocupar vaga.

Riscos:
- A T-0098 e a T-0104 mexem no portal, onde está a fatia W da T-0093: entram depois dela.
- A N7 e a N9 são do mesmo módulo, em arquivos diferentes: a que entrar por último puxa o main.

Precisam de decisão sua (não estão em backlog, aguardam você):
a) o seletor de clientes no pedido em nome filtra pela carteira do vendedor dono? (RN-VEN-35);
b) referência cruzada para tenant sem o Promotor (ADR 0027): licença "tenant" ou cadastro de marcas no Catálogo?;
c) a exceção do usuário pode acrescentar módulo? (RN-CORE-01);
d) itens de roteiro sem data: Conector v2 com atualização automática, adaptadores Firebird e MySQL, cancelamento devolvido ao ERP, campo "canal" no cliente. Entram já, ou ficam no roteiro (doc 05)?

Quadro: as 4 vagas locais estão ocupadas, todas na T-0093 (prioridade 1):
1. banco-dados (B);
2. modulo-core (C, entregue; fecha a suíte completa e as senhas de fixture);
3. engenheiro-software (S);
4. engenheiro-apps (W).
Quando uma vaga se liberar, entra a próxima da fila: o desenho da T-0094, depois a T-0105 do lint, depois a T-0095. As 6 frentes da nuvem estão reservadas no quadro, com os prompts no R-20261107-164452.
