import { gruposInsumos } from "./insumos";

export const slugifyInsumo = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "y")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const insumosIndex = gruposInsumos.flatMap((grupo) =>
  grupo.items.map((item, index) => ({
    ...item,
    id: item.id ?? slugifyInsumo(item.name),
    groupId: grupo.id,
    groupEyebrow: grupo.eyebrow,
    groupTitle: grupo.title,
    groupDescription: grupo.description,
    order: item.order ?? index + 1,
    pageReady: item.pageReady ?? true,
  })),
);

export const insumosPublicados = insumosIndex.filter(
  (insumo) => insumo.pageReady,
);

export const getInsumoById = (id) =>
  insumosIndex.find((insumo) => insumo.id === id);

export const getInsumosRelacionados = (insumo, limit = 3) =>
  insumosIndex
    .filter(
      (item) =>
        item.id !== insumo.id &&
        item.groupId === insumo.groupId &&
        item.pageReady,
    )
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, limit);