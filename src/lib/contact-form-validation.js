export const contactFieldLimits = Object.freeze({
  name: 100,
  email: 254,
  phone: 40,
  company: 120,
  category: 64,
  message: 2000,
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneCharactersPattern = /^[0-9+().\s-]+$/;

const toText = (value) => (typeof value === "string" ? value.trim() : "");

export function validateContactPayload(values) {
  const errors = {};
  const name = toText(values.name);
  const email = toText(values.email);
  const phone = toText(values.phone);
  const optionalFields = ["company", "category", "message"];

  if (!name) {
    errors.name = "Ingresá tu nombre.";
  } else if (name.length > contactFieldLimits.name) {
    errors.name = "El nombre no puede superar los 100 caracteres.";
  }

  if (!email) {
    errors.email = "Ingresá tu email.";
  } else if (email.length > contactFieldLimits.email || !emailPattern.test(email)) {
    errors.email = "Ingresá un email válido.";
  }

  const phoneDigits = phone.replace(/\D/g, "");

  if (!phone) {
    errors.phone = "Ingresá un teléfono o WhatsApp.";
  } else if (
    phone.length > contactFieldLimits.phone ||
    !phoneCharactersPattern.test(phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 20
  ) {
    errors.phone = "Ingresá un teléfono válido con código de área o país.";
  }

  for (const field of optionalFields) {
    const value = toText(values[field]);

    if (value.length > contactFieldLimits[field]) {
      errors[field] = `Este campo no puede superar los ${contactFieldLimits[field]} caracteres.`;
    }
  }

  return errors;
}
