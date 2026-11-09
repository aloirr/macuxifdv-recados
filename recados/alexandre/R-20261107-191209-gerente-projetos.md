---
id: R-20261107-191209-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0111
responde_a: R-20261107-185546-alexandre
encerra: false
contrato: null
criado_em: 2026-11-07T19:12:09-04:00
---
# Perfis de acesso: T-0111 e T-0112, motor junto com a T-0094, nova previsão (build ~07h de 08/11) e o desenho da tela para aprovar

Decisão aplicada: o motor de permissões entra junto com a T-0094, e a página corre em paralelo.

TAREFAS (dono · ordem)
- T-0111 Perfis de acesso no BKO e motor de permissões por perfil · engenheiro-software (ADR e motor no SDK), banco-dados (perfil personalizado, perfil_permissao, padrão de fábrica, nenhum usuário sem perfil), modulo-core (domain dos limites, rotas e página), designer-ux, testes · o motor JÁ, junto com a T-0094; a página depois do seu ok no desenho abaixo.
- T-0112 Multiperfil (do seu R-20261107-173950 c) · banco-dados, modulo-core, engenheiro-software · junto com a T-0111, que usa o mesmo motor.
- T-0094 deixou de ter regra fixa no código: consulta usuario.criar, usuario.editar, usuario.desativar, senha.redefinir (com os perfis-alvo) e perfil.gerir. As P2, P5–P8 e "o super-admin redefine a senha do admin pelo portal" são o padrão de fábrica.
- Docs atualizados:
  - doc 02: RF-CORE-02 e RF-CORE-03;
  - doc 03: a matriz do §2 virou "padrão de fábrica editável", com os limites travados (RN-CORE-33, RN-PRO-01, último admin, RN-CORE-32), e a RN-CORE-01 ganhou o multiperfil.
  - A ADR do modelo de permissões fica com o engenheiro-software, logo depois da revisão final da T-0093.

NOVA PREVISÃO (agora ~19h de 07/11)
- T-0093: revisão final em andamento, mais as colunas da T-0095 que entram no mesmo lote. Lote com CI e stack isolado: 20h–21h. "demo — super-admin" liberado ~21h30 (aviso com o sha).
- T-0094 com o motor:
  - ADR e motor no SDK: 20h–22h;
  - banco (0040 + perfil_permissao): até 23h30;
  - Core (troca obrigatória, esqueci a senha, redefinição, consulta ao motor): 22h–01h;
  - telas do app e do BKO: 23h–02h;
  - envio de e-mail (N5, nuvem): depende de você abrir a sessão, com o complemento do R-20261107-180311;
  - testes: 02h–03h30;
  - revisão: 03h30–04h30;
  - lote: 04h30–05h30 de 08/11.
- Build único Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0: ~06h30–07h30 de 08/11. Antes eu tinha dito ~03h30; o motor somou ~3–4 h.
- Página Perfis de acesso: ~4 h depois do seu ok no desenho. Se o ok vier hoje, ela entra no build; se vier amanhã, vem no build seguinte. O motor e os valores de fábrica já valem no build de qualquer jeito.

DESENHO DA TELA (aprovar antes das telas; o mesmo texto está em .coord/tarefas/T-0111.md)
Onde: BKO → Administração → Perfis de acesso. Só quem tem "Gerenciar perfis de acesso" vê a página (no padrão de fábrica, só o admin).

1. Lista:
   - colunas Nome · Perfil base · Onde entra (Campo/Gestão/BKO/Portal) · Usuários (n) · Situação;
   - ações Editar · "Novo a partir deste" · Desativar (só perfil personalizado e sem usuários);
   - botão "Novo perfil" (nome + perfil base: Vendedor, Promotor, Supervisor, Gerente, Analista, Assistente ou Admin);
   - os perfis de fábrica têm o selo "Padrão" e não se apagam.
2. Editar perfil, em seções. O "Salvar" mostra um resumo do que mudou antes de gravar.
   1) Identificação: nome, perfil base (só leitura depois de criado), descrição, situação.
   2) Onde entra: Campo · Gestão · BKO · Portal. 🔒 BKO e Portal travados em "não" nos perfis com base vendedor, promotor ou supervisor (RN-CORE-33); Portal só no admin.
   3) Escopo de dados: carteira própria · equipe · toda a empresa (herda da base e pode reduzir).
   4) Módulos: os módulos licenciados do tenant (o Core sempre ligado 🔒). É o padrão de módulos do perfil.
   5) Usuários e senhas: criar usuário · editar · desativar · redefinir senha → DE QUAIS PERFIS (lista; sem o admin; nunca a própria) · gerenciar perfis de acesso. 🔒 O admin não tira de si a gestão de usuários e perfis; sempre há um admin ativo.
   6) Clientes: ver o Cliente 360 (carteira · equipe · empresa) · transferir cliente de carteira.
   7) Pedidos: criar e editar (próprio · em nome da equipe · qualquer) · cancelar (próprio · equipe · empresa) · excluir rascunho · ver pedidos (próprios · carteira · equipe · empresa) · aprovar desconto e crédito (não · até a alçada · acima) · "Vê os pedidos da carteira" (promotor_ve_pedidos). 🔒 Os perfis com base promotor nunca criam, editam nem cancelam pedido (RN-PRO-01).
   8) Catálogo: consultar com ou sem preço e estoque (promotor_ve_preco_estoque) · conteúdo, sinônimos e destaques · exportar o catálogo.
   9) Trade: fazer coletas · cadastros de trade (mix, metas de share, marcas, planogramas, checklists, tarefas).
   10) Pesquisa e Treinamento: responder · criar pesquisa e trilha · ver resultados e adesão.
   11) Metas e remuneração: criar e editar metas (equipe · empresa · só leitura).
   12) Integração: ver o monitor · carga por arquivo · baixar os modelos CSV.
3. Regras da tela:
   - o cadeado mostra a regra ao passar o mouse ou tocar;
   - toda alteração é auditada (quem, quando, antes e depois) e vale na próxima requisição, sem novo login;
   - a tela recusa, com o motivo, qualquer mudança que deixe a empresa sem admin capaz de gerir usuários.
4. Formulário de usuário: campo "Perfis" com seleção múltipla, obrigatório pelo menos 1. A tela mostra os módulos efetivos resultantes (a união dos perfis, ∩ a licença, − as exceções).

Para aprovar, responda "ok no desenho da T-0111" ou mande os ajustes (grupos, nomes, o que falta). Até lá, as telas não começam; o motor segue.
