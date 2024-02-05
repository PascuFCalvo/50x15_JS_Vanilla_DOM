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
let tiempo;
let cuentaAtrasTimeout;
let puntuacionActualValue;
let puntuacionActualHTML;
let aciertos = 0;

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
  boton50porciento.style.backgroundColor = "#ff3333";
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

const cuentaAtras = () => {
  tiempo = 60;
  clearTimeout(cuentaAtrasTimeout);
  cuentaAtrasTimeout = setTimeout(() => {
    if (tiempo === 0) return;
    tiempo--;
    cuentaAtras();
  }, 1000);
  if (tiempo === 0) {
    alert("Has perdido");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return;
  }
};

const resetAnimation = () => {
  const bola = document.getElementById("solucionBola");
  bola.style.animation = "none";
  setTimeout(() => {
    bola.style.animation = "crecerAncho 60s linear";
  }, 1);
};

const generarNuevaPregunta = () => {
  winCondition();
  calcularRondaActual();
  calcularPuntuacionActual();
  cuentaAtras();

  resetAnimation();

  resetVisibility();
  generarPregunta();
  printPregunta();

  if (comodinPublicoUsado) {
    const cuerpoGrafico = document.getElementById("bottom").lastChild;
    cuerpoGrafico.remove();
  }

  rondaActualValue++;
  document.getElementById("confirmar").style.display = "block";
  document.getElementById("generarPregunta").style.display = "none";
  document.getElementById("hide-bottom").style.display = "block";
  document.getElementById("barra").style.display = "block";
  document.getElementById("solucionBola").style.display = "block";
  const rondas = Array.from(document.getElementsByClassName("ronda"));
  rondas.forEach((ronda, index) => {
    ronda.style.display = "block";
    ronda.innerHTML = marcador[`pregunta${index + 1}`].valor;
    ronda.style.color = "white";
    ronda.style.textAlign = "end";
  });
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

  respuesta1.innerHTML = "A: " + pregunta.opciones.a;
  respuesta2.innerHTML = "B: " + pregunta.opciones.b;
  respuesta3.innerHTML = "C: " + pregunta.opciones.c;
  respuesta4.innerHTML = "D: " + pregunta.opciones.d;

  respuesta1.addEventListener("click", () => {
    opcionElegida = "a";
    respuesta1.style.backgroundColor = "white";
    respuesta1.style.color = "#313196";
    respuesta2.style.backgroundColor = "#313196";
    respuesta2.style.color = "white";
    respuesta3.style.backgroundColor = "#313196";
    respuesta3.style.color = "white";
    respuesta4.style.backgroundColor = "#313196";
    respuesta4.style.color = "white";
  });
  respuesta2.addEventListener("click", () => {
    opcionElegida = "b";
    respuesta2.style.backgroundColor = "white";
    respuesta2.style.color = "#313196";
    respuesta1.style.backgroundColor = "#313196";
    respuesta1.style.color = "white";
    respuesta3.style.backgroundColor = "#313196";
    respuesta3.style.color = "white";
    respuesta4.style.backgroundColor = "#313196";
    respuesta4.style.color = "white";
  });
  respuesta3.addEventListener("click", () => {
    opcionElegida = "c";
    respuesta3.style.backgroundColor = "white";
    respuesta3.style.color = "#313196";
    respuesta2.style.backgroundColor = "#313196";
    respuesta2.style.color = "white";
    respuesta1.style.backgroundColor = "#313196";
    respuesta1.style.color = "white";
    respuesta4.style.backgroundColor = "#313196";
    respuesta4.style.color = "white";
  });
  respuesta4.addEventListener("click", () => {
    opcionElegida = "d";
    respuesta4.style.backgroundColor = "white";
    respuesta4.style.color = "#313196";
    respuesta2.style.backgroundColor = "#313196";
    respuesta2.style.color = "white";
    respuesta3.style.backgroundColor = "#313196";
    respuesta3.style.color = "white";
    respuesta1.style.backgroundColor = "#313196";
    respuesta1.style.color = "white";
  });
};

const parpadeo = (opcionElegida) => {
  const contador = 10;
  let i = 0;
  let opcion = "";

  if (opcionElegida === "a") {
    opcion = "respuesta1";
  }
  if (opcionElegida === "b") {
    opcion = "respuesta2";
  }
  if (opcionElegida === "c") {
    opcion = "respuesta3";
  }
  if (opcionElegida === "d") {
    opcion = "respuesta4";
  }

  const parpadeoInterval = setInterval(() => {
    if (i % 2 !== 0 && i < contador) {
      document.getElementById(opcion).style.backgroundColor = "green";
    } else {
      document.getElementById(opcion).style.backgroundColor = "#313196";
    }

    i++;

    if (i >= contador * 2) {
      clearInterval(parpadeoInterval);
    }
  }, 200);
};

