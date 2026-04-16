import { useState } from "react";
import nanamiImg from "./nanami.jpg";

/* ═══════════════════════════════════════════
   Business Fundamentals — Nanami Edition
   Filosofia Pratica de Construcao de Startups
   ═══════════════════════════════════════════ */

const SECTIONS = [
  {
    id: "team", num: "01", icon: "👥", title: "A Necessidade de um Time",
    intro: "Tentar construir uma empresa sozinho e estruturalmente ineficiente. Um negocio moderno opera em multiplas frentes simultaneas que exigem especializacoes distintas e incompativeis em profundidade: arquitetura de codigo, logica de pagamentos (Stripe, assinaturas recorrentes, webhooks, reconciliacao), operacoes e logistica empresarial, marketing, growth, atendimento ao cliente, juridico e financeiro. Nenhum individuo consegue manter alta performance em todas essas areas em paralelo — o custo cognitivo de contexto e alto demais.",
    points: [
      { t: "Divisao de trabalho como alavanca", d: "Ter co-fundadores — idealmente dois ou tres — permite que cada membro foque integralmente em sua especialidade. Isso multiplica a velocidade de entrega porque remove o gargalo do \"fundador solo\" que precisa alternar entre codigo pela manha, marketing a tarde e suporte a noite. A composicao ideal contempla perfis complementares: um especialista tecnico (produto/engenharia), um especialista comercial (vendas/marketing) e, quando possivel, um operador (gestao/financas)." },
      { t: "O custo do isolamento", d: "Tentar fazer tudo sozinho no primeiro projeto e uma experiencia valida como aprendizado, mas nao e rota para sucesso em escala. Fundador solo significa menos velocidade, menos pontos cegos cobertos e maior risco de burnout. A decisao de trabalhar com socios deve ser tomada cedo, antes que a estrutura acionaria e cultural da empresa solidifique em torno de uma unica pessoa." }
    ],
    takeaway: "Implicacao pratica: antes de validar a ideia no mercado, valide o time. Sem time, a execucao nao escala."
  },
  {
    id: "domain", num: "02", icon: "🧠", title: "Conhecimento de Dominio",
    intro: "Este e um pilar central — talvez o mais subestimado por fundadores iniciantes. Para competir em qualquer mercado tecnico, o time precisa possuir entendimento profundo do campo de atuacao. Conhecimento de dominio nao e opcional; e a unica barreira de entrada que se sustenta quando os copiadores chegam.",
    points: [
      { t: "Definicao operacional", d: "Se o time nao entende o problema real do cliente, a logica tecnica do produto ou as dinamicas especificas daquele mercado — seja analise de estetica facial, construcao de drones, tributacao IBS/CBS ou qualquer outro nicho — a startup sera estruturalmente deficiente. Ela sera facilmente superada por concorrentes que dominam o dominio, porque esses concorrentes vao iterar mais rapido, tomar decisoes mais acertadas e construir o produto certo na primeira tentativa (ou na segunda)." },
      { t: "Como aplicar na pratica", d: "Em um time bem-construido, cada co-fundador e dono absoluto de um dominio e nao existem \"gargalos de conhecimento\" centralizados em uma unica pessoa. Um exemplo real: em uma startup de IA para analise facial, um fundador lidera a estrategia de IA e os algoritmos (dominio tecnico profundo), enquanto outros gerenciam marketing e expansao de funcionalidades (dominio comercial e de produto). Nenhuma area fica orfa." },
      { t: "Sinal de alerta", d: "Se voce se pega dependendo de consultores externos para decisoes centrais do produto, o conhecimento de dominio esta fora da empresa — e isso e uma vulnerabilidade estrategica grave. Consultores rotam; fundadores nao." }
    ]
  },
  {
    id: "exec", num: "03", icon: "⚡", title: 'Execucao, Velocidade e a "Copia" Etica',
    intro: "Uma das maiores armadilhas mentais do empreendedor iniciante e acreditar que ser copiado e um crime, uma injustica ou algo negativo. Esse enquadramento e equivocado e paralisante.",
    points: [
      { t: "Ideias nao valem nada", d: "Ideias abundam; o que importa e a execucao. Ir ao mercado mais rapido, iterar melhor, resolver bugs antes do concorrente, entender o cliente com mais profundidade e lancar a proxima versao enquanto os outros ainda estao planejando. A ideia e o ingresso; a execucao e o jogo." },
      { t: "Iteracao vs. plagio: a diferenca real", d: "Adotar conceitos que funcionam e melhora-los e pratica padrao de mercado. O Facebook fez isso com o MySpace — pegou o conceito de rede social, removeu o que nao funcionava e construiu algo superior. Apple fez isso com interfaces graficas. Google fez com buscadores. Nao e plagio; e evolucao competitiva. A linha entre copiar e iterar se define pela adicao de valor: se voce apenas duplicou, e plagio; se voce melhorou, e iteracao legitima." },
      { t: "A vantagem competitiva real", d: "Mesmo que concorrentes copiem seu layout, posicionamento ou conceitos, a vantagem competitiva esta na velocidade de atualizacao. Quem lanca novas features mais rapido, quem escuta o cliente primeiro, quem mantem o produto evoluindo semana a semana — esse vence. Copiadores sempre estao atrasados por definicao, porque estao olhando para tras." },
      { t: 'A logica da "justica" nos negocios', d: "Justica em negocios nao e categoria emocional; e categoria logica. Ela funciona como um sistema de inputs e outputs." }
    ],
    formula: "Esforco + Time + Inteligencia + Velocidade + Conhecimento de dominio → Resultado",
    takeaway: "O resultado e consequencia dos inputs, nao de sorte, favor ou merito subjetivo. Quem coloca mais inputs de qualidade, recebe mais outputs. Essa visao remove a ideia de vitimizacao (\"fui copiado, e injusto\") e substitui por responsabilidade (\"preciso acelerar meus inputs\")."
  },
  {
    id: "grind", num: "04", icon: "🔥", title: 'Cultura de "Grind" e Disciplina',
    intro: "O sucesso acima da media exige dedicacao acima da media. Nao ha atalho que contorne essa equacao — apenas ferramentas que a tornam mais eficiente.",
    points: [
      { t: "Carga horaria real", d: "Times de alta performance em estagio de construcao operam, em media, 12 a 16 horas diarias. Isso nao e glamour; e realidade operacional. A mentalidade \"das 9h as 17h\" e incompativel com a construcao de algo extraordinario no periodo compacto em que uma startup precisa validar, iterar e escalar antes que recursos acabem ou concorrentes ultrapassem." },
      { t: "Proporcionalidade objetivo x esforco", d: "Se o objetivo e construir um negocio de R$ 100 mil por mes, o esforco de horario comercial pode ser suficiente. Se o objetivo e construir um negocio de R$ 10 milhoes ou mais, o esforco precisa ser proporcional ao premio. A matematica e simples e impiedosa." },
      { t: "Grind nao e sofrimento", d: "Essa e a confusao mais comum. Grind extremo sem proposito leva ao burnout rapidamente. Grind extremo com proposito claro, feedback tangivel (metricas que sobem, clientes que entram, features que funcionam) e objetivo estimulante se transforma em estado de fluxo. O cansaco existe, mas vem acompanhado de satisfacao — nao de vazio." }
    ]
  },
  {
    id: "updates", num: "05", icon: "📹", title: "Atualizacoes Constantes de Produto",
    intro: "A filosofia de construcao de negocios tem forte paralelo com mecanica de jogos de videogame. Em ambos os contextos, o que separa quem progride de quem estagna e a combinacao de escolha de mercado correto + eficiencia maxima de execucao. Os proximos topicos aprofundam essas duas dimensoes.",
    points: []
  },
  {
    id: "tam", num: "06", icon: "📊", title: "A Importancia do Tamanho do Mercado (TAM)",
    intro: "O sucesso de uma startup e limitado matematicamente pelo tamanho do mercado em que ela opera — o Total Addressable Market (TAM). Esse e um conceito que precisa ser dominado antes mesmo da fase de ideacao.",
    points: [
      { t: "A analogia do jogo", d: "Imagine dois jogos que exigem o mesmo esforco para serem dominados, mas com premiacoes drasticamente diferentes. Jogar por milhares de horas o jogo com premio pequeno ou inexistente e irracional quando o mesmo esforco aplicado no jogo com premio maior traria retorno multiplas vezes superior. Empreendedorismo funciona identico: o esforco para construir uma startup de nicho estagnado e semelhante ao esforco para construir uma startup em mercado emergente e grande — mas os resultados sao incomparaveis." },
      { t: "O caso da migracao estrategica", d: "A transicao de jogadores de Destiny para Fortnite nao foi aleatoria — foi resposta racional ao tamanho da audiencia, ao potencial de crescimento e a relevancia cultural. O mesmo raciocinio se aplica a mercados. Abandonar um nicho que nao cresce mais para entrar em um mercado em expansao nao e deslealdade — e inteligencia estrategica." },
      { t: "Criterios para avaliar TAM antes de entrar", d: "", list: [
        "Tamanho absoluto do mercado em valor monetario anual",
        "Taxa de crescimento (mercados em expansao perdoam erros; mercados estagnados nao)",
        "Grau de maturidade da concorrencia (mercado dominado por 2-3 players gigantes e diferente de mercado fragmentado)",
        "Velocidade de adocao do tipo de solucao que voce oferece",
        "Margem media praticada no setor",
        "Potencial de expansao adjacente (o mercado pode crescer para verticais relacionadas?)"
      ]}
    ],
    takeaway: "Regra pratica: se a resposta para \"mesmo dominando 100% deste nicho, o negocio vale o esforco?\" e negativa, o nicho esta errado — nao o fundador."
  },
  {
    id: "farm", num: "07", icon: "🎮", title: '"Farming" Eficiente: Estrategia + Ferramentas',
    intro: "Trabalhar duro e condicao necessaria, mas nao suficiente. O que separa resultados exponenciais de resultados lineares e a combinacao entre estrategia correta e ferramentas adequadas.",
    points: [
      { t: "A mecanica do RPG aplicada ao negocio", d: "Em jogos de RPG como Adventure Quest Worlds, jogadores experientes nao passam horas matando monstros fracos para evoluir. Eles identificam a rota mais eficiente: qual missao da mais experiencia por minuto, quais equipamentos multiplicam o ganho, qual combinacao de habilidades reduz o tempo de combate. A pergunta central nunca e \"estou me esforcando?\", e \"estou me esforcando na rota certa, com as ferramentas certas?\"." },
      { t: "Traducao para empreendedorismo", d: "", list: [
        "Ferramentas como multiplicadores — IA, automacao, frameworks modernos, SaaS prontos para problemas comuns, agentes, APIs — tudo isso e o equivalente a equipamento de alto nivel. Nao usar essas ferramentas em 2026 e o mesmo que tentar farmar de nivel 1 com espada de madeira.",
        "Estrategia correta — Antes de executar, definir claramente: qual e o objetivo? Qual e o caminho mais curto ate ele? Qual e a ordem correta de prioridades? Qual metrica vai sinalizar progresso real versus movimento ocupado?",
        "Escalabilidade embutida — Cada decisao operacional precisa ser avaliada pela pergunta: \"isso escala sem proporcionalmente escalar meu tempo?\". Processos manuais que nao escalam sao dividas tecnicas disfarcadas."
      ]}
    ],
    takeaway: "Principio central: esforco sem estrategia e desperdicio. Estrategia sem esforco e teoria. O resultado exponencial surge na interseccao — e as ferramentas certas multiplicam essa interseccao."
  },
  {
    id: "mind", num: "08", icon: "🧘", title: "Mentalidade e Dominio: Refutando o Mito do Burnout",
    intro: "Empreendedorismo de alto nivel exige simultaneamente conhecimento de dominio profundo e dedicacao intensa. A tese de que excesso de trabalho leva inevitavelmente ao burnout precisa ser refinada.",
    points: [
      { t: "O que realmente causa burnout", d: "Burnout raramente e consequencia apenas de volume de horas. E consequencia de:", list: [
        "Trabalho desalinhado com proposito pessoal",
        "Ausencia de autonomia sobre o proprio tempo e decisoes",
        "Falta de feedback tangivel (ninguem ve, nada muda)",
        "Falta de progresso visivel em direcao a um objetivo claro",
        "Isolamento emocional e ausencia de suporte"
      ]},
      { t: "O estado alternativo", d: "Quando o objetivo e claro, estimulante e pessoalmente significativo, o esforco mental e fisico deixa de ser sofrimento e se transforma em busca prazerosa por marcos e metas. O empreendedor nesse estado opera em ciclos longos de alta produtividade, extrai satisfacao do processo em si (nao apenas do resultado final) e encontra energia justamente onde outros encontrariam exaustao." },
      { t: "Componentes praticos dessa mentalidade", d: "", list: [
        "Clareza absoluta de proposito — Por que este negocio existe? Por que vale a sua vida?",
        "Marcos intermediarios frequentes — Metas semanais e mensais que gerem sensacao de avanco.",
        "Conexao com o dominio — Gostar genuinamente do campo em que atua — nao apenas do dinheiro que ele promete.",
        "Gestao de recuperacao — Sono, treino, alimentacao e espiritualidade nao como luxo, mas como infraestrutura de performance.",
        "Disciplina, nao motivacao — Motivacao e flutuante; disciplina e sistema. Quem depende de motivacao colapsa nos dias ruins."
      ]}
    ]
  },
  {
    id: "conclusion", num: "09", icon: "🏆", title: "Negocio como Jogo de Eficiencia",
    intro: "Entender a mecanica do mercado antes de entrar e o que separa quem apenas se esforca arduamente de quem obtem resultados exponenciais. Essa e a sintese de todos os principios anteriores.",
    points: [
      { t: "Recapitulacao estrategica", d: "", list: [
        "Escolha o jogo certo (TAM grande, em crescimento, com janela de entrada viavel)",
        "Monte um time com conhecimento de dominio distribuido e sem gargalos",
        "Execute com velocidade — ideias nao valem nada, so a iteracao vale",
        "Aceite a copia como validacao e responda com aceleracao, nao com lamentacao",
        "Use as ferramentas certas (IA, automacao, SaaS) como multiplicadores",
        "Mantenha disciplina de grind com proposito claro para evitar burnout",
        "Construa para escalar — cada decisao precisa sobreviver ao crescimento 10x"
      ]}
    ],
    takeaway: "O insight final: sucesso em negocios nao e sorte, nao e merito moral e nao e injustica disfarcada. E resultado logico e previsivel da qualidade dos inputs aplicados sistematicamente ao longo do tempo. Quem domina essa equacao deixa de jogar o jogo do acaso e comeca a jogar o jogo da engenharia. E esse e o unico jogo que recompensa proporcionalmente o esforco inteligente."
  }
];

