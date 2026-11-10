# Defensa QA/UX de Aula Abierta

## ¿Qué cambia al cruzar 48rem y por qué Tab conserva el orden?

En `src/estilos.css`, `.distribucion` parte de `grid-template-columns: minmax(0, 1fr)`: una columna. La regla `@media (min-width: 48rem)` cambia solo la presentación a `minmax(0, 1.6fr) minmax(0, 1fr)`. Con el tamaño de fuente raíz habitual de 16 px, el cambio se produce a 768 px. Los elementos no se reordenan con `order`, `grid-area` ni posiciones absolutas. En `src/index.html`, la sección del taller precede a la sección «Mi reserva», de modo que el orden de lectura y Tab sigue el DOM. El enlace «Saltar al contenido» se encuentra antes del botón de reservar.

## ¿Cómo se evitan acciones repetidas y dónde queda el foco?

`src/interaccion.js` comprueba `estado` antes de cambiarlo. Al reservar, fija `confirmada`, deshabilita `#reservar`, habilita `#cancelar` y ejecuta `cancelar.focus()`. Un clic programático adicional sobre reservar deja el estado sin cambios. Al cancelar, fija `cancelada`, deshabilita cancelar, habilita reservar y ejecuta `reservar.focus()`. Los botones HTML nativos admiten Enter y Espacio, y `:focus-visible` muestra dónde continúa la interacción. El texto de `#estado-reserva` cambia dentro de una región con `role="status"` y `aria-live="polite"`.

## «Sin desborde» no implica comprensión del estado

`scrollWidth <= innerWidth` demuestra que el contenido cabe horizontalmente; no prueba que la persona vea, encuentre o entienda la confirmación. A 320 y 360 px, «Mi reserva» aparece debajo del taller. Después de activar reservar, el foco pasa a cancelar, lo que ayuda a ubicar el panel, pero el efecto real sobre la comprensión debe observarse. Las etiquetas «Confirmada» y «Cancelada» y los mensajes explícitos reducen la ambigüedad, mientras que la prueba con participantes mide si reconocen el resultado sin ayuda y cuánto tardan. También se requiere una prueba humana con lector de pantalla para comprobar el anuncio efectivo.
