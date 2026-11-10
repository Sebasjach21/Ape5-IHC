import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const url = file => pathToFileURL(resolve(file)).href;
const navegador = await chromium.launch({ headless: true });
const resultados = {
  anchos: [],
  interaccion: [],
  diagnostico: {},
  lectorPantalla: 'Pendiente de verificación humana',
  participantes: 'Pendiente de prueba con personas reales'
};

await mkdir('capturas', { recursive: true });
await mkdir('docs', { recursive: true });

try {
  const pagina = await navegador.newPage({ viewport: { width: 360, height: 800 } });
  await pagina.goto(url('prototipo-A.html'));
  resultados.diagnostico = await pagina.evaluate(() => ({
    viewport: innerWidth,
    anchoDocumento: document.documentElement.scrollWidth,
    panelIzquierda: document.querySelector('aside').getBoundingClientRect().left
  }));
  assert.equal(resultados.diagnostico.anchoDocumento, 960);
  assert.equal(resultados.diagnostico.panelIzquierda, 600);
  await pagina.screenshot({ path: 'capturas/boceto-original-360.png' });
  await pagina.close();

  for (const ancho of [320, 360, 768, 1366]) {
    const prueba = await navegador.newPage({ viewport: { width: ancho, height: 900 } });
    await prueba.goto(url('src/index.html'));
    const medidas = await prueba.evaluate(() => {
      const [taller, reserva] = [...document.querySelectorAll('.distribucion > section')]
        .map(elemento => elemento.getBoundingClientRect());
      return {
        ancho: innerWidth,
        anchoDocumento: document.documentElement.scrollWidth,
        columnas: getComputedStyle(document.querySelector('.distribucion')).gridTemplateColumns,
        apiladas: reserva.top >= taller.bottom,
        mismaFila: Math.abs(taller.top - reserva.top) < 1
      };
    });
    assert.ok(medidas.anchoDocumento <= medidas.ancho, `Desborde a ${ancho} px`);
    assert.equal(ancho < 768 ? medidas.apiladas : medidas.mismaFila, true);
    assert.ok(await prueba.locator('#reservar').evaluate(boton => boton.getBoundingClientRect().height >= 44));
    assert.ok(await prueba.locator('#cancelar').evaluate(boton => boton.getBoundingClientRect().height >= 44));
    resultados.anchos.push(medidas);
    await prueba.screenshot({ path: `capturas/interfaz-${ancho}.png`, fullPage: true });
    if (ancho !== 360) {
      await prueba.close();
      continue;
    }

    const estado = () => prueba.evaluate(() => ({
      estado: document.querySelector('#insignia').textContent,
      reservarDeshabilitado: document.querySelector('#reservar').disabled,
      cancelarDeshabilitado: document.querySelector('#cancelar').disabled,
      foco: document.activeElement.id,
      mensaje: document.querySelector('[role="status"]').textContent
    }));
    let actual = await estado();
    assert.equal(actual.estado, 'Disponible');
    assert.equal(actual.reservarDeshabilitado, false);
    assert.equal(actual.cancelarDeshabilitado, true);
    resultados.interaccion.push(actual);

    await prueba.keyboard.press('Tab');
    await prueba.keyboard.press('Tab');
    assert.equal((await estado()).foco, 'reservar');
    assert.equal(await prueba.locator('#reservar').evaluate(boton => boton.matches(':focus-visible')), true);
    for (let ciclo = 0; ciclo < 2; ciclo++) {
      await prueba.keyboard.press('Enter');
      actual = await estado();
      assert.equal(actual.estado, 'Confirmada');
      assert.equal(actual.reservarDeshabilitado, true);
      assert.equal(actual.cancelarDeshabilitado, false);
      assert.equal(actual.foco, 'cancelar');
      resultados.interaccion.push(actual);
      await prueba.locator('#reservar').evaluate(boton => boton.click());
      assert.deepEqual(await estado(), actual);

      await prueba.keyboard.press('Space');
      actual = await estado();
      assert.equal(actual.estado, 'Cancelada');
      assert.equal(actual.reservarDeshabilitado, false);
      assert.equal(actual.cancelarDeshabilitado, true);
      assert.equal(actual.foco, 'reservar');
      resultados.interaccion.push(actual);
    }
    await prueba.close();
  }
  resultados.resultado = 'Todas las comprobaciones automatizadas pasaron';
  await writeFile('docs/resultados-pruebas.json', `${JSON.stringify(resultados, null, 2)}\n`);
  console.log(resultados.resultado);
} finally {
  await navegador.close();
}
