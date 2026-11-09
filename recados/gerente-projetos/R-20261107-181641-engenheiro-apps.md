---
id: R-20261107-181641-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:16:41-04:00
---
# T-0093 W: correções da revisão de UX do portal (sem laço no 403, 6 🟡, 3 🟢)

## Contexto
As correções da revisão R-20261107-174216 estão em apps/web. 403 na Escolha: a empresa sai da lista e também da sessão (sessaoSemEmpresa), e o aviso info diz o nome dela. Se sobra 1 empresa, a tela entra direto nela; se não sobra nenhuma, a sessão acaba e o Entrar mostra o aviso. A empresa da chamada vem do x-macuxi-tenant, passado agora a desviarPeloErro; sem ele, vale a atual. Os outros 🟡: o subtítulo do Entrar saiu; os dois Sair têm min-h-11; o erro antigo do admin some ao digitar; o Conferir diz 'a senha não muda.'. Os 🟢: IconEye e IconEyeOff do kit no CampoSenha (o SVG local saiu); aria-label 'Entrando em <nome>…'; o nome da empresa antes de 'Sessão até' no cabeçalho. Não mudaram o login, a lista branca, o rewrite nem o config-demo. Arquivos: lib/portal-sessao.ts, lib/portal-api.ts, components/portal/{tela-escolher-empresa,tela-entrar,base,passo-empresa}.tsx, lib/portal-escolha.test.ts (4 testes novos do 403), lib/portal-telas.test.ts.

## O que preciso / o que mudou
Pendências: (1) o 🟢4 (RegrasDaSenha no tela-convite) fica para a T-0094; (2) quando sobra 1 empresa e o portal entra direto nela, o aviso com o nome da que saiu não chega à página da empresa: é a regra de 1 empresa da spec; (3) premissa: o POST auth/empresa aceita o token da empresa que deu 403, e se a API recusar a sessão acaba com o aviso.

## Pronto quando
Resultado: eslint e tsc limpos, vitest com 131 testes passando (código 0) e next build com código 0; verificar engenheiro-apps OK.
