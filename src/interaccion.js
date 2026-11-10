"use strict";

const reservar = document.querySelector("#reservar");
const cancelar = document.querySelector("#cancelar");
const estadoReserva = document.querySelector("#estado-reserva");
const insignia = document.querySelector("#insignia");
let estado = "disponible";

reservar.addEventListener("click", () => {
  if (estado === "confirmada") return;
  estado = "confirmada";
  insignia.dataset.estado = estado;
  insignia.textContent = "Confirmada";
  estadoReserva.textContent = "Reserva confirmada para Interfaces web accesibles. Jueves, de 14:00 a 16:00, en Laboratorio 2.";
  reservar.disabled = true;
  cancelar.disabled = false;
  cancelar.focus();
});

cancelar.addEventListener("click", () => {
  if (estado !== "confirmada") return;
  estado = "cancelada";
  insignia.dataset.estado = estado;
  insignia.textContent = "Cancelada";
  estadoReserva.textContent = "Reserva cancelada. Ya no tienes una reserva activa. Puedes volver a reservar un lugar.";
  cancelar.disabled = true;
  reservar.disabled = false;
  reservar.focus();
});
