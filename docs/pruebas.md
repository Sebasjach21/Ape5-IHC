# Verificación · Fase 1

## Comprobaciones manuales reproducibles

1. Abrir `src/index.html` en un navegador y activar el modo adaptable.
2. Probar anchos de 360, 768 y 1366 px. Verificar que no hay desplazamiento horizontal. En la consola: `document.documentElement.scrollWidth <= document.documentElement.clientWidth` debe devolver `true`.
3. A 360 px el panel de reserva aparece debajo del taller. A 768 y 1366 px aparece a su derecha.
4. Recargar: estado Disponible, reservar habilitado, cancelar deshabilitado.
5. Usar Tab hasta «Reservar un lugar» y Enter: estado Confirmada, reservar deshabilitado y foco visible sobre cancelar.
6. Usar Espacio sobre cancelar: estado Cancelada y foco en reservar. Volver a reservar y cancelar para comprobar un segundo ciclo.
7. Inspeccionar la región de estado y comprobar que su texto cambia sin retirar `role="status"`.
8. Con un lector de pantalla, comprobar el anuncio del mensaje actualizado. Esta comprobación requiere una revisión humana y no se da por realizada con una prueba del DOM.

Las mediciones automatizadas disponibles se guardan en `resultados-pruebas.json`. No sustituyen la revisión entre pares ni una evaluación completa con lector de pantalla.
