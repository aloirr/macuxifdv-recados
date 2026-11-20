---
id: R-20261120-050500-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261120-045700-alexandre
encerra: false
contrato: null
criado_em: 2026-11-20T05:05:00-04:00
---
# Passagem do gerente para a outra conta: nada ficou só nesta sessão

## Conferido às 5h05
- **Código:** `aloirr/macuxifdv` com o main em 85b9e9b4 (v1.0.16 no ar). Não há commit sem push nem alteração sem commit que valha.
  - Dois arquivos de teste com alteração local, em worktrees de ensaio, são iguais aos do main.
  - Os branches locais `ensaio/ficha-local` e `ensaio/trajeto-local` são rascunhos da v1.0.15, já superados pelo #514 e pelo #516, que foram revisados e mesclados. Não têm valor.
- **Recados:** `aloirr/macuxifdv-recados` igual ao remoto, com os lidos do gerente gravados.
- **Único lote em aberto:** `agente/v1017-doc2-gerente-projetos`, 4273a72d1ad9fae990e360e2b96967a132c4c0bd, no GitHub e sem PR. Ele traz o quadro com a v1.0.16 no ar, a T-0187 concluída, as RN-VEN-43 a 47 e as emendas das RN-VEN-01, 02 e 11 no doc 03.
  - O corretor achou os RD-2470 a RD-2476, que já foram corrigidos nesse commit e ainda **não foram retestados**.
  - Falta a resposta **A ou B** do Alexandre sobre o orçamento editado com troca de prazo (RN-VEN-43:318 contra RN-VEN-44:321).
    - Com A, a RN-VEN-44 passa a dizer que o item com preço congelado mantém o preço (RN-VEN-18).
    - Com B, abre-se uma tarefa para o modulo-vendedor.
  - Depois vêm o reteste do corretor, o PR, o CI e o merge com "Agente: gerente-projetos".
  - O branch antigo `agente/v1017-doc-gerente-projetos` (ff4fc973) ficou para trás por causa de um amend. Não tem PR e não deve ir ao main.

## Lote seguinte (registrado também no quadro do lote acima)
- **Citações de RN-VEN trocadas em comentários:**
  - modulo-vendedor:
    - `pagamento-pedido.ts:52`, `preco-pedido.ts:55` e `pagamento-pedido.test.ts:84-85`: de 46 para 44;
    - `documento.test.ts:195` e `use-vendedor.ts:776`: de 46 para 43.
  - engenheiro-software: `docs/desenho/inicio-frase-avatar-pedidos.md:199,278`, de 43 para 47.
  - testes: `docs/testes/`, `tests/modulos/pedidos-busca-t0077`, `indicadores-valor-regra-t0124` e `tests/integracao/api/inicio-t0076`, de 43 para 47.
- **Outros itens:**
  - RD-2379, RD-2413, RD-2448 e RD-2450, mais o comentário do teste do trajeto;
  - o deadlock ocasional em `db/testes/empresa-acoes.db.test.ts:415` (banco-dados);
  - o 🟢 do "Enviando…";
  - MC-1803;
  - o SSH comum dos workflows (governança, só com a autorização do Alexandre).

## Rondas desta conta
A ronda de 20 min ("Ronda do gerente") e a reserva de hora em hora continuam nesta conta até o gerente da conta nova gravar um recado dizendo que assumiu. Com esse recado, desligo as duas aqui, para que dois gerentes não façam merge ao mesmo tempo. Se o Alexandre preferir, desligo já.

## Ferramentas do gerente (estavam só no scratchpad desta sessão)
- **`montar_dono.sh`:** monta o PR conjunto com um commit por dono, a partir dos branches de cada um, sem merge entre eles.
- **`lote_merge.py`:** faz o squash só com o `ci-ok` verde no head esperado.
- **`espera_pr.sh`:** espera o CI do PR.
- **`minutos2.py`:** mede os minutos de Actions por ciclo.

