# Aula Abierta · APE 5

Práctica del Grupo 3 de Interacción Humano-Computador, FISEI, Universidad Técnica de Ambato. La pantalla permite consultar el taller «Interfaces web accesibles», reservar un lugar y cancelar la reserva. Oscar Riofrio coordina el grupo y Julio Jacho es propietario del repositorio.

## Abrir y probar

1. Abrir `src/index.html` en un navegador para usar la interfaz. `prototipo-A.html` conserva el boceto de escritorio para comparar el problema a 360 px.
2. Instalar Node.js y ejecutar `npm ci` desde la raíz del repositorio.
3. Instalar el navegador de pruebas con `npx playwright install chromium`.
4. Ejecutar `npm test`. Se actualizan `docs/resultados-pruebas.json` y las imágenes de `capturas/`.

La prueba automatizada mide 320, 360, 768 y 1366 px y recorre dos veces confirmar y cancelar con teclado. La evaluación con participantes y lector de pantalla sigue pendiente.

## Entregables

| Archivo | Contenido |
| --- | --- |
| `docs/proyecto.md` | Diagnóstico, ficha, regla y criterios de aceptación |
| `src/index.html`, `src/estilos.css`, `src/interaccion.js` | Versión B adaptativa y funcional |
| `docs/pruebas.md` | Tabla técnica, checklist y registro para participantes reales |
| `docs/preguntas.md` | Respuestas para la defensa QA/UX |
| `docs/Ape5.pdf` | Informe académico previo; contiene rutas y mediciones de una versión anterior |
