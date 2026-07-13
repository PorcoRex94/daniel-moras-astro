const imageBase = "/images/equipos/etiquetas";
const pdfBase = "/pdfs/equipos";

export const equiposEtiquetas = [
  /* =======================================================
     IMPRESIÓN DIGITAL DE ETIQUETAS
     ======================================================= */

  {
  id: "flora-j350gt",
  name: "Flora J-350GT",
  brand: "Flora",
  family: "impresion-etiquetas",
  subgroup: "inkjet-etiquetas",
  shortDescription:
    "Sistema flexo inkjet para producción de etiquetas, aplicaciones autoadhesivas y trabajos de valor agregado.",
  longDescription:
    "Flora J-350GT es una solución orientada a producción de etiquetas con tecnología inkjet, pensada para trabajos en bobina, aplicaciones autoadhesivas y proyectos donde la calidad, la flexibilidad y la terminación son parte central del proceso. Es una alternativa para empresas que necesitan evaluar tiradas variables, personalización, cambios frecuentes de diseño y producción de etiquetas con mayor valor agregado.",
  metaDescription:
    "Flora J-350GT para producción digital de etiquetas, aplicaciones autoadhesivas, trabajos en bobina, tiradas variables y valor agregado.",
  image: `${imageBase}/flora-j350gt-flexo-inkjet-etiquetas.webp`,
  video: "https://www.youtube.com/embed/XMxfzk-77Zk",
  pdf: `${pdfBase}/Flora-J-350GT.pdf`,
  pageReady: true,
  featured: true,
  featuredLabel: "Equipo destacado",
  featuredText:
    "Una alternativa destacada para evaluar producción de etiquetas con tecnología inkjet, terminación integrada y aplicaciones comerciales de valor.",
  applications: [
    {
      title: "Etiquetas autoadhesivas",
      text: "Permite evaluar producción de etiquetas para envases, productos, identificación comercial y aplicaciones donde el material autoadhesivo es parte del proceso.",
    },
    {
      title: "Trabajos en bobina",
      text: "Está orientada a flujos productivos donde el material se trabaja en rollo, con continuidad de proceso y posibilidades de integración con terminación.",
    },
    {
      title: "Tiradas variables o personalizadas",
      text: "Aporta valor cuando se necesitan cambios frecuentes de diseño, versiones, datos variables, campañas específicas o producciones segmentadas.",
    },
    {
      title: "Etiquetas de valor agregado",
      text: "Puede aplicarse a trabajos donde la presentación final, la calidad visual y la diferenciación del producto son factores importantes.",
    },
    {
      title: "Producción comercial de etiquetas",
      text: "Es una alternativa para empresas que buscan ampliar su capacidad de respuesta frente a pedidos diversos, tiradas cortas o medianas y aplicaciones comerciales.",
    },
    {
      title: "Desarrollos y pruebas de producto",
      text: "Resulta útil para validar diseños, presentar muestras, producir series iniciales o responder con mayor agilidad a nuevos proyectos.",
    },
  ],
  features: [
    {
      title: "Tecnología inkjet aplicada a etiquetas",
      text: "Permite evaluar una solución digital para producción de etiquetas cuando se busca mayor flexibilidad frente a procesos tradicionales.",
    },
    {
      title: "Pensada para trabajos variables",
      text: "Es útil en escenarios donde cambian diseños, datos, versiones, materiales o necesidades comerciales entre un trabajo y otro.",
    },
    {
      title: "Orientada a producción en bobina",
      text: "Se adapta a flujos donde el material se trabaja en rollo y la continuidad productiva es una variable importante.",
    },
    {
      title: "Valor para mercados con muchas referencias",
      text: "Puede aportar ventajas cuando una empresa trabaja con múltiples productos, presentaciones, versiones o cambios frecuentes de etiqueta.",
    },
    {
      title: "Consulta técnica según aplicación real",
      text: "La configuración conveniente depende del material, volumen, ancho de trabajo, terminación posterior y tipo de etiqueta que se necesite producir.",
    },
  ],
  consultationNotes: [
    "Material autoadhesivo o sustrato a utilizar.",
    "Ancho de trabajo requerido.",
    "Volumen mensual estimado.",
    "Tipo de terminación posterior.",
    "Necesidad de datos variables, versiones o tiradas cortas.",
  ],
  relatedRubroLinks: ["etiquetas", "packaging", "editorial"],
  order: 1,
},
  {
    id: "flora-orca350",
    name: "Flora ORCA 350",
    brand: "Flora",
    family: "impresion-etiquetas",
    subgroup: "inkjet-etiquetas",
    shortDescription:
      "Equipo inkjet para producción digital de etiquetas, tiradas variables, aplicaciones comerciales y trabajos autoadhesivos.",
    image: `${imageBase}/flora-orca350-inkjet-etiquetas.webp`,
    video: null,
    pdf: `${pdfBase}/Flora-Orca-350.pdf`,
    pageReady: false,
    order: 2,
  },
  {
    id: "flora-fp1350",
    name: "Flora FP1350",
    brand: "Flora",
    family: "impresion-etiquetas",
    subgroup: "inkjet-etiquetas",
    shortDescription:
      "Solución inkjet para impresión de etiquetas, materiales en bobina, producción variable y aplicaciones gráficas específicas.",
    image: `${imageBase}/flora-fp1350-inkjet-etiquetas.webp`,
    video: null,
    pdf: `${pdfBase}/Flora-FP1350.pdf`,
    pageReady: false,
    order: 3,
  },
  {
    id: "diji-dj-e330",
    name: "DIJI DJ-E330",
    brand: "DIJI",
    family: "impresion-etiquetas",
    subgroup: "inkjet-etiquetas",
    shortDescription:
      "Equipo digital para etiquetas, trabajos en bobina, producción variable y aplicaciones comerciales de tiradas cortas o medianas.",
    image: `${imageBase}/diji-dj-e330.webp`,
    video: null,
    pdf: `${pdfBase}/DIJI-DJ-E330.pdf`,
    pageReady: false,
    order: 4,
  },
  {
    id: "retrofit-monoprint-colorprint-etiquetas",
    name: "Monoprint | Colorprint",
    brand: "Industrial Inkjet",
    family: "impresion-etiquetas",
    subgroup: "motores-inkjet-etiquetas",
    shortDescription:
      "Motores inkjet para integrar impresión variable, codificación o personalización en líneas existentes de etiquetas y packaging.",
    image: `${imageBase}/retrofit-monoprint-colorprint-motor-impresion.webp`,
    video: null,
    pdf: `${pdfBase}/Retrofit-Monoprint-y-Colorprint.pdf`,
    pageReady: false,
    order: 1,
  },

  /* =======================================================
     CORTE Y TERMINACIÓN DE ETIQUETAS
     ======================================================= */

  {
    id: "iecho-rk",
    name: "iECHO RK",
    brand: "iECHO",
    family: "terminacion-etiquetas",
    subgroup: "corte-etiquetas",
    shortDescription:
      "Sistema de corte para etiquetas, materiales autoadhesivos, troquelado digital y terminación de trabajos en bobina.",
    image: `${imageBase}/iecho-rk-corte-etiquetas.webp`,
    video: null,
    pdf: `${pdfBase}/iECHO-RK.pdf`,
    pageReady: false,
    order: 1,
  },
  {
    id: "iecho-lct350",
    name: "iECHO LCT350",
    brand: "iECHO",
    family: "terminacion-etiquetas",
    subgroup: "corte-laser-etiquetas",
    shortDescription:
      "Sistema láser para corte y terminación de etiquetas, trabajos en bobina, tiradas variables y aplicaciones autoadhesivas.",
    image: `${imageBase}/iecho-lct-corte-laser-etiquetas.webp`,
    video: null,
    pdf: `${pdfBase}/iECHO-LCT350.pdf`,
    pageReady: false,
    order: 1,
  },
];