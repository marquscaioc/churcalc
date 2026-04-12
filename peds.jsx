import { useState } from "react";
import tojiImg from "./toji.png";

/* ═══════════════════════════════════════════
   PEDs Dossier — Toji Fushiguro Edition
   ═══════════════════════════════════════════ */

const R = { low:"#4a7a5e", med:"#c9a96e", high:"#a65555", vhigh:"#8b3a3a" };
const RL = { low:"Baixo", med:"Moderado", high:"Alto", vhigh:"Critico" };
const HL = { safe:"Seguro", mild:"Leve", risky:"Risco", nuke:"Nuclear" };
const HC = { safe:"#4a7a5e", mild:"#c9a96e", risky:"#a65555", nuke:"#8b3a3a" };

const CATS = [
  { id:"test", icon:"💉", title:"Testosterona", desc:"A base de qualquer ciclo. Sem ela, voce esta construindo em areia. TRT e o baseline, blast e a ferramenta.", items:[
    { name:"Testosterona Enantato", aka:"Test E", risk:"low", hair:"mild",
      desc:"Ester mais comum. Meia-vida ~4.5 dias. Padrao-ouro para TRT e base de ciclo.",
      doses:[["TRT","100-200mg/sem","Dividir em 2 aplicacoes/sem para estabilidade. Mirar 700-1100 ng/dL."],["Blast","300-500mg/sem","Nao precisa de mais que 500mg no primeiro ciclo."],["Avancado","500-750mg/sem","Retornos diminuem. Mais dose = mais colaterais, nao mais ganho proporcional."]],
      sides:"Aromatizacao, retencao hidrica, acne, supressao do eixo HPT. Monitorar hematocrito." },
    { name:"Testosterona Cipionato", aka:"Test C", risk:"low", hair:"mild",
      desc:"Praticamente identico ao Enantato. Meia-vida ~5 dias. Mais comum nos EUA. Intercambiavel.",
      doses:[["TRT","100-200mg/sem","Mesmo protocolo do Enantato."],["Blast","300-500mg/sem","Eficacia identica."]],
      sides:"Identicos ao Enantato." },
    { name:"Testosterona Propionato", aka:"Test P", risk:"low", hair:"mild",
      desc:"Ester curto, meia-vida ~0.8 dias. Aplicacao diaria ou EOD. Controle rapido de niveis.",
      doses:[["TRT","25-50mg EOD","Niveis estaveis mas aplicacoes frequentes."],["Blast","100-150mg EOD","Pico rapido, ajuste fino."]],
      sides:"Mesmos colaterais + PIP (dor no local) significativo." }
  ]},
  { id:"19nor", icon:"☢️", title:"19-Nortestosteronas", desc:"Extremamente potentes mas neurotoxicos. Metabolitos ficam no corpo por MESES. Trembolona e desaconselhada para 99% das pessoas.", items:[
    { name:"Nandrolona Decanoato", aka:"Deca-Durabolin", risk:"med", hair:"safe",
      desc:"Excelente para articulacoes e massa. Problema: supressao BRUTAL do eixo (detectavel ate 18 meses) e disfuncao eretil.",
      doses:[["Terapeutico","50-100mg/sem","Para articulacoes."],["Anabolico","200-400mg/sem","Regra: Teste sempre MAIOR que Deca."]],
      sides:"Deca Dick (progestina), supressao massiva, retencao hidrica, aumento de prolactina." },
    { name:"Nandrolona Fenilpropionato", aka:"NPP", risk:"med", hair:"safe",
      desc:"Mesma molecula, ester mais curto (~2.7 dias). Colaterais revertem mais rapido. Preferido sobre Deca por controle.",
      doses:[["Anabolico","200-350mg/sem","EOD ou 3x/sem."]],
      sides:"Mesmos da Deca, mas reversiveis mais rapido." },
    { name:"Trembolona Acetato", aka:"Tren A", risk:"vhigh", hair:"nuke",
      desc:"5x mais anabolico que testosterona. Neurotoxicidade comprovada, destruicao cardiovascular, insonia, paranoia. Amplamente desaconselhado.",
      doses:[["Unico","150-300mg/sem","Qualquer dose e uma dose ruim para a maioria."]],
      sides:"Insonia severa, suor noturno, paranoia, tosse de tren, HDL zerado, neurodegeneracao, cardiotoxicidade." }
  ]},
  { id:"dht", icon:"🧬", title:"Derivados de DHT", desc:"Ganhos 'limpos' — sem retencao hidrica, sem aromatizacao. Primo e Anavar sao as opcoes mais seguras alem do teste.", items:[
    { name:"Oxandrolona", aka:"Anavar", risk:"low", hair:"mild",
      desc:"Oral mais suave. Favorito para mulheres (doses baixas). Melhora forca, vascularidade e composicao corporal.",
      doses:[["Feminino","5-10mg/dia","Maximo 10mg. Acima disso, virilizacao."],["Masculino","20-50mg/dia","6-8 semanas. Boost cosmetico."],["Alto","50-80mg/dia","Retornos diminuem. Lipidios sofrem."]],
      sides:"Supressao do eixo (sim, mesmo sendo 'suave'), HDL baixa, pumps dolorosos." },
    { name:"Metenolona Enantato", aka:"Primobolan", risk:"low", hair:"risky",
      desc:"Muito seguro, nao aromatiza, ganhos de qualidade. Preco absurdo e precisa de dose alta.",
      doses:[["Ciclo","400-800mg/sem","Precisa de dose alta. 300mg nao faz nada perceptivel."],["TRT+","200-300mg/sem","Cruise elevado. Lipidios relativamente ok."]],
      sides:"Queda de cabelo (DHT puro). Pode crashar E2 se dose muito alta vs teste." },
    { name:"Drostanolona", aka:"Masteron", risk:"med", hair:"nuke",
      desc:"Anti-estrogenico, visual seco. So funciona se BF abaixo de 12%. Cosmetico injetavel.",
      doses:[["Ciclo","300-500mg/sem","So faz sentido com BF baixo."]],
      sides:"Queda de cabelo severa, supressao, lipidios alterados." },
    { name:"Estanozolol", aka:"Winstrol", risk:"high", hair:"nuke",
      desc:"Ganhos secos, forca explosiva. Seca articulacoes, hepatotoxico, pessimo para lipidios. Desaconselhado.",
      doses:[["Oral","25-50mg/dia","Maximo 6 semanas."]],
      sides:"Dor articular severa, hepatotoxicidade, destruicao de lipidios, espessamento ventricular." }
  ]},
  { id:"sarms", icon:"🧪", title:"SARMs", desc:"Suprimem o eixo quase tanto quanto anabolizantes reais, mas com resultados significativamente inferiores. Se vai suprimir, por que nao usar algo que funciona?", items:[
    { name:"Ostarine", aka:"MK-2866", risk:"low", hair:"mild",
      desc:"SARM mais estudado. Suave, alguma eficacia para preservacao muscular em deficit. Ainda suprime testosterona.",
      doses:[["Padrao","10-25mg/dia","8 semanas max. Supressao a partir de 10mg."]],
      sides:"Supressao 20-40% em 8 semanas, dor de cabeca, nausea." },
    { name:"Ligandrol", aka:"LGD-4033", risk:"med", hair:"mild",
      desc:"Mais potente que Ostarine. Retencao hidrica significativa. Supressao pesada, ganhos desaparecem pos-ciclo.",
      doses:[["Padrao","5-10mg/dia","LGD a 10mg suprime tanto quanto 500mg de teste, com fracao dos resultados."]],
      sides:"Supressao severa, retencao hidrica, letargia, lipidios alterados." },
    { name:"Testolone", aka:"RAD-140", risk:"high", hair:"risky",
      desc:"O 'mais forte' dos SARMs. Hepatotoxicidade REAL documentada — casos de hospitalizacao. Pior perfil de seguranca.",
      doses:[["Padrao","10-20mg/dia","Hepatotoxicidade documentada."]],
      sides:"Hepatotoxicidade significativa, supressao total, agressividade, queda de cabelo." }
  ]},
  { id:"gh", icon:"🔬", title:"GH & Peptideos", desc:"GH real e o padrao-ouro para anti-aging, recuperacao e composicao corporal. Peptideos cobrem desde secretagogos de GH ate recuperacao tecidual, bronzeamento e funcao sexual.", items:[
    { name:"Somatropina (HGH)", aka:"Hormonio do Crescimento", risk:"low", hair:"safe",
      desc:"Anti-aging por excelencia. Melhora composicao corporal, pele, sono, recuperacao. Recomendado para quem pode pagar.",
      doses:[["Anti-Aging","1-3 UI/dia","Mesmo 2UI faz diferenca perceptivel."],["Performance","4-6 UI/dia","Com TRT. Lipolise + recuperacao."],["Bodybuilding","8-15+ UI/dia","Nivel pro. Requer insulina. Nao recomendado."]],
      sides:"Tunel do carpo, dormencia, resistencia a insulina em doses altas." },
    { name:"Ibutamoren", aka:"MK-677", risk:"med", hair:"safe",
      desc:"Secretagogo de GH oral. Nao e SARM — aumenta GH e IGF-1 endogenos via receptor de grelina. Aumento brutal de apetite e resistencia a insulina.",
      doses:[["Padrao","12.5-25mg/dia","Tomar antes de dormir reduz impacto na glicemia."],["Baixa","10mg/dia","Dose minima eficaz. Menos fome."]],
      sides:"Fome insaciavel, retencao hidrica, letargia, resistencia a insulina, possivel aumento de prolactina." },
    { name:"CJC-1295 DAC", aka:"Drug Affinity Complex", risk:"low", hair:"safe",
      desc:"GHRH com meia-vida longa (~8 dias) devido ao DAC. Elevacao sustentada de GH e IGF-1. Menos picos, mais baseline elevado. Usado 1-2x/semana.",
      doses:[["Padrao","2mg/sem","1-2 injecoes semanais. Mais conveniente que CJC sem DAC."],["Conservador","1mg/sem","Para iniciantes em peptideos."]],
      sides:"Retencao hidrica, dormencia, possivel resistencia a insulina com uso cronico. Elevacao menos pulsatil que CJC sem DAC." },
    { name:"CJC-1295 (sem DAC) + Ipamorelin", aka:"Mod GRF 1-29 / CJC/Ipa", risk:"low", hair:"safe",
      desc:"Combo classico de GHRH + GHRP. Liberacao pulsatil de GH — mais fisiologico que GH exogeno. Alternativa acessivel. CJC sem DAC (Mod GRF 1-29) tem meia-vida de ~30 min, por isso combinado com Ipamorelin.",
      doses:[["Padrao","100+100mcg 2-3x/dia","Antes de dormir e em jejum. Picos de GH naturais."],["Pre-sono","100+100mcg 1x/dia","Minimo eficaz. Potencializa o pico noturno de GH."]],
      sides:"Flush, fome leve, dormencia. Muito mais suave que MK-677." },
    { name:"GHRP-6", aka:"Growth Hormone Releasing Peptide 6", risk:"low", hair:"safe",
      desc:"GHRP de primeira geracao. Potente liberador de GH mas com aumento MASSIVO de fome (estimula grelina diretamente). Usado em bulking ou por quem precisa aumentar apetite.",
      doses:[["Padrao","100-300mcg 2-3x/dia","Em jejum. Comer 20-30 min depois."],["Com GHRH","100mcg + 100mcg CJC","Sinergia: GHRH+GHRP libera mais GH que qualquer um sozinho."]],
      sides:"Fome extrema, aumento de cortisol e prolactina em doses altas, retencao hidrica." },
    { name:"GHRP-2", aka:"Growth Hormone Releasing Peptide 2", risk:"low", hair:"safe",
      desc:"Evolucao do GHRP-6. Liberacao de GH ligeiramente maior com menos fome. Ainda estimula grelina, mas menos que GHRP-6. Bom meio-termo.",
      doses:[["Padrao","100-300mcg 2-3x/dia","Em jejum. Efeito em 15-30 min."]],
      sides:"Fome moderada (menos que GHRP-6), aumento de cortisol e prolactina em doses altas." },
    { name:"Hexarelin", aka:"Examorelin", risk:"med", hair:"safe",
      desc:"O GHRP mais potente em termos de liberacao de GH. Problema: dessensibilizacao rapida (perde eficacia em 2-4 semanas) e aumento significativo de cortisol e prolactina. Uso ciclico.",
      doses:[["Padrao","100-200mcg 2-3x/dia","Ciclos curtos de 2-4 semanas com pausa igual."]],
      sides:"Dessensibilizacao rapida, aumento de cortisol e prolactina, retencao hidrica. Nao usar cronicamente." },
    { name:"Tesamorelin", aka:"Egrifta", risk:"low", hair:"safe",
      desc:"GHRH sintetico aprovado pela FDA para lipodistrofia em HIV. Reduz gordura visceral especificamente. Um dos poucos peptideos com aprovacao regulatoria e dados clinicos solidos.",
      doses:[["Padrao","1-2mg/dia","Subcutaneo. Aprovado clinicamente para gordura visceral."]],
      sides:"Dor no local, artralgia, retencao hidrica leve. Perfil muito limpo comparado a outros." },
    { name:"Sermorelin", aka:"GRF 1-29", risk:"low", hair:"safe",
      desc:"GHRH bioidentico (fragmento natural do GHRH). Um dos primeiros peptideos de GH. Menos potente que CJC-1295 mas mais estudado. Aprovado para diagnostico de deficiencia de GH.",
      doses:[["Anti-Aging","200-300mcg/dia","Antes de dormir."],["Performance","300-500mcg/dia","Dividir em 2 doses. Jejum."]],
      sides:"Flush, dor no local. Muito bem tolerado. Meia-vida curta (~10 min)." },
    { name:"BPC-157", aka:"Body Protection Compound", risk:"low", hair:"safe",
      desc:"Peptideo de recuperacao derivado de proteina gastrica. Para lesoes, tendoes, ligamentos e gut health. Promove angiogenese e cicatrizacao. Evidencia animal forte, humana anecdotica.",
      doses:[["Subcutaneo","250-500mcg 2x/dia","Proximo ao local da lesao. 4-8 semanas."],["Oral","500mcg 2x/dia","Para gut health. Estavel em acido gastrico."],["Intramuscular","250mcg/dia","No musculo afetado. Para lesoes musculares."]],
      sides:"Muito poucos documentados. Teorico: vascularizacao tumoral (nao comprovado em humanos)." },
    { name:"TB-500", aka:"Timosina Beta-4", risk:"low", hair:"safe",
      desc:"Peptideo de recuperacao sistemico. Diferente do BPC-157 (local), TB-500 atua de forma sistemica — nao precisa injetar no local. Promove migracao celular, reducao de inflamacao e cicatrizacao.",
      doses:[["Carga","2-2.5mg 2x/sem","Primeiras 4-6 semanas."],["Manutencao","2mg 1x/sem","Apos periodo de carga."],["Com BPC-157","TB-500 2mg + BPC 500mcg","Sinergia poderosa. O combo mais usado para recuperacao."]],
      sides:"Poucos. Possivel letargia temporaria, dor de cabeca. Contraindicado com historico de cancer (promove angiogenese)." },
    { name:"GHK-Cu", aka:"Cobre Peptideo", risk:"low", hair:"safe",
      desc:"Peptideo de cobre com propriedades anti-aging notaveis. Estimula producao de colageno, elastina e glicosaminoglicanos. Usado topicamente para pele e cabelo, ou sistemicamente para recuperacao.",
      doses:[["Topico","Serum 1-2%","Aplicar na pele/escalpo diariamente."],["Subcutaneo","1-3mg/dia","Para efeitos sistemicos anti-aging."]],
      sides:"Praticamente nenhum. Possivel irritacao topica." },
    { name:"Melanotan II", aka:"MT-2", risk:"med", hair:"safe",
      desc:"Analogo de alfa-MSH. Estimula melanogenese (bronzeamento sem sol), reducao de apetite e erecao. Popular na comunidade estetica. Risco: nevos (pintas) atipicos.",
      doses:[["Carga","250-500mcg/dia","Por 2-3 semanas ate bronzeamento desejado."],["Manutencao","250mcg 1-2x/sem","Manter tom."]],
      sides:"Nausea (especialmente nas primeiras doses), flush facial, erecoes espontaneas, escurecimento de nevos (monitorar com dermatologista), possivel aumento de pressao." },
    { name:"PT-141", aka:"Bremelanotida", risk:"low", hair:"safe",
      desc:"Derivado do Melanotan II mas sem efeito bronzeador. Age no SNC para aumentar excitacao sexual. Aprovado pela FDA (Vyleesi) para disfuncao sexual feminina. Funciona em homens tambem.",
      doses:[["On-demand","1.75mg subcutaneo","45 min antes da atividade. Max 1x a cada 24h."],["Dose baixa","500mcg-1mg","Para quem tem nausea com dose cheia."]],
      sides:"Nausea (principal), flush, dor de cabeca, aumento transitorio de pressao. Nao usar com problemas cardiovasculares." },
    { name:"Epitalon", aka:"Epithalon / Epitalonida", risk:"low", hair:"safe",
      desc:"Tetrapeptideo que estimula producao de telomerase, potencialmente retardando encurtamento de telomeros. O peptideo anti-aging 'puro'. Pesquisado por Khavinson na Russia.",
      doses:[["Padrao","5-10mg/dia","Ciclos de 10-20 dias, 2-3x/ano."],["Subcutaneo","5mg/dia","Protocolo mais comum na comunidade."]],
      sides:"Praticamente nenhum documentado. Dados humanos de longo prazo muito limitados." },
    { name:"DSIP", aka:"Delta Sleep-Inducing Peptide", risk:"low", hair:"safe",
      desc:"Peptideo que modula o sono delta (profundo). Nao e sedativo — regula a arquitetura do sono. Usado para insonia, jet lag e melhora de recuperacao via sono.",
      doses:[["Padrao","100-300mcg","Antes de dormir. Subcutaneo ou intranasal."]],
      sides:"Sonolencia (esperada), possivel dor de cabeca. Tolerancia pode desenvolver." },
    { name:"Selank", aka:"TP-7", risk:"low", hair:"safe",
      desc:"Peptideo ansiolitico desenvolvido na Russia. Analogo da tuftsina (imunomodulador). Reduz ansiedade sem sedacao, melhora foco e funcao cognitiva. Nao causa dependencia.",
      doses:[["Intranasal","200-400mcg 2-3x/dia","Spray nasal. Efeito rapido."],["Subcutaneo","250-500mcg/dia","Efeito mais sustentado."]],
      sides:"Muito poucos. Possivel fadiga leve. Sem potencial de abuso." },
    { name:"Semax", aka:"ACTH 4-10 Pro-Gly-Pro", risk:"low", hair:"safe",
      desc:"Peptideo nootrópico derivado do ACTH. Melhora memoria, foco, aprendizado e neuroproteção. Estimula BDNF. Aprovado na Russia para AVC e cognicao.",
      doses:[["Intranasal","200-600mcg 2-3x/dia","Spray nasal. Efeito em minutos."],["NA-Semax","100-300mcg 2x/dia","Versao acetilada. Mais potente, meia-vida maior."]],
      sides:"Possivel irritacao nasal, dor de cabeca rara. Bem tolerado." },
    { name:"LL-37", aka:"Catelicidina", risk:"med", hair:"safe",
      desc:"Peptideo antimicrobiano endogeno. Potente contra bacterias, virus e biofilmes. Usado para infeccoes cronicas, Lyme, SIBO e biofilmes intestinais. Ainda experimental.",
      doses:[["Subcutaneo","50-100mcg/dia","Ciclos de 4-6 semanas."],["Intranasal","50mcg/dia","Para infeccoes respiratorias/sinusite."]],
      sides:"Reacao de Herxheimer (die-off), dor no local, possivel autoimunidade em doses altas. Monitorar marcadores inflamatorios." },
    { name:"Thymosin Alpha-1", aka:"Ta1 / Zadaxin", risk:"low", hair:"safe",
      desc:"Imunomodulador derivado do timo. Aprovado em varios paises para hepatite B/C e como adjuvante imunologico. Potencializa resposta imune celular (NK cells, T cells).",
      doses:[["Padrao","1.6mg subcutaneo","2x/semana. Protocolo clinico aprovado."],["Intensivo","1.6mg/dia","Para infeccoes agudas ou imunossupressao. Curto prazo."]],
      sides:"Muito bem tolerado. Possivel dor no local. Um dos peptideos com melhor perfil de seguranca." },
    { name:"AOD-9604", aka:"Anti-Obesity Drug", risk:"low", hair:"safe",
      desc:"Fragmento do HGH (aminoacidos 177-191) modificado. Acao lipolitica sem os efeitos de crescimento do GH. Nao afeta glicemia ou IGF-1. Aprovado na Australia como suplemento.",
      doses:[["Padrao","250-500mcg/dia","Em jejum. Subcutaneo na regiao de gordura."],["Com jejum","300mcg matinal","Antes de cardio em jejum para lipolise."]],
      sides:"Muito poucos. Possivel dor no local, dor de cabeca rara. Nao causa resistencia a insulina." },
    { name:"Kisspeptin-10", aka:"KP-10 / Metastin", risk:"low", hair:"safe",
      desc:"Peptideo que estimula liberacao de GnRH, consequentemente LH e FSH. Alternativa ao HCG para estimular testiculos. Pesquisado para hipogonadismo e fertilidade.",
      doses:[["Subcutaneo","100-400mcg/dia","Pesquisa. Protocolos ainda nao padronizados."]],
      sides:"Flush, nausea leve. Dados humanos ainda limitados." },
    { name:"Follistatin 344", aka:"FS-344", risk:"med", hair:"safe",
      desc:"Inibidor de miostatina. Miostatina limita crescimento muscular — inibi-la permite hipertrofia acima do limite genetico. Um dos peptideos mais 'hyped' para massa muscular.",
      doses:[["Padrao","100mcg/dia","Ciclos de 10-30 dias. Subcutaneo."]],
      sides:"Dados limitados em humanos. Possivel efeito em orgaos reprodutivos (miostatina tem funcoes alem do musculo). Uso experimental." }
  ]},
  { id:"glp1", icon:"💊", title:"GLP-1 Agonistas", desc:"Revolucionaram a composicao corporal. Impacto dramatico no controle de apetite e perda de gordura.", items:[
    { name:"Semaglutida", aka:"Ozempic / Wegovy", risk:"low", hair:"safe",
      desc:"Reducao de apetite dramatica, perda de gordura significativa. Com treino e proteina alta, o combo mais poderoso para recomposicao.",
      doses:[["Inicio","0.25mg/sem","Titular lentamente. 4 semanas por dose."],["Manutencao","0.5-1mg/sem","Maioria responde aqui."],["Maximo","2.4mg/sem","Nausea pode ser forte."]],
      sides:"Nausea, vomito, perda de massa muscular (sem treino), face de Ozempic." },
    { name:"Tirzepatida", aka:"Mounjaro / Zepbound", risk:"low", hair:"safe",
      desc:"Dual agonista (GLP-1 + GIP). Mais eficaz que Semaglutida em estudos.",
      doses:[["Inicio","2.5mg/sem","Titular com paciencia."],["Manutencao","5-10mg/sem","Maioria responde em 5-7.5mg."],["Maximo","15mg/sem","Efeitos GI intensos."]],
      sides:"Similares a Semaglutida, potencialmente menos nausea." },
    { name:"Retatrutida", aka:"Triple G", risk:"med", hair:"safe",
      desc:"Triple agonista (GLP-1/GIP/Glucagon). Lipolise direta. ~24% perda de peso em fase 2. Ainda em trials.",
      doses:[["Trial","1-12mg/sem","Dados de fase 2. Ainda nao aprovado."]],
      sides:"Nausea, diarreia, vomito. Dados de longo prazo insuficientes." }
  ]},
  { id:"hair", icon:"💇", title:"Protocolo Capilar", desc:"Prevencao de queda e fundamental para qualquer usuario de PEDs. Tenha um protocolo ANTES de comecar qualquer ciclo.", items:[
    { name:"Finasterida", aka:"Propecia", risk:"low", hair:"safe",
      desc:"Bloqueia ~70% da conversao de testosterona em DHT. Primeira linha de defesa.",
      doses:[["Oral","1mg/dia","Pode usar 0.5mg se sensivel."],["Topico","0.025-0.1%","Minimiza efeitos sistemicos."]],
      sides:"Disfuncao eretil (1-2%), reducao de libido (raro). A maioria nao apresenta colateral." },
    { name:"Dutasterida", aka:"Avodart", risk:"med", hair:"safe",
      desc:"Bloqueia ~95% de DHT. Meia-vida ~5 semanas. Para quando finasterida nao e suficiente.",
      doses:[["Padrao","0.5mg/dia","Efeitos demoram a reverter."],["Alternativo","0.5mg 2-3x/sem","Reduz colaterais."]],
      sides:"Mesmos que finasterida mas mais pronunciados." },
    { name:"RU58841", aka:"RU", risk:"med", hair:"safe",
      desc:"Anti-androgeno topico. Bloqueia receptor de androgeno no foliculo sem efeito sistemico. Nunca passou por trials completos.",
      doses:[["Topico","50mg/dia","Dissolver e aplicar no escalpo."]],
      sides:"Irritacao no escalpo, possivel absorcao sistemica." },
    { name:"Minoxidil", aka:"Rogaine", risk:"low", hair:"safe",
      desc:"Vasodilatador que prolonga fase anagena. Parte essencial do protocolo.",
      doses:[["Topico","1mL 5% 2x/dia","Ou espuma 1x/dia."],["Oral","2.5-5mg/dia","Mais eficaz, mas hipertricose."]],
      sides:"Topico: irritacao. Oral: pelo no corpo todo, retencao hidrica." },
    { name:"Ketoconazol", aka:"Nizoral", risk:"low", hair:"safe",
      desc:"Shampoo antifungico com propriedades anti-androgenicas locais. O membro mais subestimado do Big 3.",
      doses:[["Shampoo","2%, 2-3x/sem","Deixar 3-5 min no escalpo."]],
      sides:"Ressecamento do cabelo." }
  ]},
  { id:"ancil", icon:"🛡️", title:"Ancilares & Saude", desc:"Saude em ciclo e nao-negociavel. Sem monitoramento, e roleta russa. Bloodwork antes, durante e depois.", items:[
    { name:"Anastrozol", aka:"Arimidex", risk:"low", hair:"safe",
      desc:"AI mais comum. Bloqueia aromatizacao. Usar SOMENTE com base em bloodwork. E2 alto sem sintomas = nao toque.",
      doses:[["Padrao","0.25-0.5mg EOD/E3D","Somente se E2 causa sintomas E confirmado em exame."]],
      sides:"Crashar estradiol: fadiga, dor articular, depressao. E2 baixo e pior que E2 alto." },
    { name:"Enclomifeno", aka:"Enclomiphene", risk:"low", hair:"safe",
      desc:"Isomero ativo do Clomid sem toxicidade do zuclomifeno. Preferido para recuperacao do eixo.",
      doses:[["Monoterapia","12.5-25mg/dia","Alternativa a TRT. Mantem fertilidade."],["PCT","25mg/dia 4-8 sem","Restaurar eixo HPT."]],
      sides:"Muito poucos. Possivel alteracao visual em doses altas." },
    { name:"Telmisartan", aka:"Micardis", risk:"low", hair:"safe",
      desc:"Cardioprotetor, nefroprotetor, PPAR-gamma agonista. Recomendado como PADRAO para todo usuario de PED. O anciliar mais underrated.",
      doses:[["Profilaxia","20-40mg/dia","Mesmo sem pressao alta."],["Hipertensao","40-80mg/dia","Controle de PA em ciclo."]],
      sides:"Tontura, queda de pressao se dose alta." },
    { name:"NAC + TUDCA", aka:"Hepatoprotetores", risk:"low", hair:"safe",
      desc:"NAC: antioxidante, precursor de glutationa. TUDCA: acido biliar protetor. Obrigatorios com qualquer oral.",
      doses:[["NAC","600-1200mg/dia","Durante todo ciclo oral."],["TUDCA","250-500mg/dia","Somente com orais hepatotoxicos."]],
      sides:"NAC: nausea em estomago vazio." },
    { name:"Citrus Bergamot", aka:"Bergamota", risk:"low", hair:"safe",
      desc:"Suplemento para colesterol com melhor evidencia real. Melhora LDL e HDL. Deveria ser padrao em qualquer ciclo.",
      doses:[["Padrao","500-1000mg/dia","Com refeicao."]],
      sides:"Praticamente nenhum." }
  ]},
  { id:"pct", icon:"🔄", title:"PCT & Recuperacao", desc:"PCT nao e opcional. Se suprimiu o eixo e nao vai fazer TRT vitalicia, precisa de PCT. Apos 19-nors, recuperacao pode ser extremamente dificil.", items:[
    { name:"Protocolo PCT Padrao", aka:"Enclomifeno-based", risk:"low", hair:"safe",
      desc:"Enclomifeno e preferido sobre Clomid e Nolvadex. Mais limpo, menos colaterais.",
      doses:[["Leve","Enclo 12.5mg/dia 4sem","Apos ciclos curtos."],["Padrao","Enclo 25mg/dia 6-8sem","Iniciar 2 semanas apos ultima injecao."],["Pesada","HCG 1000UI EOD 2sem + Enclo 25mg 8sem","Apos Deca/Tren, recuperacao e extremamente dificil."]],
      sides:"Enclomifeno e muito bem tolerado." },
    { name:"Gonadotrofina Corionica", aka:"HCG", risk:"low", hair:"safe",
      desc:"Mimetiza LH — mantem testiculos funcionando. Recomendado DURANTE o ciclo, nao apenas na PCT.",
      doses:[["Intraciclo","250-500UI 2-3x/sem","Prevencao e melhor que recuperacao."],["PCT Kickstart","1000-1500UI EOD 2sem","Antes de iniciar SERM."]],
      sides:"Aromatizacao, possivel ginecomastia sem controle de E2." }
  ]},
  { id:"blood", icon:"🩸", title:"Bloodwork Essencial", desc:"Faca bloodwork. Antes do ciclo (baseline), durante (4-6 semanas), e depois (PCT). Sem isso voce esta voando cego.", items:[
    { name:"Painel Hormonal", aka:"Hormonios", risk:"low", hair:"safe", desc:"Os marcadores que definem se seu ciclo e PCT estao funcionando.",
      doses:[["Testosterona Total","300-1000 ng/dL","Em TRT: 700-1000. Blast: acima de 1500."],["Testosterona Livre","5-21 pg/mL","Mais importante que total."],["Estradiol (E2)","20-40 pg/mL","NAO crashar. E2 alto e melhor que E2 baixo."],["LH / FSH","1.5-9.3 / 1.5-12.4","Zerados = eixo suprimido."],["Prolactina","4-15 ng/mL","Monitorar com 19-nors."],["SHBG","16-55 nmol/L","Orais metilados derrubam SHBG."]],
      sides:"" },
    { name:"Painel Cardiovascular", aka:"Lipidios", risk:"low", hair:"safe", desc:"PEDs destroem lipidios. Monitorar e mitigar e obrigatorio.",
      doses:[["LDL","abaixo de 100","Acima de 160: zona de perigo."],["HDL","acima de 40","Abaixo de 30: cardiotoxicidade ativa."],["Triglicerideos","abaixo de 150","Saude metabolica geral."],["hsCRP","abaixo de 1","Inflamacao = risco cardiovascular."],["Hematocrito","abaixo de 50%","Acima de 54%: risco de trombose. Doar sangue."],["Pressao","abaixo de 130/80","Monitorar em casa."]],
      sides:"" },
    { name:"Painel Hepatico & Renal", aka:"Figado & Rins", risk:"low", hair:"safe", desc:"Orais metilados sao hepatotoxicos. Qualquer PED pode afetar rins.",
      doses:[["ALT / AST","abaixo de 40 U/L","Em orais, esperar 2-3x o normal."],["GGT","abaixo de 65 U/L","Mais especifico que ALT/AST."],["Bilirrubina","0.1-1.2 mg/dL","Elevada = estresse hepatico."],["Creatinina","0.7-1.3","Funcao renal."],["eGFR","acima de 90","Abaixo de 60 = dano renal."]],
      sides:"" }
  ]}
];

