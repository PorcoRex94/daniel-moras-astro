const internationalNumberPattern = /^[1-9]\d{7,14}$/;

export function normalizeWhatsAppNumber(value) {
  const normalized = typeof value === "string" ? value.replace(/\D/g, "") : "";

  return internationalNumberPattern.test(normalized) ? normalized : "";
}

const publicEnv = import.meta.env ?? {};

export const commercialWhatsAppNumber = normalizeWhatsAppNumber(
  publicEnv.PUBLIC_WHATSAPP_NUMBER,
);

export function getConsultationMessage(subject) {
  const cleanSubject = typeof subject === "string" ? subject.trim().replace(/\s+/g, " ") : "";

  return cleanSubject ? `Hola Daniel, quiero consultar por ${cleanSubject}.` : "";
}

export function getWhatsAppHref(message = "") {
  if (!commercialWhatsAppNumber) return "";

  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${commercialWhatsAppNumber}${query}`;
}
