---
id: R-20261105-132717-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:27:17-04:00
---
# Revisão final T-0052 (B1-B4): sem 🔴; 🟡 destaque, sinônimo 23505, teste de banco das escritas e texto da semântica

Contexto: revisão final das correções B1-B4 (git diff origin/main -- modules/catalogo docs/modulos/catalogo). Testes do @macuxi/catalogo verdes no PC (464 passaram, 24 de banco pulados por falta de Docker; esses rodam no CI). Sem 🔴.

O que conferi e está certo:
- RLS e tenant: todo SQL novo roda no cliente da transação do tenant (ctx.comTenant). Os INSERT usam plataforma.tenant_atual(). As tabelas da 0013 têm RLS forçado com política por tenant.
- Regra 1: nenhuma leitura de core.* (o teste de rotas.test.ts confere). O cadastro vem só por core.cadastro_resumo@1.
- Licença: as rotas passam pelo SDK. O pull só serve provedor de módulo efetivo (apps/api/src/sync.ts).
- Regra 7 / RN-PRO / RN-CAT-05: sinonimo, produto_atributo e produto_conteudo não levam preço nem estoque. deposito e estoque_saldo seguem travados por verPrecoDoPerfil (api/sync.ts, puxar). A escrita do promotor dá 403 (testes, B-A4).
- Contratos do sync: aditivos. As colunas batem com contracts/sync-conteudo.ts (termo/sinonimos/ativo; produto_id/nome/valor/ordem; produto_id/descricao/argumentos/faq/campanha). O app que já conhecia as entidades parava no 501 com aviso e agora recebe as linhas. O app que não conhece as entidades não as pede.
- Idempotência: os PUT usam o id do cliente com upsert, e o DELETE é 204 idempotente. A remoção é lógica, com updated_at pelo trigger, então o pull leva o deleted_at.
- RN-CAT-03: o débito da cota é atômico no banco (debitar_cota_ia), numa transação própria e só depois de o provedor responder.
- Dinheiro: o código novo não mexe com dinheiro. O estoque é arredondado para o inteiro do contrato.
- B1: a forma compacta do SKU funciona no domain (casaComCodigo e o campo de código do ranking) e no FTS5 (coluna codigos de app/indice.ts).
- zz-tempo.test.ts não existe na árvore nem no histórico do git. Confirme que foi descartado e que não volta.

O que preciso:

🟡1 modules/catalogo/api/repositorio-postgres.ts:189 (marcarDestaque) grava só `campanha`, mas a leitura usa `(campanha or destaque)` (repositorio-postgres.ts:50 e api/sync.ts, produto_conteudo). A base demo grava destaque=true em DET-5L e OLE-4T-1L (db/seeds/demo/demo.ts:302). Resultado: "desmarcar destaque" no BKO não tem efeito e a auditoria registra is_campaign=false mesmo assim. Correção: o PUT de destaque grava as duas colunas (insert (campanha, destaque) values ($2, $2); on conflict ... set campanha = excluded.campanha, destaque = excluded.destaque). Inclua um teste.

🟡2 repositorio-postgres.ts:175 (salvarSinonimo). O índice único sinonimo_termo_uk (tenant_id, lower(termo)) where deleted_at is null também vale para grupo INATIVO, mas conflitoDeSinonimo (domain/conteudo.ts:37-39) ignora os inativos e o grupo novo inativo. Criar "moto" com outro id quando já existe um "moto" inativo (ou salvar um inativo com o termo de um ativo) estoura 23505 e devolve 500. Correção: o repositório converte 23505 de sinonimo_termo_uk em ErroHttpModulo(409, 'SINONIMO_EM_CONFLITO'). E, se a regra for "um termo vivo por tenant", alinhe o domain com teste citando a RN.

🟡3 Nenhum teste de banco cobre as escritas do BKO. rotas.test.ts usa um banco falso, e as B-A6..A8 do agente testes cobrem só leitura e pull. Ficam sem prova real: o ON CONFLICT com inferência do índice parcial, o xmax = 0 do `criado`, a troca da lista de atributos e o conteudo()/enriquecer(). Crie modules/catalogo/api/repositorio-postgres.db.test.ts (roda no CI) com estes casos: PUT de sinônimo duas vezes (criado true, depois false); destaque marcar e desmarcar na linha da seed; salvarConteudo duas vezes, em que o atributo removido sai com deleted_at e aparece no pull; o tenant B não vê nem grava no A; insert no busca_log.

🟡4 docs/modulos/catalogo/ponta-a-ponta.md:40 diz "Assim a semântica é a mesma em qualquer tamanho". A afirmação não é exata em local.ts:147-157:
(a) a varredura completa só entra quando NENHUM termo tem acerto. Um termo com erro de digitação junto de termos certos ("cafee pilao") perde os candidatos dele, e o catálogo pequeno toleraria esse erro;
(b) o corte em 150 por termo pelo bm25 pode deixar de fora produtos que o ranking do domain poria antes (campanha, estoque);
(c) só entram 8 grupos.
Ajuste o texto para "equivalente, exceto (a)-(c)", ou trate (a) no código (🟢5).

🟢5 local.ts: quando um termo não tem acerto no FTS5, consultar o prefixo dele (3-4 letras, prefixoNoUltimo) aproxima a tolerância a erro de digitação sem cair na varredura de 20 mil produtos.
🟢6 domain/ranking.ts:156 codigoCompacto e app/indice.ts:20 compacto são duas implementações da mesma forma compacta. Use uma só (a do domain) para o índice e o ranking não divergirem.
🟢7 api/rotas.ts:157: o insert no busca_log está na transação da resposta, então uma falha no registro derruba a busca. Faça o registro como "melhor esforço" (try/catch com log.warn sem o termo).
🟢8 repositorio-postgres.ts:203: argumentos_venda é gravado com join('\n'). Um argumento com quebra de linha vira dois na volta. Proíba '\n' no Zod de selling_points ou documente.

B4 (SDK, só proposta, nada implementado): o motor já tem motor.linhasPorIds(e, ids) (packages/platform-sdk/src/motor-sync.ts:1437), que você pode usar hoje para os candidatos de `produto`. Vou propor ao gerente: (1) motor.versaoLinhas(entidade), um contador que muda no aplicar/limpar/troca de geração, para o Catálogo memorizar produtos, vocabulário e sinônimos e reler só quando mudar (some com os ~140 ms a partir da 2ª busca); (2) motor.linhasPorCampo(e, campo, valores[]) (json_extract IN no SQLite) para estoque_saldo, tabela_preco_item e produto_atributo por produto_id dos candidatos (some com os ~120 ms do contextoLocal); (3) motor.contarLinhas(e), já que LinhasSync.contar existe. Não recomendo um cache genérico de linhas no SDK, pela memória do aparelho e pela invalidação com a sobreposição. Espere a decisão do gerente antes de depender disso.

Pronto quando: 🟡1 a 🟡3 corrigidos com teste (o .db.test verde no CI) e 🟡4 com o texto ajustado. Os 🟢 ficam a seu critério. Responda com --responde-a. Os 🟡 não bloqueiam o lote da demo (36 produtos), mas o 🟡1 aparece na demo se alguém desmarcar o destaque de DET-5L ou OLE-4T-1L. Por isso peço que ele entre antes do deploy.
