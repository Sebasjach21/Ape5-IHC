# Ficha de aplicación · Aula Abierta

APE 5 — Fase 1. Pantalla basada en `prototipo-A.html`.

## Equipo y distribución

| Integrante | Parte | Archivos de su aporte |
| --- | --- | --- |
| Julio Jacho | 1. Diagnóstico y ficha del proyecto | docs/proyecto.md |
| Oscar Riofrio | 2. Estructura HTML5 semántica | src/index.html |
| Cristian Ango | 3. Diseño CSS Mobile-First | src/estilos.css |
| Matias Morales | 4. Interacción y verificación | src/reserva.js, docs/pruebas.md |

## Diagnóstico del Boceto A a 360 px

El boceto fija el cuerpo en 960 px y usa columnas de 580 px y 360 px con un espacio de 20 px. El contenido requiere 960 px frente a un viewport de 360 px: hay al menos 600 px de exceso horizontal. Además, el relleno y los bordes de los paneles pueden aumentar el espacio mínimo requerido. El panel «Mi reserva», ubicado en la segunda columna, queda fuera de la vista inicial y requiere desplazamiento horizontal. Se pierde la visibilidad inmediata del estado «Aún no tienes una reserva» y de cualquier confirmación futura. El botón original está deshabilitado y no existe interacción.

## Secuencia de aplicación

**Actor → Tarea → Dato decisivo → Acción principal → Estado final**

Estudiante que busca formación práctica → Reservar un taller → Nombre, día, horario y lugar → Pulsar «Reservar un lugar» → Reserva confirmada y visible en «Mi reserva».

Secuencia alternativa: estudiante con reserva confirmada → Cancelar su participación → Confirmación de la reserva actual → Pulsar «Cancelar reserva» → Reserva cancelada y posibilidad de volver a reservar.

## Requisito y regla de negocio

El estudiante debe consultar los datos del taller y gestionar una reserva desde móvil o escritorio usando ratón o teclado. Solo puede existir **una reserva activa** del taller durante la sesión de la página. Confirmar deshabilita «Reservar un lugar» y habilita «Cancelar reserva». Cancelar invierte la disponibilidad. Este prototipo no tiene servidor, cuentas ni persistencia: recargar vuelve al estado Disponible.

## Criterios de aceptación medibles

1. A 360, 768 y 1366 px, el ancho desplazable del documento no supera su ancho visible.
2. A 360 px hay una columna; desde 768 px hay dos. El taller precede a la reserva en el HTML y en el orden de lectura.
3. En Disponible, reservar está habilitado y cancelar está deshabilitado.
4. Tras una activación con Enter o Espacio, el estado pasa a Confirmada, reservar queda deshabilitado, cancelar habilitado y el foco llega a cancelar.
5. Tras cancelar con teclado, el estado pasa a Cancelada, reservar queda habilitado, cancelar deshabilitado y el foco vuelve a reservar.
6. Repetir confirmación sin cancelar no produce una segunda reserva. Después de cancelar se puede reservar otra vez.
7. Los cambios actualizan una región `role="status"`; el foco de los controles tiene un indicador visible.

## Decisión HCI justificada

Se coloca primero la información necesaria para decidir y luego el estado de la tarea. En móvil los paneles se apilan sin ocultar información; en escritorio se muestran en paralelo desde 48rem. El texto explícito Disponible/Confirmada/Cancelada evita depender del color. Los botones nativos conservan la interacción habitual con teclado. Al deshabilitar el botón usado se mueve el foco al botón disponible para continuar la tarea sin perder la ubicación. La región de estado permite anunciar la actualización sin cambiar el foco al mensaje.

## Hipótesis para la Fase 2

**Hipótesis propuesta, pendiente de revisión real entre pares:** a 360 px, el panel de reserva queda debajo del taller y algunos participantes podrían tardar en identificar la confirmación. El traslado del foco a cancelar podría ayudar a localizarla.

Validación propuesta: pedir a cinco compañeros que reserven y cancelen con teclado a 360 px. Registrar tiempo para identificar la confirmación, errores y desplazamientos. Criterio inicial: al menos cuatro de cinco identifican el estado correcto en menos de cinco segundos tras cada acción, sin ayuda. Registrar los resultados reales en la Fase 2; no se afirma que esta revisión ya se realizó.

## Evidencia y entrega

Al integrar los aportes del equipo, se incorporarán las capturas preliminares en `capturas/`: móvil a 360 px y escritorio a 1366 px. El informe breve se agregará en `docs/` y la comprobación adicional a 768 px se registrará en `docs/pruebas.md`. Esos archivos quedan pendientes y no forman parte de este aporte de documentación.

Repositorio del grupo: https://github.com/Sebasjach21/Ape5-IHC. En «Texto en línea» se utilizará este enlace una vez publicados los commits del equipo.
