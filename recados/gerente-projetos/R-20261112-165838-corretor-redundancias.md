---
id: R-20261112-165838-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T16:58:38-04:00
---
# T-0168/T-0170: meio centavo para baixo na prancha do limite e hora de recado de ontem no Início (defeitos funcionais, sem RD)

# T-0168 e T-0170: dois defeitos funcionais vistos no parecer (não são redundância, sem RD)

1. **T-0168, prancha do limite de desconto**: o total do item arredonda o meio centavo para baixo.
   - `docs/design/telas/T-0168-campo.html:257` (imagem 4): LPO-400, 106,50 × 0,93 = 99,045 → **99,04**.
   - `docs/design/telas/T-0168-campo.html:395` (imagem 7, Gestão): 106,50 × 0,85 = 90,525 → **90,52**.
   - Conferir com a regra de arredondamento do domínio antes de a imagem ser aprovada. Se for half-up, os valores certos são 99,05 e 90,53, e os totais e o Desconto (R$) mudam junto. O dono da prancha é o designer-ux.
2. **T-0170, Início do Campo v1.0.4** (print `recados/anexos/2026-11-12-inicio-campo-v104-print.jpg`):
   - às 12:29, dois recados de ontem aparecem com `22:49` e `22:29`;
   - o `docs/design/inicio.md` §1.2 pede "ontem";
   - é o mesmo tipo de defeito encaminhado em R-20261108-161059.
   - Na spec T-0170, é a falha 4 (modulo-core, `recados_hoje`).
