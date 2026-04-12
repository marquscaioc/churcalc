import { useState } from "react";
import todoImg from "./todo.jpg";

/* ═══════════════════════════════════════════
   Treino Estetico — Low Volume, High Priority
   ═══════════════════════════════════════════ */

const PHILOSOPHY = [
  {t:"Volume minimo, intensidade maxima",d:"Menos series, mais qualidade. 2-3 series efetivas por exercicio superam 5 series lixo. Cada serie conta. Se a ultima rep nao foi dificil, nao contou."},
  {t:"Proximidade da falha > volume",d:"Leve cada serie a 1-2 reps da falha (RIR 1-2). Series longe da falha sao aquecimento disfarçado. Intensidade e o driver de hipertrofia, nao volume."},
  {t:"Prioridade estetica clara",d:"Ombros > Biceps > Largura Dorsal > Peitoral Superior > Gluteos. Esses 5 grupos definem um fisico estetico. O resto e suporte."},
  {t:"Frequencia acima de volume por sessao",d:"Treinar um musculo 2-3x/sem com poucas series e superior a destrui-lo 1x/sem com 20 series. Sintese proteica dura 48-72h. Reestimule."},
  {t:"Conexao mente-musculo e inegociavel",d:"Se voce nao sente o musculo trabalhando, o exercicio esta errado ou o peso esta alto demais. Reduza o ego, aumente a contracao."},
  {t:"Exercicios compostos para forca, isoladores para forma",d:"Construa base com compostos pesados. Esculpa com isoladores controlados. Os dois tem lugar."},
  {t:"Progressao de carga semanal",d:"Adicione peso, reps ou qualidade toda semana. Sem progressao, sem crescimento. Log de treino e obrigatorio."},
  {t:"Recuperacao e onde voce cresce",d:"Treino e o estimulo. Comida e o material. Sono e quando a construcao acontece. 7-9h de sono. Sem atalho."},
];

