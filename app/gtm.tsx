import Script from "next/script";

/**
 * Container do Google Tag Manager, ativado só quando NEXT_PUBLIC_GTM_ID existe.
 * Sem a variável isto não renderiza nada — nenhum request, nenhum cookie.
 *
 * São dois pedaços de propósito:
 *
 * 1. A fila `dataLayer` é criada inline no <head>, antes de qualquer coisa.
 *    O conversion-tracker faz `dataLayer?.push()` com optional chaining, então
 *    sem a fila existindo os eventos disparados antes do GTM carregar seriam
 *    descartados em silêncio — justamente os de page view (specialty_view,
 *    doctor_profile_view). Com a fila pronta eles ficam enfileirados e o GTM
 *    processa quando sobe.
 *
 * 2. O loader do GTM entra como afterInteractive, depois da hidratação, para
 *    não competir com o LCP.
 *
 * Não incluímos a tag <noscript> do snippet padrão: todas as conversões deste
 * site nascem de clique instrumentado por JS, então sem JS o iframe não teria
 * o que medir — só custaria um request.
 */
export function GoogleTagManager({ id }: { id?: string }) {
  if (!id) return null;

  return (
    <>
      <Script id="dataLayer-init" strategy="beforeInteractive">
        {"window.dataLayer=window.dataLayer||[];"}
      </Script>
      <Script id="gtm-loader" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`}
      </Script>
    </>
  );
}
