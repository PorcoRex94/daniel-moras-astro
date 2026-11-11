import assert from "node:assert/strict";
import {
  getConsultationMessage,
  getWhatsAppHref,
  normalizeWhatsAppNumber,
} from "../src/lib/whatsapp.js";

assert.equal(normalizeWhatsAppNumber("+54 9 11 6672-2505"), "5491166722505");
assert.equal(normalizeWhatsAppNumber("000"), "");
assert.equal(normalizeWhatsAppNumber(""), "");
assert.equal(getConsultationMessage(" Flora J-230E "), "Hola Daniel, quiero consultar por Flora J-230E.");
assert.equal(getConsultationMessage(""), "");
assert.equal(getWhatsAppHref("Consulta"), "");

console.log("Configuración de WhatsApp validada sin número comercial configurado.");
