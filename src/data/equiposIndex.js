import { equiposTextil } from "./equiposTextil";
import { equiposPackaging } from "./equiposPackaging";
import { equiposComunicacionVisual } from "./equiposComunicacionVisual";
import { equiposEtiquetas } from "./equiposEtiquetas";
import { equiposEditorial } from "./equiposEditorial";

const withRubro = (items, rubro) =>
  items.map((item) => ({
    ...item,
    rubro,
  }));

export const equiposIndex = [
  ...withRubro(equiposTextil, "textil"),
  ...withRubro(equiposPackaging, "packaging"),
  ...withRubro(equiposComunicacionVisual, "comunicacionVisual"),
  ...withRubro(equiposEtiquetas, "etiquetas"),
  ...withRubro(equiposEditorial, "editorial"),
];

export const equiposPublicados = equiposIndex.filter(
  (equipo) => equipo.pageReady,
);

export const getEquipoById = (id) =>
  equiposIndex.find((equipo) => equipo.id === id);

export const getEquiposRelacionados = (equipo, limit = 3) =>
  equiposIndex
    .filter(
      (item) =>
        item.id !== equipo.id &&
        item.rubro === equipo.rubro &&
        item.pageReady,
    )
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, limit);