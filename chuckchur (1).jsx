import { useState, useEffect, useRef, useCallback } from "react";
import tojiSideImg from "./tojiside.jpg";
import todoBotaoImg from "./todobotao.jpg";
import todoGif from "./todogif.gif";
import tojiGif from "./tojigif.gif";
import nanamiImg from "./nanami.jpg";
import nanamiGif from "./nanamigif.gif";

const GOJO_IMG = "data:image/jpeg;base64,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";

const ACT = [{l:"Sedentario",m:1.2},{l:"Leve",m:1.375},{l:"Moderado",m:1.55},{l:"Intenso",m:1.725},{l:"Insano",m:1.9}];
const GOL = [{l:"Cut Agressivo",d:-500},{l:"Cut Leve",d:-250},{l:"Manutencao",d:0},{l:"Bulk Leve",d:250},{l:"Bulk Agressivo",d:500}];
const LAT = [{n:0,x:15,l:"Tropical",f:25},{n:15,x:30,l:"Subtropical",f:30},{n:30,x:45,l:"Temperado",f:40},{n:45,x:60,l:"Nordico",f:50},{n:60,x:90,l:"Artico",f:60}];
const getz = (v) => LAT.find(z=>Math.abs(v)>=z.n&&Math.abs(v)<z.x)||LAT[2];
// Natural Earth 110m simplified land polygons – equirectangular projection, viewBox 0 0 370 150
const MAPS = [
  "M138.6,140L140.5,141.7L129.3,142.2L138.6,140Z M114.6,134.1L107.9,134.7L112.8,132.4L114.6,134.1Z M124.8,128.5L117.5,131.6L122.5,136.4L105.6,138.9L109.3,139.9L104.8,141L125.2,144.3L155.7,141.9L148.1,140.9L177.9,134.1L224.7,133.1L241,129.8L255.8,131.6L254.8,134.9L256.8,135.2L275.4,130.2L308.2,131.1L323.8,129.4L361,134.7L353.1,138.5L356.6,140.6L349.2,142.5L370,145.6L370,150L0,150L1,145.1L38.1,145.5L27.1,144.7L27.9,143.4L23.8,142.6L34.5,141.9L22.2,139.1L46,136.9L82.1,137.4L78.4,135.5L108,136.6L115.8,135.4L115.4,131.1L126.2,127.9L124.8,128.5Z M115.4,119.9L118.1,120.6L113.8,121.2L108.3,119L115.4,119.9Z M334.4,109L337.4,109.1L337,111L335.1,111.3L334.4,109Z M362.8,109.1L364.1,109.5L362.9,111.5L356.3,113.5L362.8,109.1Z M364.5,105.1L368.5,106.4L365.1,109.7L362.4,103.8L364.5,105.1Z M236.4,86.3L233.4,95.8L230.3,95.8L230.7,88.5L235.6,85L236.4,86.3Z M332.5,86.5L342.4,96.7L342.1,101.4L339.2,106.2L329.5,106.7L327,103.7L325.6,104.4L326.6,102.4L324.8,104.1L320,101.2L303.2,103.5L302.3,93.1L309.2,91.4L314.2,86.9L318.2,87.5L321,84.3L325.3,84.9L324.3,87.5L329.1,89.8L331.5,83.9L332.5,86.5Z M296.6,80.6L303.9,82L293.3,80.7L296.6,80.6Z M322.9,76L324.2,77.8L327.2,76.4L333.6,78.2L340,83.6L333.8,81.4L331.6,82.8L326.4,82L326.8,79.5L321.7,78.4L320.7,77.4L322.4,76.8L319.1,75.8L322.9,76Z M313.7,73.8L308.5,74.8L311.8,75.5L309.9,76.6L311.6,79.5L309.3,77.2L307.7,79.5L308.4,74.5L313.7,73.8Z M293.8,79.9L282.9,70.4L291.7,74.9L293.8,79.9Z M306.1,73.5L307.3,74.2L304.4,78.3L298.3,77.4L297,74.7L305,69.2L307.5,70.5L306.1,73.5Z M314.9,68L313.9,70.3L310.3,69L313.9,66.9L314.9,68Z M268.5,69.8L267.4,66.8L268.5,69.8Z M309.7,59.6L310.1,63.1L312.5,64.6L308.4,62.5L309.7,59.6Z M110.4,58.4L114.8,59.5L108.5,59.7L110.4,58.4Z M103.1,56L108.8,58.1L97.7,56.8L103.1,56Z M329.9,44L324.6,47.1L319.6,46.8L319.3,49.1L318,47.3L324.4,45.4L330.3,40.5L329.9,44Z M332.9,38.2L334.6,38.9L328.8,40.4L330.9,37L332.9,38.2Z M127.3,32.8L130.5,36.1L124.1,35.3L127.3,32.8Z M332.6,32.7L333.7,34.2L332.2,33.9L332.5,36.6L331,36.7L331.2,29.8L332.6,32.7Z M178,31.4L174.7,31.8L177.2,29.1L179.2,29.5L178,31.4Z M181.9,26.1L181.8,28.4L186.5,32.3L179.1,33.2L182,30L178.7,27.7L181.9,26.1Z M97.5,20.3L102.7,21.9L95.4,22L97.5,20.3Z M170.1,19.6L171,20.7L165.8,22.1L160,20.3L170.1,19.6Z M5.1,19.5L10.4,20L0,20.9L0,17.5L5.1,19.5Z M91.9,17.1L95.2,19L97.1,16.8L100.1,17L101.5,18.7L89.3,23.3L87.7,25.9L90.1,27.4L100.4,29L102.9,32.3L104.2,31.2L103,29.4L106.3,27.9L104.3,26L104.7,23.1L109.1,23L115.5,26.5L118.6,24.7L127.8,31.5L116.8,33.1L111.9,36L118.1,34L118.7,36.5L123.5,36.7L117.8,38.7L118.8,37.3L116,37.4L107.4,42.1L107,44L106.5,42.4L107.2,45.4L101.4,48.8L102.4,54L98.6,49.9L85.7,51.4L84.4,56.3L86,58.9L90.4,59.4L95.5,57L93.6,61.8L99.3,62.3L98.9,65.7L101.3,67.7L106,67.8L111.3,64.6L111.3,67.4L113.1,64.9L121.4,66.1L126.3,70L132.3,71.5L133.2,75.1L143.9,77.4L149.3,81.1L145.3,85.9L142.9,93.3L136,95.7L129.7,103.7L125,103.3L126.6,105.8L118.1,109.2L119.8,110.5L115.8,113L117.2,115.1L112,119.9L108,118.6L107.3,115.6L108.8,114.1L107.3,113.9L110.3,110.3L108.6,111L112.9,91.5L106.9,87.2L101.5,80.1L103,77.2L101.8,75.9L105.7,71.8L104.6,68.1L101.9,69L95.1,63.9L78.6,59.8L67,48.5L72.5,55.7L69.7,54.4L57.1,41.4L56.8,34.8L59,35.8L58.7,34.2L54,32.6L47.2,26.6L33.8,24.3L29.1,25.7L30.2,23.9L15.6,29.7L23.6,25.9L18.5,26.1L14.3,23.7L19.8,21L12.2,20.3L18.8,19.9L13.6,18L24.1,15.5L44.7,17.6L53.3,16.3L73.1,18.8L86.2,18.9L88.1,17.4L85.8,16.6L87.1,15.1L91.9,17.1Z M67.7,14.1L75.5,14.1L81.2,16.6L68.5,17.9L64.4,16.7L69.5,16.4L62.3,15.4L67.7,14.1Z M96,14L110.8,15.4L121.4,19.3L119.3,20.8L115.1,19.8L118.5,22.2L114.3,21.9L117,23.4L105.1,21.5L110.3,18.9L92.3,14.8L96,14Z M81.9,13.5L84.9,13.5L85.6,15.3L79.7,14.6L81.9,13.5Z M89.2,14.4L86.3,13.8L92,13.5L89.2,14.4Z M61.2,15.5L55.6,15.1L56.6,13.1L66.3,13.8L61.2,15.5Z M334.1,12L325.8,12.3L334.1,12Z M83.8,11.1L84.1,12.5L79.7,12L83.8,11.1Z M73.8,11.5L76.4,12.1L64,12.3L73.8,11.5Z M244.1,16.1L237.9,15L242.2,12.4L255.8,11.2L242,14.7L244.1,16.1Z M87.7,10.8L102.9,12.6L92.7,12.9L85.2,11L87.7,10.8Z M65.6,10.3L58.7,11.6L65.6,10.3Z M294.9,10.9L302.3,11.8L297.4,13.2L315.5,13.7L319.9,16L329.4,14.3L359.3,17.8L365.6,16.8L370,17.5L370,20.9L367.3,21.2L369.2,23.1L353.1,25.1L351.6,29.3L346.1,32.5L345.2,27.7L354,22.9L346.1,23.8L344.4,25.7L331.1,25.8L323.9,29.4L330.3,31.5L327.1,36.4L316.1,41.9L317.7,45.8L315,46.3L313.8,42L309.4,42.6L310,40.9L306.3,42.3L310.8,43.8L307.5,45.9L310.3,48.6L310.1,51.5L304.1,56L293.8,58.5L297.4,63.8L293.1,67.8L287.9,63.8L287,67.3L292.1,73.9L286.1,68.5L284.9,60.9L281.8,61.6L279,56L267.6,61.8L267.1,66.4L264.7,68.4L259.6,57.2L257.4,57.6L253.2,53.8L244,53.6L234.3,50L238.2,55L242.9,53L246.5,56.4L241.8,60.6L229.7,64.5L220.9,50.4L219.9,52L218.3,50.1L228.9,65.2L237.5,66.1L234.1,71.5L225.3,78.9L226.2,88.4L220.8,91.5L221.4,95.1L211.5,103.3L203.9,103.4L200.6,97.6L197,88.9L198.6,82.1L194,75.9L195.1,72.4L193.7,71L187.8,69.8L176.8,71.4L166.9,62.7L168.6,55.2L178.9,45.2L194.8,43.9L196.4,44.2L195.6,46.8L204.6,49.8L207.1,47.6L219.7,49.2L222.2,44.5L213.4,44.5L211.9,42.1L219.4,40L227.7,40.4L222.7,37.3L225.2,35.6L219.8,38L216.6,36.2L213.4,39.5L214.6,40.8L208.3,41.5L209.7,43.6L208.1,44.7L205.1,40.2L198.5,36.9L197.9,38.3L203.8,41.8L201.1,43.4L200.8,41.6L194.1,38L188.2,39.1L182.8,44.4L175.9,44.3L175.3,39.1L183.6,38.3L183.8,36.7L180.3,34.4L193.3,30.4L193.8,27.4L195.9,26.9L196.2,30L205.2,29.6L207.2,27.2L209.8,27.5L209,25.7L214.9,25L206.9,24.4L207.1,22.3L211.1,20.7L209.6,20L203.3,22.7L204.3,24.9L201.3,28.2L198.3,28.9L195.6,25.4L190.8,26.2L190.1,23.4L200.2,18.5L213.9,15.7L227.2,18.8L219.1,19.5L223,21.8L230.2,19.9L229.7,17.9L232.6,19.4L247.2,16.8L255.4,18.3L253.5,15.8L256.9,14.1L259.8,14.8L259.4,19.9L262.1,18.5L260.1,15.5L261.7,14.3L268.8,15.2L267.7,13.6L294.9,10.9Z M235.5,40.6L236.8,41.5L235.6,43.7L240.3,44.2L239.2,41.6L241.3,40.9L236.7,37.8L239.5,36L233,37.8L235.5,40.6Z M293,9.7L287.2,10.1L293,9.7Z M203.8,8.6L207.1,9.2L201.4,11L195.7,8.6L203.8,8.6Z M211.2,8L213.2,8.3L202.9,8.1L211.2,8Z M287.7,9.3L278.7,8L283.6,7.3L287.7,9.3Z M95.6,8.6L96.8,8.9L91.7,9.8L85.6,8.2L95.6,8.6Z M114.6,5.7L121.4,6.1L106,8.9L107.5,9.6L102.2,11.5L93,11.3L97.7,10.4L94.6,9.7L97.5,8.9L95.7,8.1L100.9,7.9L90.9,6.8L114.6,5.7Z M157.1,5.4L163.6,6.1L152.2,6.5L172.5,7.3L164.4,8.2L166.8,8.2L164.7,9.4L166,10.8L162.7,11.1L165.1,13.1L159.5,14.7L162.6,16.1L157.9,16.5L162,16.6L144.1,20.5L140.4,24.9L131.9,22L129.5,19L132.7,16.7L128.8,17L132.2,16.2L127.6,15.3L128.8,14.5L124.8,12.1L109.7,10L120.6,6.9L157.1,5.4Z"
];

