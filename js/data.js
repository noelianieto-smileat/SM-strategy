/* =========================================================================
   SMILEAT · Estrategia de Marca — data.js
   Estructura: Situación actual · Competidores · Orgánico · Influencers
   Multi-país: España (ES), Italia (IT), Portugal (PT)

   CÓMO RELLENAR ESTE ARCHIVO A MEDIDA QUE LLEGUEN DATOS:
   - Cada país tiene el mismo esqueleto. Copia la forma de "ES" para IT/PT.
   - Los arrays vacíos [] y los campos "null" hacen que la web muestre
     automáticamente un estado vacío ("Pendiente de datos"), así que puedes
     ir rellenando sin romper nada.
   - Los KPI actuales de España (Meta + Google) son datos reales ya
     analizados en el informe de Paid Media. Todo lo demás está pendiente.
   ========================================================================= */

const DATA = {

  meta: {
    title: "Estrategia de Marca",
    subtitle: "Situación actual, competencia, contenido orgánico e influencers",
    objective: "Crecimiento de marca + ventas + usuarios suscritos",
  },

  countries: {

    ES: {
      code: "ES",
      label: "España",
      flag: "🇪🇸",

      situacionActual: {
        periodo: "1 jul – 28 ago 2026",
        kpisActuales: [
          { label: "Inversión total (Meta + Google)", value: "62.853 €", sub: "Jul–ago 2026" },
          { label: "ROAS combinado", value: "7,52x", sub: "Meta 4,69x · Google 14,84x" },
          { label: "CPA Meta / Google", value: "10,06 € / 3,73 €", sub: "Coste por resultado" },
          { label: "Usuarios suscritos", value: "+7%", sub: "vs. periodo anterior (Shopify)" },
        ],
        kpisObjetivo: [
          { label: "ROAS objetivo", value: null, sub: "Pendiente de definir" },
          { label: "CPA objetivo", value: null, sub: "Pendiente de definir" },
          { label: "Crecimiento de suscriptores objetivo", value: null, sub: "Pendiente de definir" },
          { label: "Inversión objetivo", value: null, sub: "Pendiente de definir" },
        ],
        note: "Los KPI actuales proceden del informe de Paid Media (Meta Ads + Google Ads, jul-ago 2026). Los KPI objetivo están pendientes de definir con el equipo — en cuanto los tengamos, sustituyen a los placeholders."
      },

      competidores: [],
      competidoresNote: "Pendiente de definir el listado de competidores a analizar (directos e indirectos) y las variables a comparar: posicionamiento, precio, presencia en RRSS, propuesta de valor, etc.",

      organico: {
        pilares: [],
        canales: [],
        calendario: [],
        note: "Pendiente de definir los pilares de contenido, canales prioritarios y cadencia de publicación para España."
      },

      influencers: {
        tiers: [],
        colaboraciones: [],
        note: "Pendiente de definir la estrategia de influencers para España: tipología (micro/macro), número de colaboraciones, formatos y objetivos por perfil."
      }
    },

    IT: {
      code: "IT",
      label: "Italia",
      flag: "🇮🇹",
      situacionActual: {
        periodo: null,
        kpisActuales: [],
        kpisObjetivo: [],
        note: "Aún no tenemos datos de Paid Media ni KPI para Italia. En cuanto lleguen los exports de Meta/Google Ads de Italia, se añaden aquí siguiendo el mismo formato que España."
      },
      competidores: [],
      competidoresNote: "Pendiente de definir el mercado y los competidores locales en Italia.",
      organico: { pilares: [], canales: [], calendario: [], note: "Pendiente de definir la estrategia orgánica para Italia." },
      influencers: { tiers: [], colaboraciones: [], note: "Pendiente de definir la estrategia de influencers para Italia." }
    },

    PT: {
      code: "PT",
      label: "Portugal",
      flag: "🇵🇹",
      situacionActual: {
        periodo: null,
        kpisActuales: [],
        kpisObjetivo: [],
        note: "Aún no tenemos datos de Paid Media ni KPI para Portugal. En cuanto lleguen los exports de Meta/Google Ads de Portugal, se añaden aquí siguiendo el mismo formato que España."
      },
      competidores: [],
      competidoresNote: "Pendiente de definir el mercado y los competidores locales en Portugal.",
      organico: { pilares: [], canales: [], calendario: [], note: "Pendiente de definir la estrategia orgánica para Portugal." },
      influencers: { tiers: [], colaboraciones: [], note: "Pendiente de definir la estrategia de influencers para Portugal." }
    }

  }
};
