// animacion cargar pag
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 1s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
// animacion click
const botones = document.querySelectorAll(".btn");

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    boton.style.transform = "scale(0.95)";
    setTimeout(() => {
      boton.style.transform = "scale(1)";
    }, 150);
  });
});

// animacion cards
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});
//trans paginas
const enlaces = document.querySelectorAll("a");

enlaces.forEach(enlace => {
  enlace.addEventListener("click", function (e) {
    const destino = this.href;

    if (destino && !destino.includes("#")) {
      e.preventDefault();
      document.body.classList.add("fade-out");

      setTimeout(() => {
        window.location.href = destino;
      }, 600);
    }
  });
});

//brillibrilli
const elementosGlow = document.querySelectorAll(".btn, .card");

elementosGlow.forEach(el => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("glow");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("glow");
  });
});

// respiracion botns
setInterval(() => {
  document.querySelectorAll(".btn").forEach(btn => {
    btn.style.transform = "scale(1.03)";
    setTimeout(() => {
      btn.style.transform = "scale(1)";
    }, 600);
  });
}, 4000);
//hologramas
const hologramas = document.querySelectorAll(".card, img, video");

hologramas.forEach(holo => {
  holo.addEventListener("mousemove", e => {
    const rect = holo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    holo.style.transform = `
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
    holo.style.filter = "brightness(1.1)";
  });

  holo.addEventListener("mouseleave", () => {
    holo.style.transform = "rotateX(0) rotateY(0) scale(1)";
    holo.style.filter = "brightness(1)";
  });
});
//gatito
const hoverSound = new Audio("Media/Sonidos/meow.mp3");
hoverSound.volume = 0.2;

// elementos con sonido
const elementosSonido = document.querySelectorAll("a, .btn, .card");

elementosSonido.forEach(el => {
  el.addEventListener("mouseenter", () => {
    hoverSound.currentTime = 0;
    hoverSound.play();
  });
});

// Sonidos y modo noche consolidado
const sonidoNocheOn = new Audio("Media/Sonidos/búho.mp3");
const sonidoNocheOff = new Audio("Media/Sonidos/gallo.mp3");

sonidoNocheOn.volume = 0.25;
sonidoNocheOff.volume = 0.25;

// Suavizar transicion
document.body.style.transition = "background-color 0.8s ease, color 0.8s ease";

const btnModoNoche = document.getElementById("modoNocheBtn");

// Cargar estado guardado
if (localStorage.getItem("modoNoche") === "true") {
  activarModoNoche(false);
}

if (btnModoNoche) {
  btnModoNoche.addEventListener("click", () => {
    if (localStorage.getItem("modoNoche") === "true") {
      desactivarModoNoche();
    } else {
      activarModoNoche(true);
    }
  });
}

function activarModoNoche(reproducirSonido) {
  if (reproducirSonido) sonidoNocheOn.play();

  document.body.style.backgroundColor = "#1c1c1c";
  document.body.style.color = "#FFE9EF";

  document.querySelectorAll(".navbar, footer").forEach(el => {
    el.style.transition = "background-color 0.8s ease";
    el.style.backgroundColor = "#2a2a2a";
  });

  document.querySelectorAll(".card").forEach(card => {
    card.style.transition = "background-color 0.8s ease, color 0.8s ease";
    card.style.backgroundColor = "#333";
    card.style.color = "#FFE9EF";
  });

  document.querySelectorAll("a").forEach(a => {
    a.style.transition = "color 0.8s ease";
    a.style.color = "#FF9CB5";
  });

  if (btnModoNoche) btnModoNoche.innerText = "☀️ Modo día";
  localStorage.setItem("modoNoche", "true");
}

function desactivarModoNoche() {
  sonidoNocheOff.play();
  localStorage.setItem("modoNoche", "false");

  // transicion vuelta
  document.body.style.opacity = "0";
  setTimeout(() => {
    location.reload();
  }, 600);
}

document.addEventListener("keydown", (e) => {
  const etiqueta = document.activeElement.tagName.toLowerCase();
  if (etiqueta === "input" || etiqueta === "textarea") return;

  if (e.key === "n" || e.key === "N") {
    if (localStorage.getItem("modoNoche") === "true") {
      desactivarModoNoche();
    } else {
      activarModoNoche(true);
    }
  }
});
