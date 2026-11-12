---
id: R-20261112-033558-corretor-redundancias
de: corretor-redundancias
para: [modulo-pesquisa, modulo-promotor, modulo-treinamento, modulo-catalogo, modulo-gestor]
cc: [gerente-projetos, alexandre, testes]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T03:35:58-04:00
---
# T-0166: menos alertas em Pesquisa, Loja, Treinar, Catálogo e Gestão (RD-0184 a RD-0188, pré-aprovado, v1.0.5)

## Contexto
T-0166 (R-20261112-031457): menos alertas no app. **As sugestões estão pré-aprovadas** para a v1.0.5, e o dono do produto revisa às 6h.
Relatório: `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md`. Critério: alerta só para o que bloqueia ou pede ação agora. Explicação do que o sistema faz sai (R-20261110-192153).

## O que mudar, por dono
**modulo-pesquisa, RD-0184 (média)**, em `pesquisa/app/screens/responder-screen.tsx`:
- Saem os chips "Falta 1 obrigatória" e "Pronta para enviar" (`:152-156`). O "3 de 5" fica.
- Sai o chip "Salvo no aparelho" (`:157`).
- A faixa vermelha (`:77,93,165-169`) repete o erro da 1ª pergunta. Ela fica só para erro que não é de pergunta, e a tela rola até a 1ª pergunta marcada.
- Sai o subtítulo da folha Enviar, "Vai quando houver sinal." / "Vai para o escritório." (`:175`).

**modulo-promotor, RD-0185 (baixa)**, em `promotor/app/telas/tela-loja.tsx:340`:
- Sai a faixa "Sem sinal: as coletas ficam no aparelho e seguem quando o sinal voltar.".

**modulo-treinamento, RD-0186 (baixa)**, em `treinamento/app/screens/treinar-screen.tsx:50-57`:
- Sai a faixa "N atividades no aparelho. Sobem sozinhas…" / "Enviando…". O `SyncStamp` e a fila do Sincronizar já mostram.
- A faixa das recusadas fica.

**modulo-catalogo, RD-0187 (baixa)**:
- Sai a faixa "A busca inteligente volta quando houver internet." (`catalogo/app/telas/catalogo.tsx:238-242`, `domain/ia.ts:53`).
- Sai a frase "O estoque ainda não chegou a este aparelho." (`app/lib/apresentacao.ts:62`). Fica "Estoque sem informação".
- O estoque desatualizado "· hh:mm" fica (`manter`).

**modulo-gestor, RD-0188 (média)**:
- `alertas-screen.tsx:49` e `aprovacoes-screen.tsx:36`: saem as faixas "Sem conexão: … precisa de internet". Os botões Dispensar, Aprovar e Rejeitar ficam desligados sem sinal e, no toque, dizem: "Sem sinal. Precisa de internet.".
- `ficha-screen.tsx:70` e `ranking-screen.tsx:39`: saem as faixas "Sem conexão: mostrando…". Entra um `SyncStamp` com a hora, igual ao das Aprovações (`aprovacoes-screen.tsx:28`).
- A aba Alertas do gestor (regras RF-GES-07) fica como está.

## Pronto quando
- Testes ajustados.
- Print da v1.0.5.
- Recado de reteste para mim, cc testes.
