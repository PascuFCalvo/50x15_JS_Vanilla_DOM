const preguntaSistemaOperativo = {
  pregunta1: {
    pregunta: "¿Qué es un sistema operativo?",
    opciones: {
      a: "Software de diseño gráfico",
      b: "Programa antivirus",
      c: "Placa base",
      d: "Software que gestiona recursos",
    },
    correcta: "d",
  },
  pregunta2: {
    pregunta: "¿Qué es un compilador?",
    opciones: {
      a: "Un lenguaje de programación",
      b: "Un dispositivo de entrada",
      c: "Un programa que traduce código fuente a código ejecutable",
      d: "Un sistema operativo",
    },
    correcta: "c",
  },
  pregunta3: {
    pregunta: "¿Qué es un bucle?",
    opciones: {
      a: "Una estructura de control que repite un bloque de código",
      b: "Un tipo de dato",
      c: "Un operador aritmético",
      d: "Un método de ordenamiento",
    },
    correcta: "a",
  },
  pregunta4: {
    pregunta: "¿Qué es un algoritmo?",
    opciones: {
      a: "Un lenguaje de programación",
      b: "Un dispositivo de entrada",
      c: "Un conjunto de instrucciones para resolver un problema",
      d: "Un sistema operativo",
    },
    correcta: "c",
  },
  pregunta5: {
    pregunta: "¿Qué es la programación orientada a objetos?",
    opciones: {
      a: "Un paradigma de programación que utiliza objetos y clases",
      b: "Un tipo de dato",
      c: "Un operador lógico",
      d: "Un método de ordenamiento",
    },
    correcta: "a",
  },
};

let preguntaHTML = "";
let preguntaGenerada = {};
let respuestaCorrecta = "";
generarPregunta = () => {
  const numeroAleatorio = Math.floor(Math.random() * 5 + 1);
  preguntaGenerada = preguntaSistemaOperativo[`pregunta${numeroAleatorio}`];
  respuestaCorrecta = preguntaGenerada.correcta;
};

printPregunta = () => {
  const pregunta = preguntaGenerada;
  const preguntaHTML = document.getElementById("tituloPregunta");
  preguntaHTML.innerHTML = pregunta.pregunta;
  respuesta1 = document.getElementById("respuesta1");
  respuesta1.innerHTML = pregunta.opciones.a;
  respuesta1.addEventListener("click", () => {
    opcionElegida = "a";
    checkVictoria();
  });
  respuesta2 = document.getElementById("respuesta2");
  respuesta2.innerHTML = pregunta.opciones.b;
  respuesta2.addEventListener("click", () => {
    opcionElegida = "b";
    checkVictoria();
  });
  respuesta3 = document.getElementById("respuesta3");
  respuesta3.innerHTML = pregunta.opciones.c;
  respuesta3.addEventListener("click", () => {
    opcionElegida = "c";
    checkVictoria();
  });
  respuesta4 = document.getElementById("respuesta4");
  respuesta4.innerHTML = pregunta.opciones.d;
  respuesta4.addEventListener("click", () => {
    opcionElegida = "d";
    checkVictoria();
  });
};

checkVictoria = () => {
  const solucion = document.getElementById("solucion");

  if (opcionElegida === respuestaCorrecta) {
    console.log(opcionElegida + " " + respuestaCorrecta);
    solucion.innerHTML = "¡Correcto!";
    solucion.style.backgroundColor = "green";
  } else {
    console.log(opcionElegida + " " + respuestaCorrecta);
    solucion.innerHTML = "¡Incorrecto!";
    solucion.style.backgroundColor = "red";
  }
};

botonPregunta = document.getElementById("generarPregunta");

botonPregunta.addEventListener("click", () => {
  generarPregunta();
  printPregunta();
});
