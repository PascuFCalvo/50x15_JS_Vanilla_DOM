import { preguntas } from "./preguntas.js";
import { marcador } from "./marcador.js";

let opcionElegida = "";
let preguntaAsidoGenerada = false;
let preguntaGenerada = {};
let respuestaCorrecta = "";
let preguntasRealizadas = new Set();
let numeroAleatorio;
let comodin50usado = false;
let comodinPublicoUsado = false;
let comodinSaltarUsado = false;
let rondaActualValue = 1;

const botonPlantarse = document.getElementById("botonPlantarse");
botonPlantarse.addEventListener("click", () => {
  plantarse();
});

const botonConfirmar = document.getElementById("confirmar");
botonConfirmar.addEventListener("click", () => {
  if (!preguntaAsidoGenerada) {
    alert("Primero genera una pregunta");
    return;
  }
  if (opcionElegida === "") {
    alert("Primero elige una respuesta");
    return;
  }
  checkVictoria();
});

const botonPregunta = document.getElementById("generarPregunta");
botonPregunta.addEventListener("click", () => {
  resetVisibility();
  generarNuevaPregunta();
  printPregunta();
  preguntaAsidoGenerada = true;
});

const boton50porciento = document.getElementById("boton50porciento");
boton50porciento.addEventListener("click", () => {
  if (!preguntaAsidoGenerada) {
    alert("Primero genera una pregunta");
    return;
  }

  if (comodin50usado) {
    alert("Comodín ya usado");
    return;
  }
  comodin50usado = true;
  boton50porciento.style.backgroundColor = "red";
  comodin50porciento();
});

const botonpublico = document.getElementById("botonPublico");
botonpublico.addEventListener("click", () => {
  if (!preguntaAsidoGenerada) {
    alert("Primero genera una pregunta");
    return;
  }
  comodinPublico();
});

const botonSaltar = document.getElementById("botonSaltar");
botonSaltar.addEventListener("click", () => {
  if (!preguntaAsidoGenerada) {
    alert("Primero genera una pregunta");
    return;
  }
  comodinSaltarPregunta();
});

const rondas = document.getElementsByClassName("ronda");

const generarNuevaPregunta = () => {
  winCondition();
  calcularRondaActual();
  calcularPuntuacionActual();
  resetVisibility();
  generarPregunta();
  printPregunta();
  rondaActualValue++;

  document.getElementById("confirmar").style.display = "block";
  document.getElementById("solucion").style.display = "block";
  document.getElementById("generarPregunta").style.display = "none";
  document.getElementById("rondaActual").style.display = "block";
  document.getElementById("puntuacion").style.display = "block";

  const rondas = Array.from(document.getElementsByClassName("ronda"));
  rondas.forEach((ronda, index) => {
    ronda.style.display = "block";
    ronda.innerHTML = marcador[`pregunta${index + 1}`].valor;
    ronda.style.color = "white";
    ronda.style.textAlign = "end";
  });

  if (rondaActualValue === 6 || rondaActualValue === 11) {
    document.getElementById("botonPlantarse").style.display = "block";
  }
};

const generarPregunta = () => {
  console.log("genero pregunta");
  numeroAleatorio = Math.floor(Math.random() * 50);
  while (preguntasRealizadas.has(numeroAleatorio)) {
    numeroAleatorio = Math.floor(Math.random() * 50);
  }
  preguntasRealizadas.add(numeroAleatorio);
  preguntaGenerada = preguntas[`pregunta${numeroAleatorio}`];
  respuestaCorrecta = preguntaGenerada.correcta;
  console.log([...preguntasRealizadas]);
};

const printPregunta = () => {
  let pregunta = preguntaGenerada;

  let preguntaHTML = document.getElementById("tituloPregunta");
  preguntaHTML.innerHTML = pregunta.pregunta;

  respuesta1.innerHTML = pregunta.opciones.a;
  respuesta2.innerHTML = pregunta.opciones.b;
  respuesta3.innerHTML = pregunta.opciones.c;
  respuesta4.innerHTML = pregunta.opciones.d;

  respuesta1.addEventListener("click", () => {
    opcionElegida = "a";
    respuesta1.style.backgroundColor = "lightblue";
    respuesta2.style.backgroundColor = "white";
    respuesta3.style.backgroundColor = "white";
    respuesta4.style.backgroundColor = "white";
  });
  respuesta2.addEventListener("click", () => {
    opcionElegida = "b";
    respuesta2.style.backgroundColor = "lightblue";
    respuesta1.style.backgroundColor = "white";
    respuesta3.style.backgroundColor = "white";
    respuesta4.style.backgroundColor = "white";
  });
  respuesta3.addEventListener("click", () => {
    opcionElegida = "c";
    respuesta3.style.backgroundColor = "lightblue";
    respuesta2.style.backgroundColor = "white";
    respuesta1.style.backgroundColor = "white";
    respuesta4.style.backgroundColor = "white";
  });
  respuesta4.addEventListener("click", () => {
    opcionElegida = "d";
    respuesta4.style.backgroundColor = "lightblue";
    respuesta2.style.backgroundColor = "white";
    respuesta3.style.backgroundColor = "white";
    respuesta1.style.backgroundColor = "white";
  });
};

