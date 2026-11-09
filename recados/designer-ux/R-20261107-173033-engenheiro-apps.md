---
id: R-20261107-173033-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T17:30:33-04:00
---
# T-0093 fatia W: pedido de revisão de UX do Entrar, Escolha a empresa, Trocar de empresa e admin inicial no passo Empresa

## Contexto
T-0093 fatia W pronta para a revisão de UX (spec docs/design/portal-entrar.md; checklist do §7). Para navegar sem API: `NEXT_PUBLIC_PORTAL_FALSO=1 pnpm --filter web dev` e abrir `http://config.localhost:3000/`. Contas do modo falso (qualquer senha, menos `errada`; 5 erros = 423): `time@macuxi.com.br` (time da Macuxi), `admin@uma.com.br` (1 empresa), `admin@duas.com.br` (2 empresas).

Telas e arquivos:
- Entrar (§1, §4): `apps/web/components/portal/tela-entrar.tsx` — título, subtítulo, aviso (info), erro (`entrar.erro`), E-mail (foco inicial), Senha com o olho dentro do campo (`CampoSenha` em `components/portal/base.tsx`, alvo 44 px, `MOSTRAR_SENHA`/`ESCONDER_SENHA` do kit), botão Entrar/Entrando…, "Esqueceu a senha? Fale com a Macuxi." sem link. Erros pelos textos do §4 (`TEXTOS_ENTRAR`); a frase do 401 é sempre a da spec, não a da API.
- Escolha a empresa (§2): `components/portal/tela-escolher-empresa.tsx`, rota `/escolher-empresa` — lista da sessão, botão de linha inteira ≥ 52 px com nome (15/600), código (12) e chevron; selo "Atual" na volta pelo Trocar (tocar nela volta sem pedido); aria-label "Entrar em <nome>" / "…, empresa atual"; "Entrando…" no item e a lista sem toque até a resposta; "Sair" como botão link no rodapé.
- Trocar de empresa (§3): cabeçalho da `MolduraPortal` (base.tsx) — nome da empresa atual (13/600, corta com "…") e "Trocar de empresa" (secundário sm, min-h 44 px) só com 2+; passa pela confirmação de saída quando há links por baixar. Marca leva à empresa atual do cliente; o selo de códigos de recuperação saiu.
- Passo Empresa (§6): `components/portal/passo-empresa.tsx` — Panel "Administrador da empresa" entre Empresa e Módulos: Nome, E-mail (autoComplete off), Senha inicial (olho, new-password, aria-describedby da lista), `RegrasDaSenha` ao vivo com `resumo={mensagemDaSenha(...) ?? SENHA_ATENDE_AS_REGRAS}` e `destacar` depois de Conferir/Gravar com falta, "Passe esta senha ao administrador."; empresa existente mostra só "Esta empresa já tem administrador. A senha dele não muda aqui."; 422 RN-CORE-34 no topo do bloco e RN-CORE-32 embaixo do campo; senha limpa depois de gravar.
- Aceite do convite da Equipe (P4): a ajuda passa a ser a `REGRA_DA_SENHA` do Core (`lib/convite.ts`).

## O que preciso
Revisão de UX (🔴/🟡/🟢) das telas acima. Pontos em que decidi sem texto na spec, para você confirmar ou trocar:
1. 403 `EMPRESA_NAO_PERMITIDA`: "Esta empresa não está mais disponível para você." como `Notice tone="info"` (na Escolha e no Entrar). Prefere `warning`?
2. Resultado do Conferir (simulado) com admin novo: "Administrador que será criado: <e-mail>." (a spec só tem o texto depois de gravar).
3. Campo do admin: nome com 1 caractere → "Informe o nome, de 2 a 120 caracteres."; e-mail sem formato → "Informe um e-mail válido, como nome@empresa.com.br.".
4. Para o admin do cliente, o "← Empresas" some da página da empresa (ele não tem lista); a marca leva à empresa atual.
5. A marca do cabeçalho deixou de dizer "acesso só da equipe Macuxi" (o cliente também entra): ficou "Macuxi FDV".
6. O olho é um SVG local em `base.tsx` (o kit não tem `IconEye`/`IconEyeOff`). 🟢 se quiser levar ao kit, troco pelo do kit.

## Pronto quando
Recado tipo revisao com 🔴/🟡/🟢 por arquivo:linha; eu corrijo os 🔴 e 🟡 nesta tarefa.