const checkVictoria = () => {
  let opcion = "";

  if (respuestaCorrecta === "a") {
    opcion = "respuesta1";
  }
  if (respuestaCorrecta === "b") {
    opcion = "respuesta2";
  }
  if (respuestaCorrecta === "c") {
    opcion = "respuesta3";
  }
  if (respuestaCorrecta === "d") {
    opcion = "respuesta4";
  }

  if (opcionElegida === respuestaCorrecta) {
    parpadeo(opcionElegida);
    setTimeout(() => {
      generarNuevaPregunta();

      rondas[rondaActualValue - 3].style.backgroundColor = "goldenrod";
    }, 2000);
    aciertos++;
  } else {
    document.getElementById(opcion).style.backgroundColor = "#ff3333";

    setTimeout(() => {
      alert("has perdido");
    }, 1000);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
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

  const cuerpoGrafico = document.createElement("div");
  cuerpoGrafico.style.display = "flex";
  cuerpoGrafico.style.flexDirection = "column";
  cuerpoGrafico.style.alignItems = "flex-start";
  cuerpoGrafico.style.justifyContent = "space-around";
  cuerpoGrafico.style.width = "400px";
  cuerpoGrafico.style.height = "200px";
  cuerpoGrafico.style.backgroundColor = "#313196";
  cuerpoGrafico.style.border = "2px solid white";
  cuerpoGrafico.style.borderRadius = "10px";
  cuerpoGrafico.style.margin = "2em";

  if (respuestaCorrecta === "a") {
    const resultado1 = document.createElement("div");
    resultado1.style.display = "flex";
    resultado1.style.alignItems = "center";
    const valor1 = document.createElement("p");
    valor1.style.marginLeft = "10px";
    valor1.style.color = "white";
    valor1.innerHTML = `A: ${porcentajes[0]}%`;
    const barra1 = document.createElement("div");
    barra1.style.backgroundColor = "white";
    barra1.style.width = `${porcentajes[0] * 2}px`;
    barra1.style.height = "25px";
    resultado1.appendChild(barra1);
    resultado1.appendChild(valor1);
    cuerpoGrafico.appendChild(resultado1);

    const resultado2 = document.createElement("div");
    resultado2.style.display = "flex";
    resultado2.style.alignItems = "center";
    const valor2 = document.createElement("p");
    valor2.style.marginLeft = "10px";
    valor2.style.color = "white";
    valor2.innerHTML = `B: ${porcentajes[1]}%`;
    const barra2 = document.createElement("div");
    barra2.style.backgroundColor = "white";
    barra2.style.width = `${porcentajes[1] * 2}px`;
    barra2.style.height = "25px";
    resultado2.appendChild(barra2);
    resultado2.appendChild(valor2);

    const resultado3 = document.createElement("div");
    resultado3.style.display = "flex";
    resultado3.style.alignItems = "center";
    const valor3 = document.createElement("p");
    valor3.style.marginLeft = "10px";
    valor3.style.color = "white";
    valor3.innerHTML = `C: ${porcentajes[2]}%`;
    const barra3 = document.createElement("div");
    barra3.style.backgroundColor = "white";
    barra3.style.width = `${porcentajes[2] * 2}px`;
    barra3.style.height = "25px";
    resultado3.appendChild(barra3);
    resultado3.appendChild(valor3);
    cuerpoGrafico.appendChild(resultado3);

    const resultado4 = document.createElement("div");
    resultado4.style.display = "flex";
    resultado4.style.alignItems = "center";
    const valor4 = document.createElement("p");
    valor4.style.marginLeft = "10px";
    valor4.style.color = "white";
    valor4.innerHTML = `D: ${porcentajes[3]}%`;
    const barra4 = document.createElement("div");
    barra4.style.backgroundColor = "white";
    barra4.style.width = `${porcentajes[3] * 2}px`;
    barra4.style.height = "25px";
    resultado4.appendChild(barra4);
    resultado4.appendChild(valor4);
    cuerpoGrafico.appendChild(resultado4);
  } else if (respuestaCorrecta === "b") {
    const resultado1 = document.createElement("div");
    resultado1.style.display = "flex";
    resultado1.style.alignItems = "center";
    const valor1 = document.createElement("p");
    valor1.style.marginLeft = "10px";
    valor1.style.color = "white";
    valor1.innerHTML = `A: ${porcentajes[1]}%`;
    const barra1 = document.createElement("div");
    barra1.style.backgroundColor = "white";
    barra1.style.width = `${porcentajes[1] * 2}px`;
    barra1.style.height = "25px";
    resultado1.appendChild(barra1);
    resultado1.appendChild(valor1);
    cuerpoGrafico.appendChild(resultado1);

    const resultado2 = document.createElement("div");
    resultado2.style.display = "flex";
    resultado2.style.alignItems = "center";
    const valor2 = document.createElement("p");
    valor2.style.marginLeft = "10px";
    valor2.style.color = "white";
    valor2.innerHTML = `B: ${porcentajes[0]}%`;
    const barra2 = document.createElement("div");
    barra2.style.backgroundColor = "white";
    barra2.style.width = `${porcentajes[0] * 2}px`;
    barra2.style.height = "25px";
    resultado2.appendChild(barra2);
    resultado2.appendChild(valor2);
    cuerpoGrafico.appendChild(resultado2);

    const resultado3 = document.createElement("div");

    resultado3.style.display = "flex";
    resultado3.style.alignItems = "center";
    const valor3 = document.createElement("p");
    valor3.style.marginLeft = "10px";
    valor3.style.color = "white";
    valor3.innerHTML = `C: ${porcentajes[2]}%`;
    const barra3 = document.createElement("div");
    barra3.style.backgroundColor = "white";
    barra3.style.width = `${porcentajes[2] * 2}px`;
    barra3.style.height = "25px";
    resultado3.appendChild(barra3);
    resultado3.appendChild(valor3);
    cuerpoGrafico.appendChild(resultado3);

    const resultado4 = document.createElement("div");
    resultado4.style.display = "flex";
    resultado4.style.alignItems = "center";
    const valor4 = document.createElement("p");
    valor4.style.marginLeft = "10px";
    valor4.style.color = "white";
    valor4.innerHTML = `D: ${porcentajes[3]}%`;
    const barra4 = document.createElement("div");
    barra4.style.backgroundColor = "white";
    barra4.style.width = `${porcentajes[3] * 2}px`;
    barra4.style.height = "25px";
    resultado4.appendChild(barra4);
    resultado4.appendChild(valor4);
    cuerpoGrafico.appendChild(resultado4);
  } else if (respuestaCorrecta === "c") {
    const resultado1 = document.createElement("div");
    resultado1.style.display = "flex";
    resultado1.style.alignItems = "center";
    const valor1 = document.createElement("p");
    valor1.style.marginLeft = "10px";
    valor1.style.color = "white";
    valor1.innerHTML = `A: ${porcentajes[1]}%`;
    const barra1 = document.createElement("div");
    barra1.style.backgroundColor = "white";
    barra1.style.width = `${porcentajes[1] * 2}px`;
    barra1.style.height = "25px";
    resultado1.appendChild(barra1);
    resultado1.appendChild(valor1);
    cuerpoGrafico.appendChild(resultado1);

    const resultado2 = document.createElement("div");

    resultado2.style.display = "flex";
    resultado2.style.alignItems = "center";
    const valor2 = document.createElement("p");
    valor2.style.marginLeft = "10px";
    valor2.style.color = "white";
    valor2.innerHTML = `B: ${porcentajes[2]}%`;
    const barra2 = document.createElement("div");
    barra2.style.backgroundColor = "white";
    barra2.style.width = `${porcentajes[2] * 2}px`;
    barra2.style.height = "25px";
    resultado2.appendChild(barra2);
    resultado2.appendChild(valor2);
    cuerpoGrafico.appendChild(resultado2);

    const resultado3 = document.createElement("div");
    resultado3.style.display = "flex";
    resultado3.style.alignItems = "center";
    const valor3 = document.createElement("p");
    valor3.style.marginLeft = "10px";
    valor3.style.color = "white";
    valor3.innerHTML = `C: ${porcentajes[0]}%`;
    const barra3 = document.createElement("div");
    barra3.style.backgroundColor = "white";
    barra3.style.width = `${porcentajes[0] * 2}px`;
    barra3.style.height = "25px";
    resultado3.appendChild(barra3);
    resultado3.appendChild(valor3);
    cuerpoGrafico.appendChild(resultado3);

    const resultado4 = document.createElement("div");

    resultado4.style.display = "flex";
    resultado4.style.alignItems = "center";
    const valor4 = document.createElement("p");
    valor4.style.marginLeft = "10px";
    valor4.style.color = "white";
    valor4.innerHTML = `D: ${porcentajes[3]}%`;
    const barra4 = document.createElement("div");
    barra4.style.backgroundColor = "white";
    barra4.style.width = `${porcentajes[3] * 2}px`;
    barra4.style.height = "25px";
    resultado4.appendChild(barra4);
    resultado4.appendChild(valor4);
    cuerpoGrafico.appendChild(resultado4);
  } else if (respuestaCorrecta === "d") {
    const resultado1 = document.createElement("div");
    resultado1.style.display = "flex";
    resultado1.style.alignItems = "center";
    const valor1 = document.createElement("p");
    valor1.style.marginLeft = "10px";
    valor1.style.color = "white";
    valor1.innerHTML = `A: ${porcentajes[1]}%`;
    const barra1 = document.createElement("div");
    barra1.style.backgroundColor = "white";
    barra1.style.width = `${porcentajes[1] * 2}px`;
    barra1.style.height = "25px";
    resultado1.appendChild(barra1);
    resultado1.appendChild(valor1);
    cuerpoGrafico.appendChild(resultado1);

    const resultado2 = document.createElement("div");
    resultado2.style.display = "flex";
    resultado2.style.alignItems = "center";
    const valor2 = document.createElement("p");
    valor2.style.marginLeft = "10px";
    valor2.style.color = "white";
    valor2.innerHTML = `B: ${porcentajes[2]}%`;
    const barra2 = document.createElement("div");
    barra2.style.backgroundColor = "white";
    barra2.style.width = `${porcentajes[2] * 2}px`;
    barra2.style.height = "25px";
    resultado2.appendChild(barra2);
    resultado2.appendChild(valor2);
    cuerpoGrafico.appendChild(resultado2);

    const resultado3 = document.createElement("div");
    resultado3.style.display = "flex";
    resultado3.style.alignItems = "center";
    const valor3 = document.createElement("p");
    valor3.style.marginLeft = "10px";
    valor3.style.color = "white";
    valor3.innerHTML = `C: ${porcentajes[3]}%`;
    const barra3 = document.createElement("div");
    barra3.style.backgroundColor = "white";
    barra3.style.width = `${porcentajes[3] * 2}px`;
    barra3.style.height = "25px";
    resultado3.appendChild(barra3);
    resultado3.appendChild(valor3);
    cuerpoGrafico.appendChild(resultado3);

    const resultado4 = document.createElement("div");
    resultado4.style.display = "flex";
    resultado4.style.alignItems = "center";
    const valor4 = document.createElement("p");
    valor4.style.marginLeft = "10px";
    valor4.style.color = "white";
    valor4.innerHTML = `D: ${porcentajes[0]}%`;
    const barra4 = document.createElement("div");
    barra4.style.backgroundColor = "white";
    barra4.style.width = `${porcentajes[0] * 2}px`;
    barra4.style.height = "25px";
    resultado4.appendChild(barra4);
    resultado4.appendChild(valor4);
    cuerpoGrafico.appendChild(resultado4);
  }

  const bottom = document.getElementById("bottom");
  setTimeout(() => {
    bottom.appendChild(cuerpoGrafico);
  }, 1000);

  comodinPublicoUsado = true;
  botonpublico.style.backgroundColor = "#ff3333";
};

const comodinSaltarPregunta = () => {
  if (comodinSaltarUsado) {
    alert("Comodín ya usado");
    return;
  }

  generarNuevaPregunta();
  printPregunta();
  comodinSaltarUsado = true;
  botonSaltar.style.backgroundColor = "#ff3333";
};

const resetVisibility = () => {
  respuesta4.style.backgroundColor = "#313196";
  respuesta2.style.backgroundColor = "#313196";
  respuesta3.style.backgroundColor = "#313196";
  respuesta1.style.backgroundColor = "#313196";
  respuesta4.style.color = "white";
  respuesta2.style.color = "white";
  respuesta3.style.color = "white";
  respuesta1.style.color = "white";
  respuesta1.style.visibility = "visible";
  respuesta2.style.visibility = "visible";
  respuesta3.style.visibility = "visible";
  respuesta4.style.visibility = "visible";
};

const calcularRondaActual = () => {
  const rondaActualHTML = document.getElementById("rondaActual");
  rondaActualHTML.innerHTML = rondaActualValue;
};

const calcularPuntuacionActual = () => {
  puntuacionActualHTML = document.getElementById("puntuacion");
  puntuacionActualValue = marcador[`pregunta${rondaActualValue}`].valor;
  puntuacionActualHTML.innerHTML = puntuacionActualValue;
};

const plantarse = () => {
  alert(
    "Te has plantado, te llevas " +
      marcador[`pregunta${aciertos}`].valor +
      " euros"
  );
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const winCondition = () => {
  if (rondaActualValue === 16) {
    alert("Has ganado 1.000.000 de euros");
  }
};
