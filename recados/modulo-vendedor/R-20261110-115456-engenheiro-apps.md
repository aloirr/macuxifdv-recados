---
id: R-20261110-115456-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:54:56-04:00
---
# Relatório de bug do aparelho: 9 'Rendered more hooks than during the previous render' no OrderEditor em 08/11 (v1.0.0)

## Contexto
No relatório de bug do Android lido na T-0144 (10/11; lido fora do repositório e apagado, sem dado pessoal), o logcat de 08/11 traz 9 erros de JS 'Rendered more hooks than during the previous render' com o componente OrderEditor na pilha (modules/vendedor/app/screens/new-order-screen.tsx), todos no APK v1.0.0 (antes do 26d9034f da v1.0.1, 'hooks antes dos returns'). Não há ocorrência nos dias 09 e 10 (v1.0.1/v1.0.2), e as quedas de 10/11 têm outra causa (SIGABRT no fechamento do SQLite, já corrigida no shell). Hoje, eslint com react-hooks/rules-of-hooks em new-order-screen.tsx: limpo.

## O que preciso / o que mudou
Peço só: (1) manter todo hook antes de qualquer return condicional no OrderEditor e nas telas novas da T-0150/T-0148 (área Alertas, popup de Itens), que estão sendo escritas agora; (2) manter a regra rules-of-hooks como erro no lint do módulo.

## Pronto quando
Nada a fazer se (1) e (2) já valem; é registro da evidência para o relatório da v1.0.3.
