import { Story, StoryStage } from './types';

const first_story_stages: StoryStage[] = [
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
      },
      layoutType: 'text-left-image-right'
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
      },
      layoutType: 'text-left-image-right'
    },
    {
      content: "You move forward and discover a hidden chamber. The treasure lies ahead, but you take a moment to reflect on your journey.",
      checkpoint: {
        type: 'creative-writing',
        question: "Write a short diary entry describing your adventure so far.",
      },
      layoutType: 'text-left-image-right'
    },
];

const second_story_stages: StoryStage[] = [
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
      },
      layoutType: 'text-left-image-right'
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
      },
      layoutType: 'text-left-image-right'
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
      },
      layoutType: 'text-left-image-right'
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
      },
      layoutType: 'text-left-image-right'
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
      },
      layoutType: 'text-left-image-right'
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
      },
      layoutType: 'text-left-image-right'
    }
];

const third_story_stages: StoryStage[] = [
  {
    content: "Tu madre te pide que lleves una cesta con comida a tu abuela, que está enferma. Te advierte que no hables con desconocidos y que no te salgas del camino del bosque.",
    checkpoint: {
      type: 'multiple-choice',
      question: "¿Qué te pide tu mamá que no hagas?",
      options: [
        "Que no juegues con tu abuela",
        "Que no hables con desconocidos",
        "Que no lleves la cesta",
        "Que no vayas por el camino del bosque"
      ],
      answer: "Que no hables con desconocidos",
    },
    image: {
      src: "/images/capimage1.png",
      alt: "Caperucita saliendo de casa con una cesta"
    },
    layoutType: 'text-left-image-right'
  },
  {
    content: "Mientras caminas por el bosque, un lobo aparece y te pregunta a dónde vas. Le cuentas que vas a casa de tu abuela. El lobo toma un atajo para llegar antes que tú.",
    checkpoint: {
      type: 'short-answer',
      question: "Si tú caminas 2 horas y el lobo corre solo 1 hora, pero va el doble de rápido que tú, ¿quién llega primero?",
      answer: "El lobo",
    },
    image: {
      src: "/images/capimage2.png",
      alt: "Caperucita hablando con el lobo entre los árboles"
    },
    layoutType: 'text-left-image-right'
  },
  {
    content: "El lobo llega a la casa, engaña a la abuela y se disfraza con su ropa. Cuando tú llegas, te parece que algo extraño ocurre.",
    checkpoint: {
      type: 'multiple-choice',
      question: "¿Qué parte del cuerpo le pareció muy grande a Caperucita?",
      options: ["Los pies", "Las manos", "Los ojos", "Las orejas"],
      answer: "Los ojos",
    },
    image: {
      src: "/images/capimage3.png",
      alt: "El lobo disfrazado de abuela en la cama"
    },
    layoutType: 'text-left-image-right'
  },
  {
    content: "El lobo intenta comerte, pero un leñador oye tus gritos y corre a ayudarte. Logra ahuyentar al lobo y salva a tu abuela.",
    checkpoint: {
      type: 'short-answer',
      question: "El leñador corre 5 minutos a 200 metros por minuto. ¿Cuántos metros corrió en total?",
      answer: 1000,
    },
    image: {
      src: "/images/capimage4.png",
      alt: "El leñador enfrentando al lobo"
    },
    layoutType: 'text-left-image-right'
  },
  {
    content: "Tú y tu abuela están a salvo. Aprendiste una lección importante sobre la obediencia y los peligros del bosque.",
    checkpoint: {
      type: 'creative-writing',
      question: "Escribe una nota a tu mamá contándole qué aprendiste y cómo te sentiste en el bosque.",
    },
    image: {
      src: "/images/capimage5.png",
      alt: "Caperucita y su abuela abrazadas junto a la chimenea"
    },
    layoutType: 'text-left-image-right'
  }
];

export const first_story: Story = {
  title: 'The Lost Explorer',
  stages: first_story_stages,
}

export const second_story: Story = {
  title: 'Las habichuelas mágicas',
  stages: second_story_stages,
}

export const third_story: Story = {
  title: 'La Caperucita roja',
  stages: third_story_stages,
}
