import fs from "node:fs";
import path from "node:path";
import {
  equiposCatalogo,
  equiposCanonicos,
  equiposOriginales,
  equiposPublicados,
  getDestinoCatalogo,
  getEquipoById,
  getEquiposRelacionados,
  equiposLegacyRedirects,
} from "../src/data/equiposCatalogo.js";

const errors = [];
const publicDirectory = path.join(process.cwd(), "public");
const assetPath = (url) => path.join(publicDirectory, url.replace(/^\//, ""));
const isFile = (url) => Boolean(url) && fs.existsSync(assetPath(url));

const ids = equiposCanonicos.map((equipo) => equipo.id);

if (new Set(ids).size !== ids.length) {
  errors.push("La colección canónica contiene IDs duplicados.");
}

const preservedRecords = equiposCanonicos.flatMap((equipo) => equipo.variantes);

if (preservedRecords.length !== equiposOriginales.length) {
  errors.push("La colección canónica no conserva todos los registros originales.");
}

for (const original of equiposOriginales) {
  const canonical = getEquipoById(original.id);
  const preserved = canonical?.variantes.includes(original);

  if (!preserved) {
    errors.push(`Se perdió una variante de ${original.id} (${original.rubroFuente}).`);
  }

  const declaredRubros = [original.rubroFuente, ...(original.relatedRubroLinks ?? [])];

  if (!declaredRubros.every((rubro) => canonical?.rubros.includes(rubro))) {
    errors.push(`Se perdió una relación de rubro en ${original.id} (${original.rubroFuente}).`);
  }
}

for (const equipment of equiposCanonicos) {
  if (!equipment.rubros.length) {
    errors.push(`${equipment.id} no tiene rubros asociados.`);
  }

  for (const image of equipment.recursos.imagenes) {
    if (!isFile(image)) {
      errors.push(`${equipment.id} referencia una imagen inexistente: ${image}`);
    }
  }

  for (const pdf of equipment.recursos.pdfs) {
    if (!isFile(pdf) || fs.readFileSync(assetPath(pdf)).subarray(0, 5).toString() !== "%PDF-") {
      errors.push(`${equipment.id} referencia un PDF inválido: ${pdf}`);
    }
  }

  for (const related of getEquiposRelacionados(equipment)) {
    if (related.id === equipment.id || !getEquipoById(related.id)) {
      errors.push(`${equipment.id} tiene un relacionado inválido.`);
    }
  }
}

for (const card of equiposCatalogo) {
  const destination = getDestinoCatalogo(card);

  if (destination.equipoId && !getEquipoById(destination.equipoId)) {
    errors.push(`${card.id} apunta a un equipo inexistente: ${destination.equipoId}`);
  }

  if (!destination.href.startsWith("/")) {
    errors.push(`${card.id} contiene una URL interna inválida.`);
  }
}

const staticEquipmentPaths = [
  ...equiposPublicados.map((equipment) => `/equipos/${equipment.id}`),
  ...Object.keys(equiposLegacyRedirects).map((id) => `/equipos/${id}`),
];

if (new Set(staticEquipmentPaths).size !== staticEquipmentPaths.length) {
  errors.push("La generación estática contiene rutas de fichas duplicadas.");
}

if (equiposPublicados.length !== equiposCanonicos.filter((item) => item.pageReady).length) {
  errors.push("La publicación de fichas no coincide con la colección canónica.");
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `Validación correcta: ${equiposOriginales.length} registros originales, ${equiposCanonicos.length} equipos únicos y ${equiposCatalogo.length} tarjetas comerciales.`,
  );
}