const GROUPS = [
  { id:"ombros", icon:"🔺", title:"Ombros", priority:1, tag:"PRIORIDADE MAXIMA",
    why:"Ombros largos sao o fator #1 de um fisico estetico. Criam a ilusao de cintura fina, o V-taper, e dominam qualquer silhueta. Deltoide lateral e o musculo mais importante para estetica.",
    exercises:[
      { name:"Elevacao Lateral com Halteres", type:"Isolador", target:"Deltoide Lateral",
        sets:"3x12-15", rest:"60s", priority:"★★★",
        how:"Cotovelos levemente flexionados. Subir ate a linha do ombro, nao acima. Controlar a descida (3s negativa). Inclinar levemente o tronco a frente. Pensar em 'despejar agua de um copo' no topo.",
        tips:"O exercicio mais importante do treino inteiro. Faca TODA sessao de upper body. Peso leve com forma perfeita supera peso pesado com momentum. Se voce esta balancando, reduza." },
      { name:"Elevacao Lateral no Cabo (unilateral)", type:"Isolador", target:"Deltoide Lateral",
        sets:"3x12-15", rest:"60s", priority:"★★★",
        how:"Cabo na polia baixa, puxar por tras do corpo para linha de forca mais longa. Tensao constante em todo o ROM. Sem morto em baixo.",
        tips:"Versao superior ao halter para muitos — tensao constante e curva de resistencia melhor. Alterne com halter." },
      { name:"Desenvolvimento com Halteres (sentado)", type:"Composto", target:"Deltoide Anterior + Lateral",
        sets:"3x8-10", rest:"90s", priority:"★★☆",
        how:"Sentado com apoio. Halteres na altura da orelha, pressionar ate extensao sem travar cotovelo. Controlar descida.",
        tips:"Preferido sobre barra por maior ROM e menos stress no ombro. Nao precisa ser pesado — controle > carga." },
      { name:"Face Pull no Cabo", type:"Isolador", target:"Deltoide Posterior + Rotadores",
        sets:"3x15-20", rest:"60s", priority:"★★☆",
        how:"Cabo na polia alta. Puxar para o rosto, abrindo os cotovelos. Apertar escápulas no final. Rotacao externa no topo.",
        tips:"Saude do ombro + estetica posterior. Faca em todo treino de upper body. Volume alto, peso leve." },
      { name:"Elevacao Lateral na Maquina", type:"Isolador", target:"Deltoide Lateral",
        sets:"3x12-15", rest:"60s", priority:"★★☆",
        how:"Almofadas nos antebracos ou maos. Levantar ate a horizontal. Pausar 1s no topo.",
        tips:"Excelente para isolar quando a forma com halteres ja esta fatigada. Use como finalizador." },
      { name:"Y-Raise no Cabo ou Halter", type:"Isolador", target:"Trapezio Superior + Deltoide Lateral",
        sets:"2x12-15", rest:"60s", priority:"★☆☆",
        how:"Bracos sobem em Y (45° da cabeca). Peso leve. Foco na contracao do deltoide e trapezio.",
        tips:"Complementar. Preenche a regiao entre ombro e pescoco." },
    ]
  },
  { id:"biceps", icon:"💪", title:"Biceps", priority:2, tag:"ALTA PRIORIDADE",
    why:"Biceps sao o musculo mais visivel no cotidiano — camiseta, fotos, qualquer situacao. Um braco grande começa pelo biceps (cabeça longa para pico, curta para volume). Poucos sets bastam se a qualidade for alta.",
    exercises:[
      { name:"Rosca Direta com Barra (EZ ou reta)", type:"Composto", target:"Biceps (ambas cabeças)",
        sets:"3x8-10", rest:"90s", priority:"★★★",
        how:"Cotovelos fixos na lateral do corpo. Subir controlado, apertar no topo. Descida em 3s. Sem balanco.",
        tips:"O basico que funciona. Barra EZ reduz stress no punho. Barra reta = mais supinacao = mais biceps." },
      { name:"Rosca Inclinada com Halteres", type:"Isolador", target:"Cabeca Longa (pico)",
        sets:"3x10-12", rest:"60s", priority:"★★★",
        how:"Banco inclinado a 45-60°. Bracos pendurados. Rosca completa sem mover o cotovelo. Supinar no topo.",
        tips:"O melhor exercicio para cabeca longa. O stretch na posicao inicial e chave. Nao encurte o ROM." },
      { name:"Rosca Martelo", type:"Composto", target:"Braquial + Braquiorradial",
        sets:"2x10-12", rest:"60s", priority:"★★☆",
        how:"Pegada neutra. Subir sem rotacao. Cotovelos fixos.",
        tips:"Braquial empurra o biceps para cima, criando a ilusao de braco maior. Essencial para largura." },
      { name:"Rosca Concentrada", type:"Isolador", target:"Biceps (pico)",
        sets:"2x12-15", rest:"60s", priority:"★★☆",
        how:"Sentado, cotovelo no joelho interno. Rosca completa com supinacao maxima no topo. Apertar 2s.",
        tips:"Isolamento maximo. Sem momentum possivel. Excelente para finalizar." },
      { name:"Rosca Spider (Preacher invertido)", type:"Isolador", target:"Cabeca Curta",
        sets:"2x10-12", rest:"60s", priority:"★★☆",
        how:"Peito apoiado no banco inclinado. Bracos pendurados. Rosca sem mover ombro. Tensao constante.",
        tips:"Elimina qualquer roubo. Tensao maxima na posição contraida." },
      { name:"Rosca no Cabo (polia baixa)", type:"Isolador", target:"Biceps (ambas cabeças)",
        sets:"2x12-15", rest:"60s", priority:"★☆☆",
        how:"De frente para polia. Rosca controlada. Tensao constante no arco inteiro.",
        tips:"Finalizador perfeito. Tensao que halteres nao dao na posicao de cima." },
    ]
  },
  { id:"dorsal", icon:"🦇", title:"Largura Dorsal", priority:3, tag:"ALTA PRIORIDADE",
    why:"Dorsais largos criam o V-taper — a base do fisico estetico. A largura vem do dorsal, nao do trapezio. Foco em movimentos de puxada vertical e adução com cotovelos abertos.",
    exercises:[
      { name:"Pulldown com Pegada Aberta", type:"Composto", target:"Latissimo (largura)",
        sets:"3x10-12", rest:"90s", priority:"★★★",
        how:"Pegada prona larga. Puxar a barra ate o queixo/peito superior. Inclinar levemente para tras. Focar em puxar com os cotovelos, nao maos.",
        tips:"Padrao-ouro para largura. Nao puxe atras do pescoco — inutil e perigoso. Squeeze na posicao contraida." },
      { name:"Pulldown com Pegada Neutra (V-bar)", type:"Composto", target:"Latissimo (espessura + largura)",
        sets:"3x10-12", rest:"90s", priority:"★★☆",
        how:"V-bar ou pegada neutra. Inclinar leve. Puxar ate o peito. Cotovelos para baixo e para tras.",
        tips:"Complementa a pegada aberta. Mais ROM e mais confortavel para muitos." },
      { name:"Pullover no Cabo (braco reto)", type:"Isolador", target:"Latissimo (isolado)",
        sets:"3x12-15", rest:"60s", priority:"★★★",
        how:"De frente para polia alta. Bracos quase retos. Puxar em arco ate as coxas. Focar no stretch e contracao do dorsal.",
        tips:"O unico exercicio que isola o dorsal sem biceps. Essencial para quem tem dificuldade de sentir dorsais em puxadas." },
      { name:"Remada Unilateral com Halter", type:"Composto", target:"Latissimo + Romboides",
        sets:"3x10-12", rest:"60s", priority:"★★☆",
        how:"Apoio com mao e joelho no banco. Puxar o halter ate a cintura/quadril. Cotovelo rente ao corpo para mais dorsal.",
        tips:"Para largura: puxe para o quadril. Para espessura: puxe mais alto para o torax. Rotacao leve do tronco permitida." },
      { name:"Barra Fixa (pronada)", type:"Composto", target:"Latissimo + Core",
        sets:"3x max", rest:"120s", priority:"★★☆",
        how:"Pegada prona na largura dos ombros ou levemente mais larga. Puxar ate o queixo passar a barra. Descer controlado.",
        tips:"Se nao consegue bodyweight, use assistida ou negativas. Progressao para barra fixa e investimento a longo prazo." },
      { name:"Remada Cavalinho / Seated Row (pegada larga)", type:"Composto", target:"Latissimo + Romboides + Trapezio",
        sets:"3x10-12", rest:"90s", priority:"★☆☆",
        how:"Pegada larga prona. Puxar ate o abdomen superior/peito inferior. Ombros para tras.",
        tips:"Complementar. Otima para densidade de costas. Nao arredonde a lombar." },
    ]
  },
  { id:"peito", icon:"🫁", title:"Peitoral Superior", priority:4, tag:"PRIORIDADE MEDIA",
    why:"Peitoral superior preenche a regiao do colar e cria um peito 'shelf' — visual poderoso em camiseta. Peito inferior cresce facil; superior precisa de foco especifico com inclinacao.",
    exercises:[
      { name:"Supino Inclinado com Halteres", type:"Composto", target:"Peitoral Superior",
        sets:"3x8-10", rest:"90s", priority:"★★★",
        how:"Banco a 30-45° (nao mais). Halteres descem ate stretch do peitoral. Pressionar em arco leve, unindo no topo. Squeeze 1s.",
        tips:"30° e melhor que 45° para a maioria — menos deltoide anterior, mais peitoral. Halteres permitem maior ROM que barra." },
      { name:"Supino Inclinado com Barra (Smith opcional)", type:"Composto", target:"Peitoral Superior + Triceps",
        sets:"3x6-8", rest:"120s", priority:"★★☆",
        how:"Banco a 30°. Barra desce ate o peito superior (abaixo da clavicula). Subir explosivo. Travar no topo.",
        tips:"Para forca. Smith permite focar mais no peitoral sem estabilizacao. Alternar com halteres periodicamente." },
      { name:"Crucifixo Inclinado no Cabo", type:"Isolador", target:"Peitoral Superior (isolado)",
        sets:"3x12-15", rest:"60s", priority:"★★★",
        how:"Banco inclinado entre dois cabos baixos. Bracos em arco amplo, unir na frente do peito superior. Squeeze 2s.",
        tips:"Tensao constante. Melhor que halter para isolamento porque nao perde tensao no topo. Essencial para upper chest." },
      { name:"Flexao Declinada (pes elevados)", type:"Composto", target:"Peitoral Superior + Core",
        sets:"2x max", rest:"60s", priority:"★☆☆",
        how:"Pes em banco ou caixa. Maos no chao na largura dos ombros ou levemente mais largo. Peito toca o chao.",
        tips:"Otimo finalizador ou warmup. Adicionar colete lastrado quando bodyweight ficar facil." },
    ]
  },
  { id:"gluteos", icon:"🍑", title:"Gluteos", priority:5, tag:"PRIORIDADE MEDIA",
    why:"Gluteos desenvolvidos completam o fisico — posterior chain forte, atletismo, e estetica em qualquer roupa. Gluteo maximo e o maior musculo do corpo e responde a carga pesada.",
    exercises:[
      { name:"Hip Thrust com Barra", type:"Composto", target:"Gluteo Maximo",
        sets:"3x8-12", rest:"90s", priority:"★★★",
        how:"Costas superiores apoiadas no banco. Barra no quadril com pad. Subir ate extensao completa. SQUEEZE maximo 2s no topo. Controlar descida.",
        tips:"O exercicio numero 1 para gluteos. Extensao completa do quadril e o momento de pico. Nao hiperextender a lombar." },
      { name:"Agachamento Bulgaro (Split Squat)", type:"Composto", target:"Gluteo + Quadriceps",
        sets:"3x10-12 (cada)", rest:"60s", priority:"★★★",
        how:"Pe traseiro elevado no banco. Descer ate joelho quase tocar o chao. Tronco levemente inclinado a frente para mais gluteo.",
        tips:"Inclinacao do tronco = mais gluteo. Tronco reto = mais quad. Ajuste conforme objetivo. Unilateral corrige assimetrias." },
      { name:"Abdução no Cabo (kickback)", type:"Isolador", target:"Gluteo Maximo + Medio",
        sets:"3x12-15 (cada)", rest:"60s", priority:"★★☆",
        how:"Polia baixa. Caneleira. Chutar para tras e levemente para fora. Squeeze no final. Controlar retorno.",
        tips:"Excelente para ativacao e isolamento. Pode fazer como warmup ou finalizador." },
      { name:"Stiff / Romeno com Halteres", type:"Composto", target:"Gluteo + Isquiotibiais",
        sets:"3x10-12", rest:"90s", priority:"★★☆",
        how:"Halteres proximos as pernas. Flexao de quadril mantendo costas neutras. Descer ate sentir stretch nos isquios. Subir com gluteos.",
        tips:"Nao e exercicio de lombar — e de quadril. Se sentir na lombar, reduza o ROM ou corrija a postura." },
      { name:"Abdução na Maquina (sentado)", type:"Isolador", target:"Gluteo Medio",
        sets:"2x15-20", rest:"60s", priority:"★☆☆",
        how:"Sentar, abrir as pernas contra a resistencia. Pausar 1s aberto. Fechar controlado.",
        tips:"Gluteo medio da a forma 'redonda' lateral. Volume alto, peso moderado. Inclinar a frente = mais gluteo max." },
    ]
  },
];

