---
id: R-20261106-021614-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:16:14-04:00
---
# T-0087 P: revisão de UX das telas do portal config. (entrar com 2º fator, primeiro acesso/TOTP, empresas, passo Empresa, cartões das bases, Integração)

## Contexto
T-0087 P (portal `config.macuxifdv.com.br`, ADR 0029): as telas do portal estão prontas no apps/web, com o visual do `@macuxi/ui/web` (Panel, PageHeader, Notice, Badge, Bar, Dialog, Button, tokens do BKO). Portal no ar até 12h de 06/11; revisão conjunta 6h-9h.

Como ver no PC (sem API, sem Docker): `NEXT_PUBLIC_PORTAL_FALSO=1 pnpm --filter web dev` e abra `http://config.localhost:3000/` (o portal só existe no host `config.`; em `localhost:3000/config` dá 404 de propósito). No modo falso: qualquer convite com 32+ caracteres, senha com 12+, qualquer código de 6 dígitos (o `000000` mostra o erro); no CSV, linha sem `external_id` na 1ª coluna ou com a palavra "erro" vira erro de linha.

Arquivos:
- `apps/web/components/portal/base.tsx` (moldura, cabeçalho com "Sessão até HH:MM" e Sair, campo, LinkBotao, faixa do modo falso)
- `apps/web/components/portal/tela-entrar.tsx` (e-mail + senha → código de 6 dígitos ou "Usar código de recuperação")
- `apps/web/components/portal/tela-primeiro-acesso.tsx` + `cadastro-totp.tsx` (QR + chave em grupos de 4 → confirmar → 10 códigos UMA vez, "Baixar .txt" e "Já guardei, continuar")
- `apps/web/components/portal/tela-empresas.tsx` (lista e "Nova empresa") e `passo-empresa.tsx` (razão social, CNPJ com máscara, código sugerido, fuso, módulos com licenças — Core e Integração marcados e travados —, parâmetros iniciais; "Conferir sem gravar" e "Criar empresa")
- `apps/web/components/portal/tela-empresa.tsx` (abas Bases | Integração automática | Empresa; cartão Equipe "em breve")
- `apps/web/components/portal/cartao-base.tsx` (um cartão por base na ordem do Hub: Baixar modelo e Dicionário logo abaixo do título, arquivo, Delta/Completo, Conferir sem gravar, Importar CSV, barra de progresso com partes acima de 5.000 linhas, status, erros por linha, Baixar erros; confirmação do modo completo)
- `apps/web/components/portal/aba-integracao.tsx` (Conectores, credencial mostrada uma vez com Copiar e aviso, link do Conector "em breve", OpenAPI)

## O que preciso
Revisão de UX (visual, hierarquia, textos, 3 toques) das telas acima, com 🔴/🟡/🟢 e arquivo:linha. Pontos em que quero a sua opinião: (1) textos de erro do 2º fator e do primeiro acesso; (2) densidade do cartão de base (12 cartões numa página) — se prefere cartão recolhido depois de concluído; (3) a confirmação do modo completo; (4) se algum componente daqui deveria ir para o `packages/ui` (ex.: barra de progresso com rótulo, abas).

## Pronto quando
Recado com a revisão (ou "sem 🔴") até 8h, para eu corrigir antes do deploy das 9h.
