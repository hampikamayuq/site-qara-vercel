import type { Metadata } from "next";
import { SpecialtyTemplate, type Specialty } from "../specialty-template";

export const metadata: Metadata = {
  title: "Biópsia de Pele em Copacabana | Clínica QARA",
  description: "Biópsia de pele, unhas e couro cabeludo para diagnóstico preciso, em procedimento breve com anestesia local, em Copacabana, RJ. Atendimento particular, com nota fiscal para reembolso.",
  alternates: { canonical: "/biopsia" },
  openGraph: {
    title: "Biópsia de Pele em Copacabana | Clínica QARA",
    description: "Coleta de amostra de pele, unha ou couro cabeludo para análise ao microscópio, em Copacabana, RJ.",
    images: [{ url: "/images/dr-diego.webp", width: 1351, height: 1672, alt: "Dr. Diego Gálvez, cirurgião dermatológico da Clínica QARA" }],
  },
};

const data: Specialty = {
  eyebrow: "Biópsia de pele",
  title: "Biópsia de pele para um diagnóstico preciso.",
  lead: "Coleta de uma pequena amostra de pele, unha ou couro cabeludo para análise ao microscópio, em procedimento breve com anestesia local, em Copacabana. Atendimento particular, com nota fiscal para reembolso.",
  introTitle: "Quando o diagnóstico precisa do exame do tecido.",
  intro: [
    "Algumas lesões e doenças da pele se parecem muito entre si. Quando o exame clínico e a dermatoscopia não bastam para esclarecer o diagnóstico, a biópsia (a retirada de uma pequena amostra para análise ao microscópio) costuma ser o caminho mais seguro para definir a conduta.",
    "A biópsia é indicada em lesões suspeitas, feridas que não cicatrizam, manchas e doenças inflamatórias de difícil diagnóstico, além de alterações das unhas e do couro cabeludo. É um procedimento breve, em geral realizado com anestesia local no próprio consultório.",
    "Na Clínica QARA, o dermatologista explica a técnica escolhida, coleta a amostra e encaminha o material para análise histopatológica. O resultado é discutido em consulta, para que o laudo seja interpretado no contexto clínico e os próximos passos definidos em conjunto. Atendimento particular, com nota fiscal para reembolso.",
  ],
  topics: [
    ["Quando a biópsia é indicada", "Lesões suspeitas, feridas persistentes, manchas de causa indefinida e doenças inflamatórias de difícil diagnóstico podem exigir a análise do tecido para confirmar a conduta."],
    ["Tipos de biópsia", "Conforme a lesão, a amostra pode ser retirada com um pequeno instrumento circular (punch), por remoção parcial ou total da lesão. O médico escolhe a técnica mais adequada a cada caso."],
    ["Como é feita", "Após anestesia local, uma pequena amostra é coletada. O procedimento costuma ser rápido e, dependendo da técnica, pode necessitar de um ou mais pontos."],
    ["Análise histopatológica", "A amostra é examinada ao microscópio por um laboratório especializado. Esse exame confirma o diagnóstico e orienta o tratamento."],
    ["Resultado e conduta", "O laudo é discutido em consulta, no contexto clínico, para definir os próximos passos: acompanhamento, tratamento ou cirurgia, quando indicada."],
    ["Biópsia de unhas e couro cabeludo", "Alterações persistentes das unhas e quadros de queda de cabelo podem exigir biópsia dirigida dessas regiões, realizada com técnica específica."],
  ],
  process: [
    ["Avaliação da lesão", "Exame clínico e dermatoscópico para definir a necessidade e o tipo de biópsia."],
    ["Coleta da amostra", "Procedimento breve, com anestesia local, para retirar a amostra com a técnica adequada."],
    ["Análise histopatológica", "Envio do material para exame ao microscópio em laboratório especializado."],
    ["Resultado e próximos passos", "Discussão do laudo em consulta e definição da conduta em conjunto."],
  ],
  doctor: "Dr. Diego Gálvez",
  credential: "CRM-RJ 52-0112387-4 · RQE 57517",
  doctorText: "Dermatologista e cirurgião dermatológico, o Dr. Diego indica e realiza biópsias de pele, unhas e couro cabeludo na Clínica QARA.",
  doctorImage: "/images/dr-diego.webp",
  faq: [
    ["A biópsia dói?", "Como é feita com anestesia local, o desconforto costuma ser pequeno e limitado à picada da anestesia. A região fica adormecida durante o procedimento."],
    ["Preciso de pontos?", "Depende da técnica e do tamanho da amostra. Algumas biópsias necessitam de um ou mais pontos, retirados em uma consulta de retorno; outras não."],
    ["Quando sai o resultado?", "O prazo varia conforme o laboratório e o tipo de análise, e é informado no atendimento. O resultado costuma ser discutido em consulta."],
    ["Fica cicatriz?", "A maioria das biópsias deixa uma marca pequena. Os cuidados pós-procedimento, orientados individualmente, ajudam na cicatrização."],
    ["O atendimento é particular? Emitem nota para reembolso?", "Sim. O atendimento é particular, e a clínica emite nota fiscal e documentos para solicitação de reembolso ao convênio."],
  ],
  related: [
    ["Câncer da pele: avaliação e tratamento", "/cancer-de-pele"],
    ["Cirurgia com controle de margens", "/cirurgia-controle-de-margens"],
    ["Biópsia de pele: quando é indicada", "/blog/biopsia-de-pele-quando-e-indicada"],
    ["Mapeamento de pintas", "/blog/mapeamento-de-pintas-dermatoscopia-digital"],
  ],
};

export default function Page() {
  return <SpecialtyTemplate data={data} path="/biopsia" />;
}
