import { equipos as tarjetasCatalogo } from "./equipos.js";
import { equiposTextil } from "./equiposTextil.js";
import { equiposPackaging } from "./equiposPackaging.js";
import { equiposComunicacionVisual } from "./equiposComunicacionVisual.js";
import { equiposEtiquetas } from "./equiposEtiquetas.js";
import { equiposEditorial } from "./equiposEditorial.js";

const fuentesPorRubro = [
  { rubro: "textil", equipos: equiposTextil },
  { rubro: "packaging", equipos: equiposPackaging },
  { rubro: "comunicacionVisual", equipos: equiposComunicacionVisual },
  { rubro: "etiquetas", equipos: equiposEtiquetas },
  { rubro: "editorial", equipos: equiposEditorial },
];

const unique = (values) => [...new Set(values.filter(Boolean))];

/**
 * Conserva cada registro tal como llegó desde su archivo de rubro. Los campos
 * contextualizados nunca se mezclan: se exponen en `variantes` del producto.
 */
export const equiposOriginales = fuentesPorRubro.flatMap(({ rubro, equipos }) =>
  equipos.map((equipo) => ({
    ...equipo,
    rubroFuente: rubro,
  })),
);

const variantesPorId = new Map();

for (const equipo of equiposOriginales) {
  const variantes = variantesPorId.get(equipo.id) ?? [];
  variantes.push(equipo);
  variantesPorId.set(equipo.id, variantes);
}

const crearEquipoCanonico = ([id, variantes]) => {
  // Mantiene el orden histórico de las fichas como contexto principal para no
  // alterar la presentación aprobada de URLs ya publicadas.
  const principal = variantes[0];
  const rubros = unique(
    variantes.flatMap((variante) => [
      variante.rubroFuente,
      ...(variante.relatedRubroLinks ?? []),
    ]),
  );

  return {
    ...principal,
    id,
    rubro: principal.rubroFuente,
    rubros,
    pageReady: variantes.some((variante) => variante.pageReady),
    variantes,
    imagenesPorRubro: Object.fromEntries(
      variantes.map((variante) => [variante.rubroFuente, variante.image]),
    ),
    recursos: {
      imagenes: unique(variantes.map((variante) => variante.image)),
      pdfs: unique(variantes.map((variante) => variante.pdf)),
      videos: unique(variantes.map((variante) => variante.video)),
    },
  };
};

export const equiposCanonicos = [...variantesPorId.entries()]
  .map(crearEquipoCanonico)
  .sort((a, b) => a.name.localeCompare(b.name, "es"));

export const equiposPorId = new Map(
  equiposCanonicos.map((equipo) => [equipo.id, equipo]),
);

export const equiposPublicados = equiposCanonicos.filter(
  (equipo) => equipo.pageReady,
);

export const getEquipoById = (id) => equiposPorId.get(id);

const destinosEspecialesCatalogo = {
  "allwin-fb2513r-ia": {
    equipoId: "allwin-fb2513r-ia-uv",
    action: "Ver equipo",
    ariaLabel: "Ver Allwin FB2513R IA UV",
  },
  "saga-sg-asc": {
    equipoId: "saga-sg-asc2301",
    action: "Ver equipo",
    ariaLabel: "Ver Saga SG-ASC2301",
  },
  "diji-serie-epa3-plus": {
    href: "/#contacto?equipo=DIJI%20Serie%20EPA3%2B",
    action: "Consultar por la serie",
    ariaLabel: "Consultar por DIJI Serie EPA3+",
  },
  "iecho-serie-tk4s": {
    equipoId: "iecho-tk4s",
    action: "Ver equipo",
    ariaLabel: "Ver iECHO Serie TK4S",
  },
};

export const getDestinoCatalogo = (tarjeta) => {
  const especial = destinosEspecialesCatalogo[tarjeta.id];

  if (especial?.href) {
    return especial;
  }

  const equipoId = especial?.equipoId ?? tarjeta.id;
  const equipo = getEquipoById(equipoId);

  return {
    equipoId: equipo?.id ?? null,
    href: equipo ? `/equipos/${equipo.id}` : `/#contacto?equipo=${encodeURIComponent(tarjeta.name)}`,
    action: especial?.action ?? (equipo ? "Ver equipo" : "Consultar"),
    ariaLabel: especial?.ariaLabel ?? (equipo ? `Ver ${equipo.name}` : `Consultar por ${tarjeta.name}`),
  };
};

/**
 * Conserva la selección comercial de 19 tarjetas y su contenido visual.
 * Los metadatos funcionales se toman del equipo canónico cuando existe.
 */
export const equiposCatalogo = tarjetasCatalogo.map((tarjeta) => {
  const destino = getDestinoCatalogo(tarjeta);
  const equipo = destino.equipoId ? getEquipoById(destino.equipoId) : null;

  return {
    ...tarjeta,
    equipoId: equipo?.id ?? null,
    rubros: unique([...(tarjeta.rubros ?? []), ...(equipo?.rubros ?? [])]),
    hasVideo: Boolean(equipo?.recursos.videos.length),
    destino,
  };
});

export const equiposLegacyRedirects = Object.fromEntries(
  tarjetasCatalogo
    .map((tarjeta) => [tarjeta.id, getDestinoCatalogo(tarjeta)])
    .filter(([id, destino]) => destino.href !== `/equipos/${id}`)
    .map(([id, destino]) => [id, destino.href]),
);

export const getEquiposRelacionados = (equipo, limit = 3) => {
  const rubrosDelEquipo = new Set(equipo.rubros ?? [equipo.rubro]);

  return equiposPublicados
    .filter((item) => item.id !== equipo.id)
    .map((item) => ({
      item,
      coincidencias: item.rubros.filter((rubro) => rubrosDelEquipo.has(rubro))
        .length,
    }))
    .filter(({ coincidencias }) => coincidencias > 0)
    .sort(
      (a, b) =>
        b.coincidencias - a.coincidencias ||
        (a.item.order ?? 999) - (b.item.order ?? 999) ||
        a.item.name.localeCompare(b.item.name, "es"),
    )
    .slice(0, limit)
    .map(({ item }) => item);
};
