---
id: R-20261105-060840-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0078
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T06:08:40-04:00
---
# G3 da T-0078: texto do rascunho docs/seguranca/termo-dado-erp.md (para revisão jurídica)

## Contexto
G3 da T-0078 (R-20261105-054146, item 1): rascunho do termo de uso do dado do ERP. docs/seguranca/ é seu; abaixo vai o texto inteiro para `docs/seguranca/termo-dado-erp.md`. Fontes: docs/produto/06-integracao-erp.md (entidades, Conector, segurança), docs/banco/lgpd.md (prazos e roteiros do G2), checklist da T-0078 (S1, B1 a B3, L1). Retenção pela decisão G1 aceita: dado bruto do lote 7 dias (30 em falha) e erro por linha 30 dias; backup com 30 dias. Premissa: "7 × 30 aceita" quer dizer passar o backup de 7 para 30 cópias diárias, como pede o doc 04. Se for o contrário, troque o número no item 5.4.

## O que preciso
Criar o arquivo com o texto entre as linhas `-----` (sem essas linhas) e ligar o G3 do checklist a ele como 🟡 "rascunho, aguarda revisão jurídica e aprovação do dono do produto".

-----
# Termo de uso dos dados do ERP — Macuxi FDV

> **RASCUNHO — PARA REVISÃO JURÍDICA.** Texto técnico do engenheiro-software (T-0078, G3), 05/11/2026. Não vale como contrato
> até a revisão de um advogado e a aprovação do dono do produto. Termos entre [colchetes] dependem do contrato com cada cliente.

## 1. Partes e papéis
- **Cliente (controlador)**: a empresa que contrata o Macuxi FDV e é dona do ERP e dos dados dele.
- **Macuxi (operador)**: trata os dados só por conta e por ordem do Cliente, para as finalidades do item 3 (LGPD, art. 5º, VI e VII, e art. 39).
- **Suboperadores**: provedor de nuvem e de armazenamento [Magalu Cloud, região Brasil], serviço de túnel/HTTPS [Cloudflare] e,
  só se o Cliente ligar a busca com IA do Catálogo, o provedor do modelo [Anthropic], que recebe só o texto da busca e dados de produto,
  nunca dado de cliente final. A lista atualizada fica no anexo [A] e muda com aviso prévio de [30] dias.

## 2. O que o Hub lê
O **Conector Macuxi**, instalado no servidor do Cliente, lê **somente as views** que o técnico do Cliente cria a partir do modelo
(`db/conector/views-modelo.sql`), com um usuário de banco **só de leitura nessas views** (e escrita só na tabela de entrada de pedidos).
Ele não lê tabelas do ERP diretamente nem nada fora das views. A conexão é sempre de saída (do Cliente para a nuvem, HTTPS 443).
Entidades (doc 06): clientes, contatos e carteira; endereços de entrega; produtos, categorias, marcas, árvore do catálogo e
unidades; custo e preço de venda; tabelas de preço; estoque por depósito (só saldo); financeiro do cliente (limite, saldo) e títulos;
condições de pagamento; transportadoras; vendedores; faturamento, devoluções e retorno dos pedidos.
**Dados pessoais** possíveis: nome, e-mail e telefone de contatos e vendedores; CPF e endereço de cliente pessoa física; dados de
crédito (limite, títulos). O Cliente decide o que entra nas views e não deve incluir dado sensível (art. 5º, II).
O Macuxi **devolve** ao ERP os pedidos aprovados (cliente, itens, preço, condição, frete e endereço de entrega).

## 3. Para quê (finalidades)
Só para operar a força de vendas do Cliente: montar carteira e rota; mostrar catálogo, preço, estoque, crédito e títulos ao
vendedor e ao supervisor; validar e enviar pedidos ao ERP; apurar metas, positivação, farol de clientes e RV; mostrar o histórico
de compras no Cliente 360; e diagnosticar erros de integração. **Não** usamos os dados para outra finalidade, não vendemos, não
cruzamos com dados de outros clientes e não treinamos modelos de IA com eles.

## 4. Quem acessa
- **Usuários do Cliente**, pelo perfil e pela carteira (vendedor e promotor veem a própria carteira; supervisor, a equipe;
  gerente, as equipes abaixo; analista e admin, a empresa). Custo e margem só no Backoffice (admin, analista, gerente).
- **Isolamento**: cada Cliente é um tenant separado no banco, com Row Level Security; nenhum usuário de um tenant vê dado de outro.
- **Equipe Macuxi**: só pessoas autorizadas, para suporte, incidente ou pedido do Cliente, com acesso administrativo registrado.
  O sistema não registra em log senha, token, e-mail nem dado pessoal; os logs técnicos guardam identificadores e códigos de erro.

## 5. Por quanto tempo (retenção)
1. **Cópia viva** (cadastros, preços, estoque, títulos, notas): enquanto o contrato durar; o Hub atualiza pelo ERP e marca como
   inativo o que o ERP deixar de enviar.
2. **Dado bruto do lote de integração**: [7] dias depois do lote concluído ([30] dias se o lote falhar); **erro por linha**
   (conteúdo da linha recusada): [30] dias; dado do registro inativado: [30] dias depois da inativação; resumo dos lotes: [12] meses.
3. **Pedidos, títulos e notas**: [5 anos] (guarda fiscal e comercial), mesmo depois do fim do contrato, salvo instrução do Cliente
   compatível com a lei.
4. **Backups**: cópias diárias guardadas por [30] dias; o dado excluído some dos backups quando a última cópia expira.
5. **Logs locais do Conector**: [30] dias no servidor do Cliente.
6. **Fim do contrato**: o Cliente pode pedir a exportação em até [30] dias; depois, os dados do tenant são excluídos em até [90] dias
   (roteiro `docs/banco/lgpd.md` §4), salvo o item 5.3.

## 6. Direitos do titular e exclusão
Pedidos de titulares chegam ao Cliente (controlador). Sob instrução do Cliente, o Macuxi anonimiza usuário, cliente ou contato
em até [15] dias (roteiro `docs/banco/lgpd.md` §3). O Cliente deve excluir ou corrigir o dado **também no ERP**; senão, a próxima
carga traz o dado de volta.

## 7. Segurança
Tráfego cifrado (HTTPS); credencial própria por Conector, rotacionável e restrita ao tenant; segredos fora do código; senhas em
argon2id; banco acessado pela aplicação sem privilégio de superusuário; auditoria de alterações de preço, licença, perfil e
parâmetros. Incidente com dado pessoal: aviso ao Cliente em até [48 horas] da confirmação, com o que se sabe e as medidas tomadas,
para o Cliente avaliar a comunicação à ANPD e aos titulares (art. 48).

## 8. Responsabilidades do Cliente
Ter base legal para os dados que coloca nas views; manter nas views só o necessário; manter o usuário de banco do Conector só de
leitura; avisar o Macuxi sobre troca de responsável técnico ou suspeita de vazamento da credencial do Conector.

## Pendências para a revisão jurídica
Base legal por categoria de dado; cláusula de suboperadores e transferência internacional (provedor de IA fora do Brasil); prazos entre
colchetes; prazo de aviso de incidente; foro e responsabilidade.
-----

## Pronto quando
Arquivo criado e G3 do checklist apontando para ele; levado ao dono do produto como rascunho para revisão jurídica.
