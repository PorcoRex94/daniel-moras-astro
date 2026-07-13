const imageBase = "/images/equipos/packaging";
const pdfBase = "/pdfs/equipos";

export const equiposPackaging = [
  /* =======================================================
     IMPRESIÓN PARA PACKAGING
     ======================================================= */
  {
  id: "flora-c25h-pro",
  name: "Flora C25h Pro",
  brand: "Flora",
  family: "impresion-packaging",
  subgroup: "multi-pass-packaging",
  shortDescription:
    "Equipo de impresión digital para packaging, cartón, corrugado, displays, cajas y piezas de valor agregado.",
  longDescription:
    "Flora C25h Pro es una solución de impresión digital orientada a packaging, muestras, tiradas variables y producción sobre materiales gráficos. Es una alternativa para empresas que necesitan sumar flexibilidad frente a procesos tradicionales, validar desarrollos con mayor velocidad y responder a trabajos donde cambian materiales, diseños o cantidades.",
  metaDescription:
    "Flora C25h Pro para impresión digital de packaging, cartón, corrugado, displays, muestras y tiradas variables. Consultá por configuración y aplicación.",
  image: `${imageBase}/c25h-pro-flora-impresora-packaging.webp`,
  video: "https://www.youtube.com/embed/aeQl3HYUnbc",
  pdf: `${pdfBase}/Flora-C25h-Pro.pdf`,
  pageReady: true,
  featured: true,
  featuredLabel: "Equipo destacado",
  featuredText:
    "Una alternativa destacada para evaluar impresión digital aplicada a packaging, muestras, tiradas variables y producción sobre materiales gráficos.",
  applications: [
    {
      title: "Packaging de cartón y cartulina",
      text: "Permite evaluar trabajos sobre materiales gráficos orientados a cajas, estuches, presentaciones comerciales, prototipos y piezas de packaging de valor agregado.",
    },
    {
      title: "Corrugado y microcorrugado",
      text: "Puede aplicarse a desarrollos donde se necesita imprimir sobre sustratos de mayor cuerpo para packaging, displays, exhibidores o materiales vinculados al punto de venta.",
    },
    {
      title: "Displays y material POP",
      text: "Resulta útil para piezas promocionales, exhibidores, soportes visuales y aplicaciones donde la calidad de impresión y la versatilidad del soporte son importantes.",
    },
    {
      title: "Muestras, prototipos y tiradas cortas",
      text: "Aporta valor cuando se requiere producir con agilidad, validar diseños, presentar propuestas comerciales o resolver trabajos variables sin depender de procesos largos.",
    },
    {
      title: "Cajas, estuches y piezas promocionales",
      text: "Puede integrarse en proyectos donde el packaging necesita mejor presentación, diferenciación visual y adaptación a distintos formatos o versiones de producto.",
    },
    {
      title: "Producción variable o personalizada",
      text: "Es una alternativa interesante para escenarios donde cambian diseños, datos, versiones, campañas o necesidades de impresión entre un trabajo y otro.",
    },
  ],
  features: [
    {
      title: "Flexibilidad para producción digital",
      text: "Permite evaluar una alternativa orientada a packaging cuando se necesitan cambios frecuentes, muestras, tiradas variables o trabajos de respuesta más rápida.",
    },
    {
      title: "Aplicación sobre materiales gráficos",
      text: "Está pensada para proyectos donde el sustrato, la presentación final y la calidad visual son variables importantes dentro del proceso productivo.",
    },
    {
      title: "Valor para prototipos y desarrollos",
      text: "Puede ayudar a validar diseños, presentar propuestas y resolver pruebas de packaging antes de avanzar hacia producciones mayores.",
    },
    {
      title: "Integración con corte y terminación",
      text: "La solución puede complementarse con procesos de corte, troquelado digital, finishing e insumos según el flujo de trabajo de cada empresa.",
    },
    {
      title: "Consulta técnica según producción real",
      text: "La configuración conveniente depende del material, formato, volumen, terminación posterior y tipo de aplicación que se necesite resolver.",
    },
  ],
  consultationNotes: [
    "Material o sustrato a imprimir.",
    "Formato máximo requerido.",
    "Volumen mensual estimado.",
    "Tipo de terminación posterior.",
    "Necesidad de muestras, prototipos o tiradas variables.",
  ],
  relatedRubroLinks: ["packaging", "etiquetas", "editorial"],
  order: 1,
},
  {
    id: "diji-dj-epa3-uv",
    name: "DIJI DJ-EPA3+ UV",
    brand: "DIJI",
    family: "impresion-packaging",
    subgroup: "inkjet-hoja-bobina",
    shortDescription:
      "Equipo digital UV para imprimir sobre materiales de packaging, piezas gráficas, envases y aplicaciones industriales.",
    image: `${imageBase}/diji-dj-epa3.webp`,
    video: null,
    pdf: `${pdfBase}/DIJI-DJ-EPA3-UV.pdf`,
    pageReady: false,
    order: 2,
  },
  {
    id: "diji-dj-epa3-pro",
    name: "DIJI DJ-EPA3+ PRO",
    brand: "DIJI",
    family: "impresion-packaging",
    subgroup: "inkjet-hoja-bobina",
    shortDescription:
      "Sistema de impresión digital para packaging, muestras, tiradas cortas y trabajos variables sobre materiales compatibles.",
    image: `${imageBase}/diji-dj-epa3-pro.webp`,
    video: null,
    pdf: `${pdfBase}/DIJI-DJ-EPA3-PRO.pdf`,
    pageReady: false,
    order: 3,
  },
  {
    id: "diji-dj-epa3",
    name: "DIJI DJ-EPA3+",
    brand: "DIJI",
    family: "impresion-packaging",
    subgroup: "inkjet-hoja-bobina",
    shortDescription:
      "Solución digital para imprimir piezas de packaging, prototipos, trabajos gráficos y aplicaciones comerciales.",
    image: `${imageBase}/diji-dj-epa3.webp`,
    video: null,
    pdf: `${pdfBase}/DIJI-DJ-EPA3.pdf`,
    pageReady: false,
    order: 4,
  },
  {
    id: "retrofit-monoprint-colorprint",
    name: "Monoprint | Colorprint",
    brand: "Industrial Inkjet",
    family: "impresion-packaging",
    subgroup: "motores-inkjet",
    shortDescription:
      "Motores inkjet para integrar impresión variable, datos, codificación o personalización en líneas productivas existentes.",
    image: `${imageBase}/retrofit-monoprint-colorprint-motor-impresion.webp`,
    video: null,
    pdf: `${pdfBase}/Retrofit-Monoprint-y-Colorprint.pdf`,
    pageReady: false,
    order: 1,
  },

  /* =======================================================
     TROQUELADO DIGITAL
     ======================================================= */

  {
    id: "iecho-pk1209-pro",
    name: "iECHO PK-1209 PRO",
    brand: "iECHO",
    family: "troquelado-digital",
    subgroup: "mesas-carga-manual",
    shortDescription:
      "Sistema de troquelado digital para prototipos, tiradas cortas, muestras, cajas, estuches y piezas promocionales.",
    image: `${imageBase}/iecho-pk1209-troquelado-digital.webp`,
    video: null,
    pdf: `${pdfBase}/Iecho-PK-1209-PRO.pdf`,
    pageReady: false,
    order: 1,
  },
  {
    id: "iecho-pk0604-pk0705",
    name: "iECHO PK-0604 | PK-0705",
    brand: "iECHO",
    family: "troquelado-digital",
    subgroup: "mesas-carga-manual",
    shortDescription:
      "Equipos compactos para corte digital, prototipado, muestras y trabajos de packaging de formato controlado.",
    image: `${imageBase}/iecho-pk0604-pk0705.webp`,
    video: null,
    pdf: `${pdfBase}/PK0604-PK0705.pdf`,
    pageReady: false,
    order: 2,
  },
  {
    id: "saga-sg-asf420",
    name: "Saga SG-ASF420",
    brand: "Saga",
    family: "troquelado-digital",
    subgroup: "mesas-carga-automatica",
    shortDescription:
      "Mesa de troquelado y corte con alimentación automática para ordenar el flujo de producción en packaging.",
    image: `${imageBase}/saga-asf420-mesa-troquelado-corte.webp`,
    video: null,
    pdf: `${pdfBase}/Saga-SG-ASF420.pdf`,
    pageReady: false,
    order: 1,
  },

  /* =======================================================
     CORTE Y TERMINACIÓN
     ======================================================= */

  {
    id: "iecho-ak4",
    name: "iECHO AK4",
    brand: "iECHO",
    family: "corte-terminacion",
    subgroup: "corte-digital-industrial",
    shortDescription:
      "Mesa de corte digital para packaging, cartón, corrugado, displays, materiales gráficos y terminación de piezas impresas.",
    image: `${imageBase}/iecho-ak4-mesa-corte.webp`,
    video: null,
    pdf: `${pdfBase}/iECHO-AK4.pdf`,
    pageReady: false,
    order: 1,
  },
  {
    id: "iecho-bk4",
    name: "iECHO BK4",
    brand: "iECHO",
    family: "corte-terminacion",
    subgroup: "corte-digital-industrial",
    shortDescription:
      "Sistema de corte digital industrial para packaging, displays, materiales rígidos, flexibles y producción gráfica.",
    image: `${imageBase}/iecho-bk4-sistema-de-corte.webp`,
    video: null,
    pdf: `${pdfBase}/iECHO-BK4.pdf`,
    pageReady: false,
    order: 2,
  },
  {
    id: "iecho-tk4s",
    name: "iECHO Serie TK4S",
    brand: "iECHO",
    family: "corte-terminacion",
    subgroup: "corte-digital-industrial",
    shortDescription:
      "Mesa de corte digital para producción industrial, packaging, materiales rígidos, flexibles y piezas de gran formato.",
    image: `${imageBase}/iecho-tk4s-mesa-corte-digital.webp`,
    video: null,
    pdf: `${pdfBase}/Serie-TK4S-iecho.pdf`,
    pageReady: false,
    order: 3,
  },
  {
    id: "iecho-bk3",
    name: "iECHO Serie BK3",
    brand: "iECHO",
    family: "corte-terminacion",
    subgroup: "corte-digital-industrial",
    shortDescription:
      "Serie de mesas de corte digital para packaging, gráfica, displays, materiales flexibles y piezas terminadas.",
    image: `${imageBase}/serie-bk3-iecho-mesa-de-corte.webp`,
    video: null,
    pdf: `${pdfBase}/Serie-Bk3-iecho.pdf`,
    pageReady: false,
    order: 4,
  },
  {
    id: "kartech-kh1316",
    name: "Kartech KH-1316",
    brand: "Kartech",
    family: "corte-terminacion",
    subgroup: "prototipado-packaging",
    shortDescription:
      "Mesa de corte para muestras, prototipos, cajas, estuches, piezas gráficas y trabajos de packaging flexible.",
    image: `${imageBase}/mesa-corte-kartech-kh1316.webp`,
    video: null,
    pdf: `${pdfBase}/Kartech-KH-1316.pdf`,
    pageReady: false,
    order: 1,
  },
  {
    id: "kartech-serie-gk",
    name: "Kartech Serie GK",
    brand: "Kartech",
    family: "corte-terminacion",
    subgroup: "prototipado-packaging",
    shortDescription:
      "Sistema de corte digital para prototipos, muestras, packaging, displays y piezas gráficas de tiradas cortas.",
    image: `${imageBase}/sistema-corte-kartech-serie-gk.webp`,
    video: null,
    pdf: `${pdfBase}/Kartech-Serie-GK.pdf`,
    pageReady: false,
    order: 2,
  },
  {
    id: "kartech-serie-kf",
    name: "Kartech Serie KF",
    brand: "Kartech",
    family: "corte-terminacion",
    subgroup: "prototipado-packaging",
    shortDescription:
      "Mesa de corte digital para packaging, muestras, piezas promocionales y trabajos gráficos de formato controlado.",
    image: `${imageBase}/mesa-corte-kartech-serie-kf.webp`,
    video: null,
    pdf: `${pdfBase}/Kartech-Serie-KF.pdf`,
    pageReady: false,
    order: 3,
  },
  {
    id: "kartech-serie-kt",
    name: "Kartech Serie KT",
    brand: "Kartech",
    family: "corte-terminacion",
    subgroup: "prototipado-packaging",
    shortDescription:
      "Sistema de corte para prototipado, packaging, cajas, muestras, displays y aplicaciones gráficas variables.",
    image: `${imageBase}/sistema-corte-kartech-serie-kt.webp`,
    video: null,
    pdf: `${pdfBase}/Kartech-Serie-KT.pdf`,
    pageReady: false,
    order: 4,
  },
];