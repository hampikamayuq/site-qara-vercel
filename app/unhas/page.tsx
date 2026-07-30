import type {Metadata} from "next"; import {SpecialtyTemplate} from "../specialty-template"; import {specialties} from "../specialties-data";
export const metadata:Metadata={title:"Dermatologista Especialista em Unhas no RJ | QARA",description:"Avaliação de micose, unha encravada, psoríase ungueal, tumores e cirurgia das unhas em Copacabana.",alternates:{canonical:"/unhas"},openGraph:{title:"Dermatologista Especialista em Unhas no RJ | QARA",description:"Avaliação de micose, unha encravada, psoríase ungueal, tumores e cirurgia das unhas em Copacabana.",images:[{url:"/images/dr-miguel.webp",width:415,height:640,alt:"Dr. Miguel Ceccarelli, dermatologista da Clínica QARA"}]}}; export default function Page(){return <SpecialtyTemplate data={specialties.unhas} path="/unhas">
  <section className="section shell treatment-feature">
    <div>
      <h2>Podologia integrada ao cuidado médico das unhas.</h2>
      <p>A equipe conta com podólogos para cuidados de apoio, como o manejo de calosidades, espessamentos e desconfortos ao caminhar.</p>
      <p>O trabalho acontece de forma integrada: alterações que sugerem doença da unha ou da pele são avaliadas pelo dermatologista, e os cuidados podológicos complementam o tratamento quando indicados.</p>
    </div>
    <div className="treatment-photo"><img src="/images/qara-podologia.webp" srcSet="/images/qara-podologia-640.webp 640w, /images/qara-podologia.webp 1024w" sizes="(max-width: 900px) 100vw, 50vw" alt="Cuidado podológico das unhas dos pés com instrumental estéril" width={1024} height={768} loading="lazy" decoding="async" /></div>
  </section>
</SpecialtyTemplate>}
