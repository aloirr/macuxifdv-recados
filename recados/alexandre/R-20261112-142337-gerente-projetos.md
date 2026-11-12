---
id: R-20261112-142337-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261112-130101-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T14:23:37-04:00
---
# Status 14h: T-0168 (RN escrita, simulação 15h30) — BUILD PRONTO v1.0.5 13/11 ~8h; design-de-marca no main; Início 16h30; kit 19h

## Contexto
Resposta à cobrança R-20261112-130101 e aos recados R-20261112-121131, 121130 e 123055. A sessão local segue rodando, com 7 vagas ocupadas.

## Status por item

**1. T-0168 na v1.0.5 e a nova previsão**
- **A regra RN-VEN-11a já está escrita no doc 03**, logo depois da RN-VEN-11, com as suas sugestões:
  - padrão "por item" ligado e "por pedido" desligado;
  - com as duas ligadas, valem as duas;
  - acima do limite do pedido, só orçamento, com a frase "Pedido acima do desconto máximo do vendedor (X%)";
  - a alçada continua valendo abaixo do limite (exemplo de 5% e 8%);
  - o gestor usa o próprio limite;
  - offline com revalidação na API;
  - acréscimo nunca trava.
- **Simulação** (aba Parâmetros no BKO e travas no app): o designer-ux faz, o corretor revisa. **Previsão: 15h30.**
- **Desenho técnico e contratos:** engenheiro-software, até as 15h. Depois vêm banco, core (BKO e sync), vendedor (app e API), gestor e testes.
- **Nova previsão, se você aprovar a simulação até as 16h30:**
  - implementação até ~1h;
  - testes, corretor e marca até ~4h;
  - **ensaio às 4h e BUILD PRONTO da v1.0.5 em 13/11, por volta das 8h de Manaus.**

**2. Super-admin**
- Registrado no `docs/status/producao.md`: run 43255786492, criado com `superadmin@macuxifdv.com.br`.
- **Lembrete:** depois de entrar no config., troque o secret `PROD_SUPERADMIN_SENHA`.

**3. design-de-marca (T-0169)**
- **Instalado no main** (commit 4de7d2a, rito de governança com os seus recados 065523 e 065914): agente, skill, donos (`docs/marca/**`) e lista de agentes. Os testes do guardião e dos donos estão verdes.
- **Falta, aqui no PC:**
  - atualizar a cópia local, no pull do fim da rodada;
  - **reabrir a sessão do VS Code** para o agente aparecer na lista.

  Até lá ele não roda localmente, e não contornei isso.
- **A proposta de marca das 13h atrasou.** Nova previsão: até 2h depois de você reabrir a sessão. Se preferir, ele roda numa sessão da nuvem; me diga.

**4. Tela Início do Campo (T-0170)**
- Recebido. O designer-ux está fazendo de 2 a 3 opções com imagem e recomendação, com Recados numa área separada. O corretor dá parecer sobre a tela atual e sobre as opções.
- **Previsão: 16h30.** As imagens vão para `recados/anexos/`. Nada muda no app até você aprovar.

**5. Kit do piloto (T-0162)**
- **Empacotamento escolhido:** um zip único `macuxi-kit-piloto-1.0.0.zip`, com o Conector dentro, publicado como pré-release `kit-piloto-v1.0.0`. O link vem no aviso "kit do piloto pronto".
- **O testes não liberou:** achou 6 defeitos. O principal: na Piloto API, a forma e o prazo de pagamento chegavam vazios. Também a porta 1433 abria na rede Pública.
- O banco-dados pediu 8 ajustes no SQL.
- A integração está corrigindo tudo, com prazo às 17h. Depois o testes retesta.
- **Previsão do link: 19h.**

**v1.0.5, o resto**
- **Busca (T-0167):** pronta no Catálogo e no Vendedor. Falta o RD-0194 (total duas vezes), em correção.
- **Lápis Editar:** spec e componente `BotaoEditar` prontos. O vendedor está implementando e o corretor está no reteste.
- **PDF do cliente:** só com o Valor final, feito.
- **Menos alertas (T-0166):** sobram os RD-0189 a RD-0193, com os donos.

## Pronto quando
Você aprova a simulação da T-0168 e reabre a sessão do VS Code para o design-de-marca, ou diz que ele roda na nuvem.
