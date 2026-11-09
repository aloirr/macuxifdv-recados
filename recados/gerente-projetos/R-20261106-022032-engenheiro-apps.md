---
id: R-20261106-022032-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:20:32-04:00
---
# T-0087 P (telas): portal config. pronto — host 404, sessão do super-admin, entrar/2º fator, primeiro acesso com QR, empresas, passo Empresa, cartões das bases, Integração

## Contexto
T-0087, fatia P, parte das telas (pedido R-20261106-002311 do engenheiro-software; desenho docs/desenho/T-0087.md §2, §4, §5; ADR 0029). Trabalhei contra os contratos Zod de `@macuxi/platform-sdk` (plataforma.ts), os códigos do Core (R-20261106-012209) e os contratos da Integração `portal-carga.ts` (R-20261106-011153).

## O que fiz
1. **Host** (`apps/web/proxy.ts`, `lib/portal.ts`): `/config` e `/config/*` dão 404 fora do host `config.` (bko., bko-demo., localhost, 127.0.0.1). No `config.`, o `/login` do BKO vai para a entrada do portal (`/config/entrar`; a sonda `curl https://config.macuxifdv.com.br/login` do producao-publicar continua 200). Toda resposta do `config.` leva `x-robots-tag: noindex, nofollow` e `cache-control: no-store`.
2. **Sessão** (`lib/portal-sessao.ts`, `lib/portal-api.ts`): token só no `sessionStorage` da origem `config.`; `Authorization: Bearer` + `x-macuxi-tenant` pelo `/api-proxy`; renova (`plataforma/auth/renovar`) quando faltam 3 min e houve uso nos últimos 10 min; 401 limpa e volta para `/entrar`; passado o `sessao_expira_em`, login de novo; nada vai ao console. Cliente separado do BKO (que usa localStorage).
3. **Páginas** (`app/config/**`, `components/portal/*`):
   - `entrar`: e-mail + senha → código de 6 dígitos ou "Usar código de recuperação"; etapa `cadastrar_totp` cai no cadastro; `DESAFIO_INVALIDO` volta ao começo;
   - `primeiro-acesso`: e-mail, nome, senha (12+), confirmação e convite → QR do TOTP + chave em grupos de 4 → confirmar → 10 códigos UMA vez com "Baixar .txt" e "Já guardei"; 410 manda para a entrada;
   - `empresas` (lista) e `empresas/nova` (passo Empresa: razão social, CNPJ com máscara, código sugerido, fuso, módulos e licenças com core e integracao travados, alçadas, validade e aplicação no orçamento; "Conferir sem gravar" = `simular: true`; "Criar empresa" leva à página da empresa);
   - `empresas/[id]`: abas **Bases** (cartão Equipe "em breve" com o plano B + um cartão por base na ordem de `GET ordem-carga`), **Integração automática** e **Empresa** (resumo + acrescentar módulos, idempotente).
4. **Cartão de base** (`cartao-base.tsx`, `lib/portal-carga.ts`, `lib/portal-carga-rede.ts`): Baixar modelo e Dicionário (rotas da N1; 404 = "em breve"), arquivo, Delta/Completo (completo pede confirmação), "Conferir sem gravar" (`cargas-arquivo/conferir`, com "Baixar erros (.csv)" da conferência), "Importar CSV" dividido pela MESMA `dividirCsvEmPartes` da API (exportada pelo modulo-integracao) acima de 5.000 linhas, na mesma sessão e chave, barra de progresso (envio + gravação pela `cargas-arquivo/sessoes/:id`), status, erros por linha (`lotes/:id/erros`) e "Baixar erros (.csv)" (`lotes/:id/erros.csv`). Tenant novo: na 1ª importação o portal cria o Conector `implantacao-csv` (tipo arquivo, sem pedidos), como combinado com o modulo-integracao. Repetir "Importar" depois de falha reusa a chave (RN-INT-12).
5. **Aba Integração** (`aba-integracao.tsx`): lista de Conectores, "Gerar credencial" (`POST conectores`, tipo conector) com a chave mostrada uma vez, "Copiar" e o aviso; se o Conector de arquivo já recebe as bases, oferece "Desativar o de arquivo e passar todas" (PATCH) ou "Só as bases livres"; link do Conector "em breve"; OpenAPI da N2 (`integracao/openapi.json`; 404 = "em breve").
6. **QR sem dependência** (`lib/qr.ts`): codificador próprio (modo byte, nível M, versões 1 a 10, SVG). Não precisa do `qrcode` nem de mudança no lockfile.
7. **Modo falso** (`lib/portal-falso.ts`): `NEXT_PUBLIC_PORTAL_FALSO=1` (só fora de produção, import dinâmico) responde as mesmas rotas com os mesmos schemas. No PC: `NEXT_PUBLIC_PORTAL_FALSO=1 pnpm --filter web dev` e `http://config.localhost:3000/`.

## Testes
- vitest do web: 10 arquivos, 66 testes verdes (novos: `lib/qr.test.ts` 10, `lib/portal-carga.test.ts` 12, `lib/portal-sessao.test.ts` 8, `lib/portal-telas.test.ts` 7, `lib/portal.test.ts` com o 404 fora do host).
- eslint dos arquivos tocados limpo; `pnpm --filter web typecheck` (typegen + tsc) verde; `next build` verde (rotas /config/entrar, /config/primeiro-acesso, /config/empresas, /config/empresas/nova, /config/empresas/[id]).
- `next start` com Host simulado: localhost `/config` 404; bko. `/config/entrar` 404; bko. `/login` 200; config. `/`, `/login` (vira a entrada), `/entrar`, `/primeiro-acesso`, `/empresas/<id>` 200; config. `/xyz` 404; cabeçalhos noindex/no-store. Servidor encerrado.
- `verificar engenheiro-apps`: sem violações.

## Pendências
- **QR**: conferido por vetores da norma (Reed-Solomon, formato, versão, capacidades, alinhamentos), mas não por leitura com câmera. Na revisão, escanear o QR do modo falso com o Google Authenticator; se falhar, a chave para digitar está na mesma tela.
- **PATCH conectores/:id** sem `superAdmin: 'aceita'` hoje: pedido ao modulo-integracao (R-20261106-015931). Sem ele, a opção "Desativar o de arquivo" mostra o 401 e "Só as bases livres" funciona.
- **Link do download do Conector**: não há endereço publicado. `LINK_DOWNLOAD_CONECTOR` em `apps/web/lib/portal-rotas.ts` está `null` ("em breve"). Preciso da URL (engenheiro-software ou Alexandre).
- **N1** (modelos/dicionário, PR #97): o caminho do dicionário que usei é `modelos/:entidade.json`. O modulo-integracao confirma quando o PR entrar.
- **Equipe** (fatia E): o cartão fica "em breve" até as rotas do Core (`docs/modulos/core/equipe-csv.md`, à tarde).
- `renovar`/`sair` dependem do `cabecalhos` no contexto público (R-20261106-010602, engenheiro-software ao modulo-core). Até lá, renovar devolve 401 e a sessão dura os 15 min do token.
- Revisão de UX pedida ao designer-ux (R-20261106-021614).
