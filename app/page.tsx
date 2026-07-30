import type { Metadata } from "next";
import { clinicMapsUrl, CtaBand, Footer, Header, portraitSrcSet } from "./ui";
import Link from "next/link";
import { articles } from "./blog/articles";
import { evidence } from "./blog/article-evidence";
import { appointmentLinks, clinicContact } from "./clinic-links";
import { CLINIC_ID, clinicNode, DEFAULT_OG_IMAGE, faqPageSchema, HREFLANG, OG_BASE, SITE_URL, WEBSITE_ID } from "./seo";

// Fonte única: alimentam <title>, meta description, Open Graph, Twitter (que o
// Next autopreenche) e o MedicalWebPage. Não repetir estas strings.
const TITLE = "Dermatologista em Copacabana, RJ | Clínica QARA";
const DESCRIPTION = "Clínica dermatológica em Copacabana, RJ: dermatologia clínica e cirúrgica, cabelos, unhas, doenças inflamatórias e dermatopediatria. Atendimento particular com hora marcada.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/", languages: HREFLANG },
  // Reafirma OG_BASE porque o Next substitui o objeto openGraph inteiro por
  // nível, em vez de mesclar com o do layout.
  openGraph: { ...OG_BASE, url: "/", images: [DEFAULT_OG_IMAGE] },
};

// A ordem obedece à regra da ordem clínica do DESIGN.md: dermatologia médica
// primeiro, estética por último. Não reordenar por keyword.
const services = [
  ["Dermatologia clínica", "Acne, rosácea, manchas, alergias e avaliação de pintas.", "/dermatologia-clinica"],
  ["Cirurgia dermatológica", "Biópsias, câncer da pele, retirada de lesões e reconstruções.", "/cirurgia-dermatologica"],
  ["Cabelos e couro cabeludo", "Queda capilar, alopecias, doenças do couro cabeludo e transplante.", "/cabelo"],
  ["Doenças das unhas", "Micose, unha encravada, inflamações, tumores e cirurgia ungueal.", "/unhas"],
  ["Doenças inflamatórias", "Psoríase, dermatite atópica, hidradenite e doenças autoimunes.", "/doencas-inflamatorias"],
  ["Dermatopediatria", "Avaliação dermatológica para bebês, crianças e adolescentes.", "/dermatopediatria"],
  ["Dermatologia estética", "Planejamento individualizado para saúde, textura e qualidade da pele.", "/dermatologia-estetica"],
];

const specialists = [
  ["Dr. Miguel Ceccarelli", "Unhas e dermatologia estética", "miguel", "/images/dr-miguel.webp"],
  ["Dr. Diego Gálvez", "Dermatologia e cirurgia dermatológica", "diego", "/images/dr-diego.webp"],
  ["Dra. Diana Stohmann", "Tricologia e transplante capilar", "diana", "/images/dra-diana.webp"],
  ["Dra. Manuela Pedretti", "Psoríase e doenças inflamatórias", "manuela", "/images/dra-manuela.webp"],
  ["Dr. Fabrício de Andrade", "Dermatopediatria", "fabricio", "/images/dr-fabricio-de-andrade.webp"],
];

const slugs: Record<string, string> = { miguel: "dr-miguel-ceccarelli", diego: "dr-diego-galvez", diana: "dra-diana-stohmann", manuela: "dra-manuela-pedretti", fabricio: "dr-fabricio-de-andrade" };
const journalSlugs = ["cancer-da-pele-sinais-de-alerta", "queda-de-cabelo-causas", "dermatite-atopica-no-bebe"];
const journalArticles = journalSlugs.map(slug => articles.find(article => article.slug === slug)).filter((article): article is (typeof articles)[number] => Boolean(article));
const blogSrcSet = (src: string) => `${src.replace(/\.webp$/, "-640.webp")} 640w, ${src.replace(/\.webp$/, "-1024.webp")} 1024w, ${src} 1400w`;

