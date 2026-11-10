# Pruebas de Aula Abierta

## Reproducción

Desde la raíz del repositorio, ejecutar `npm ci`, `npx playwright install chromium` y `npm test`. El script usa Chromium, genera las capturas en `capturas/` y actualiza `docs/resultados-pruebas.json`. No requiere iniciar Chrome por separado. La medición se hizo con Chromium headless y viewport de escritorio ajustado a cada ancho.

## Resultados técnicos automatizados

| Viewport (px) | `innerWidth` (px) | `scrollWidth` (px) | Desborde (px) | Distribución | Resultado |
| ---: | ---: | ---: | ---: | --- | --- |
| 320 | 320 | 320 | 0 | Una columna | Pasa |
| 360 | 360 | 360 | 0 | Una columna | Pasa |
| 768 | 768 | 768 | 0 | Dos columnas | Pasa |
| 1366 | 1366 | 1366 | 0 | Dos columnas | Pasa |

En el boceto A a 360 px, `scrollWidth` fue 960 px y «Mi reserva» comenzó a 600 px del borde izquierdo. En la versión B, el script comprobó dos ciclos de reserva y cancelación: Enter confirmó, Espacio canceló, el botón inactivo impidió duplicados y el foco pasó al botón disponible.

## Checklist de revisión

| Comprobación | Estado |
| --- | --- |
| Sin desplazamiento horizontal a 320, 360, 768 y 1366 px | Verificado automáticamente |
| Una columna en móvil y dos desde 48rem | Verificado automáticamente |
| Estado inicial y dos ciclos completos con teclado | Verificado automáticamente |
| Bloqueo de reserva duplicada y traslado del foco | Verificado automáticamente |
| Selector `:focus-visible` activo y botones de al menos 44 px | Verificado automáticamente; inspección visual de capturas pendiente |
| Anuncio real con lector de pantalla | Pendiente de verificación humana |
| Comprensión del estado con participantes | Pendiente de prueba con personas reales |

## Prueba de usabilidad con participantes reales

La tabla es un instrumento de registro, no un resultado. No hay participantes observados en este repositorio. Pedir a cinco compañeros que reserven, identifiquen la confirmación y cancelen a 360 px. Medir desde cada activación hasta que expresen correctamente el estado; anotar errores y solicitudes de ayuda. Repetir una vez con teclado. Criterio inicial: al menos cuatro de cinco identifican el estado correcto en menos de cinco segundos después de cada acción, sin ayuda.

| Participante | Tiempo para identificar confirmación (s) | Tiempo para identificar cancelación (s) | Errores | Solicitudes de ayuda | Dificultades observadas |
| --- | ---: | ---: | ---: | ---: | --- |
| P1 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| P2 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| P3 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| P4 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |
| P5 | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente |

Registrar también dispositivo, navegador, modalidad de entrada y si hubo desplazamiento para encontrar «Mi reserva». Con un lector de pantalla, comprobar por separado que se anuncian la confirmación y la cancelación.

## Conclusiones respaldadas por las mediciones

El boceto fijo requiere 600 px más que la ventana móvil de 360 px y deja el resumen de reserva fuera de la vista inicial. La versión B elimina el desborde en los cuatro anchos medidos, conserva el orden de lectura y completa dos ciclos de reserva y cancelación con teclado. Estos resultados prueban funcionamiento y ajuste visual en el navegador utilizado. La facilidad para reconocer el estado y la calidad del anuncio con lector de pantalla permanecen abiertas hasta realizar las sesiones humanas indicadas.