const SPLITS = [
  {
    id:"ul",
    name:"Upper / Lower",
    freq:"4x/sem",
    desc:"Melhor equilibrio frequencia/recuperacao. Ombros e biceps em ambos os uppers. Ideal para intermediarios e avancados.",
    days:[
      { day:"UPPER A — Push", muscles:"Ombros + Peito Sup + Triceps + Biceps", exercises:[
        "Supino Inclinado Halter — 3x8-10",
        "Desenvolvimento Halter Sentado — 3x8-10",
        "Elevacao Lateral Halter — 3x12-15",
        "Crucifixo Inclinado Cabo — 3x12-15",
        "Face Pull — 3x15-20",
        "Rosca Inclinada Halter — 3x10-12",
        "Triceps Corda — 2x12-15",
      ]},
      { day:"LOWER A — Gluteo", muscles:"Gluteos + Posterior + Quadriceps", exercises:[
        "Hip Thrust Barra — 3x8-12",
        "Agachamento Bulgaro — 3x10-12",
        "Stiff Romeno Halter — 3x10-12",
        "Leg Press (pes altos e largos) — 3x10-12",
        "Abducao Maquina — 2x15-20",
        "Panturrilha em Pe — 3x12-15",
      ]},
      { day:"UPPER B — Pull", muscles:"Dorsal Largura + Biceps + Ombros", exercises:[
        "Pulldown Pegada Aberta — 3x10-12",
        "Remada Unilateral Halter — 3x10-12",
        "Pullover Cabo — 3x12-15",
        "Elevacao Lateral Cabo — 3x12-15",
        "Rosca Direta Barra EZ — 3x8-10",
        "Rosca Martelo — 2x10-12",
        "Face Pull — 3x15-20",
      ]},
      { day:"LOWER B — Forca", muscles:"Gluteos + Posterior + Core", exercises:[
        "Agachamento Livre — 3x6-8",
        "Hip Thrust Barra — 3x10-12",
        "Stiff Barra — 3x8-10",
        "Abducao Cabo (kickback) — 3x12-15",
        "Cadeira Flexora — 2x12-15",
        "Abdominal (prancha ou roda) — 2x max",
      ]},
    ]
  },
  {
    id:"fb",
    name:"Full Body",
    freq:"3x/sem",
    desc:"Frequencia maxima por grupo com minimo de dias na academia. Cada sessao treina tudo com foco rotativo. Ideal para iniciantes ou agenda apertada.",
    days:[
      { day:"DIA A — Ombro + Dorsal Focus", muscles:"Todos os grupos, enfase ombro e dorsal", exercises:[
        "Elevacao Lateral Halter — 3x12-15",
        "Pulldown Pegada Aberta — 3x10-12",
        "Supino Inclinado Halter — 3x8-10",
        "Hip Thrust Barra — 3x10-12",
        "Rosca Inclinada Halter — 3x10-12",
        "Face Pull — 2x15-20",
      ]},
      { day:"DIA B — Peito + Biceps Focus", muscles:"Todos os grupos, enfase peito sup e biceps", exercises:[
        "Supino Inclinado Barra — 3x6-8",
        "Elevacao Lateral Cabo — 3x12-15",
        "Remada Unilateral Halter — 3x10-12",
        "Agachamento Bulgaro — 3x10-12",
        "Rosca Direta Barra EZ — 3x8-10",
        "Crucifixo Inclinado Cabo — 2x12-15",
      ]},
      { day:"DIA C — Gluteo + Ombro Focus", muscles:"Todos os grupos, enfase gluteo e ombro", exercises:[
        "Hip Thrust Barra — 3x8-12",
        "Desenvolvimento Halter — 3x8-10",
        "Pullover Cabo — 3x12-15",
        "Stiff Romeno — 3x10-12",
        "Elevacao Lateral Halter — 3x12-15",
        "Rosca Martelo — 2x10-12",
      ]},
    ]
  },
  {
    id:"ppl",
    name:"Push / Pull / Legs",
    freq:"3-6x/sem",
    desc:"Classico PPL mas com Legs focado em gluteos e musculos menores — sem agachamento pesado obrigatorio. Push tem enfase em ombros e peito sup. Pull em largura dorsal e biceps.",
    days:[
      { day:"PUSH — Ombros + Peito Sup", muscles:"Deltoides + Peitoral Superior + Triceps", exercises:[
        "Desenvolvimento Halter Sentado — 3x8-10",
        "Supino Inclinado Halter — 3x8-10",
        "Elevacao Lateral Halter — 3x12-15",
        "Crucifixo Inclinado Cabo — 3x12-15",
        "Elevacao Lateral Cabo — 2x12-15",
        "Triceps Corda — 2x12-15",
        "Face Pull — 2x15-20",
      ]},
      { day:"PULL — Dorsal Largura + Biceps", muscles:"Latissimo + Biceps + Posterior Ombro", exercises:[
        "Pulldown Pegada Aberta — 3x10-12",
        "Remada Unilateral Halter — 3x10-12",
        "Pullover Cabo — 3x12-15",
        "Rosca Direta Barra EZ — 3x8-10",
        "Rosca Inclinada Halter — 3x10-12",
        "Rosca Martelo — 2x10-12",
        "Face Pull — 2x15-20",
      ]},
      { day:"LEGS — Gluteos + Acessorios", muscles:"Gluteos + Isquios + Panturrilha + Core", exercises:[
        "Hip Thrust Barra — 4x8-12",
        "Agachamento Bulgaro — 3x10-12",
        "Stiff Romeno Halter — 3x10-12",
        "Abducao Cabo (kickback) — 3x12-15",
        "Abducao Maquina — 2x15-20",
        "Panturrilha em Pe — 3x12-15",
        "Abdominal (prancha ou roda) — 2x max",
      ]},
    ]
  }
];