function LineIcon({ type }: { type: string }) {
  const paths: Record<string, string> = { skin: "M12 3c-4 2-6 6-5 10s5 7 5 7 4-3 5-7-3-7-9-7Z", book: "M12 6c-2-1.4-5-1.4-8 0v12c3-1.4 6-1.4 8 0 2-1.4 5-1.4 8 0V6c-3-1.4-6-1.4-8 0v12", heart: "M12 20c-5-3.5-8-6.5-8-10a4.5 4.5 0 0 1 8-2.6A4.5 4.5 0 0 1 20 10c0 3.5-3 6.5-8 10Z", shield: "M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6Z" };
  return <svg className="line-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[type]} /></svg>;
}

// Fonte única: alimenta os <details> visíveis E o FAQPage. Uma pergunta nova
// aqui aparece nos dois, então o schema não pode divergir do texto da página.
// Respostas em texto puro: acceptedAnswer.text não aceita marcação.
const practicalFaq: [string, string][] = [
  ["Qual é o horário de atendimento?", "A clínica atende de segunda a sexta, das 8h às 21h, e aos sábados, das 8h às 13h, sempre com hora marcada."],
  ["Como escolher o dermatologista adequado?", "Conte brevemente sua queixa pelo WhatsApp. Nossa equipe indicará o profissional com a área de atuação mais adequada."],
  ["A clínica atende planos de saúde?", "O atendimento é particular. Emitimos nota fiscal e documentos médicos para solicitação de reembolso, conforme as regras do seu plano."],
  ["Há atendimento por telemedicina?", "Alguns casos podem ser avaliados por telemedicina em todo o Brasil. Procedimentos e exames físicos exigem atendimento presencial."],
  ["Quais idiomas estão disponíveis?", "A equipe oferece atendimento em português, espanhol, inglês, francês e alemão, conforme disponibilidade do profissional."],
];

// Páginas de condição específica, que fora daqui só recebem link do mega-menu.
// Os mesmos rótulos e hrefs existem em ui.tsx (children de `specialties`); se um
// terceiro consumidor aparecer, extrair os dois para um módulo compartilhado.
const conditionLinks: [string, string][] = [
  ["câncer da pele", "/cancer-de-pele"],
  ["cirurgia com controle de margens", "/cirurgia-controle-de-margens"],
  ["biópsia", "/biopsia"],
  ["psoríase", "/psoriase"],
  ["dermatite atópica", "/dermatite-atopica"],
  ["hidradenite supurativa", "/hidradenite"],
  ["vitiligo", "/vitiligo"],
];

// A clínica é uma entidade só (clinicNode), descrita aqui com o que é próprio da
// home: quem trabalha nela e o que ela oferece. Ambos derivam dos arrays que a
// página já renderiza, para não criar uma segunda cópia dos mesmos fatos.
//
// Sem aggregateRating de propósito: MedicalClinic é subtipo de LocalBusiness,
// que o Google excluiu dos review snippets — a marcação não pode gerar estrelas e
// é review markup autoatribuído. O 5,0/142 visível na página, com link para a
// fonte, é a forma honesta de dizer a mesma coisa.
const clinicSchema = {
  "@context": "https://schema.org",
  ...clinicNode(),
  // Só nome, área e url do perfil: CRM e RQE vivem em /equipe/[slug] e a url já
  // liga as duas entidades.
  employee: specialists.map(([name, area, key]) => ({
    "@type": "Physician",
    name,
    description: area,
    url: `${SITE_URL}/equipe/${slugs[key]}`,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Especialidades dermatológicas",
    itemListElement: services.map(([name, description, href]) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, description, url: `${SITE_URL}${href}` },
    })),
  },
};

