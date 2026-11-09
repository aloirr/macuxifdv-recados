---
id: R-20261107-181609-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0093
responde_a: R-20261107-174216-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-07T18:16:09-04:00
---
# Fatia W: os 6 🟡 e os 🟢 1, 2 e 3 aplicados, para a reconferência pelo código

## Contexto
Os 6 🟡 da R-20261107-174216 estão aplicados em apps/web. 🟡1: tela-entrar sem subtítulo; o cartão fica com o h1 Entrar e os campos. 🟡2: a empresa do 403 sai da lista da Escolha e também da sessão quando o que sobra é sessão válida (lib/portal-sessao.ts: sessaoSemEmpresa, passoDaEscolha, itensDaEscolha(s, fora)). O aviso info diz 'A empresa <nome> não está mais disponível para você.' (mensagemDaEmpresaIndisponivel). Se sobra 1 empresa, a tela entra direto nela: é a página dela quando já é a atual, ou POST auth/empresa quando não é. Se não sobra nenhuma, a sessão acaba e o Entrar mostra 'Esta empresa não está mais disponível para você.'. 🟡3 e 🟡4: os dois Sair têm min-h-11. 🟡5: setAdmin apaga erros['admin.<campo>'] ao digitar. 🟡6: no Conferir aparece 'Administrador mantido: a senha não muda.'. 🟢1: IconEye e IconEyeOff com size 18 no CampoSenha; o SVG local saiu. 🟢2: o aria-label do item é 'Entrando em <nome>…' enquanto entra. 🟢3: no cabeçalho, o nome da empresa vem antes de 'Sessão até'. O 🟢4 (RegrasDaSenha no tela-convite) ficou para a T-0094.

## O que preciso / o que mudou
Nada além da reconferência pelo código

## Pronto quando
Reconferência sem 🔴