/* ── Components ── */

function ExerciseCard({ex}) {
  return (
    <div className="ex">
      <div className="ex-top">
        <div>
          <div className="ex-name">{ex.name}</div>
          <div className="ex-meta">{ex.type} · {ex.target}</div>
        </div>
        <div className="ex-stats">
          <span className="ex-sets">{ex.sets}</span>
          <span className="ex-rest">Descanso: {ex.rest}</span>
        </div>
      </div>
      <div className="ex-how"><strong>Execucao:</strong> {ex.how}</div>
      <div className="ex-tip"><strong>Dica:</strong> {ex.tips}</div>
    </div>
  );
}

function MuscleGroup({g}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mg">
      <div className="mg-head" onClick={()=>setOpen(!open)}>
        <span className="mg-icon">{g.icon}</span>
        <div className="mg-info">
          <div className="mg-title">{g.title}</div>
          <div className="mg-count">{g.exercises.length} exercicios</div>
        </div>
        <span className="mg-tag">{g.tag}</span>
        <svg className="mg-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{transform:open?"rotate(180deg)":"",transition:"transform .3s"}}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div className={"mg-body"+(open?" open":"")}>
        <p className="mg-why">{g.why}</p>
        {g.exercises.map((ex,i)=><ExerciseCard key={i} ex={ex}/>)}
      </div>
    </div>
  );
}