// A página, distinta da entidade. `about`/`mainEntity` apontam para a clínica
// por @id em vez de redeclará-la.
const pageSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: TITLE,
  description: DESCRIPTION,
  inLanguage: "pt-BR",
  isPartOf: {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "Clínica QARA",
    inLanguage: "pt-BR",
    publisher: { "@id": CLINIC_ID },
  },
  about: { "@id": CLINIC_ID },
  mainEntity: { "@id": CLINIC_ID },
  primaryImageOfPage: `${SITE_URL}/images/qara-hero-consulta.webp`,
};

const faqSchema = faqPageSchema(practicalFaq);

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    <Header current="/" />
    <main id="conteudo">
      <section className="craft-hero">
        <div className="hero-image" aria-hidden="true"><img src="/images/qara-hero-consulta.webp" srcSet="/images/qara-hero-consulta-640.webp 640w, /images/qara-hero-consulta-1024.webp 1024w, /images/qara-hero-consulta.webp 1672w" sizes="100vw" alt="" width={1672} height={941} fetchPriority="high" /></div>
        <div className="shell craft-hero-inner">
          <div className="craft-hero-copy">
            <p className="kicker">Clínica QARA · Copacabana, Rio de Janeiro</p>
            {/* A coluna do hero tem ~460px: a 72px (≥1440px) "em Copacabana." não
                cabe em uma linha e "em" fica órfão. Não usar nbsp aqui — torna a
                frase inquebrável e o navegador parte "Copacaba/na." no meio. */}
            <h1>Conhecimento que cuida.<br />Dermatologia em Copacabana.</h1>
            <span className="hero-rule" aria-hidden="true" />
            <p className="lead">Presença que transforma. Diagnóstico preciso, conduta baseada em evidências e acompanhamento com o mesmo especialista.</p>
            <div className="actions">
              <a className="button craft-primary" href={appointmentLinks.home} data-conversion-event="whatsapp_click" data-conversion-placement="hero" data-conversion-variant="schedule" data-conversion-context="home">Agendar pelo WhatsApp</a>
              <a className="quiet-link" href="#cuidados">Ver especialidades <span>↓</span></a>
            </div>
          </div>
          <svg className="contour" viewBox="0 0 240 520" aria-hidden="true"><path d="M168 0c-48 52-39 107-11 137 29 31 1 67-41 93-74 47-82 118-36 150 53 36 86 72 53 140" /></svg>
        </div>
      </section>

      <section className="assurance-bar" aria-label="Informações essenciais"><div className="shell"><p><strong>Copacabana · Zona Sul</strong><span>Rua Santa Clara, 50 · próximo ao metrô Siqueira Campos</span></p><p><strong>Atendimento particular</strong><span>Nota fiscal e documentação para reembolso</span></p><p><strong>Português, inglês e espanhol</strong><span>Alemão e francês conforme o especialista</span></p></div></section>

      <section className="journey-section" id="jornada"><div className="shell journey-grid"><div><h2>Como funciona a consulta: compreender antes de tratar.</h2><p>A avaliação relaciona sintomas, histórico, exame dermatológico e, quando necessário, exames complementares.</p></div><ol><li><b>1</b><div><h3>Escuta e avaliação</h3><p>Você conta o que percebe, há quanto tempo e o que já tentou. O médico examina a pele, os cabelos ou as unhas.</p></div></li><li><b>2</b><div><h3>Diagnóstico e investigação</h3><p>As hipóteses são explicadas. Dermatoscopia, tricoscopia, exames laboratoriais ou biópsia podem ser indicados.</p></div></li><li><b>3</b><div><h3>Plano e acompanhamento</h3><p>Benefícios, limites, riscos e alternativas orientam uma decisão compartilhada e o acompanhamento da evolução.</p></div></li></ol></div></section>

      <section className="care-strip" id="cuidados">
        <div className="shell care-grid">
          <div className="care-intro"><h2>Encontre a especialidade adequada para o seu caso.</h2><p>Se houver dúvida, conte brevemente sua queixa pelo WhatsApp e nossa equipe orienta a escolha do profissional.</p></div>
          {/* A nota acompanha a lista dentro da mesma célula do grid: como irmã
              direta ela cairia numa linha nova, a 100px de distância. E fora da
              lista porque .care-item já é um <a> — link dentro de link é inválido. */}
          <div>
            <div className="care-list">{services.map(([title,text,href]) => <Link className="care-item" href={href} key={title}><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">→</b></Link>)}</div>
            <p className="care-note">Casos específicos: {conditionLinks.map(([label, href], index) => <span key={href}>{index > 0 && (index === conditionLinks.length - 1 ? " e " : ", ")}<Link href={href}>{label}</Link></span>)}.</p>
          </div>
        </div>
      </section>

      <section className="precision-section">
        <div className="shell precision-grid">
          <div className="precision-intro"><h2>Precisão técnica.<br />Cuidado integral.<br />Decisões seguras.</h2><span className="dark-rule" /><p>Condutas baseadas em evidências, estrutura adequada para procedimentos e decisão compartilhada em cada etapa.</p></div>
          <div className="principles">
            <article><LineIcon type="skin" /><h3>Abordagem individualizada</h3><p>Cada pele, história e objetivo são únicos.</p></article>
            <article><LineIcon type="book" /><h3>Atualização científica</h3><p>Condutas baseadas em evidências e avaliação cuidadosa.</p></article>
            <article><LineIcon type="heart" /><h3>Presença em todas as etapas</h3><p>O especialista que investiga seu caso é o mesmo que acompanha a evolução, com hora marcada e canal direto de resposta.</p></article>
            <article><LineIcon type="shield" /><h3>Segurança em procedimentos</h3><p>Estrutura, materiais e protocolos definidos para cada procedimento.</p></article>
          </div>
        </div>
      </section>

      <section className="section shell" id="especialistas">
        <div className="specialist-lead"><div><p className="kicker">Corpo clínico</p><h2>Dermatologistas da Clínica QARA</h2><p>Conheça a formação e a principal área de atuação de cada dermatologista.</p></div>
        <div className="craft-specialists">
          {specialists.map(([name,area,key,src]) => <article key={name}>
            <div className={`doctor-image doctor-${key}`}><img src={src} srcSet={portraitSrcSet[src]} sizes={portraitSrcSet[src] && "(max-width: 620px) 90vw, (max-width: 900px) 45vw, 240px"} alt={`Retrato profissional de ${name}`} width={1000} height={1300} loading="lazy" decoding="async" /></div>
            <h3><a href={`/equipe/${slugs[key]}`}>{name}</a></h3><p>{area}</p><a href={`/equipe/${slugs[key]}`}>Conheça o especialista <span>→</span></a>
          </article>)}
        </div></div>
      </section>

      <section className="clinic-story" id="clinica">
        <div className="shell clinic-story-grid">
          <div><h2>Atendimento em Copacabana.</h2><span className="light-rule" /><p>Consultórios preparados para consultas dermatológicas e procedimentos com hora marcada.</p><a href="#contato">Ver endereço e contato <span>→</span></a></div>
          <div className="clinic-main"><img src="/images/miguel.webp" srcSet="/images/miguel-640.webp 640w, /images/miguel-1024.webp 1024w, /images/miguel.webp 1920w" sizes="(max-width: 620px) 100vw, (max-width: 900px) 100vw, 60vw" alt="Recepção da Clínica QARA em Copacabana" width={1920} height={1282} loading="lazy" decoding="async" /></div>
          <div className="clinic-detail" aria-hidden="true"><span className="organic-mark" /></div>
        </div>
      </section>


      <section className="home-journal"><div className="shell journal-heading"><div><h2>Informação para entender sinais e decisões.</h2></div><p>Uma seleção editorial de artigos escritos por dermatologistas da Clínica QARA, com autoria médica e referências específicas.</p></div><div className="shell journal-list">{journalArticles.map(article=><article key={article.slug}><Link className="journal-image" href={`/blog/${article.slug}`} aria-label={`Ler ${article.title}`}><img src={article.image} srcSet={blogSrcSet(article.image)} sizes="(max-width: 620px) 112px, 220px" alt="" width={1400} height={788} loading="lazy" decoding="async"/></Link><div><span>{article.category} · {article.readTime}<i> · {evidence[article.slug]?.author.name}</i></span><h3><Link href={`/blog/${article.slug}`}>{article.title}</Link></h3><p>{article.description}</p><Link href={`/blog/${article.slug}`}>Ler artigo →</Link></div></article>)}</div><div className="shell journal-all"><Link className="button button-secondary" href="/blog">Explorar todos os artigos</Link></div></section>

      <section className="section specialty-soft" aria-label="Depoimentos de pacientes">
        <div className="shell">
          <div className="section-heading">
            <div><h2>O que dizem os pacientes.</h2></div>
            <p>Avaliações públicas de pacientes no Google e no Doctoralia. Experiências individuais não substituem avaliação médica.</p>
          </div>
          <div className="quotes-grid">
            {/* Citações de fontes públicas: são palavras de paciente, não copy
                da clínica, e nenhuma pode afirmar resultado (DESIGN.md:262).
                Palavra alguma é alterada; só a pontuação é normalizada quando o
                original não tem (a 1ª usava quebra de linha em vez de ponto).
                Grafia do paciente fica — ver "nos mín detalhes" na 3ª. */}
            <blockquote><p>Amei a experiência!! Ótimos profissionais e muito atenciosos. Confio de olhos fechados!!!</p><footer>Mariana · Avaliação pública no Google</footer></blockquote>
            <blockquote><p>Fui muito bem atendida. Dr. Miguel foi muito didático ao me explicar tudo sobre o que eu tinha e me deu toda orientação.</p><footer>Dalva Maria do Bomfim Lopes · Avaliação pública no Google</footer></blockquote>
            <blockquote><p>Muito profissional, atenciosa e extremamente dedicada. Explica tudo nos mín detalhes, transmite segurança e passa uma tranquilidade que faz toda a diferença.</p><footer>Cristiane Taverna · Avaliação pública no Doctoralia</footer></blockquote>
          </div>
          <div className="rating-row">
            <a href={clinicMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Nota 5,0 no Google, 142 avaliações (abre em nova aba)">
              <span className="rating-stars" aria-hidden="true">★★★★★</span>
              <b>5,0</b>
              <span>142 avaliações no Google</span>
            </a>
            <a href={clinicContact.doctoraliaUrl} target="_blank" rel="noopener noreferrer" aria-label="Nota 5,0 no Doctoralia, 589 opiniões (abre em nova aba)">
              <img src="/images/doctoralia.webp" alt="Doctoralia" width={124} height={22} loading="lazy" decoding="async" />
              <span className="rating-stars" aria-hidden="true">★★★★★</span>
              <b>5,0</b>
              <span>589 opiniões</span>
            </a>
          </div>
        </div>
      </section>
      <section className="practical-section shell"><div><h2>Informações práticas.</h2></div><div className="practical-list">{practicalFaq.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section className="location-section"><div className="shell location-grid"><div><h2>Copacabana, Rio de Janeiro.</h2><p>Rua Santa Clara, 50 · salas 521/522<br />Próximo ao metrô Siqueira Campos.</p><a href={clinicMapsUrl} target="_blank" rel="noreferrer" data-conversion-event="maps_click" data-conversion-placement="contact" data-conversion-variant="maps" data-conversion-context="home">Abrir no Google Maps <span>→</span></a></div><div className="map-art"><iframe src={clinicContact.mapsEmbedUrl} title="Mapa da Clínica QARA em Copacabana" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>
      <CtaBand />
    </main>
    <Footer />
  </>;
}