const checkVictoria = () => {
  const solucion = document.getElementById("solucion");

  if (opcionElegida === respuestaCorrecta) {
    solucion.style.backgroundColor = "green";
    setTimeout(() => {
      generarNuevaPregunta();
      rondas[rondaActualValue - 3].style.backgroundColor = "green";
    }, 1000);
  } else {
    solucion.style.backgroundColor = "red";
    setTimeout(() => {
      alert("has perdido");
    }, 1000);
  }
};

const comodin50porciento = () => {
  if (respuestaCorrecta === "a") {
    respuesta2.style.visibility = "hidden";
    respuesta3.style.visibility = "hidden";
  } else if (respuestaCorrecta === "b") {
    respuesta1.style.visibility = "hidden";
    respuesta3.style.visibility = "hidden";
  } else if (respuestaCorrecta === "c") {
    respuesta1.style.visibility = "hidden";
    respuesta2.style.visibility = "hidden";
  } else if (respuestaCorrecta === "d") {
    respuesta1.style.visibility = "hidden";
    respuesta2.style.visibility = "hidden";
  }
};

const comodinPublico = () => {
  if (comodinPublicoUsado) {
    alert("Comodín ya usado");
    return;
  }

  let porcentajes = [];
  porcentajes.push(Math.floor(Math.random() * 100 + 1));
  porcentajes.push(Math.floor(Math.random() * (100 - porcentajes[0]) + 1));
  porcentajes.push(
    Math.floor(Math.random() * (100 - (porcentajes[0] + porcentajes[1])) + 1)
  );
  porcentajes.push(100 - (porcentajes[0] + porcentajes[1] + porcentajes[2]));
  porcentajes.sort((a, b) => b - a);

  if (respuestaCorrecta === "a") {
    respuesta1.innerHTML = `${preguntaGenerada.opciones.a} ${porcentajes[0]}%`;
    respuesta2.innerHTML = `${preguntaGenerada.opciones.b} ${porcentajes[1]}%`;
    respuesta3.innerHTML = `${preguntaGenerada.opciones.c} ${porcentajes[2]}%`;
    respuesta4.innerHTML = `${preguntaGenerada.opciones.d} ${porcentajes[3]}%`;
  } else if (respuestaCorrecta === "b") {
    respuesta1.innerHTML = `${preguntaGenerada.opciones.a} ${porcentajes[1]}%`;
    respuesta2.innerHTML = `${preguntaGenerada.opciones.b} ${porcentajes[0]}%`;
    respuesta3.innerHTML = `${preguntaGenerada.opciones.c} ${porcentajes[2]}%`;
    respuesta4.innerHTML = `${preguntaGenerada.opciones.d} ${porcentajes[3]}%`;
  } else if (respuestaCorrecta === "c") {
    respuesta1.innerHTML = `${preguntaGenerada.opciones.a} ${porcentajes[1]}%`;
    respuesta2.innerHTML = `${preguntaGenerada.opciones.b} ${porcentajes[2]}%`;
    respuesta3.innerHTML = `${preguntaGenerada.opciones.c} ${porcentajes[0]}%`;
    respuesta4.innerHTML = `${preguntaGenerada.opciones.d} ${porcentajes[3]}%`;
  } else if (respuestaCorrecta === "d") {
    respuesta1.innerHTML = `${preguntaGenerada.opciones.a} ${porcentajes[1]}%`;
    respuesta2.innerHTML = `${preguntaGenerada.opciones.b} ${porcentajes[2]}%`;
    respuesta3.innerHTML = `${preguntaGenerada.opciones.c} ${porcentajes[3]}%`;
    respuesta4.innerHTML = `${preguntaGenerada.opciones.d} ${porcentajes[0]}%`;
  }

  comodinPublicoUsado = true;
  botonpublico.style.backgroundColor = "red";
};

const comodinSaltarPregunta = () => {
  if (comodinSaltarUsado) {
    alert("Comodín ya usado");
    return;
  }

  generarNuevaPregunta();
  printPregunta();
  comodinSaltarUsado = true;
  botonSaltar.style.backgroundColor = "red";
};

const resetVisibility = () => {
  respuesta4.style.backgroundColor = "white";
  respuesta2.style.backgroundColor = "white";
  respuesta3.style.backgroundColor = "white";
  respuesta1.style.backgroundColor = "white";
  respuesta1.style.visibility = "visible";
  respuesta2.style.visibility = "visible";
  respuesta3.style.visibility = "visible";
  respuesta4.style.visibility = "visible";
  let solucion = document.getElementById("solucion");
  solucion.style.backgroundColor = "black";
};

const calcularRondaActual = () => {
  const rondaActualHTML = document.getElementById("rondaActual");
  rondaActualHTML.innerHTML = rondaActualValue;
};

const calcularPuntuacionActual = () => {
  const puntuacionActualHTML = document.getElementById("puntuacion");
  const puntuacionActualValue = marcador[`pregunta${rondaActualValue}`].valor;
  puntuacionActualHTML.innerHTML = puntuacionActualValue;
};

const plantarse = () => {
  alert("Te has plantado, te llevas " + puntuacionActualValue + " euros");
};

const winCondition = () => {
  if (rondaActualValue === 16) {
    alert("Has ganado 1.000.000 de euros");
  }
};