### montar_dono.sh
```bash
#!/bin/bash
# uso: MSG="..." montar_dono.sh <branch-conjunto> dono:sha [dono:sha ...]
# Para cada dono, copia do seu branch só os arquivos (diferentes do main) que pertencem a ele. Sem merge entre branches.
set -e
S=/tmp/claude-0/-home-user/81ca9dab-adb5-55a7-89af-d002179252c7/scratchpad
W=$S/wt-conj-ficha
BR=$1; shift
cd /home/user/macuxifdv
git fetch -q origin main
if git ls-remote --exit-code origin "$BR" >/dev/null 2>&1; then echo "ERRO: $BR já existe no remoto"; exit 1; fi
cd $W
git merge --abort 2>/dev/null || true
git checkout -q -f --detach origin/main
git checkout -q -B "$BR" origin/main
dono_de() {
  case "$1" in
    .coord/diario/*.md) basename "$1" .md ;;
    *) node scripts/coord.mjs dono "$1" 2>/dev/null | sed -n 's/.*→ *//p' | head -1 ;;
  esac
}
: > $S/conj-fora.txt; : > $S/conj-ambos.txt
for par in "$@"; do
  d=${par%%:*}; lista=${par#*:}
  n=0
  for s in ${lista//+/ }; do
  for f in $(git diff --name-only --no-renames origin/main...$s); do
    mb=$(git merge-base origin/main $s); if ! git diff --quiet $mb origin/main -- "$f" 2>/dev/null; then echo "AVISO: $f mudou no main e em $s" >> $S/conj-ambos.txt; fi
    o=$(dono_de "$f")
    if [ "$o" = "$d" ]; then
      if git cat-file -e "$s:$f" 2>/dev/null; then git checkout -q $s -- "$f"; else git rm -q --ignore-unmatch "$f"; fi
      n=$((n+1))
    else
      echo "$d:$s $o $f" >> $S/conj-fora.txt
    fi
  done
  done
  s=$lista
  [ $n -eq 0 ] && { echo "$d: nada"; continue; }
  git commit -q -m "$d — ${MSG} (parte do $d no PR conjunto)

Conteúdo de $s, só os caminhos de $d. PR conjunto $BR, um commit por dono, a partir do main $(git rev-parse --short origin/main).

Agente: $d

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_019xHEXs75xqGq9m52u565UD"
  echo "$d: $n arquivos"
done
git log --oneline origin/main..HEAD
node scripts/coord.mjs verificar --por-commit origin/main..HEAD | tail -2
echo "--- arquivos de outros donos vistos nos branches (devem estar cobertos pelo branch do dono):"
awk '{print $2}' $S/conj-fora.txt | sort | uniq -c
echo "--- arquivos mudados no main e num branch (conferir):"; sort -u $S/conj-ambos.txt | grep -v "/diario/" | head -20
```

### lote_merge.py
```python
# Merge em sequência (alavanca c, R-20261115-181800): PR verde no head, liberado, sem conflito e sem arquivo em comum com os já mesclados neste lote.
import json,subprocess,sys
A="https://api.github.com/repos/aloirr/macuxifdv"
def get(u): return json.loads(subprocess.run(["curl","-s",u],capture_output=True,text=True).stdout)
def files(n):
    out=[];p=1
    while True:
        fs=get(f"{A}/pulls/{n}/files?per_page=100&page={p}")
        if not fs: break
        out+=[f["filename"] for f in fs]; p+=1
    return set(out)
fila=[(int(x.split(":")[0]),x.split(":")[1],x.split(":")[2]) for x in sys.argv[1:]]  # n:prefixo_sha:dono
usados=set()
for n,pref,dono in fila:
    p=get(f"{A}/pulls/{n}")
    sha=p["head"]["sha"]
    if not sha.startswith(pref): print(n,"SHA mudou",sha[:8]); continue
    d={r["name"]:(r["conclusion"] or r["status"]) for r in sorted(get(f"{A}/commits/{sha}/check-runs?per_page=100").get("check_runs",[]),key=lambda r:r.get("started_at") or "")}
    if d.get("ci-ok")!="success": print(n,"CI",d.get("ci-ok")); continue
    fs={f for f in files(n) if not f.startswith(".coord/diario/")}
    comum=fs&usados
    if comum: print(n,"arquivo em comum, pula:",sorted(comum)[:3]); continue
    titulo=p["title"].replace("[PRONTO PARA MERGE] ","")+f" (#{n})"
    body={"merge_method":"squash","sha":sha,"commit_title":titulo,"commit_message":f"Parecer do corretor liberado no {sha[:8]}; CI do PR verde.\n\nAgente: {dono}"}
    r=json.loads(subprocess.run(["curl","-s","-X","PUT","-H","Content-Type: application/json",f"{A}/pulls/{n}/merge","-d",json.dumps(body)],capture_output=True,text=True).stdout)
    print(n, r.get("merged"), r.get("sha","")[:8], r.get("message"))
    if r.get("merged"): usados|=fs
```

