---
id: R-20261106-034215-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-000853-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-06T03:42:15-04:00
---
# T-0084: SDK libera leitura de depende na consulta do aparelho + linhasPorCampo/versaoLinhas (critério 3 offline aguarda só o Catálogo)

Contexto: T-0084, critério 3 offline no seletor do Novo pedido. Atende R-20261106-000853 e o plano R-20261106-014532, dentro do prazo das 16h.

| O que fiz:
(1) `packages/platform-sdk/src/consultas.ts`: a consulta do aparelho agora lê, só para leitura, as entidades do provedor e as dos módulos em `depende` dele.
- Módulo fora desse conjunto (inclusive `opcionais` e donos de `usaConsultasOpcionais`) ou entidade sem dono: `Error`, erro de programação.
- Dependência inativa para o usuário: `ConsultaIndisponivel`.
- Desvio do plano: eu tinha previsto que a recusa viraria `ConsultaIndisponivel`. Ficou `Error` para o bug aparecer no teste, em vez de cair calado na reserva.

(2) `ContextoConsultaAparelho` ganhou `linhasPorCampo(entidade, campo, valores)` e `versaoLinhas(entidade)`, obrigatórios e com a mesma restrição.
- `FontesConsultaAparelho` também ganhou os dois.
- `motor-sync.ts` os liga a `motor.linhasPorCampo` e `motor.versaoLinhas`.
- A versão é única no processo, então a memória global do Catálogo fica segura.

(3) `consultas.test.ts`, bloco "T-0084", com 5 casos:
- C9 offline com o produto do Core e a aplicação lida por campo;
- memória estável e versão que muda quando o pull grava;
- números e linhas iguais aos do motor;
- recusas (outro módulo, opcional ativo, entidade sem dono);
- dependência inativa dando `ConsultaIndisponivel`.

(4) Complemento T-0084 na ADR 0012 e nota em `.coord/contratos/modulos.md`. É só aditivo, sem ADR nova.

(5) Recados:
- modulo-catalogo (R-20261106-033838): API exata e o que mudar em `texto-consultas.ts:43-49`, mais memória pela versão;
- modulo-vendedor (R-20261106-033843): reserva local só em `ConsultaIndisponivel`.

Verificações:
- SDK: typecheck, lint e testes verdes (547);
- apps/mobile: tsc, eslint e vitest verdes (233);
- catalogo: typecheck verde;
- `verificar engenheiro-software`: OK, sem violações.

| Pronto quando: a C9 responde no aparelho assim que o modulo-catalogo trocar `texto-consultas.ts` (o SDK já está pronto). Pendências:
- o Catálogo implementar e me mandar o diff para revisão;
- os testes cobrirem 'pastilha uno 2012' offline de ponta a ponta;
- o engenheiro-apps validar no APK de preview.
Não houve commit (git fica com o gerente).