function SplitSection() {
  const [active, setActive] = useState("ul");
  const split = SPLITS.find(s=>s.id===active);
  return (
    <div className="sec" id="split">
      <div className="sec-header">
        <span className="sec-icon">📋</span>
        <span className="sec-label">SPLITS SUGERIDOS</span>
        <div className="sec-line"/>
      </div>
      <div className="split-tabs">
        {SPLITS.map(s=>(
          <button key={s.id} className={"split-tab"+(active===s.id?" active":"")} onClick={()=>setActive(s.id)}>
            <span className="split-tab-name">{s.name}</span>
            <span className="split-tab-freq">{s.freq}</span>
          </button>
        ))}
      </div>
      <div className="split">
        <div className="split-desc">{split.desc}</div>
        {split.days.map((d,i)=>(
          <div key={i} className="split-day">
            <div className="split-day-head">
              <div className="split-day-name">{d.day}</div>
              <div className="split-day-muscles">{d.muscles}</div>
            </div>
            {d.exercises.map((ex,j)=>(
              <div key={j} className="split-ex">{ex}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Page ── */

export default function TreinoPage({onBack}) {
  return (
    <div className="t-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .t-root {
          --void: #151a22;
          --surface: #1c2230;
          --border: rgba(202,150,136,0.14);
          --purple: #CA9688;
          --skin: #EBBF9E;
          --blood: #CA9688;
          --text: #F3F3F3;
          --text2: #a0a4aa;
          --text3: #5a6070;
          min-height: 100vh;
          background: var(--void);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }
        .t-root::after {
          content:''; position:fixed; inset:0; pointer-events:none;
          background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(202,150,136,0.008) 3px, rgba(202,150,136,0.008) 6px);
        }
        .t-wrap { max-width:600px; margin:0 auto; padding:20px 16px 80px; position:relative; z-index:1; }

        /* Back */
        .t-back {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.1em;
          color:var(--text3); cursor:pointer; background:none;
          border:1px solid var(--border); padding:8px 16px; margin-bottom:36px;
          transition:all .3s;
        }
        .t-back:hover { color:var(--purple); border-color:var(--purple); }

        /* Hero */
        .t-hero {
          position:relative; text-align:center; overflow:hidden;
          border-radius:24px; padding:60px 24px 48px;
          border:1px solid var(--border); margin-bottom:48px;
        }
        .t-hero-bg { position:absolute; inset:0; background:url(${todoImg}) center 15%/cover; opacity:.15; filter:saturate(.5) contrast(1.1); }
        .t-hero-ov { position:absolute; inset:0; background:radial-gradient(ellipse at center top,rgba(202,150,136,0.06),transparent 60%),linear-gradient(transparent,var(--void)); }
        .t-hero-c { position:relative; z-index:1; }
        .t-hero-c h1 {
          font-family:'Rajdhani',sans-serif; font-size:clamp(48px,13vw,72px);
          font-weight:700; letter-spacing:.06em; line-height:.9;
          background:linear-gradient(135deg,var(--purple),var(--skin));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .t-hero-c .sub {
          font-family:'JetBrains Mono',monospace; font-size:9px;
          letter-spacing:.3em; color:var(--text3); margin-top:16px;
        }
        .t-hero-c .desc { font-size:14px; color:var(--text2); margin-top:20px; max-width:440px; margin-inline:auto; font-weight:300; line-height:1.8; }

        /* Section headers */
        .sec { margin-bottom:32px; }
        .sec-header {
          display:flex; align-items:center; gap:12px;
          margin-bottom:12px; padding:0 4px;
        }
        .sec-icon { font-size:20px; }
        .sec-label {
          font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:700;
          letter-spacing:.12em; color:var(--skin); white-space:nowrap;
        }
        .sec-line { flex:1; height:1px; background:linear-gradient(90deg, var(--border), transparent); }

        /* Nav */
        .t-nav { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:32px; }
        .t-nav-item {
          display:flex; align-items:center; gap:6px;
          font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.06em;
          color:var(--text3); padding:7px 14px;
          border:1px solid var(--border); background:none;
          cursor:pointer; transition:all .25s; text-decoration:none; white-space:nowrap;
        }
        .t-nav-item:hover { color:var(--skin); border-color:var(--skin); background:rgba(235,191,158,0.04); }
        .t-nav-item span { font-size:12px; }

        /* Philosophy */
        .phil { border:1px solid var(--border); background:var(--surface); margin-bottom:8px; }
        .phil-item { display:flex; gap:14px; padding:14px 20px; border-bottom:1px solid var(--border); }
        .phil-item:last-child { border-bottom:none; }
        .phil-n { font-family:'Rajdhani',sans-serif; font-size:20px; font-weight:700; color:var(--purple); opacity:.3; width:24px; text-align:right; flex-shrink:0; line-height:1.2; }
        .phil-t { font-size:13px; font-weight:600; color:var(--text); }
        .phil-d { font-size:12px; color:var(--text2); font-weight:300; margin-top:2px; line-height:1.7; }

        /* Muscle Group */
        .mg {
          border:1px solid var(--border); background:var(--surface);
          margin-bottom:8px; overflow:hidden; transition:border-color .3s;
        }
        .mg:hover { border-color:rgba(202,150,136,0.25); }
        .mg-head {
          display:flex; align-items:center; gap:14px;
          padding:18px 20px; cursor:pointer;
        }
        .mg-head:hover { background:rgba(255,255,255,0.01); }
        .mg-icon { font-size:24px; }
        .mg-info { flex:1; }
        .mg-title { font-family:'Rajdhani',sans-serif; font-size:17px; font-weight:700; letter-spacing:.04em; }
        .mg-count { font-family:'JetBrains Mono',monospace; font-size:9px; color:var(--text3); letter-spacing:.06em; margin-top:1px; }
        .mg-tag {
          font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700;
          color:var(--skin); letter-spacing:.08em; padding:3px 10px;
          border:1px solid rgba(235,191,158,0.2); white-space:nowrap;
        }
        .mg-chev { color:var(--text3); flex-shrink:0; }
        .mg-body { max-height:0; overflow:hidden; transition:max-height .5s cubic-bezier(.4,0,.2,1); }
        .mg-body.open { max-height:10000px; }
        .mg-why {
          font-size:13px; color:var(--text2); line-height:1.8; font-weight:300;
          padding:16px 20px; border-bottom:1px solid var(--border);
        }

        /* Exercise */
        .ex {
          margin:12px 14px; padding:16px 18px;
          border:1px solid var(--border); background:rgba(255,255,255,0.01);
        }
        .ex-top { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:10px; flex-wrap:wrap; }
        .ex-name { font-size:14px; font-weight:600; }
        .ex-meta { font-family:'JetBrains Mono',monospace; font-size:9px; color:var(--text3); margin-top:2px; letter-spacing:.04em; }
        .ex-stats { display:flex; gap:8px; align-items:center; flex-wrap:wrap; }
        .ex-sets {
          font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700;
          color:var(--purple); padding:3px 10px;
          border:1px solid rgba(202,150,136,0.3);
        }
        .ex-rest { font-family:'JetBrains Mono',monospace; font-size:9px; color:var(--text3); }
        .ex-how { font-size:12px; color:var(--text2); line-height:1.7; font-weight:300; margin-bottom:8px; }
        .ex-how strong { color:var(--text); font-weight:600; }
        .ex-tip {
          font-size:11px; color:var(--skin); line-height:1.6; font-weight:300;
          padding:8px 12px; border-left:2px solid var(--skin);
          background:rgba(235,191,158,0.03);
        }
        .ex-tip strong { color:var(--skin); font-weight:600; }

        /* Split */
        .split-tabs { display:flex; gap:6px; margin-bottom:10px; }
        .split-tab {
          flex:1; padding:12px 8px; text-align:center;
          border:1px solid var(--border); background:var(--surface);
          cursor:pointer; transition:all .25s;
        }
        .split-tab:hover { border-color:rgba(202,150,136,0.3); }
        .split-tab.active {
          border-color:var(--purple); background:rgba(202,150,136,0.1);
        }
        .split-tab-name {
          display:block; font-family:'Rajdhani',sans-serif; font-size:13px;
          font-weight:700; letter-spacing:.04em; color:var(--text3);
          transition:color .25s;
        }
        .split-tab.active .split-tab-name { color:var(--skin); }
        .split-tab-freq {
          display:block; font-family:'JetBrains Mono',monospace; font-size:9px;
          color:var(--text3); letter-spacing:.06em; margin-top:2px;
        }
        .split { border:1px solid var(--border); background:var(--surface); padding:24px; }
        .split-desc { font-size:12px; color:var(--text2); font-weight:300; margin-top:4px; line-height:1.7; margin-bottom:20px; }
        .split-day { margin-bottom:16px; }
        .split-day:last-child { margin-bottom:0; }
        .split-day-head {
          display:flex; justify-content:space-between; align-items:center;
          padding:10px 14px; background:rgba(202,150,136,0.06);
          border:1px solid var(--border); margin-bottom:6px;
        }
        .split-day-name { font-family:'Rajdhani',sans-serif; font-size:14px; font-weight:700; letter-spacing:.04em; color:var(--purple); }
        .split-day-muscles { font-family:'JetBrains Mono',monospace; font-size:8px; color:var(--text3); letter-spacing:.04em; }
        .split-ex {
          display:flex; align-items:center; gap:8px;
          padding:6px 14px; font-size:12px; color:var(--text2);
          border-bottom:1px solid var(--border);
        }
        .split-ex:last-child { border-bottom:none; }
        .split-ex::before {
          content:''; width:4px; height:4px; border-radius:50%;
          background:var(--purple); opacity:.4; flex-shrink:0;
        }

        /* Footer */
        .t-foot {
          text-align:center; padding:40px 0 16px;
          font-family:'JetBrains Mono',monospace; font-size:9px;
          letter-spacing:.15em; color:var(--text3);
        }

        /* Responsive */
        @media(max-width:500px) {
          .ex-top { flex-direction:column; }
          .mg-tag { display:none; }
          .split-day-head { flex-direction:column; align-items:flex-start; gap:4px; }
        }

        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(202,150,136,0.2); }
      `}</style>

      <div className="t-wrap">
        <button className="t-back" onClick={onBack}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          VOLTAR
        </button>

        <div className="t-hero">
          <div className="t-hero-bg"/>
          <div className="t-hero-ov"/>
          <div className="t-hero-c">
            <h1>TREINO<br/>ESTETICO</h1>
            <div className="sub">LOW VOLUME · HIGH PRIORITY</div>
            <p className="desc">Selecao de exercicios e filosofia de treino para um fisico estetico. Menos volume, mais qualidade. Prioridade clara.</p>
          </div>
        </div>

        <div className="t-nav">
          {[["🧠","FILOSOFIA","phil"],["🔺","OMBROS","ombros"],["💪","BICEPS","biceps"],["🦇","DORSAL","dorsal"],["🫁","PEITO SUP","peito"],["🍑","GLUTEOS","gluteos"],["📋","SPLIT","split"]].map(([icon,label,id])=>(
            <a key={id} className="t-nav-item" href={"#"+id} onClick={e=>{e.preventDefault();document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}}>
              <span>{icon}</span> {label}
            </a>
          ))}
        </div>

        {/* Filosofia */}
        <div className="sec" id="phil">
          <div className="sec-header">
            <span className="sec-icon">🧠</span>
            <span className="sec-label">FILOSOFIA DE TREINO</span>
            <div className="sec-line"/>
          </div>
          <div className="phil">
            {PHILOSOPHY.map((p,i)=>(
              <div key={i} className="phil-item">
                <div className="phil-n">{String(i+1).padStart(2,"0")}</div>
                <div>
                  <div className="phil-t">{p.t}</div>
                  <div className="phil-d">{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Muscle Groups */}
        <div className="sec" id="exercicios">
          <div className="sec-header">
            <span className="sec-icon">🏋️</span>
            <span className="sec-label">SELECAO DE EXERCICIOS</span>
            <div className="sec-line"/>
          </div>
          {GROUPS.map(g=>(
            <div key={g.id} id={g.id}>
              <MuscleGroup g={g}/>
            </div>
          ))}
        </div>

        {/* Splits */}
        <SplitSection/>

        <div className="t-foot">CHUCKCHUR · TREINO · 2026</div>
      </div>
    </div>
  );
}