const RULES = [
  ["Bloodwork e obrigatorio","Antes, durante e depois. Sem excecao."],
  ["Comece com testosterona","500mg Test E, 12-16 semanas. Nada mais."],
  ["Menos e mais","Dose minima eficaz = dose correta."],
  ["Saude acima de estetica","HDL no chao e PA 160/100 = encurtando a vida."],
  ["Dieta e treino primeiro","Sem base natural, PEDs sao desperdicio."],
  ["Evite 19-nors","Risco nao se justifica para 99% das pessoas."],
  ["Proteja o cabelo","Finasterida + RU + Keto. Protocolo ANTES do ciclo."],
  ["TRT acima de PCT repetida","Nao destrua o eixo repetidamente."],
  ["Ancilares sao obrigatorios","Telmisartan, NAC, TUDCA, Bergamot, cardio."],
  ["Nao seja idiota","Um corpo. Otimize risco-beneficio."]
];

const SECTIONS = [
  { label:"ANABOLIZANTES", icon:"💉", ids:["test","19nor","dht","sarms"] },
  { label:"PEPTIDEOS & GLP-1", icon:"🔬", ids:["gh","glp1"] },
  { label:"ANCILARES & SAUDE", icon:"🛡️", ids:["ancil"] },
  { label:"CABELO", icon:"💇", ids:["hair"] },
  { label:"TPC", icon:"🔄", ids:["pct"] },
  { label:"EXAMES DE SANGUE", icon:"🩸", ids:["blood"] },
];

