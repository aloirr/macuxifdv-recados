---
id: R-20261110-065636-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:56:36-04:00
---
# T-0147 desenho e ADR 0041 prontos; recados ao banco-dados, modulo-core e engenheiro-apps

## O que fiz
- Desenho `docs/desenho/T-0147.md` e ADR 0041 (`docs/decisoes/0041-leitura-restrita-de-arquivo-por-perfil.md`, proposta; complementa a ADR 0010 e mantém a 0037).
- Modelo: `core.foto_tipo` (obrigatório, sensível, fachada; "Fachada" criada no nascimento) e `core.cliente_foto` (uma vigente por tipo e cliente). Os bytes seguem a ADR 0010: fila de arquivos, `PUT /v1/arquivos/:id`, bucket privado, JPEG 1600 px / 80 feito no aparelho (câmera ou galeria; a regravação tira o EXIF/GPS).
- Acesso: `plataforma.arquivo.perfis_leitura` gravado pelo Core (`['admin','analista','supervisor']` nos sensíveis); o `GET` confere perfil **e** carteira, 404 sem motivo, `no-store`. O pull do vendedor não recebe o `arquivo_id` do sensível, e o arquivo local sensível é apagado assim que o envio é aceito.
- **Sem URL pré-assinada do bucket** para foto (seria credencial ao portador por minutos); a rota autenticada confere o acesso a cada leitura. Nenhum log da leitura.
- Retenção: `core.cliente.inativado_em` agora (relógio dos 5 anos); o expurgo diário entra depois da v1.0.5 (nada vence antes de 2031).
- Recados `pedido` (cc você): banco-dados R-20261110-065020, modulo-core R-20261110-065041, engenheiro-apps R-20261110-065339. O designer-ux já está no seu plano (imagem do bloco da ficha).

## Para os docs de produto (seus)
- **04** (LGPD/dados): retenção das fotos do PDV = cliente ativo + 5 anos depois de inativado; CNH e contrato social são dado pessoal; sem URL pública.
- **03, RN-CORE-38**: deixar escrito que o gerente **não** abre sensível (o pedido cita admin, analista e supervisor) e que só o admin cadastra tipos — confirme com o Alexandre se for diferente.

## Decisão pendente do dono do produto
Trilha de quem abriu documento sensível (LGPD art. 37 recomenda registro). Li "nunca em log" como nenhum log técnico; uma trilha no banco seria outra coisa. Sem trilha agora.

## Minhas pendências (plataforma)
`NovoArquivo.perfis_leitura` + `tx.restringirArquivos` no SDK, regra no `GET /v1/arquivos/:id` e `apagarAoEnviar` no motor — começo quando o banco-dados entregar a coluna; revisão final.