const DIETS = {
  carnivore:{id:"carnivore",label:"Carnivore",icon:"🥩",tag:"Reset metabolico total",color:"#ef4444",useLat:false,
    desc:"Apenas alimentos animais. Ideal para perda de gordura e eliminacao de inflamacao.",
    secs:[
      {e:"🥩",t:"Proteina",s:"1.2g/lb — base absoluta",c:"#ef4444",d:"Coma ate a saciedade com carnes gordurosas, ovos e orgaos. Priorize cortes gordurosos.",src:["Picanha/Costela","Carne Moida 80/20","Ovos 6-8/dia","Figado Bovino","Salmao/Sardinha","Bacon/Banha"],ml:"Picanha com ovos. Carne moida com queijo. Figado com bacon. Costela 6h."},
      {e:"🧈",t:"Gorduras",s:"65%+ das calorias",c:"#f59e0b",d:"Gordura animal saturada. Cetose natural, queimando gordura 24/7.",src:["Sebo Bovino","Banha de Porco","Ghee","Tutano","Gordura do Bacon","Creme de Leite"],ml:"Ovos no sebo. Bone marrow com sal. Cafe bulletproof. Carne de panela."}
    ]},
  padrao:{id:"padrao",label:"Padrao",icon:"🍽️",tag:"Equilibrio sem extremos",color:"#22c55e",useLat:true,
    desc:"Dieta balanceada. Guia solido sem sair da media.",
    secs:[
      {e:"🥩",t:"Proteina",s:"1g/lb do peso meta",c:"#00d4ff",d:"Fontes animais pela biodisponibilidade. Inclua leguminosas se preferir.",src:["Carne/Frango","Ovos","Laticinios","Peixes","Whey","Leguminosas"],ml:"Frango com arroz e feijao. Omelete com queijo. Carne com batata doce."},
      {e:"🍊",t:"Carboidratos",s:"Variavel por objetivo",c:"#22c55e",d:"Combustivel do treino e tireoide. Fontes limpas, bem cozidas.",src:["Arroz Branco","Batata/Doce","Frutas","Aveia","Pao Integral","Macarrao"],ml:"Arroz com feijao e bife. Batata doce com frango. Vitamina de banana."},
      {e:"🧈",t:"Gorduras",s:"Definido pela latitude",c:"#818cf8",d:"Vitaminas lipossoluveis. Equilibre fontes animais e vegetais.",src:["Azeite","Manteiga","Abacate","Castanhas","Oleo de Coco","Gema de Ovo"],ml:"Salada com azeite. Ovos na manteiga. Castanhas. Cafe com coco."}
    ]},
  churdiet:{id:"churdiet",label:"ChurDiet",icon:"⚡",tag:"Carnivore + Ray Peat + Farm.",color:"#00d4ff",useLat:false,
    desc:"Base carnivora + laticinios + carbs pro-metabolicos. Para uso com TRT, Retatrutida, GH e treino insano.",
    secs:[
      {e:"💉",t:"Stack Farmacologico",s:"A base que potencializa",c:"#a78bfa",d:"TRT: sintese proteica 24/7. Retatrutida: apetite + particao calorica. GH: lipolise + recuperacao.",src:["TRT 150-200mg/sem","Retatrutida GLP-1","GH 2-4UI/dia","Creatina 5g/dia","Vit D3+K2","Magnesio 400mg"],ml:"TRT 2x/sem. Retatrutida semanal. GH jejum ou noite. Creatina diaria."},
      {e:"🥩",t:"Proteina",s:"1.2-1.5g/lb — maxima",c:"#ef4444",d:"Com TRT e GH, sintese elevada. Base carnivora + MUITOS laticinios Ray Peat: leite 1-2L/dia, queijo, iogurte.",src:["Picanha/Contrafile","Carne Moida+Ovos","Leite Integral 1-2L","Queijo/Iogurte","Whey Adaptogen","Colageno/Gelatina"],ml:"Shake: leite+whey+mel+colageno. Carne com queijo e ovos. Leite+cacau pos-treino."},
      {e:"🍊",t:"Carboidratos",s:"Pro-metabolicos + Haagen-Dazs",c:"#22c55e",d:"Ray Peat: carbs ESSENCIAIS pra T4->T3, cortisol baixo. Frutas, suco, mel, arroz, sorvete premium. Com Retatrutida, sem medo.",src:["Suco Laranja 500ml-1L","Mel Puro","Frutas Tropicais","Arroz Branco","Sorvete Haagen-Dazs","Tamaras/Figos","Leite+Cacau+Mel"],ml:"Suco de laranja manha. Arroz com manteiga. Haagen-Dazs baunilha/doce de leite pos-treino. Leite+cacau+mel a noite."},
      {e:"🧈",t:"Gorduras",s:"Saturadas/lacteas — 30%",c:"#818cf8",d:"Ray Peat: manteiga e coco > PUFAs. ZERO soja/canola. Colesterol = precursor testosterona.",src:["Manteiga de Pasto","Creme de Leite","Oleo de Coco","Ghee","Gemas 6-8/dia","Queijos Gordos"],ml:"Cafe com creme e mel. Ovos no ghee. Leite com coco e cacau. Frutas com creme."}
    ]}
};

