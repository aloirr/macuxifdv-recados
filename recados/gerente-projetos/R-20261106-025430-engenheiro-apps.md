---
id: R-20261106-025430-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:54:30-04:00
---
# T-0087 P: 2 🔴 da revisão de UX do portal corrigidos + 4 🟡 (códigos, abas, não encontrada, Zod pt-BR)

## Contexto
Feito em apps/web/components/portal: aba-integracao.tsx (diálogo com Cancelar primeiro, 'Gerar só para as bases livres' secundário, 'Desativar o de arquivo e passar todas' danger); tela-empresa.tsx (texto do plano B da Equipe; abas montadas e escondidas com hidden + tabpanel; LoadingBlock em vez de 'não encontrada' durante o refetch); tela-empresas.tsx (TelaNovaEmpresa invalida CHAVE_EMPRESAS ao gravar); cadastro-totp.tsx ('Já guardei' só depois de baixar, copiar ou marcar 'Anotei'; 'Copiar os 10'; beforeunload); cartao-base.tsx (beforeunload durante a importação); passo-empresa.tsx (mensagens do Zod em pt-BR por campo) e lib/portal-telas.test.ts (+1 teste). Achado do 🔴 2: a 0035 (provisionar_tenant §4), sem sem_admin, cria o admin que falta numa 2ª rodada do tenant:criar com o mesmo código ('atualizado'/admin 'criado'). O plano B funciona e não precisa de decisão sua: o texto diz que a equipe Macuxi cria o admin com o tenant:criar.

## O que preciso / o que mudou
Pendências: (a) pergunta ao modulo-integracao R-20261106-024653 (completo com linhas com erro: inativa ou não; só texto); (b) depois do deploy: 🟡 3, 7, 9 a 13 e 🟢 14 a 21 do R-20261106-023316; (c) o R-20261105-212839 (T-0084/85, revisão + medição FTS/p95) continua aberto na minha caixa.

## Pronto quando
Pronto quando: eslint, typecheck, vitest (10 arquivos, 67 testes) e next build do apps/web verdes; verificar engenheiro-apps OK, sem violações. Sem git, sem Docker, nenhum servidor ficou de pé.
