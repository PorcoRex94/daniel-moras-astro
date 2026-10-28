import assert from "node:assert/strict";
import { validateContactPayload } from "../src/lib/contact-form-validation.js";

const validPayload = {
  name: "María Pérez",
  email: "maria.perez@example.com",
  phone: "+54 11 5555-1234",
  company: "",
  category: "",
  message: "",
};

assert.deepEqual(validateContactPayload(validPayload), {});

assert.deepEqual(
  validateContactPayload({ ...validPayload, name: "", email: "", phone: "" }),
  {
    name: "Ingresá tu nombre.",
    email: "Ingresá tu email.",
    phone: "Ingresá un teléfono o WhatsApp.",
  },
);

assert.deepEqual(
  validateContactPayload({
    ...validPayload,
    email: "direccion-invalida",
    phone: "12",
  }),
  {
    email: "Ingresá un email válido.",
    phone: "Ingresá un teléfono válido con código de área o país.",
  },
);

console.log(
  "Validación correcta: nombre, email y teléfono son obligatorios; los demás campos pueden quedar vacíos.",
);
