"use client";

import { usePathname } from "next/navigation";
import { appointmentHrefForPath } from "./clinic-links";

// Botão flutuante global. Fica no layout raiz, então descobre a página pelo
// usePathname para levar a mesma mensagem de agendamento que os CTAs daquela
// página: o especialista nas páginas de especialidade, a mensagem acolhedora
// nas demais. usePathname resolve durante o prerender estático, então o href
// correto já sai no HTML — não depende de hidratação.
export function WhatsAppFloatingButton() {
  const href = appointmentHrefForPath(usePathname());
  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar uma consulta pelo WhatsApp (abre em nova aba)"
      data-conversion-event="whatsapp_click"
      data-conversion-placement="floating"
      data-conversion-variant="schedule"
    >
      <img src="/images/whatsapp-icon.png" width="64" height="64" alt="" aria-hidden="true" />
    </a>
  );
}
