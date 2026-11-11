---
id: R-20261111-004627-engenheiro-apps
de: engenheiro-apps
para: [testes]
cc: [gerente-projetos]
tipo: aviso
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:46:27-04:00
---
# T-0158: DG-5 de tests/modulos/diagnostico-t0158.test.ts vai quebrar — a chave agora pode vir do servidor (/v1/saude)

## Contexto
Para atender o R-20261111-004711 (ligar depois sem build novo), o app passou a ligar o botão e a fila pela constante do build OU pela chave remota recursos.diagnosticos do GET /v1/saude (proposta ao engenheiro-software em R-20261111-002158). Mudou: profile.tsx usa {diagnosticoNuvem ? <EnviarDiagnostico ... /> : null} (hook useDiagnosticoNuvem de services/diagnostico.ts); plataforma.tsx usa if (!motor

## O que preciso / o que mudou


## Pronto quando
!diagnosticoNuvem) return; e lê a chave com atualizarDiagnosticoRemoto(api, rotaDeSaude(modo)) a cada sessão aberta (1 GET /saude, rota pública). Regra pura: diagnosticoNoServidor(saude) em lib/diagnostico-envio.ts (true só com recursos.diagnosticos === true; sem o campo = false; resposta estranha = null, fica a guardada em fv:diagnostico:remoto). | Ajustar o DG-5: em vez do texto exato, conferir que o botão e ligarEnvioDeDiagnosticos só ligam com useDiagnosticoNuvem() true, e que useDiagnosticoNuvem = DIAGNOSTICO_NUVEM |  | remoto === true; 'nenhuma chamada nova à API' deixa de valer só para o GET /saude da chave. Se o engenheiro-software recusar a chave remota, eu desfaço e aviso: o DG-5 atual volta a passar. | DG-5 verde com a forma nova (ou sem mudança, se eu desfizer).