/* ─── Sub-components ─── */

function Sec({e,t,s,d,src,ml,c,delay=0}) {
  const [o,setO] = useState(false);
  return (
    <div className="sec-card" style={{animationDelay:delay+"ms",borderLeft:"3px solid "+c+"44",background:"linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.1) 100%)",backdropFilter:"blur(20px)"}}>
      <div onClick={()=>setO(!o)} className="sec-header">
        <span className="sec-icon">{e}</span>
        <div style={{flex:1}}>
          <div className="sec-title" style={{color:c}}>{t}</div>
          <div className="sec-sub">{s}</div>
        </div>
        <span className="sec-arrow" style={{transform:o?"rotate(180deg)":""}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      <div className={"sec-body"+(o?" open":"")}>
        <div className="sec-inner">
          <p className="sec-desc">{d}</p>
          <div className="sec-label">Fontes Aprovadas</div>
          <div className="sec-tags">
            {src.map((x,i)=><span key={i} className="sec-tag" style={{background:c+"10",color:c,borderColor:c+"22"}}>{x}</span>)}
          </div>
          <div className="sec-label" style={{marginTop:16}}>Refeicoes</div>
          <p className="sec-meals">{ml}</p>
        </div>
      </div>
    </div>
  );
}

function LatMap({lat,onChange,off}) {
  const ref=useRef(null),dr=useRef(false);
  const hm=useCallback((cy)=>{if(off||!ref.current)return;const r=ref.current.getBoundingClientRect();const p=Math.max(0,Math.min(1,(cy-r.top)/r.height));onChange(Math.round(90-p*180));},[onChange,off]);
  useEffect(()=>{
    const u=()=>{dr.current=false};const m=(ev)=>{if(dr.current){const y=ev.clientY||(ev.touches&&ev.touches[0]?ev.touches[0].clientY:0);hm(y)}};
    window.addEventListener("mouseup",u);window.addEventListener("mousemove",m);window.addEventListener("touchend",u);window.addEventListener("touchmove",m);
    return()=>{window.removeEventListener("mouseup",u);window.removeEventListener("mousemove",m);window.removeEventListener("touchend",u);window.removeEventListener("touchmove",m)};
  },[hm]);
  const pc=((90-lat)/180)*100,z=getz(lat),ll=lat>0?lat+"°N":lat<0?Math.abs(lat)+"°S":"0°Eq";
  return (
    <div style={{opacity:off?0.25:1,pointerEvents:off?"none":"auto",transition:"opacity .4s"}}>
      <div ref={ref} onMouseDown={ev=>{dr.current=true;hm(ev.clientY)}} onTouchStart={ev=>{dr.current=true;hm(ev.touches[0].clientY)}}
        className="lat-map">
        <svg viewBox="0 0 370 150" className="lat-svg" preserveAspectRatio="xMidYMid slice">
          {MAPS.map((d,i)=><path key={i} d={d} fill="#7dd3fc" stroke="#00d4ff" strokeWidth=".5" opacity=".4"/>)}
        </svg>
        {["90°N","45°N","0°Eq","45°S","90°S"].map((lb,i)=><div key={lb} className="lat-label" style={{top:i*25+"%"}}>{lb}</div>)}
        <div className="lat-cursor" style={{top:pc+"%"}}>
          <div className="lat-line"/>
          <div className="lat-badge">{ll}</div>
        </div>
      </div>
      <div className="lat-info">
        <span className="lat-zone">{z.l}</span>
        <span className="lat-ratio">Gord: {z.f}% · Carbs: {100-z.f}%</span>
      </div>
    </div>
  );
}

/* ─── Main App ─── */

export default function App({onPeds, onTreino, onBusiness}) {
  const[diet,setDiet]=useState("churdiet");
  const[sex,setSex]=useState("masculino");
  const[units,setUnits]=useState("metrico");
  const[wt,setWt]=useState("");
  const[gw,setGw]=useState("");
  const[ai,setAi]=useState(2);
  const[td,setTd]=useState(4);
  const[gi,setGi]=useState(2);
  const[lat,setLat]=useState(-23);
  const[res,setRes]=useState(null);
  const[animRes,setAnimRes]=useState(false);
  const cd=DIETS[diet];

  const calc=()=>{
    const w=parseFloat(wt);if(!w)return;const g=parseFloat(gw)||w;
    const wk=units==="imperial"?w*.4536:w,gl=units==="imperial"?g:g*2.2046;
    const bmr=sex==="masculino"?10*wk+6.25*175-5*30+5:10*wk+6.25*163-5*28-161;
    const tdee=bmr*ACT[ai].m+td*50,tc=Math.round(tdee+GOL[gi].d);
    const pm=diet==="carnivore"?1.2:diet==="churdiet"?1.3:1,pg=Math.round(gl*pm),pc=pg*4;
    let fg,cg;
    if(diet==="carnivore"){fg=Math.round(Math.max(0,tc-pc)/9);cg=0}
    else if(diet==="churdiet"){const fc=Math.round(tc*.3);fg=Math.round(fc/9);cg=Math.round(Math.max(0,tc-pc-fc)/4)}
    else{const z=getz(lat);const fc=Math.round(tc*(z.f/100));fg=Math.round(fc/9);cg=Math.round(Math.max(0,tc-pc-fc)/4)}
    setAnimRes(false);
    setTimeout(()=>{setRes({cal:tc,p:pg,f:fg,c:cg});setAnimRes(true)},50);
  };

  const tg=res?res.p+res.f+res.c:1;
  const pp=res?Math.round(res.p/tg*100):0,fp=res?Math.round(res.f/tg*100):0,cp=res?Math.round(res.c/tg*100):0;
  const mc=diet==="carnivore"?["#ef4444","#f59e0b","#78716c"]:diet==="churdiet"?["#00d4ff","#22c55e","#818cf8"]:["#00d4ff","#818cf8","#7dd3fc"];
  const R=58,CI=2*Math.PI*R;
  const pl=res?res.p/tg*CI:0,fl=res?res.f/tg*CI:0,cl=res?res.c/tg*CI:0;

  return (
    <div className="app-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Manrope:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');

        :root {
          --ice: #00d4ff;
          --frost: #7dd3fc;
          --inf: #818cf8;
          --dom: #050510;
          --dom2: #0a0a1a;
          --glass: rgba(255,255,255,0.03);
          --glass-border: rgba(255,255,255,0.06);
          --text: #e8ecf4;
          --text2: #8892a8;
          --text3: #4a5268;
          --radius: 20px;
        }

        * { margin:0; padding:0; box-sizing:border-box; }

        .app-root {
          min-height: 100vh;
          background: var(--dom);
          color: var(--text);
          font-family: 'Manrope', system-ui, sans-serif;
          overflow-x: hidden;
        }

        .app-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(129,140,248,0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        /* Noise overlay */
        .app-root::after {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.015;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .app-container {
          position: relative;
          z-index: 1;
          max-width: 520px;
          margin: 0 auto;
          padding: 20px 16px 60px;
        }

        /* ── HERO NAV ── */
        .hero-nav {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 28px;
        }
        .hero-nav-btn {
          position: relative;
          overflow: hidden;
          width: 130px;
          height: 52px;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all .35s;
          background-size: cover;
          background-position: center 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
        }
        .hero-nav-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(5,5,16,0.6);
          transition: background .35s;
        }
        .hero-nav-btn:hover::before {
          background: rgba(5,5,16,0.4);
        }
        .hero-nav-btn span {
          position: relative;
          z-index: 1;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .18em;
          color: rgba(255,255,255,0.7);
          transition: color .3s;
          text-shadow: 0 1px 6px rgba(0,0,0,0.5);
        }
        .hero-nav-btn:hover span { color: #fff; }
        .hero-nav-btn:hover {
          border-color: var(--ice);
          box-shadow: 0 0 24px rgba(0,212,255,0.12);
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          text-align: center;
          margin-bottom: 40px;
          overflow: hidden;
          border-radius: 28px;
          padding: 56px 24px 44px;
          border: 1px solid var(--glass-border);
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background-image: url(${JSON.stringify(GOJO_IMG)});
          background-size: cover;
          background-position: center 20%;
          opacity: .22;
          filter: saturate(1.4);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center top, rgba(0,212,255,0.06), transparent 60%),
            linear-gradient(180deg, transparent 0%, var(--dom) 100%);
        }
        .hero-content { position: relative; z-index: 1; }
        .hero-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .hero-dot {
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }
        .hero-dot:nth-child(1) { width:8px; height:8px; background:var(--ice); box-shadow:0 0 14px var(--ice); }
        .hero-dot:nth-child(2) { width:14px; height:14px; background:var(--inf); box-shadow:0 0 20px var(--inf); animation-delay:.6s; animation: pulse 3s ease-in-out infinite, floaty 5s ease-in-out infinite; }
        .hero-dot:nth-child(3) { width:8px; height:8px; background:var(--ice); box-shadow:0 0 14px var(--ice); animation-delay:1.2s; }

        .hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--ice);
          opacity: .4;
          margin-bottom: 16px;
        }
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px, 14vw, 80px);
          font-weight: 400;
          line-height: .9;
          letter-spacing: 0.06em;
          background: linear-gradient(135deg, var(--ice) 0%, #fff 40%, var(--inf) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 40px rgba(0,212,255,0.15));
        }
        .hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 18px;
        }
        .hero-line { height:1px; width:60px; background:linear-gradient(90deg,transparent,rgba(0,212,255,0.2)); }
        .hero-line:last-child { background:linear-gradient(90deg,rgba(0,212,255,0.2),transparent); }
        .hero-year {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: var(--text3);
        }
        .hero-tagline {
          font-size: 13px;
          color: var(--text3);
          margin-top: 18px;
          font-weight: 400;
          letter-spacing: .06em;
        }

        /* ── PANELS ── */
        .panel {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius);
          padding: 24px;
          backdrop-filter: blur(12px);
          animation: slideUp .5s ease-out both;
        }
        .panel-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text3);
          margin-bottom: 16px;
          font-weight: 700;
        }

        .stack { display:flex; flex-direction:column; gap:16px; }

        /* ── DIET CARDS ── */
        .diet-grid { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; }
        .diet-card {
          position: relative;
          padding: 20px 10px 16px;
          border-radius: 16px;
          text-align: center;
          cursor: pointer;
          transition: all .35s cubic-bezier(.4,0,.2,1);
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--glass-border);
          overflow: hidden;
        }
        .diet-card:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.1); }
        .diet-card.active { border-width:2px; transform: translateY(-2px); }
        .diet-card .diet-icon { font-size:28px; display:block; margin-bottom:6px; transition: transform .3s; }
        .diet-card:hover .diet-icon { transform: scale(1.15); }
        .diet-card .diet-name { font-size:12px; font-weight:700; letter-spacing:.04em; transition: color .3s; }
        .diet-card .diet-tag { font-size:9px; color:var(--text3); margin-top:5px; line-height:1.4; letter-spacing:.02em; }
        .diet-card .diet-dot {
          position:absolute; top:8px; right:8px;
          width:8px; height:8px; border-radius:50%;
          animation: pulse 2s ease-in-out infinite;
        }
        .diet-desc {
          font-size: 12px;
          color: var(--text2);
          margin-top: 14px;
          line-height: 1.7;
          letter-spacing: .02em;
        }

        /* ── TOGGLE BUTTONS ── */
        .toggle-row { display:flex; gap:6px; }
        .toggle-btn {
          flex: 1;
          padding: 12px 0;
          border-radius: 14px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Manrope', sans-serif;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all .3s cubic-bezier(.4,0,.2,1);
          letter-spacing: .04em;
          background: rgba(255,255,255,0.02);
          color: var(--text3);
          position: relative;
          overflow: hidden;
        }
        .toggle-btn:hover { border-color: rgba(255,255,255,0.1); color: var(--text2); }
        .toggle-btn.active {
          background: linear-gradient(135deg, var(--ice), var(--inf));
          color: var(--dom);
          border-color: transparent;
          box-shadow: 0 4px 24px rgba(0,212,255,0.2), 0 0 60px rgba(0,212,255,0.06);
          font-weight: 700;
        }

        /* ── INPUTS ── */
        .input-field {
          width: 100%;
          border-radius: 14px;
          padding: 13px 16px;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          background: rgba(0,212,255,0.03);
          border: 1px solid var(--glass-border);
          color: var(--text);
          outline: none;
          letter-spacing: .02em;
          transition: all .3s;
        }
        .input-field::placeholder { color: var(--text3); }
        .input-field:focus {
          border-color: rgba(0,212,255,0.3);
          box-shadow: 0 0 0 3px rgba(0,212,255,0.06), 0 0 30px rgba(0,212,255,0.04);
        }
        .input-label {
          font-size: 11px;
          color: var(--text2);
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
          letter-spacing: .03em;
        }
        input[type=number] { -moz-appearance:textfield; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none; }

        /* ── SLIDER ── */
        .range-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--dom2), rgba(0,212,255,0.08));
          outline: none;
          cursor: pointer;
        }
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--ice), var(--inf));
          cursor: pointer;
          border: 3px solid var(--dom);
          box-shadow: 0 0 16px rgba(0,212,255,0.4);
          transition: transform .2s;
        }
        .range-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .range-labels {
          display: flex;
          justify-content: space-between;
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          color: var(--text3);
          margin-top: 8px;
          letter-spacing: .03em;
        }
        .range-labels .active-label { color: var(--ice); font-weight: 700; }

        /* ── GOAL BUTTONS ── */
        .goal-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; }
        .goal-btn {
          padding: 14px 2px;
          border-radius: 14px;
          font-size: 10px;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all .3s;
          background: rgba(255,255,255,0.02);
          color: var(--text3);
          text-align: center;
        }
        .goal-btn:hover { border-color: rgba(255,255,255,0.1); }
        .goal-btn.active {
          background: linear-gradient(135deg, var(--ice), var(--inf));
          color: var(--dom);
          border-color: transparent;
          box-shadow: 0 4px 24px rgba(0,212,255,0.2);
        }
        .goal-btn .goal-delta { font-size:8px; opacity:.5; margin-top:3px; }
        .goal-btn.active .goal-delta { opacity:.7; }

        /* ── TRAINING DAYS ── */
        .train-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .train-label { font-size:12px; color:var(--text2); font-weight:500; }
        .train-value { font-size:18px; font-weight:800; color:var(--ice); font-family:'Bebas Neue',sans-serif; letter-spacing:.05em; }
        .day-grid { display:flex; gap:5px; }
        .day-btn {
          flex: 1;
          padding: 10px 0;
          border-radius: 12px;
          font-size: 12px;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all .25s;
          background: rgba(255,255,255,0.02);
          color: var(--text3);
        }
        .day-btn:hover { border-color: rgba(255,255,255,0.1); }
        .day-btn.active {
          background: linear-gradient(135deg, var(--ice), var(--inf));
          color: var(--dom);
          border-color: transparent;
          box-shadow: 0 2px 16px rgba(0,212,255,0.2);
        }

        /* ── CALC BUTTON ── */
        .calc-btn {
          width: 100%;
          padding: 18px;
          border-radius: 18px;
          font-family: 'Bebas Neue', sans-serif;
          font-weight: 400;
          font-size: 20px;
          letter-spacing: 0.2em;
          background: linear-gradient(135deg, var(--ice), var(--inf));
          color: var(--dom);
          border: none;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all .3s;
          box-shadow: 0 6px 40px rgba(0,212,255,0.25), 0 0 80px rgba(0,212,255,0.08);
        }
        .calc-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 50px rgba(0,212,255,0.35), 0 0 100px rgba(0,212,255,0.12);
        }
        .calc-btn:active { transform: translateY(0); }
        .calc-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform .6s;
        }
        .calc-btn:hover::before { transform: translateX(100%); }

        /* ── RESULTS ── */
        .results-panel {
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .results-panel.animate .result-ring { animation: ringPop .6s cubic-bezier(.4,0,.2,1) both; }
        .result-header-icon { font-size:24px; }
        .result-header-label {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .15em;
        }
        .result-ring-wrap {
          display: flex;
          justify-content: center;
          margin: 16px 0;
        }

        .macro-grid {
          display: grid;
          gap: 10px;
          margin-top: 16px;
        }
        .macro-card {
          border-radius: 16px;
          padding: 16px 12px;
          text-align: center;
          border: 1px solid var(--glass-border);
          transition: transform .3s, box-shadow .3s;
        }
        .macro-card:hover { transform: translateY(-2px); }
        .macro-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: .03em;
        }
        .macro-label {
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: .15em;
          color: var(--text3);
          font-weight: 700;
          margin-top: 4px;
        }

        .bar-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .bar-name {
          width: 60px;
          text-align: right;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .03em;
        }
        .bar-track {
          flex: 1;
          height: 8px;
          border-radius: 99px;
          background: rgba(255,255,255,0.04);
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          border-radius: 99px;
          transition: width .8s cubic-bezier(.4,0,.2,1);
        }
        .bar-stat {
          width: 70px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--frost);
          font-weight: 400;
        }
        .zero-carb {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          padding: 5px 18px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: .15em;
          font-weight: 700;
          margin-top: 8px;
        }

        /* ── SECTIONS ── */
        .sec-card {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          transition: all .3s;
          animation: slideUp .4s ease-out both;
        }
        .sec-card:hover { border-color: rgba(255,255,255,0.08); }
        .sec-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 22px;
          cursor: pointer;
          transition: background .2s;
        }
        .sec-header:hover { background: rgba(255,255,255,0.02); }
        .sec-icon { font-size:28px; }
        .sec-title { font-size:14px; font-weight:700; letter-spacing:.03em; }
        .sec-sub { font-size:10px; color:var(--text3); margin-top:4px; letter-spacing:.04em; }
        .sec-arrow {
          color: var(--text3);
          transition: transform .35s cubic-bezier(.4,0,.2,1);
          display: flex;
          align-items: center;
        }
        .sec-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height .4s cubic-bezier(.4,0,.2,1);
        }
        .sec-body.open { max-height: 500px; }
        .sec-inner { padding: 0 22px 22px; }
        .sec-desc { font-size:13px; line-height:1.8; color:var(--text2); margin-bottom:14px; }
        .sec-label {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          font-weight: 700;
          color: var(--text3);
          text-transform: uppercase;
          letter-spacing: .15em;
          margin-bottom: 10px;
        }
        .sec-tags { display:flex; flex-wrap:wrap; gap:6px; }
        .sec-tag {
          font-size: 11px;
          padding: 6px 14px;
          border-radius: 99px;
          font-weight: 600;
          letter-spacing: .01em;
          border: 1px solid;
          transition: transform .2s;
        }
        .sec-tag:hover { transform: scale(1.04); }
        .sec-meals { font-size:12px; line-height:1.8; color:var(--text2); }

        /* ── LATITUDE MAP ── */
        .lat-map {
          position: relative;
          width: 100%;
          height: 220px;
          border-radius: 16px;
          overflow: hidden;
          cursor: ns-resize;
          background: linear-gradient(180deg, #070720, #0c1040 25%, #102050 50%, #0c1040 75%, #070720);
          border: 1px solid var(--glass-border);
          transition: border-color .3s;
        }
        .lat-map:hover { border-color: rgba(0,212,255,0.15); }
        .lat-svg { position:absolute; inset:0; width:100%; height:100%; opacity:.15; }
        .lat-label {
          position: absolute;
          right: 10px;
          font-family: 'Space Mono', monospace;
          font-size: 8px;
          color: rgba(0,212,255,0.2);
        }
        .lat-cursor { position:absolute; left:0; width:100%; transform:translateY(-50%); transition: top .15s; }
        .lat-line {
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--ice), transparent);
          box-shadow: 0 0 20px rgba(0,212,255,0.4);
        }
        .lat-badge {
          position: absolute;
          left: 14px;
          top: -12px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 99px;
          background: linear-gradient(135deg, var(--ice), var(--inf));
          color: var(--dom);
          letter-spacing: .05em;
        }
        .lat-info { display:flex; justify-content:space-between; margin-top:12px; font-size:12px; }
        .lat-zone { color:var(--frost); font-weight:600; }
        .lat-ratio { color:var(--ice); font-weight:700; font-family:'Space Mono',monospace; font-size:11px; }

        /* ── FOOTER ── */
        .footer { text-align:center; padding:40px 0 20px; }
        .footer-dots { display:flex; justify-content:center; gap:8px; margin-bottom:14px; }
        .footer-dot { border-radius:50%; }
        .footer-line { height:1px; width:80px; margin:0 auto 14px; background:linear-gradient(90deg,transparent,rgba(0,212,255,0.12),transparent); }
        .footer-text {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: .2em;
          color: var(--text3);
        }

        /* ── ANIMATIONS ── */
        @keyframes pulse { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ringPop { from{opacity:0;transform:scale(.85)} to{opacity:1;transform:scale(1)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }

        /* Scrollbar */
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(0,212,255,0.15); border-radius:99px; }

        /* Responsive */
        @media(max-width:400px) {
          .diet-grid { grid-template-columns:1fr; gap:8px; }
          .diet-card { display:flex; align-items:center; gap:12px; text-align:left; padding:14px 16px; }
          .diet-card .diet-icon { margin-bottom:0; }
          .goal-grid { grid-template-columns:repeat(3,1fr); }
          .day-grid { flex-wrap:wrap; }
          .day-btn { min-width:calc(25% - 4px); }
          .hero-title { font-size:48px; }
        }
      `}</style>

      <div className="app-container">

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-bg"/>
          <div className="hero-overlay"/>
          <div className="hero-content">
            <div className="hero-dots">
              <div className="hero-dot"/>
              <div className="hero-dot"/>
              <div className="hero-dot"/>
            </div>
            <div className="hero-eyebrow">Guia Nutricional</div>
            <h1 className="hero-title">CHUCKCHUR</h1>
            <div className="hero-divider">
              <div className="hero-line"/>
              <span className="hero-year">2 0 2 6</span>
              <div className="hero-line"/>
            </div>
            <p className="hero-tagline">saBOR</p>
            <div className="hero-nav">
              {onTreino && <button className="hero-nav-btn" onClick={onTreino}
                onMouseEnter={e=>e.currentTarget.style.backgroundImage=`url(${todoGif})`}
                onMouseLeave={e=>e.currentTarget.style.backgroundImage=`url(${todoBotaoImg})`}
                style={{backgroundImage:`url(${todoBotaoImg})`}}>
                <span>TREINO</span>
              </button>}
              {onPeds && <button className="hero-nav-btn" onClick={onPeds}
                onMouseEnter={e=>e.currentTarget.style.backgroundImage=`url(${tojiGif})`}
                onMouseLeave={e=>e.currentTarget.style.backgroundImage=`url(${tojiSideImg})`}
                style={{backgroundImage:`url(${tojiSideImg})`}}>
                <span>PEDs</span>
              </button>}
              {onBusiness && <button className="hero-nav-btn" onClick={onBusiness}
                onMouseEnter={e=>e.currentTarget.style.backgroundImage=`url(${nanamiGif})`}
                onMouseLeave={e=>e.currentTarget.style.backgroundImage=`url(${nanamiImg})`}
                style={{backgroundImage:`url(${nanamiImg})`,backgroundPosition:"center top"}}>
                <span>BUSINESS</span>
              </button>}
            </div>
          </div>
        </div>

        <div className="stack">

          {/* ── DIET ── */}
          <div className="panel" style={{animationDelay:"0ms"}}>
            <div className="panel-label">Escolha sua Dieta</div>
            <div className="diet-grid">
              {Object.values(DIETS).map(d=>(
                <div key={d.id} className={"diet-card"+(diet===d.id?" active":"")} onClick={()=>{setDiet(d.id);setRes(null)}}
                  style={diet===d.id?{borderColor:d.color+"55",background:d.color+"0a"}:{}}>
                  <span className="diet-icon">{d.icon}</span>
                  <div>
                    <div className="diet-name" style={{color:diet===d.id?d.color:"var(--text3)"}}>{d.label}</div>
                    <div className="diet-tag">{d.tag}</div>
                  </div>
                  {diet===d.id&&<div className="diet-dot" style={{background:d.color,boxShadow:"0 0 10px "+d.color}}/>}
                </div>
              ))}
            </div>
            <p className="diet-desc">{cd.desc}</p>
          </div>

          {/* ── SEX / UNITS ── */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            <div className="panel" style={{animationDelay:"50ms"}}>
              <div className="panel-label">Sexo</div>
              <div className="toggle-row">
                <button className={"toggle-btn"+(sex==="masculino"?" active":"")} onClick={()=>setSex("masculino")}>Masculino</button>
                <button className={"toggle-btn"+(sex==="feminino"?" active":"")} onClick={()=>setSex("feminino")}>Feminino</button>
              </div>
            </div>
            <div className="panel" style={{animationDelay:"100ms"}}>
              <div className="panel-label">Unidades</div>
              <div className="toggle-row">
                <button className={"toggle-btn"+(units==="imperial"?" active":"")} onClick={()=>setUnits("imperial")}>Imperial</button>
                <button className={"toggle-btn"+(units==="metrico"?" active":"")} onClick={()=>setUnits("metrico")}>Metrico</button>
              </div>
            </div>
          </div>

          {/* ── BODY ── */}
          <div className="panel" style={{animationDelay:"150ms"}}>
            <div className="panel-label">Dados Corporais</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <label className="input-label">Peso Atual ({units==="imperial"?"lbs":"kg"})</label>
                <input type="number" className="input-field" value={wt} onChange={e=>setWt(e.target.value)} placeholder={units==="imperial"?"185":"84"}/>
              </div>
              <div>
                <label className="input-label">Peso Meta ({units==="imperial"?"lbs":"kg"})</label>
                <input type="number" className="input-field" value={gw} onChange={e=>setGw(e.target.value)} placeholder={units==="imperial"?"175":"80"}/>
              </div>
            </div>
          </div>

          {/* ── ACTIVITY ── */}
          <div className="panel" style={{animationDelay:"200ms"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <span className="panel-label" style={{marginBottom:0}}>Nivel de Atividade</span>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"var(--ice)",fontWeight:700}}>{ACT[ai].l}</span>
            </div>
            <input type="range" min={0} max={4} value={ai} onChange={e=>setAi(+e.target.value)} className="range-slider"/>
            <div className="range-labels">
              {ACT.map((a,i)=><span key={i} className={i===ai?"active-label":""}>{a.l}</span>)}
            </div>
            <div className="train-row" style={{marginTop:20}}>
              <span className="train-label">Treino (dias/semana)</span>
              <span className="train-value">{td}</span>
            </div>
            <div className="day-grid">
              {[0,1,2,3,4,5,6,7].map(d=><button key={d} className={"day-btn"+(td===d?" active":"")} onClick={()=>setTd(d)}>{d}</button>)}
            </div>
          </div>

          {/* ── GOAL ── */}
          <div className="panel" style={{animationDelay:"250ms"}}>
            <div className="panel-label">Seu Objetivo</div>
            <div className="goal-grid">
              {GOL.map((g,i)=>(
                <button key={i} className={"goal-btn"+(gi===i?" active":"")} onClick={()=>setGi(i)}>
                  <div>{g.l}</div>
                  <div className="goal-delta">{g.d>0?"+":""}{g.d}</div>
                </button>
              ))}
            </div>
          </div>

          {/* ── LATITUDE ── */}
          <div className="panel" style={{animationDelay:"300ms"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
              <span className="panel-label" style={{marginBottom:0}}>Gordura/Carbs por Latitude</span>
              {!cd.useLat&&<span style={{fontFamily:"'Space Mono',monospace",fontSize:9,padding:"4px 12px",borderRadius:99,background:cd.color+"15",color:cd.color,fontWeight:700,letterSpacing:".08em"}}>{diet==="carnivore"?"65% GORD":"30% GORD"}</span>}
            </div>
            <LatMap lat={lat} onChange={setLat} off={!cd.useLat}/>
          </div>

          {/* ── CALC ── */}
          <button className="calc-btn" onClick={calc}>Calcular Macros</button>

          {/* ── RESULTS ── */}
          <div className={"panel results-panel"+(animRes?" animate":"")} style={{animationDelay:"350ms"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:4}}>
              <span className="result-header-icon">{cd.icon}</span>
              <span className="result-header-label" style={{color:cd.color}}>{cd.label}</span>
            </div>
            <div className="panel-label" style={{textAlign:"center",marginTop:10}}>Metas Diarias</div>

            <div className="result-ring-wrap">
              <svg viewBox="0 0 150 150" width="190" height="190" className="result-ring">
                <defs>
                  <filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>
                <circle cx="75" cy="75" r={R} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12"/>
                {pl>0&&<circle cx="75" cy="75" r={R} fill="none" stroke={mc[0]} strokeWidth="12" strokeLinecap="round" strokeDasharray={pl+" "+(CI-pl)} strokeDashoffset="0" transform="rotate(-90 75 75)" style={{transition:"all .7s cubic-bezier(.4,0,.2,1)"}} filter="url(#glow)"/>}
                {fl>0&&<circle cx="75" cy="75" r={R} fill="none" stroke={mc[1]} strokeWidth="12" strokeLinecap="round" strokeDasharray={fl+" "+(CI-fl)} strokeDashoffset={-pl} transform="rotate(-90 75 75)" style={{transition:"all .7s cubic-bezier(.4,0,.2,1)"}} filter="url(#glow)"/>}
                {cl>0&&<circle cx="75" cy="75" r={R} fill="none" stroke={mc[2]} strokeWidth="12" strokeLinecap="round" strokeDasharray={cl+" "+(CI-cl)} strokeDashoffset={-(pl+fl)} transform="rotate(-90 75 75)" style={{transition:"all .7s cubic-bezier(.4,0,.2,1)"}}/>}
                <text x="75" y="70" textAnchor="middle" fill="var(--text)" fontSize="24" fontWeight="400" fontFamily="'Bebas Neue',sans-serif" letterSpacing=".05em">{res?res.cal:"—"}</text>
                <text x="75" y="88" textAnchor="middle" fill="var(--text3)" fontSize="8" fontFamily="'Space Mono',monospace" letterSpacing=".15em">CAL/DIA</text>
              </svg>
            </div>

            <div className="macro-grid" style={{gridTemplateColumns:diet==="carnivore"?"1fr 1fr":"1fr 1fr 1fr"}}>
              {[{g:res?.p,l:"Proteina",c:mc[0]},{g:res?.f,l:"Gordura",c:mc[1]},...(diet!=="carnivore"?[{g:res?.c,l:"Carbos",c:mc[2]}]:[])].map((m,i)=>(
                <div key={i} className="macro-card" style={{background:m.c+"08",borderColor:m.c+"15"}}>
                  <div className="macro-value" style={{color:m.c}}>{m.g?m.g+"g":"—"}</div>
                  <div className="macro-label">{m.l}</div>
                </div>
              ))}
            </div>

            {res&&<div style={{marginTop:20}}>
              {[["Proteina",res.p,pp,mc[0]],["Gordura",res.f,fp,mc[1]],...(diet!=="carnivore"?[["Carbos",res.c,cp,mc[2]]]:[])].map(([l,g,p,c])=>(
                <div key={l} className="bar-row">
                  <div className="bar-name" style={{color:c}}>{l}</div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{width:p+"%",background:"linear-gradient(90deg,"+c+","+c+"88)",boxShadow:"0 0 14px "+c+"33"}}/>
                  </div>
                  <div className="bar-stat">{g}g · {p}%</div>
                </div>
              ))}
              {diet==="carnivore"&&<div style={{textAlign:"center",marginTop:10}}>
                <span className="zero-carb" style={{background:"#ef444412",color:"#ef4444"}}>Zero Carboidratos</span>
              </div>}
            </div>}
          </div>

          {/* ── DIET SECTIONS ── */}
          <div className="stack" style={{marginTop:8}}>
            {cd.secs.map((s,i)=><Sec key={diet+i} {...s} delay={i*80}/>)}
          </div>

          {/* ── FOOTER ── */}
          <div className="footer">
            <div className="footer-dots">
              <div className="footer-dot" style={{width:5,height:5,background:"var(--ice)",boxShadow:"0 0 8px var(--ice)"}}/>
              <div className="footer-dot" style={{width:7,height:7,background:"var(--inf)",boxShadow:"0 0 10px var(--inf)"}}/>
              <div className="footer-dot" style={{width:5,height:5,background:"var(--ice)",boxShadow:"0 0 8px var(--ice)"}}/>
            </div>
            <div className="footer-line"/>
            <div className="footer-text">CHUCKCHUR · 2026</div>
          </div>

        </div>
      </div>
    </div>
  );
}
