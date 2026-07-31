import type { Metadata } from "next";
import { SpecialtyTemplate, type Specialty } from "../specialty-template";

export const metadata: Metadata = {
  title: "Câncer da Pele em Copacabana | Avaliação e Cirurgia | Clínica QARA",
  description: "Investigação de lesões suspeitas com dermatoscopia, biópsia e tratamento cirúrgico do câncer da pele em Copacabana, RJ. Atendimento particular em português, inglês e espanhol, com nota fiscal para reembolso.",
  alternates: { canonical: "/cancer-de-pele" },
  openGraph: {
    title: "Câncer da Pele em Copacabana | Clínica QARA",
    description: "Avaliação de lesões suspeitas, dermatoscopia, biópsia e tratamento cirúrgico do câncer da pele em Copacabana, RJ.",
    images: [{ url: "/images/dr-diego.webp", width: 1351, height: 1672, alt: "Dr. Diego Gálvez, cirurgião dermatológico da Clínica QARA" }],
  },
};

const data: Specialty = {
  eyebrow: "Câncer da pele",
  title: "Avaliação e tratamento do câncer da pele em Copacabana.",
  lead: "Investigação de lesões suspeitas com dermatoscopia, biópsia e tratamento cirúrgico do câncer da pele, com atendimento particular em Copacabana, no Rio de Janeiro, em português, inglês e espanhol.",
  heroImage: "/images/specialties/cancer-de-pele.webp",
  heroImageAlt: "Dermatologista examinando uma lesão no antebraço de uma paciente com dermatoscópio",
  introTitle: "Identificar cedo faz diferença.",
  intro: [
    "O câncer da pele é o tumor mais frequente no Brasil, e o Rio de Janeiro, pela exposição solar intensa e acumulada, concentra um grande número de casos. A maioria tem bom prognóstico quando identificada cedo; por isso, avaliar lesões novas ou que mudaram costuma ser um passo simples e importante.",
    "Vale procurar avaliação diante de uma ferida que não cicatriza, uma pinta que muda de cor, tamanho ou formato, uma lesão que sangra, coça ou cresce, ou uma mancha que se destaca das demais. Pessoas de pele clara, com histórico familiar ou muita exposição solar merecem atenção redobrada e exame periódico das pintas.",
    "Na Clínica QARA, a avaliação começa com exame completo da pele e dermatoscopia, o exame que amplia as estruturas da lesão. Quando indicado, a biópsia confirma o diagnóstico, e o tratamento cirúrgico é planejado com margens de segurança e análise histopatológica. O atendimento é particular, com emissão de nota fiscal para solicitação de reembolso, e disponível em português, inglês e espanhol.",
  ],
  topics: [
    ["Carcinoma basocelular", "O tipo mais comum de câncer da pele, geralmente de crescimento lento e baixo risco de espalhar. Costuma aparecer em áreas expostas ao sol, como rosto, orelhas e couro cabeludo, e costuma ter bom prognóstico quando tratado precocemente."],
    ["Carcinoma espinocelular", "Segundo tipo mais frequente, pode surgir sobre lesões pré-existentes ou pele muito exposta ao sol. A avaliação define o diagnóstico e o planejamento do tratamento conforme a localização e as características da lesão."],
    ["Melanoma", "Menos comum, porém mais agressivo, o melanoma pede diagnóstico e conduta ágeis. A dermatoscopia e, quando indicado, o mapeamento das pintas ajudam a identificar lesões suspeitas o mais cedo possível."],
    ["Lesões pré-cancerosas", "Ceratoses actínicas e outras lesões causadas pelo sol podem, com o tempo, evoluir. Reconhecê-las e tratá-las é parte importante da prevenção do câncer da pele."],
    ["Dermatoscopia e mapeamento de pintas", "Exame que amplia as estruturas da pele e auxilia a diferenciar lesões benignas das que merecem investigação, com acompanhamento de quem tem muitas pintas ou histórico de risco."],
    ["Tratamento cirúrgico", "Quando indicada, a retirada é realizada em sala de procedimentos, planejada com margens de segurança e análise do tecido ao microscópio. Em casos selecionados e agendados, a análise das margens é feita por congelação durante o próprio procedimento. Em áreas delicadas, técnicas de reconstrução preservam a função e favorecem a cicatrização."],
  ],
  process: [
    ["Consulta e dermatoscopia", "Exame completo da pele e avaliação da lesão com dermatoscopia, além do histórico e dos fatores de risco."],
    ["Biópsia e diagnóstico", "Quando necessário, coleta de amostra para análise histopatológica, que confirma o tipo de lesão e orienta a conduta."],
    ["Planejamento do tratamento", "Explicação da técnica, das margens, da cicatriz esperada e da recuperação, com espaço para dúvidas antes de decidir."],
    ["Tratamento e acompanhamento", "Procedimento com orientações pré e pós, seguido de retornos para acompanhar a cicatrização e a prevenção de novas lesões."],
  ],
  doctor: "Dr. Diego Gálvez",
  credential: "CRM-RJ 52-0112387-4 · RQE 57517",
  doctorText: "Dermatologista e cirurgião dermatológico, o Dr. Diego conduz a avaliação, o diagnóstico e o tratamento cirúrgico do câncer da pele na Clínica QARA.",
  doctorImage: "/images/dr-diego.webp",
  faq: [
    ["Como sei se uma lesão é câncer da pele?", "Só a avaliação médica define. Sinais como uma ferida que não cicatriza, uma pinta que muda ou uma lesão que sangra merecem exame com dermatoscopia e, quando indicado, biópsia. O autoexame ajuda a perceber mudanças, mas não substitui a consulta."],
    ["O tratamento é sempre cirúrgico?", "A conduta depende do tipo e da extensão da lesão. A cirurgia é frequente, mas existem outras opções conforme o caso. O plano é definido após o diagnóstico, individualmente."],
    ["Vocês atendem em inglês e espanhol?", "Sim. O atendimento pode ser realizado em português, inglês e espanhol, incluindo pacientes estrangeiros e turistas."],
    ["É possível solicitar reembolso ao convênio?", "O atendimento é particular. A clínica emite nota fiscal e documentos médicos para solicitação de reembolso, conforme as regras de cada plano."],
    ["Com que frequência devo examinar minhas pintas?", "Varia conforme o perfil de risco. Pessoas de pele clara, com histórico familiar ou muita exposição solar costumam manter acompanhamento periódico, definido pelo dermatologista."],
  ],
  related: [
    ["Cirurgia com controle de margens", "/cirurgia-controle-de-margens"],
    ["Biópsia de pele", "/biopsia"],
    ["Cirurgia dermatológica", "/cirurgia-dermatologica"],
    ["Câncer da pele: sinais de alerta", "/blog/cancer-da-pele-sinais-de-alerta"],
    ["Mapeamento de pintas", "/blog/mapeamento-de-pintas-dermatoscopia-digital"],
  ],
};

export default function Page() {
  return <SpecialtyTemplate data={data} path="/cancer-de-pele" />;
}
