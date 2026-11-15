---
id: R-20261115-160000-gerente-projetos
de: gerente-projetos
para: alexandre,todos
tipo: aviso
prioridade: alta
data: 2026-11-15T16:00:00-04:00
---

# Situação às 16h00 (Manaus): o time parou às 14h58 por limite semanal de uso

**O que aconteceu.** Às 14h58 a conta bateu o **limite semanal de uso** ("weekly limit · resets Nov 20, 8am UTC"). As sessões do time (core, revisão, fonte, carga etc.) pararam de responder, e esta sessão de gerente ficou parada até as 15h55. Por isso a v1.0.12 e a v1.0.13 **não fecharam** no horário, e **não houve deploy nem build**.

## Entrou no main hoje à tarde (CI verde em cada merge)
- **v1.0.12:** #352 (migrações 0075–0080) e #372 (testes tolerantes à filial).
- **Trocar senha / Esqueci a senha:** #357 (core) e #370 (app).
- **Sincronizar / estoque diário / primeira carga (SDK e API):** #360.
- **Fonte do sistema:**
  - #371 (manual da marca, seção 5);
  - #362 (kit);
  - #374 (PDFs e e-mails);
  - gestor, pesquisa, treinamento, integração e promotor (#376–#380).
- **Upload de fotos T-0174:** banco, core e plataforma (#363–#365).
- **Limpeza da Expo:** parte do engenheiro-software (#368).
- **Filtro padrão:** kit (#381).
- **Docs das regras de 15/11 e busca pela marca da referência:** #346, #347 e #348.

## Não fechou (motivo)
- **Servidor v1.0.12:** o #361 (core: filial obrigatória) falhou no CI em testes da Equipe por CSV e da T-0176, e a sessão do core parou antes de corrigir. **Sem o #361 não há deploy da v1.0.12.** O app da v1.0.12 (520d7dfe) depende dele.
- **Fonte do sistema:** faltam os PRs dos apps (#373) e do core (#375), que falham num mock de teste, além de vendedor, catálogo, limpeza e testes.
- **Tela de carga:**
  - o #367 tem CI verde, mas falta o parecer final;
  - faltam os outros 4 PRs, incluindo o banco com a migração 0081.
- **Upload de fotos:** o #366 e o #382–#384 estão sem CI ou vermelhos, esperando o designer-ux.
- **Catálogo onda 1:** o #386 e o #387 estão vermelhos; o #388 (doc 03) está verde.
- **Filtro padrão, parte do core:** o #385 está vermelho.
- **Limpeza da Expo, parte dos apps:** o #369 está liberado, mas o CI ainda não rodou.
- **v1.0.14 (motivo já registrado):**
  - Integração ERP simplificada e menu Parâmetros: branches sem trailer ou com dois donos;
  - Prazo: branches a refazer;
  - Alertas: achados do corretor em aberto;
  - Planos: dependem do contrato e da migração;
  - Logo: migração a renumerar e sem parecer;
  - Catálogo v2.

## Decisões para você
1. **Continuar:** as sessões só voltam quando o limite renovar (20/11, 05h00 de Manaus) ou com mais uso liberado na conta. Diga qual caminho seguir.
2. **Deploy e build:** o deploy da v1.0.12 e o da v1.0.13 continuam aprovados, mas não rodo nenhum com o core da filial fora do main. O build do APK v1.0.13 também fica parado.
3. **Pendências da tarde:**
   - confirmar as regras de detalhe da fonte no manual da marca (tamanho pelo papel, rótulo 600, títulos 18 e 22, reserva nos e-mails, nº do pedido em texto);
   - P-6: hoje a API não confere crédito ao receber o pedido, só o app manda para aprovação.
