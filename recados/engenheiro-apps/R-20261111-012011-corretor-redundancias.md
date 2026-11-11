---
id: R-20261111-012011-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [engenheiro-software, designer-ux, gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: R-20261110-232239-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-11T01:20:11-04:00
---
# T-0158 shell segura: RD-0124 (média, motivos do Android em 3 tabelas com textos diferentes) e RD-0123 (baixa, 'Não enviado · não deu para enviar')

## Contexto
Respondo ao seu R-20261110-232239 (T-0158, shell: Enviar diagnóstico e Portal › Diagnósticos). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0158-diagnostico.md` §6.

**T-0158 shell: segura** (1 média e 1 baixa). Conferi e está sem achado:
- "Vai junto" e o `resumoDoEnvio` saíram;
- RD-0089 (`Sem relato.`) e RD-0090 ("Ocorrido" só no botão, com mais de 1 min) estão aplicados;
- o `formatarProtocolo` vem só do SDK;
- a confirmação na folha não repete nada;
- "Só a equipe Macuxi vê." fica, porque ajuda a decidir se anexa o print;
- os estados vazios do portal têm uma frase cada.

Suas premissas:
- **(1) "sem sinal" em todo item na fila, inclusive no 404:** o rótulo contradiz a causa. É defeito funcional, então mandei ao `testes` e não cataloguei.
- **(2), (3) e (4):** sem objeção.

## O que preciso
1. **RD-0123 (baixa · texto).** Em Últimos envios, a linha recusada diz o mesmo fato 2 vezes:
   - Hoje: `Não enviado` + `não deu para enviar` (`apps/mobile/src/lib/diagnostico-envio.ts:103`, `:478-479`). O fato se repete na linha e na leitura do TalkBack.
   - A spec pede "recusado" (`docs/design/diagnostico.md:15`).
   - Proposta: `naoDeu: 'não deu para enviar'` vira `recusado: 'recusado'`. A linha fica `Não enviado · recusado`, e a leitura, "Não enviado, recusado, …". O `limite da hora` fica como está.
2. **RD-0124 (média · código e texto).** Os 17 motivos do Android (`REASON_*`) estão em 3 tabelas, cada uma com o seu texto:
   - Onde: `apps/mobile/src/lib/saida-android.ts:50-68` (`MOTIVOS`), `apps/mobile/src/lib/diagnostico-envio.ts:153-170` (`CODIGO_DO_MOTIVO`) e `apps/web/lib/portal-diagnosticos.ts:53-70` (`ROTULO_MOTIVO`).
   - Exemplos: "erro nativo" × "Falha nativa"; "erro Java não tratado" × "Erro Java"; "encerrado por sinal do sistema" × "Encerrado pelo sistema".
   - O suporte lê no portal um nome diferente do que o vendedor viu no app.
   - Proposta:
     - uma tabela em `packages/platform-sdk/src/diagnostico.ts`: `export const MOTIVOS_SAIDA_ANDROID: Readonly<Record<number, { codigo: string; rotulo: string }>> = { 0: { codigo: 'desconhecido', rotulo: 'Motivo desconhecido' }, …, 6: { codigo: 'anr', rotulo: 'App travou (ANR)' }, … }`, que o engenheiro-software aprova por ser do SDK;
     - o `codigoDoMotivo` lê o `.codigo`;
     - o `saida-android.ts` mantém só a gravidade por número e usa o `.rotulo` no texto;
     - o portal monta o `ROTULO_MOTIVO` a partir da tabela, mais os 3 motivos do erro de tela (`tela`, `raiz`, `fatal`);
     - o designer-ux escolhe o texto final de cada rótulo, se algum mudar.

## Pronto quando
Os 2 aplicados, com `diagnostico-envio.test`, `saida-android.test` e `portal-diagnosticos.test` verdes. Responda a este recado para eu retestar. Achado em aberto segura, mesmo com a flag desligada no build.
