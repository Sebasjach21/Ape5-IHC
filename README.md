# Ape5-IHC

APE 5 · Fase 1. Proyecto **Aula Abierta**: interfaz adaptable para reservar y cancelar la participación en un taller.

## Estructura

```text
.github/    Automatizaciones y plantilla de pull request
docs/       Ficha de aplicación, informe y verificación
src/        HTML, CSS y JavaScript
capturas/   Evidencia de móvil y escritorio
```

## Responsables

| Responsable | Rama | Archivos de su parte |
| --- | --- | --- |
| Julio Jacho | `aporte/julio-jacho` | `docs/proyecto.md` |
| Oscar Riofrio | `aporte/oscar-riofrio` | `src/index.html` |
| Cristian Ango | `aporte/cristian-ango` | `src/estilos.css` |
| Matias Morales | `aporte/matias-morales` | `src/reserva.js`, `docs/pruebas.md` |

El aporte de Julio se encuentra en su rama hasta que se revise y fusione su PR. Las demás ramas quedan listas para que sus responsables agreguen sus archivos. No se incluyen carpetas personales.

## Issues, ramas y pull requests

Al publicar `main`, el workflow **Preparar equipo** crea cuatro issues y las ramas que falten. No duplica issues con el mismo título ni reemplaza ramas existentes. Los responsables se identifican por nombre en el título y el contenido; para asignar cuentas es necesario conocer sus usuarios de GitHub.

Al subir cambios a una rama `aporte/...`, **Abrir PR de aporte** compara su contenido con `main`. Si hay diferencias, crea un PR o mantiene el que ya esté abierto. El PR enlaza el issue correspondiente y lo cierra al fusionarse. No fusiona ni aprueba cambios automáticamente.

### Activación en GitHub

1. Publicar `main` y revisar **Actions → Preparar equipo** para comprobar la creación de issues y ramas.
2. En **Settings → Actions → General → Workflow permissions**, activar **Allow GitHub Actions to create and approve pull requests**. Aunque el permiso menciona aprobación, estos workflows solo crean PR.
3. Publicar la rama de Julio. Los compañeros podrán subir sus cambios a sus propias ramas.

Ambos workflows también permiten ejecución manual desde **Actions → Run workflow**. Para abrir el PR manualmente con el workflow, seleccionar la rama del aporte. Si la cuenta u organización bloquea el permiso anterior, GitHub seguirá mostrando la comparación para crear el PR en la web al publicar una rama con cambios.

```powershell
git push -u origin main
git push -u origin aporte/julio-jacho
```

Repositorio: https://github.com/Sebasjach21/Ape5-IHC
