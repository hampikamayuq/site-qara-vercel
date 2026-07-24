import type {Metadata} from "next"; import {SpecialtyTemplate} from "../specialty-template"; import {specialties} from "../specialties-data";
export const metadata:Metadata={title:"Dermatite Atópica: Tratamento em Adultos e Crianças | QARA",description:"Dermatologistas especialistas em dermatite atópica em Copacabana: restauração da barreira da pele, controle da inflamação e identificação dos gatilhos das crises.",alternates:{canonical:"/dermatite-atopica"},openGraph:{title:"Dermatite Atópica: Tratamento em Adultos e Crianças | QARA",description:"Dermatologistas especialistas em dermatite atópica em Copacabana: restauração da barreira da pele, controle da inflamação e identificação dos gatilhos das crises.",images:[{url:"/images/dra-manuela.webp",width:852,height:1280,alt:"Dra. Manuela Pedretti, dermatologista da Clínica QARA"}]}};

export default function DermatiteAtopicaPage() {
  return <SpecialtyTemplate data={specialties["dermatite-atopica"]} path="/dermatite-atopica" />;
}
