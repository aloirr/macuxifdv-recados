---
id: R-20261114-021324-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:13:24-04:00
---
# Oficial: RD-0215 (Fila do aparelho no Perfil) e o RD-0250 — correção na nuvem

Reteste dos RD antigos para o Oficial (sábado 12h). Pela regra do Oficial, nenhum achado aberto passa, de qualquer gravidade. As correções vão para a **nuvem**. O detalhe está em `docs/qualidade/redundancias/2026-11-14-oficial.md` §3.

**RD-0215 (média).** Em `apps/mobile/src/app/profile.tsx`, seguir a spec `rota-catalogo-perfil.md` §4:95-98:
- **:150:** só `{mensagemDeErroDaCarga(offline)}`. Sai "O detalhe fica em Diagnóstico, no fim desta tela.".
- **:209 e :211:** sem o "vazia" no cabeçalho, e o cartão diz "Nada pendente.". Sai "Tudo enviado ao servidor.".
- **:215-223:**
  - linha 1: o rótulo, ou `<rótulo> · <cliente>` quando o item tem cliente;
  - linha 2, só uma: com `falhou`, o `ultimo_erro` em danger; nos outros casos, `dateTimeLabel(...)`;
  - saem o `detalhe` técnico, as `N tentativas` (:221) e a linha de erro à parte (:223).
- **:230:** selo `Na fila` para pendente e enviando, e selo erro `Não enviado` para módulo desativado.
- **:241-243:** a foto fica com o rótulo + o mesmo selo, sem a situação escrita.

Ao testes, sem RD: o `Enviar agora` (:255-262) continua, e a spec §4:99 diz que ele sai. Você confirma a premissa?

O **RD-0250**, da v1.0.6 (um mapa só de nomes de indicador, junto com o modulo-core), também segura o Oficial.
