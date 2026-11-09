---
id: R-20261108-141717-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0128
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T14:17:17-04:00
---
# T-0128: useBloquearSaida e ProvedorBloqueioDeSaida no @macuxi/platform-sdk/react (desenho exato)

# T-0128: ponto de extensão useBloquearSaida no @macuxi/platform-sdk/react (RN-VEN-38)

## Contexto
T-0128 (Frente E, RN-VEN-38; spec docs/design/formulario-pendencias.md §2.1 e §2.5). O formulário alterado (hoje o Novo pedido do Vendedor; depois visita, pesquisa, cadastro) precisa interceptar as saídas que são do shell: o toque na barra inferior (Início, Rota, Clientes, Pedidos, Mais) e o gesto/botão Voltar do Android. A implementação (barra e BackHandler) fica no apps/mobile, que é meu. O módulo, porém, só pode importar de packages/*: o hook que a tela chama precisa estar no SDK. O Vendedor já consome o contrato por um adaptador sem efeito (modules/vendedor/app/lib/bloquear-saida.ts), combinado em R-20261108-125643:

    useBloquearSaida(alterado: boolean, aoTentarSair: (prosseguir: () => void) => void): void

Desenho: o SDK só guarda um registro em contexto (sem RN, sem expo-router, sem hook dinâmico, por causa do React Compiler ligado no app). O shell cria o registro, decide foco, barra e Voltar, e chama aoTentarSair(prosseguir). Sem provedor (web, testes de módulo), o hook não faz nada.

## O que preciso
Em packages/platform-sdk/src/react/index.tsx (ou num arquivo novo em src/react/, reexportado pelo index), exportado de '@macuxi/platform-sdk/react':

```tsx
/** RN-VEN-38 (T-0128): saída de formulário alterado. A tela decide (abre a folha) e só chama `prosseguir()` quando liberar. */
export type AoTentarSair = (prosseguir: () => void) => void;

/** Formulário montado que pode bloquear a saída. Lido na hora da tentativa (valores do último render). */
export interface FormularioAlterado {
  alterado(): boolean;
  aoTentarSair: AoTentarSair;
}

/** Registro do shell (apps/mobile: barra inferior e Voltar do Android). */
export interface BloqueioDeSaida {
  /** Registra o formulário montado; devolve a função que o retira (ao desmontar). */
  registrar(formulario: FormularioAlterado): () => void;
}

const CtxBloqueioDeSaida = createContext<BloqueioDeSaida | null>(null);

export function ProvedorBloqueioDeSaida({ value, children }: { value: BloqueioDeSaida; children: ReactNode }) {
  return <CtxBloqueioDeSaida.Provider value={value}>{children}</CtxBloqueioDeSaida.Provider>;
}

/**
 * Com `alterado = true`, o shell não segue para o destino (barra inferior, Voltar do Android) e chama `aoTentarSair(prosseguir)`;
 * a navegação só segue quando a tela chamar `prosseguir()`. Sem alteração, sai direto. Desmontar a tela retira o bloqueio.
 * Fora de um `ProvedorBloqueioDeSaida` (web, testes) não faz nada.
 */
export function useBloquearSaida(alterado: boolean, aoTentarSair: AoTentarSair): void {
  const bloqueio = useContext(CtxBloqueioDeSaida);
  const atual = useRef({ alterado, aoTentarSair });
  useEffect(() => {
    atual.current = { alterado, aoTentarSair };
  });
  useEffect(() => {
    if (!bloqueio) return undefined;
    return bloqueio.registrar({ alterado: () => atual.current.alterado, aoTentarSair: (p) => atual.current.aoTentarSair(p) });
  }, [bloqueio]);
}
```

Pontos que importam:
- Nomes exatos: useBloquearSaida, ProvedorBloqueioDeSaida, AoTentarSair, FormularioAlterado, BloqueioDeSaida (o shell e o Vendedor já usam).
- O registro depende só de `bloqueio` (estável): não pode re-registrar a cada render, para não mudar a ordem dos ouvintes do Voltar do Android.
- Ref atualizada em effect (não no render), por causa do React Compiler.
- Fora do provedor, sem erro (diferente do useValor do ShellProvider).
Teste sugerido: com um registro falso, o hook registra uma vez, `alterado()` e `aoTentarSair` leem o último valor, desmontar retira; sem provedor, nada acontece.

## Pronto quando
Exportado de '@macuxi/platform-sdk/react' com teste e typecheck do SDK verdes. Me responda com --responde-a: eu ligo o ProvedorBloqueioDeSaida no app/_layout.tsx do shell (o registro, a barra e o Voltar do Android já estão prontos em apps/mobile/src/lib/bloqueio-saida.ts) e aviso o modulo-vendedor para trocar o adaptador por `export { useBloquearSaida } from '@macuxi/platform-sdk/react'`.