/* ── Components ── */

function Compound({c, color}) {
  return (
    <div className="cpd">
      <div className="cpd-top">
        <div>
          <div className="cpd-name">{c.name}</div>
          <div className="cpd-aka">{c.aka}</div>
        </div>
        <div className="cpd-tags">
          <span className="cpd-tag" style={{color:R[c.risk],borderColor:R[c.risk]+"44"}}>{RL[c.risk]}</span>
          <span className="cpd-tag" style={{color:HC[c.hair],borderColor:HC[c.hair]+"44"}}>Cabelo: {HL[c.hair]}</span>
        </div>
      </div>
      <p className="cpd-desc">{c.desc}</p>
      <table className="cpd-table">
        <tbody>
          {c.doses.map(([label,range,note],i)=>(
            <tr key={i}>
              <td className="cpd-td-label">{label}</td>
              <td className="cpd-td-range" style={{color}}>{range}</td>
              <td className="cpd-td-note">{note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {c.sides && <div className="cpd-sides">{c.sides}</div>}
    </div>
  );
}

function Category({cat, defaultOpen}) {
  const [open, setOpen] = useState(defaultOpen||false);
  return (
    <div className="cat">
      <div className="cat-head" onClick={()=>setOpen(!open)}>
        <span className="cat-icon">{cat.icon}</span>
        <div className="cat-info">
          <div className="cat-title">{cat.title}</div>
          <div className="cat-count">{cat.items.length} compostos</div>
        </div>
        <svg className="cat-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{transform:open?"rotate(180deg)":"",transition:"transform .3s"}}><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div className={"cat-body"+(open?" open":"")}>
        <p className="cat-desc">{cat.desc}</p>
        {cat.items.map((c,i)=><Compound key={i} c={c} color={cat.color||"var(--purple)"}/>)}
      </div>
    </div>
  );
}

function Section({sec, catsData, firstOpen}) {
  const cats = sec.ids.map(id=>catsData.find(c=>c.id===id)).filter(Boolean);
  return (
    <div className="sec" id={"sec-"+sec.ids[0]}>
      <div className="sec-header">
        <span className="sec-icon">{sec.icon}</span>
        <span className="sec-label">{sec.label}</span>
        <div className="sec-line"/>
      </div>
      {cats.map((cat,i)=><Category key={cat.id} cat={cat} defaultOpen={firstOpen&&i===0}/>)}
    </div>
  );
}

/* ── Page ── */

export default function PedsPage({onBack}) {
  return (
    <div className="p-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .p-root {
          --void: #1a1c24;
          --surface: #22242e;
          --border: rgba(127,89,119,0.14);
          --purple: #7F5977;
          --skin: #EED0BB;
          --blood: #8b3a3a;
          --text: #BABABA;
          --text2: #8a8a90;
          --text3: #5a5c64;
          min-height: 100vh;
          background: var(--void);
          color: var(--text);
          font-family: 'DM Sans', sans-serif;
          line-height: 1.6;
        }
        .p-root::after {
          content:''; position:fixed; inset:0; pointer-events:none;
          background: repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(127,89,119,0.008) 3px, rgba(127,89,119,0.008) 6px);
        }

        .p-wrap { max-width:600px; margin:0 auto; padding:20px 16px 80px; position:relative; z-index:1; }

        /* ── Back ── */
        .p-back {
          display:inline-flex; align-items:center; gap:8px;
          font-family:'JetBrains Mono',monospace; font-size:10px; letter-spacing:.1em;
          color:var(--text3); cursor:pointer; background:none;
          border:1px solid var(--border); padding:8px 16px; margin-bottom:36px;
          transition:all .3s;
        }
        .p-back:hover { color:var(--purple); border-color:var(--purple); }

        /* ── Hero ── */
        .p-hero {
          position:relative; text-align:center; overflow:hidden;
          border-radius:24px; padding:60px 24px 48px;
          border:1px solid var(--border); margin-bottom:48px;
        }
        .p-hero-bg { position:absolute; inset:0; background:url(${JSON.stringify(tojiImg)}) center 15%/cover; opacity:.15; filter:saturate(.5) contrast(1.1); }
        .p-hero-ov { position:absolute; inset:0; background:radial-gradient(ellipse at center top,rgba(127,89,119,0.06),transparent 60%),linear-gradient(transparent,var(--void)); }
        .p-hero-c { position:relative; z-index:1; }
        .p-hero-c h1 {
          font-family:'Rajdhani',sans-serif; font-size:clamp(48px,13vw,72px);
          font-weight:700; letter-spacing:.06em; line-height:.9;
          background:linear-gradient(135deg,var(--purple),var(--skin));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
        }
        .p-hero-c .sub {
          font-family:'JetBrains Mono',monospace; font-size:9px;
          letter-spacing:.3em; color:var(--text3); margin-top:16px;
        }
        .p-hero-c .desc { font-size:14px; color:var(--text2); margin-top:20px; max-width:440px; margin-inline:auto; font-weight:300; line-height:1.8; }

        /* ── Warn ── */
        .p-warn {
          display:flex; gap:14px; align-items:flex-start;
          padding:16px 20px; margin-bottom:36px;
          border-left:2px solid var(--blood);
          background:rgba(139,58,58,0.06);
          font-size:12px; color:rgba(186,120,120,0.9); line-height:1.7;
        }
        .p-warn strong { color:#c87070; }

        /* ── Nav ── */
        .p-nav {
          display:flex; flex-wrap:wrap; gap:6px;
          margin-bottom:32px;
        }
        .p-nav-item {
          display:flex; align-items:center; gap:6px;
          font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.06em;
          color:var(--text3); padding:7px 14px;
          border:1px solid var(--border); background:none;
          cursor:pointer; transition:all .25s; text-decoration:none;
          white-space:nowrap;
        }
        .p-nav-item:hover { color:var(--skin); border-color:var(--skin); background:rgba(238,208,187,0.04); }
        .p-nav-item span { font-size:12px; }

        /* ── Section ── */
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
        .sec-line {
          flex:1; height:1px;
          background:linear-gradient(90deg, var(--border), transparent);
        }

        /* ── Category ── */
        .cat {
          border:1px solid var(--border); background:var(--surface);
          margin-bottom:8px; overflow:hidden;
          transition:border-color .3s;
        }
        .cat:hover { border-color:rgba(127,89,119,0.25); }
        .cat-head {
          display:flex; align-items:center; gap:14px;
          padding:18px 20px; cursor:pointer;
        }
        .cat-head:hover { background:rgba(255,255,255,0.01); }
        .cat-icon { font-size:24px; }
        .cat-info { flex:1; }
        .cat-title { font-family:'Rajdhani',sans-serif; font-size:17px; font-weight:700; letter-spacing:.04em; color:var(--text); }
        .cat-count { font-family:'JetBrains Mono',monospace; font-size:9px; color:var(--text3); letter-spacing:.06em; margin-top:1px; }
        .cat-chev { color:var(--text3); flex-shrink:0; }
        .cat-body { max-height:0; overflow:hidden; transition:max-height .5s cubic-bezier(.4,0,.2,1); }
        .cat-body.open { max-height:15000px; }
        .cat-desc {
          font-size:13px; color:var(--text2); line-height:1.8; font-weight:300;
          padding:0 20px 16px; border-bottom:1px solid var(--border);
        }

        /* ── Compound ── */
        .cpd {
          margin:12px 14px; padding:18px 20px;
          border:1px solid var(--border);
          background:rgba(255,255,255,0.01);
        }
        .cpd-top { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:10px; flex-wrap:wrap; }
        .cpd-name { font-size:15px; font-weight:600; }
        .cpd-aka { font-family:'JetBrains Mono',monospace; font-size:10px; color:var(--text3); margin-top:2px; }
        .cpd-tags { display:flex; gap:6px; flex-wrap:wrap; }
        .cpd-tag {
          font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700;
          padding:3px 8px; border:1px solid; letter-spacing:.06em;
        }
        .cpd-desc { font-size:13px; color:var(--text2); line-height:1.7; font-weight:300; margin-bottom:14px; }

        /* Dose table */
        .cpd-table { width:100%; border-collapse:collapse; margin-bottom:12px; }
        .cpd-table td { padding:8px 0; border-bottom:1px solid var(--border); vertical-align:top; font-size:12px; }
        .cpd-table tr:last-child td { border-bottom:none; }
        .cpd-td-label { font-weight:600; color:var(--text); width:25%; padding-right:10px; white-space:nowrap; }
        .cpd-td-range { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:11px; width:30%; padding-right:10px; white-space:nowrap; }
        .cpd-td-note { color:var(--text2); font-weight:300; line-height:1.6; }

        .cpd-sides {
          font-size:11px; color:rgba(166,85,85,0.85); line-height:1.6;
          padding:8px 12px; border-left:2px solid var(--blood);
          background:rgba(139,58,58,0.04); margin-top:4px;
        }

        /* ── Rules ── */
        .p-rules {
          border:1px solid var(--border); background:var(--surface);
          padding:28px 24px; margin-top:36px;
        }
        .p-rules h2 {
          font-family:'Rajdhani',sans-serif; font-size:22px; font-weight:700;
          letter-spacing:.06em; color:var(--skin); margin-bottom:20px;
        }
        .p-rule {
          display:flex; gap:14px; padding:12px 0;
          border-bottom:1px solid var(--border);
        }
        .p-rule:last-child { border-bottom:none; }
        .p-rule-n {
          font-family:'Rajdhani',sans-serif; font-size:22px; font-weight:700;
          color:var(--purple); opacity:.3; width:28px; text-align:right; flex-shrink:0;
        }
        .p-rule-t { font-size:13px; font-weight:600; color:var(--text); }
        .p-rule-d { font-size:12px; color:var(--text2); font-weight:300; margin-top:2px; }

        /* ── Footer ── */
        .p-foot {
          text-align:center; padding:40px 0 16px;
          font-family:'JetBrains Mono',monospace; font-size:9px;
          letter-spacing:.15em; color:var(--text3);
        }

        /* ── Responsive ── */
        @media(max-width:500px) {
          .cpd-top { flex-direction:column; }
          .cpd-table td { display:block; width:100%; padding:2px 0; }
          .cpd-td-label { font-size:10px; color:var(--text3); }
          .cpd-td-range { padding:2px 0; }
          .cpd-td-note { padding-bottom:10px; border-bottom:1px solid var(--border); }
        }

        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(127,89,119,0.2); }
      `}</style>

      <div className="p-wrap">
        <button className="p-back" onClick={onBack}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          VOLTAR
        </button>

        <div className="p-hero">
          <div className="p-hero-bg"/>
          <div className="p-hero-ov"/>
          <div className="p-hero-c">
            <h1>ENCICLOPEDIA<br/>PED</h1>
            <div className="sub">GUIA FARMACOLOGICO COMPLETO</div>
            <p className="desc">Dosagens, efeitos colaterais, protocolos e principios de harm reduction para cada composto.</p>
          </div>
        </div>

        <div className="p-warn">
          <span style={{fontSize:18,flexShrink:0}}>⚠️</span>
          <div><strong>Conteudo puramente educacional.</strong> Nao constitui aconselhamento medico. Consulte um endocrinologista. <strong>Faca bloodwork. Sempre.</strong></div>
        </div>

        <div className="p-nav">
          {SECTIONS.map(s=>(
            <a key={s.label} className="p-nav-item" href={"#sec-"+s.ids[0]} onClick={e=>{e.preventDefault();document.getElementById("sec-"+s.ids[0])?.scrollIntoView({behavior:"smooth",block:"start"})}}>
              <span>{s.icon}</span> {s.label}
            </a>
          ))}
        </div>

        {SECTIONS.map((sec,i)=><Section key={sec.label} sec={sec} catsData={CATS} firstOpen={i===0}/>)}

        <div className="p-rules">
          <h2>PRINCIPIOS FUNDAMENTAIS</h2>
          {RULES.map(([t,d],i)=>(
            <div key={i} className="p-rule">
              <div className="p-rule-n">{String(i+1).padStart(2,"0")}</div>
              <div>
                <div className="p-rule-t">{t}</div>
                <div className="p-rule-d">{d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-foot">CHUCKCHUR · PED · 2026</div>
      </div>
    </div>
  );
}
