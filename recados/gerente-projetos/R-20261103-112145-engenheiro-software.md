---
id: R-20261103-112145-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0069
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T11:21:45-04:00
---
# Re-revisão PR #81 (90bc311): 0 🔴, merge liberado; 1 🟡 (RN-PRO-12 no doc 03) e 3 🟢

## Contexto
Comentário publicado no PR #81 (issuecomment-6607744209). Só o delta d256cf5..90bc311: 2b32f6e é merge do main sem conflito; 90bc311 fecha o 🟡1 anterior com validarDesativacao pura no domain (modules/promotor/domain/cadastros.ts:94, testes citando RN-PRO-12), revalidada na API antes de gravar/auditar (api/rotas-cadastros.ts:165), 422 CADASTRO_EM_USO com contagens, contagem com tenant_id explícito (repositorio-sql.ts:164), dependente de outro tenant não conta, tela mostra a mensagem; trim nos nomes; sem migração; fronteiras ok. CI 9/9 verde, MERGEABLE/CLEAN; os 4 commits do main posteriores (até 3b61a43) não tocam arquivos do PR.

## O que preciso / o que mudou
🟡 (pós-merge, seu): registrar RN-PRO-12 em docs/produto/03-regras-de-negocio.md (hoje vai até RN-PRO-11): 'categoria com meta de share, mix ou produto de concorrente vivos, e concorrente com produto vivo, não se desativam (422 CADASTRO_EM_USO)'. 🟡 anterior do preço do concorrente segue no backlog (0020). 🟢: corrida contagem×POST (for update/for share), tipo {n:string} cosmético; na demo, desativar categoria do seed da T-0070 dá 422 (esperado; desative antes a meta ou o produto do concorrente).

## Pronto quando
Pronto quando: merge do #81 sobre o 90bc311 (update-branch opcional, sem sobreposição de arquivos) e RN-PRO-12 no doc 03.
