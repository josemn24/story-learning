import { StoryStage } from './types';

export const first_story: StoryStage[] = [
    {
      content: "You are an explorer who finds an ancient map in the jungle. It hints at a hidden treasure, but challenges lie ahead.",
      checkpoint: {
        type: 'short-answer',
        question: "The map says the treasure is 200 meters north and 300 meters west. How far is it in a straight line?",
        answer: 360,
      },
      image: {
        src: "/images/stage1.png",
        alt: "An ancient treasure map with mysterious markings"
      }
    },
    {
      content: "You decipher the map and continue your journey. Suddenly, you come across an ancient ruin with inscriptions on the walls.",
      checkpoint: {
        type: 'multiple-choice',
        question: "The inscription is written in an ancient script. Which civilization is most known for its hieroglyphs?",
        answer: "Egyptians",
        options: ["Mayans", "Romans", "Egyptians", "Greeks"],
      },
      image: {
        src: "/images/stage2.png",
        alt: "Ancient ruins with hieroglyphic inscriptions"
      }
    },
    {
      content: "You move forward and discover a hidden chamber. The treasure lies ahead, but you take a moment to reflect on your journey.",
      checkpoint: {
        type: 'creative-writing',
        question: "Write a short diary entry describing your adventure so far.",
      },
    },
];

export const second_story: StoryStage[] = [
    {
      content: "Vives con tu madre en una cabaña humilde. Solo tienen una vaca lechera, pero como ella ha enfermado y no pueden trabajar, decides venderla para sobrevivir.",
      checkpoint: {
        type: 'short-answer',
        question: "Si vendieras la vaca por 5 monedas de oro y cada moneda vale 20 unidades, ¿cuánto dinero recibirías en total?",
        answer: 100,
      },
      image: {
        src: "/images/hmimage1.png",
        alt: "Una vaca lechera junto a una cabaña humilde"
      }
    },
    {
      content: "En lugar de venderla, intercambias la vaca por unas semillas mágicas. Tu madre se enoja y las lanza por la ventana. Por la mañana, descubres una enorme planta que crece hasta el cielo.",
      checkpoint: {
        type: 'multiple-choice',
        question: "¿Qué tipo de texto es este cuento?",
        options: ["Biografía", "Fábula", "Cuento de hadas", "Noticia"],
        answer: "Cuento de hadas",
      },
      image: {
        src: "/images/hmimage2.png",
        alt: "Una gigantesca planta que sube entre las nubes"
      }
    },
    {
      content: "Subes por la planta y llegas a un castillo en las nubes. Una mujer gigante te dice que su esposo es un ogro que come niños.",
      checkpoint: {
        type: 'creative-writing',
        question: "¿Qué harías tú en esa situación? Responde en una o dos frases usando conectores como 'aunque', 'porque' o 'sin embargo'.",
      },
      image: {
        src: "/images/hmimage3.png",
        alt: "Un castillo gigante sobre las nubes"
      }
    },
    {
      content: "El ogro llega. La mujer te esconde en el horno. El ogro huele que hay un niño, pero ella lo engaña. Luego, él se duerme y tú robas una bolsa de oro.",
      checkpoint: {
        type: 'multiple-choice',
        question: "¿Cuál de estas acciones describe mejor lo que hizo Jack?",
        options: ["Comercio justo", "Hurto", "Regalo", "Préstamo"],
        answer: "Hurto",
      },
      image: {
        src: "/images/hmimage4.png",
        alt: "El ogro dormido junto a un montón de tesoros"
      }
    },
    {
      content: "Vuelves a casa y vives un tiempo con lo robado, pero luego decides regresar por el ganso de los huevos de oro.",
      checkpoint: {
        type: 'short-answer',
        question: "Si el ganso pone 1 huevo de oro al día y cada huevo vale 50 monedas, ¿cuánto tendrías en una semana?",
        answer: 350,
      },
      image: {
        src: "/images/hmimage5.png",
        alt: "Un ganso dorado en una jaula brillante"
      }
    },
    {
      content: "Subes una vez más por la planta y robas el arpa mágica. El ogro te persigue y logras llegar a casa. Cortas la planta y el ogro cae para siempre.",
      checkpoint: {
        type: 'creative-writing',
        question: "Escribe el final alternativo del cuento: ¿Qué habría pasado si Jack no hubiera cortado la planta?",
      },
      image: {
        src: "/images/hmimage6.png",
        alt: "Jack cortando el tallo de la planta mientras el ogro cae"
      }
    }
];