### espera_pr.sh
```bash
#!/bin/bash
# uso: espera_pr.sh <pr> : espera o run de CI pull_request mais novo do head terminar
n=$1
sha=$(curl -s https://api.github.com/repos/aloirr/macuxifdv/pulls/$n | python3 -c "import json,sys;print(json.load(sys.stdin)['head']['sha'])")
for i in $(seq 1 20); do
  id=$(curl -s "https://api.github.com/repos/aloirr/macuxifdv/actions/runs?head_sha=$sha&event=pull_request&per_page=5" | python3 -c "
import json,sys
rs=[r for r in json.load(sys.stdin)['workflow_runs'] if r['name']=='CI' and r['conclusion']!='skipped']
print(rs[0]['id'] if rs else '')")
  [ -n "$id" ] && break; sleep 15
done
[ -z "$id" ] && { echo "$n sem run"; exit 0; }
until s=$(curl -s https://api.github.com/repos/aloirr/macuxifdv/actions/runs/$id | python3 -c "import json,sys;d=json.load(sys.stdin);print(d['status'],d['conclusion'])") && [[ $s == completed* ]]; do sleep 30; done
echo "$n $sha $id $s"
```

### minutos2.py
```python
import json,subprocess,math,sys
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor
A="https://api.github.com/repos/aloirr/macuxifdv"
def get(u): return json.loads(subprocess.run(["curl","-s",u],capture_output=True,text=True).stdout)
def ciclo(ini,fim):
    runs=[];p=1
    while True:
        rs=get(f"{A}/actions/runs?per_page=100&page={p}&created={ini}..{fim}").get("workflow_runs",[])
        if not rs: break
        runs+=rs;p+=1
    def jobs(r):
        tot=0
        for j in get(f"{A}/actions/runs/{r['id']}/jobs?per_page=100").get("jobs",[]):
            if not j.get("started_at") or not j.get("completed_at"): continue
            s=(datetime.fromisoformat(j["completed_at"].replace("Z","+00:00"))-datetime.fromisoformat(j["started_at"].replace("Z","+00:00"))).total_seconds()
            if s>0: tot+=math.ceil(s/60)
        return r["name"],tot
    with ThreadPoolExecutor(8) as ex: res=list(ex.map(jobs,runs))
    por={}
    for n,m in res:
        por.setdefault(n,[0,0]); por[n][0]+=1; por[n][1]+=m
    total=sum(m for _,m in res)
    h=(datetime.fromisoformat(fim.replace("Z","+00:00"))-datetime.fromisoformat(ini.replace("Z","+00:00"))).total_seconds()/3600
    return total,len(runs),h,por
for nome,ini,fim in [("v1.0.15","2026-11-19T01:26:00Z","2026-11-19T21:37:00Z"),("v1.0.16","2026-11-19T21:37:00Z",sys.argv[1])]:
    t,n,h,por=ciclo(ini,fim)
    print(f"{nome}: {t} min em {n} runs, {h:.1f} h de ciclo ({t/h*24:.0f} min/dia)")
    for k,(c,m) in sorted(por.items(),key=lambda x:-x[1][1]): print(f"   {k}: {c} runs, {m} min")
```
