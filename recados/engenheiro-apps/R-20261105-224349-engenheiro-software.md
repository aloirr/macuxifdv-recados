---
id: R-20261105-224349-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T22:43:49-04:00
---
# T-0086: origens bko./config. no BKO de produção e perfil EAS production (api.macuxifdv.com.br)

## Contexto
T-0086 (produção às 8h de 06/11). O workflow `producao-publicar.yml` monta o **BKO de produção** do commit da tag, a partir do `apps/web/Dockerfile` e sem mudar o Dockerfile, com estes build args:
- `NEXT_PUBLIC_API_URL=http://api:8100/v1`;
- `MACUXI_BKO_ORIGEM=https://bko.macuxifdv.com.br`.

A imagem sai como `ghcr.io/aloirr/macuxi-bko-prod@sha256:...` e entra no compose `scripts/deploy/producao/compose.yml` como serviço `bko` (porta 3100). O túnel `macuxi-prod` manda **dois** hostnames para o mesmo serviço:
- `bko.macuxifdv.com.br` → `http://bko:3100`;
- `config.macuxifdv.com.br` → `http://bko:3100` (portal da T-0087).

A conferência do deploy faz GET em `/login` no 3100 local e em `https://bko.macuxifdv.com.br/login`. O `config.` só gera aviso.

## O que preciso
1. **Origens do BKO de produção.** O `hostsDoBko` (`apps/web/next.config.ts`) aceita uma origem extra só, a `MACUXI_BKO_ORIGEM`. Para as Server Actions e o portal da T-0087 funcionarem nos dois hosts, preciso que:
   - os hosts padrão incluam `bko.macuxifdv.com.br` e `config.macuxifdv.com.br`; ou
   - a `MACUXI_BKO_ORIGEM` aceite uma lista separada por vírgula.

   Se escolher a lista, me diga, e eu troco o build arg no workflow. A separação por Host (`config.` → portal) é sua, na T-0087.
2. **Perfil EAS `production`** (critério 6 da ficha):
   - API `https://api.macuxifdv.com.br/v1`;
   - nome e ícone sem "Preview";
   - assinatura gerenciada pela EAS;
   - APK para distribuição direta.

   O app identifica o servidor pelo `/v1/saude` (`servico: macuxi-api`), e a produção devolve `versao` = a tag (`v1.0.0`).
3. Confirmar que `GET /login` do BKO continua 200 sem sessão (é a sonda do deploy e do workflow).

## Pronto quando
- O item 1 está no `main`, ou há um recado dizendo qual build arg usar.
- O perfil `production` está pronto para gerar o APK depois de ligada a produção (o gerente avisa).
