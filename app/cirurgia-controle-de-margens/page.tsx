import type { Metadata } from "next";
import { SpecialtyTemplate, type Specialty } from "../specialty-template";

export const metadata: Metadata = {
  title: "Cirurgia do Câncer da Pele com Controle de Margens | Copacabana | Clínica QARA",
  description: "Remoção de tumores da pele com verificação das margens ao microscópio, buscando retirada completa e preservação máxima da pele saudável, em Copacabana, RJ. Atendimento particular, em português, inglês e espanhol.",
  alternates: { canonical: "/cirurgia-controle-de-margens" },
  openGraph: {
    title: "Cirurgia com Controle de Margens | Clínica QARA",
    description: "Cirurgia do câncer da pele com controle microscópico das margens, em Copacabana, RJ.",
    images: [{ url: "/images/dr-diego.webp", width: 1351, height: 1672, alt: "Dr. Diego Gálvez, cirurgião dermatológico da Clínica QARA" }],
  },
};

const data: Specialty = {
  eyebrow: "Cirurgia com controle de margens",
  title: "Cirurgia do câncer da pele com controle das margens.",
  lead: "Remoção de tumores da pele com verificação das margens ao microscópio, buscando a retirada completa da lesão e a preservação máxima da pele saudável, em Copacabana. Atendimento particular, em português, inglês e espanhol.",
  introTitle: "Remover por completo, preservando o máximo de pele sadia.",
  intro: [
    "Em alguns tumores da pele, especialmente no rosto e em outras áreas nobres, em lesões com limites imprecisos ou que já retornaram, confirmar que a doença foi totalmente removida faz diferença. O controle das margens ao microscópio verifica se ainda há células do tumor nas bordas retiradas.",
    "Em casos selecionados, agendados previamente, essa análise acontece durante o próprio procedimento: um patologista examina as margens por congelação na sala, e o resultado orienta, na mesma sessão, se alguma área precisa ser reabordada. Nos demais casos, o tecido segue para análise histopatológica convencional e a conduta é definida a partir do laudo.",
    "Esse cuidado tem dois objetivos: buscar a remoção completa da lesão, o que pode reduzir a chance de o tumor voltar, e preservar ao máximo a pele saudável ao redor, importante em regiões onde cada milímetro conta, como pálpebras, nariz, orelhas e lábios.",
    "Na Clínica QARA, a indicação é individual e definida após o diagnóstico. O planejamento explica a técnica, a anestesia, como as margens serão analisadas e as opções de reconstrução, quando necessárias. A cirurgia é realizada em sala de procedimentos. O atendimento é particular, com nota fiscal para reembolso, e disponível em português, inglês e espanhol.",
  ],
  topics: [
    ["Quando esse controle é indicado", "Tumores em áreas nobres do rosto, lesões com bordas mal definidas, tumores recidivados (que voltaram) ou mais extensos são situações em que a verificação das margens costuma agregar segurança ao tratamento."],
    ["Como funciona o controle das margens", "Após a retirada da lesão, o tecido das bordas é analisado ao microscópio. Se ainda houver sinais do tumor em alguma margem, apenas aquela área é reabordada, o que ajuda a preservar a pele sadia."],
    ["Análise por congelação durante o procedimento", "Em casos selecionados, agendados previamente, um patologista analisa as margens por congelação na própria sala, durante a cirurgia. Isso permite verificar e, se necessário, reabordar a área na mesma sessão, sem esperar o laudo convencional."],
    ["Preservação de tecido saudável", "Ao remover o necessário e verificar as bordas, a técnica busca o equilíbrio entre a retirada completa e a preservação estética e funcional da região."],
    ["Reconstrução da área", "Quando o fechamento direto não é o mais adequado, retalhos (pele vizinha) e enxertos (pele de outra região) reconstroem a área, buscando preservar a função e favorecer a cicatrização."],
    ["Análise histopatológica", "O exame do tecido ao microscópio confirma o diagnóstico e a avaliação das margens, embasando a conduta e o acompanhamento."],
    ["Acompanhamento", "Após o procedimento, os retornos acompanham a cicatrização e a vigilância de novas lesões, com orientações individualizadas."],
  ],
  process: [
    ["Avaliação e diagnóstico", "Exame da lesão com dermatoscopia e definição diagnóstica, com biópsia quando necessária."],
    ["Planejamento cirúrgico", "Explicação da técnica, de como as margens serão analisadas, da anestesia e das opções de reconstrução. É nessa etapa que se define se o caso terá análise por congelação durante o procedimento."],
    ["Cirurgia com controle das margens", "Em sala de procedimentos, retirada da lesão e análise das bordas, com reabordagem apenas das áreas que ainda apresentarem sinais do tumor."],
    ["Reconstrução e acompanhamento", "Fechamento ou reconstrução da área e retornos para acompanhar a cicatrização."],
  ],
  doctor: "Dr. Diego Gálvez",
  credential: "CRM-RJ 52-0112387-4 · RQE 57517",
  doctorText: "Dermatologista e cirurgião dermatológico, o Dr. Diego planeja e realiza a cirurgia do câncer da pele com controle das margens na Clínica QARA.",
  doctorImage: "/images/dr-diego.webp",
  faq: [
    ["O que é o controle das margens?", "É a verificação, ao microscópio, das bordas da área retirada, para confirmar se o tumor foi removido por completo. Quando alguma margem ainda apresenta sinais da lesão, apenas aquela região é reabordada."],
    ["É a mesma coisa que a cirurgia de Mohs?", "Não. Na cirurgia de Mohs, o próprio cirurgião atua também como patologista, analisando as margens que ele mesmo retirou. Aqui, quando há análise por congelação durante o procedimento, ela é feita por um patologista, em casos selecionados e agendados. O objetivo é o mesmo, confirmar a remoção completa preservando o máximo de pele sadia, mas a técnica é distinta."],
    ["A cirurgia é feita com anestesia local?", "Muitos desses procedimentos são realizados com anestesia local, que adormece apenas a região operada. A técnica e o local do procedimento dependem da complexidade de cada caso."],
    ["Fico com cicatriz?", "Toda cirurgia deixa alguma cicatriz. O planejamento e as técnicas de reconstrução buscam o melhor resultado funcional e estético possível para a região, e os cuidados pós são orientados individualmente."],
    ["Esse controle garante a cura?", "Nenhum tratamento oferece garantia absoluta. O controle das margens é uma forma de buscar a remoção completa e reduzir a chance de recidiva; o acompanhamento posterior segue sendo importante."],
    ["Atendem em inglês e espanhol e emitem nota para reembolso?", "Sim. O atendimento é particular, em português, inglês e espanhol, com emissão de nota fiscal e documentos para solicitação de reembolso ao convênio."],
  ],
  related: [
    ["Câncer da pele: avaliação e tratamento", "/cancer-de-pele"],
    ["Biópsia de pele", "/biopsia"],
    ["Cirurgia dermatológica", "/cirurgia-dermatologica"],
    ["Câncer da pele: sinais de alerta", "/blog/cancer-da-pele-sinais-de-alerta"],
  ],
};

export default function Page() {
  return <SpecialtyTemplate data={data} path="/cirurgia-controle-de-margens" />;
}