function SectionCard({ sec, delay }) {
  const [open, setOpen] = useState(false);
  const hasExpandable = sec.points.length > 0 || sec.formula || sec.takeaway;

  return (
    <div className="biz-card" style={{ animationDelay: delay + "ms" }}>
      <div
        className={"biz-header" + (hasExpandable ? " clickable" : "")}
        onClick={() => hasExpandable && setOpen(!open)}
      >
        <div className="biz-num">{sec.num}</div>
        <span className="biz-icon">{sec.icon}</span>
        <div style={{ flex: 1 }}>
          <div className="biz-title">{sec.title}</div>
        </div>
        {hasExpandable && (
          <span className="biz-arrow" style={{ transform: open ? "rotate(180deg)" : "" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </span>
        )}
      </div>
      <div className="biz-intro">{sec.intro}</div>
      {hasExpandable && (
        <div className={"biz-body" + (open ? " open" : "")}>
          <div className="biz-inner">
            {sec.points.map((p, i) => (
              <div key={i} className="biz-point">
                <div className="biz-point-title">{p.t}</div>
                {p.d && <div className="biz-point-desc">{p.d}</div>}
                {p.list && (
                  <ul className="biz-list">
                    {p.list.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )}
              </div>
            ))}
            {sec.formula && (
              <div className="biz-formula">{sec.formula}</div>
            )}
            {sec.takeaway && (
              <div className="biz-takeaway">{sec.takeaway}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BusinessPage({ onBack }) {
  return (
    <div className="biz-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Manrope:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap');

        :root {
          --biz-tan: #d0cea8;
          --biz-green: #38492c;
          --biz-gray: #cec5c3;
          --biz-olive: #8b865a;
          --biz-blue: #345277;
          --biz-bg: #0c0c0a;
          --biz-bg2: #141410;
          --biz-glass: rgba(208,206,168,0.03);
          --biz-glass-border: rgba(208,206,168,0.08);
          --biz-text: #e8e6d8;
          --biz-text2: #9e9b88;
          --biz-text3: #5a5845;
        }

        * { margin:0; padding:0; box-sizing:border-box; }

        .biz-root {
          min-height: 100vh;
          background: var(--biz-bg);
          color: var(--biz-text);
          font-family: 'Manrope', system-ui, sans-serif;
          overflow-x: hidden;
        }

        .biz-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(208,206,168,0.04) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 100%, rgba(52,82,119,0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .biz-root::after {
          content: '';
          position: fixed;
          inset: 0;
          opacity: 0.02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        .biz-container {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px 16px 60px;
        }

        /* ── BACK BUTTON ── */
        .biz-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 99px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--biz-tan);
          background: rgba(208,206,168,0.06);
          border: 1px solid var(--biz-glass-border);
          cursor: pointer;
          transition: all .3s;
          margin-bottom: 32px;
        }
        .biz-back:hover {
          background: rgba(208,206,168,0.12);
          border-color: var(--biz-tan);
          box-shadow: 0 0 20px rgba(208,206,168,0.08);
        }

        /* ── HERO ── */
        .biz-hero {
          position: relative;
          text-align: center;
          margin-bottom: 48px;
          overflow: hidden;
          border-radius: 28px;
          padding: 60px 24px 48px;
          border: 1px solid var(--biz-glass-border);
        }
        .biz-hero-bg {
          position: absolute;
          inset: 0;
          background-image: url(${JSON.stringify(nanamiImg)});
          background-size: cover;
          background-position: center 20%;
          opacity: .18;
          filter: saturate(0.8) sepia(0.3);
        }
        .biz-hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at center top, rgba(208,206,168,0.06), transparent 60%),
            linear-gradient(180deg, transparent 0%, var(--biz-bg) 100%);
        }
        .biz-hero-content { position: relative; z-index: 1; }
        .biz-hero-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 24px;
        }
        .biz-hero-dot {
          border-radius: 50%;
          animation: bizPulse 3s ease-in-out infinite;
        }
        .biz-hero-dot:nth-child(1) { width:8px; height:8px; background:var(--biz-tan); box-shadow:0 0 14px var(--biz-tan); }
        .biz-hero-dot:nth-child(2) { width:14px; height:14px; background:var(--biz-blue); box-shadow:0 0 20px var(--biz-blue); animation-delay:.6s; animation: bizPulse 3s ease-in-out infinite, bizFloat 5s ease-in-out infinite; }
        .biz-hero-dot:nth-child(3) { width:8px; height:8px; background:var(--biz-olive); box-shadow:0 0 14px var(--biz-olive); animation-delay:1.2s; }

        .biz-hero-eyebrow {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--biz-olive);
          opacity: .6;
          margin-bottom: 16px;
        }
        .biz-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(48px, 12vw, 72px);
          font-weight: 400;
          line-height: .9;
          letter-spacing: 0.06em;
          background: linear-gradient(135deg, var(--biz-tan) 0%, #fff 40%, var(--biz-olive) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 40px rgba(208,206,168,0.12));
        }
        .biz-hero-sub {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(20px, 5vw, 28px);
          letter-spacing: 0.12em;
          color: var(--biz-blue);
          margin-top: 4px;
        }
        .biz-hero-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-top: 20px;
        }
        .biz-hero-line { height:1px; width:60px; background:linear-gradient(90deg,transparent,rgba(208,206,168,0.2)); }
        .biz-hero-line:last-child { background:linear-gradient(90deg,rgba(208,206,168,0.2),transparent); }
        .biz-hero-year {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.4em;
          color: var(--biz-text3);
        }
        .biz-hero-tagline {
          font-size: 13px;
          color: var(--biz-text3);
          margin-top: 18px;
          font-weight: 400;
          letter-spacing: .06em;
          line-height: 1.7;
        }

        /* ── SECTION CARDS ── */
        .biz-stack { display: flex; flex-direction: column; gap: 14px; }

        .biz-card {
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--biz-glass-border);
          background: linear-gradient(135deg, rgba(208,206,168,0.02) 0%, rgba(0,0,0,0.15) 100%);
          backdrop-filter: blur(20px);
          transition: all .3s;
          animation: bizSlideUp .4s ease-out both;
        }
        .biz-card:hover { border-color: rgba(208,206,168,0.12); }

        .biz-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px 22px 0;
          transition: background .2s;
        }
        .biz-header.clickable { cursor: pointer; }
        .biz-header.clickable:hover { background: rgba(208,206,168,0.02); }

        .biz-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          color: var(--biz-blue);
          opacity: 0.4;
          letter-spacing: .05em;
          min-width: 32px;
        }
        .biz-icon { font-size: 24px; }
        .biz-title {
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .03em;
          color: var(--biz-tan);
        }
        .biz-arrow {
          color: var(--biz-text3);
          transition: transform .35s cubic-bezier(.4,0,.2,1);
          display: flex;
          align-items: center;
        }

        .biz-intro {
          padding: 14px 22px 18px;
          padding-left: 70px;
          font-size: 13px;
          line-height: 1.8;
          color: var(--biz-text2);
          letter-spacing: .01em;
        }

        .biz-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height .6s cubic-bezier(.4,0,.2,1);
        }
        .biz-body.open { max-height: 3000px; }

        .biz-inner {
          padding: 0 22px 22px;
          padding-left: 70px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .biz-point {
          padding: 16px;
          border-radius: 14px;
          background: rgba(208,206,168,0.03);
          border: 1px solid rgba(208,206,168,0.06);
          transition: all .3s;
        }
        .biz-point:hover {
          border-color: rgba(208,206,168,0.12);
          transform: translateX(4px);
        }
        .biz-point-title {
          font-size: 12px;
          font-weight: 700;
          color: var(--biz-olive);
          letter-spacing: .05em;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-family: 'Space Mono', monospace;
        }
        .biz-point-desc {
          font-size: 13px;
          line-height: 1.8;
          color: var(--biz-text2);
        }

        /* ── LISTS ── */
        .biz-list {
          list-style: none;
          padding: 0;
          margin: 8px 0 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .biz-list li {
          position: relative;
          padding-left: 18px;
          font-size: 12px;
          line-height: 1.8;
          color: var(--biz-text2);
        }
        .biz-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--biz-olive);
          opacity: 0.6;
        }

        /* ── FORMULA BLOCK ── */
        .biz-formula {
          padding: 18px 22px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(52,82,119,0.1), rgba(208,206,168,0.05));
          border-left: 3px solid var(--biz-blue);
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          font-weight: 700;
          color: var(--biz-tan);
          letter-spacing: .03em;
          text-align: center;
        }

        /* ── TAKEAWAY ── */
        .biz-takeaway {
          padding: 16px 20px;
          border-radius: 14px;
          background: rgba(56,73,44,0.12);
          border: 1px solid rgba(56,73,44,0.2);
          font-size: 13px;
          line-height: 1.8;
          color: var(--biz-tan);
          font-weight: 500;
        }

        /* ── QUOTE BLOCK ── */
        .biz-quote {
          position: relative;
          padding: 32px 28px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(52,82,119,0.08), rgba(208,206,168,0.04));
          border: 1px solid rgba(52,82,119,0.15);
          text-align: center;
          animation: bizSlideUp .4s ease-out both;
        }
        .biz-quote-mark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 48px;
          color: var(--biz-blue);
          opacity: 0.3;
          line-height: 1;
        }
        .biz-quote-text {
          font-size: 15px;
          line-height: 1.8;
          color: var(--biz-tan);
          font-weight: 500;
          margin-top: 8px;
          font-style: italic;
        }
        .biz-quote-attr {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: .15em;
          color: var(--biz-text3);
          margin-top: 16px;
          text-transform: uppercase;
        }

        /* ── FOOTER ── */
        .biz-footer { text-align:center; padding:48px 0 20px; }
        .biz-footer-dots { display:flex; justify-content:center; gap:8px; margin-bottom:14px; }
        .biz-footer-dot { border-radius:50%; }
        .biz-footer-line { height:1px; width:80px; margin:0 auto 14px; background:linear-gradient(90deg,transparent,rgba(208,206,168,0.12),transparent); }
        .biz-footer-text {
          font-family: 'Space Mono', monospace;
          font-size: 9px;
          letter-spacing: .2em;
          color: var(--biz-text3);
        }

        /* ── ANIMATIONS ── */
        @keyframes bizPulse { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes bizFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes bizSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        /* Scrollbar */
        .biz-root ::-webkit-scrollbar { width:6px; }
        .biz-root ::-webkit-scrollbar-track { background:transparent; }
        .biz-root ::-webkit-scrollbar-thumb { background:rgba(208,206,168,0.15); border-radius:99px; }

        /* Responsive */
        @media(max-width:400px) {
          .biz-intro { padding-left: 22px; }
          .biz-inner { padding-left: 22px; }
          .biz-num { display: none; }
          .biz-hero-title { font-size: 42px; }
        }
      `}</style>

      <div className="biz-container">

        {/* ── BACK ── */}
        <button className="biz-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          Voltar
        </button>

        {/* ── HERO ── */}
        <div className="biz-hero">
          <div className="biz-hero-bg" />
          <div className="biz-hero-overlay" />
          <div className="biz-hero-content">
            <div className="biz-hero-dots">
              <div className="biz-hero-dot" />
              <div className="biz-hero-dot" />
              <div className="biz-hero-dot" />
            </div>
            <div className="biz-hero-eyebrow">Filosofia Pratica</div>
            <h1 className="biz-hero-title">BUSINESS</h1>
            <div className="biz-hero-sub">FUNDAMENTALS</div>
            <div className="biz-hero-divider">
              <div className="biz-hero-line" />
              <span className="biz-hero-year">2 0 2 6</span>
              <div className="biz-hero-line" />
            </div>
            <p className="biz-hero-tagline">Construcao de Startups como jogo de eficiencia</p>
          </div>
        </div>

        {/* ── SECTIONS ── */}
        <div className="biz-stack">
          {SECTIONS.map((sec, i) => (
            <SectionCard key={sec.id} sec={sec} delay={i * 60} />
          ))}
        </div>

        {/* ── CLOSING QUOTE ── */}
        <div className="biz-quote" style={{ marginTop: 24, animationDelay: SECTIONS.length * 60 + "ms" }}>
          <div className="biz-quote-mark">"</div>
          <div className="biz-quote-text">
            Sucesso em negocios nao e sorte, nao e merito moral e nao e injustica disfarcada. E resultado logico e previsivel da qualidade dos inputs aplicados sistematicamente ao longo do tempo.
          </div>
          <div className="biz-quote-attr">— Business Fundamentals</div>
        </div>

        {/* ── FOOTER ── */}
        <div className="biz-footer">
          <div className="biz-footer-dots">
            <div className="biz-footer-dot" style={{ width: 5, height: 5, background: "var(--biz-tan)", boxShadow: "0 0 8px var(--biz-tan)" }} />
            <div className="biz-footer-dot" style={{ width: 7, height: 7, background: "var(--biz-blue)", boxShadow: "0 0 10px var(--biz-blue)" }} />
            <div className="biz-footer-dot" style={{ width: 5, height: 5, background: "var(--biz-olive)", boxShadow: "0 0 8px var(--biz-olive)" }} />
          </div>
          <div className="biz-footer-line" />
          <div className="biz-footer-text">CHUCKCHUR · BUSINESS · 2026</div>
        </div>

      </div>
    </div>
  );
}
