# APE 5 · Ficha de aplicación de Aula Abierta

Grupo 3, FISEI, carrera de Software, Universidad Técnica de Ambato. Pantalla estudiada: consulta de un taller y gestión de una reserva. Repositorio: https://github.com/Sebasjach21/Ape5-IHC.

| Integrante | Responsabilidad en esta entrega |
| --- | --- |
| Oscar Riofrio, coordinador (@AdrianMora8) | Planificación y defensa del trabajo |
| Julio Jacho, propietario del repositorio (@Sebasjach21) | Boceto A y estructura HTML |
| Cristian Ango (@CristianDDGA) | Estilos adaptativos e interacción |
| Matias Morales (@MatiusJBG) | Pruebas, capturas y resultados |

## Diagnóstico del boceto A

El archivo `prototipo-A.html` representa la versión de escritorio con un cuerpo fijo de 960 px. Sus columnas miden 580 px y 360 px, separadas por 20 px. En una ventana de 360 px, el documento conserva 960 px de ancho: hay 600 px de exceso horizontal. El panel «Mi reserva» empieza en la coordenada horizontal 600 px, fuera de la primera pantalla. El estudiante no ve inmediatamente si tiene una reserva. El botón del boceto está deshabilitado y no permite terminar la tarea. La captura `capturas/boceto-original-360.png` muestra ese problema.

## Ficha de aplicación

| Elemento | Definición para Aula Abierta |
| --- | --- |
| Actor | Estudiante que desea participar en un taller práctico |
| Tarea principal | Consultar el taller y reservar un lugar |
| Dato clave para decidir | Nombre del taller, día, horario y lugar |
| Acción principal | Activar «Reservar un lugar» |
| Resultado visible | Insignia «Confirmada» y mensaje con los datos de la reserva en «Mi reserva» |
| Corrección o cancelación | Activar «Cancelar reserva»; aparece «Cancelada» y se puede reservar de nuevo |

Secuencia principal: estudiante → consulta datos → reserva → ve confirmación. Secuencia reversible: estudiante con reserva → cancela → ve cancelación → puede volver a reservar.

## Regla de interacción

Solo puede haber una reserva activa durante la sesión de la página. Al confirmar, `src/interaccion.js` cambia el estado a `confirmada`, deshabilita el botón de reserva, habilita cancelar y mueve el foco a ese control. Una segunda activación de reservar no crea otra reserva. Al cancelar, el estado pasa a `cancelada`, se invierten los botones y el foco vuelve a reservar. Recargar reinicia el estado a `disponible`; el prototipo no usa cuentas, servidor ni almacenamiento.

## Criterios de aceptación

1. A 320, 360, 768 y 1366 px, `document.documentElement.scrollWidth <= innerWidth`.
2. A 320 y 360 px, los paneles ocupan una columna; desde 768 px se presentan en dos columnas. El taller precede a «Mi reserva» en el HTML y en el recorrido con Tab.
3. Los botones tienen al menos 44 px de alto y muestran un indicador de foco al usar teclado.
4. En «Disponible», reservar está habilitado y cancelar deshabilitado.
5. Enter sobre reservar muestra «Confirmada», bloquea reservar, habilita cancelar y deja el foco en cancelar.
6. Espacio sobre cancelar muestra «Cancelada», habilita reservar, bloquea cancelar y devuelve el foco a reservar.
7. Dos ciclos completos funcionan sin reservas duplicadas. El mensaje cambia dentro de `p[role="status"]`.

## Decisiones HCI y límite de la evidencia

La información del taller precede a la acción, por lo que el estudiante puede decidir con los datos visibles. La versión móvil apila los paneles sin cambiar el orden de lectura. Las etiquetas textuales comunican el estado sin depender del color. Los botones nativos admiten Tab, Enter y Espacio; el foco visible y su traslado explícito mantienen la continuidad de la tarea. La región de estado permite anunciar el resultado con tecnologías de apoyo.

La prueba automatizada comprueba distribución, desborde, estados, duplicados y foco. La comprensión de la confirmación, el anuncio efectivo de un lector de pantalla y la facilidad de uso requieren observación humana. No se atribuyen resultados a participantes sin haber realizado esa prueba.
