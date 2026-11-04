// Verificación con el protocolo DevTools de Chrome, sin dependencias externas.
// Iniciar Chrome con --headless=new --remote-debugging-port=9227.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';

const tabs = await (await fetch('http://127.0.0.1:9227/json')).json();
const tab = tabs.find(t => t.type === 'page');
const socket = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise((ok, fail) => { socket.onopen = ok; socket.onerror = fail; });
let sequence = 0;
const pending = new Map();
socket.onmessage = ({ data }) => {
  const message = JSON.parse(data);
  if (!message.id) return;
  const entry = pending.get(message.id);
  if (!entry) return;
  pending.delete(message.id);
  message.error ? entry.reject(new Error(JSON.stringify(message.error))) : entry.resolve(message.result);
};
function cdp(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await cdp('Runtime.evaluate', { expression, returnByValue: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function navigate(file) {
  await cdp('Page.navigate', { url: pathToFileURL(resolve(file)).href });
  for (let i = 0; i < 100; i++) {
    if (await evaluate('document.readyState === "complete" && location.href !== "about:blank"')) break;
    await new Promise(r => setTimeout(r, 50));
  }
  await new Promise(r => setTimeout(r, 150));
}
await cdp('Page.enable');
await cdp('Emulation.setFocusEmulationEnabled', { enabled: true });
await mkdir('entrega-completa/capturas', { recursive: true });
const results = { anchos: [], interaccion: [], diagnostico: {}, lectorPantalla: 'Pendiente de verificación humana' };
try {
  await cdp('Emulation.setDeviceMetricsOverride', { width: 360, height: 800, deviceScaleFactor: 1, mobile: false });
  await navigate('prototipo-A.html');
  results.diagnostico = await evaluate(`({viewport: innerWidth, anchoDocumento: document.documentElement.scrollWidth, panelIzquierda: document.querySelector('aside').getBoundingClientRect().left})`);
  const original = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile('entrega-completa/capturas/boceto-original-360.png', Buffer.from(original.data, 'base64'));
  for (const width of [360, 768, 1366]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: width === 360 ? 1000 : 900, deviceScaleFactor: 1, mobile: false });
    await navigate('entrega-completa/src/index.html');
    const metrics = await evaluate(`(() => {
      const sections = [...document.querySelectorAll('.distribucion > section')].map(e => e.getBoundingClientRect());
      return { ancho: innerWidth, anchoDocumento: document.documentElement.scrollWidth,
        columnas: getComputedStyle(document.querySelector('.distribucion')).gridTemplateColumns,
        apiladas: sections[1].top >= sections[0].bottom,
        mismaFila: Math.abs(sections[0].top - sections[1].top) < 1 };
    })()`);
    assert.ok(metrics.anchoDocumento <= width, `Desborde a ${width}`);
    assert.ok(width < 768 ? metrics.apiladas : metrics.mismaFila);
    results.anchos.push(metrics);
    const layout = await cdp('Page.getLayoutMetrics');
    const size = layout.cssContentSize;
    const shot = await cdp('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height: Math.ceil(size.height), scale: 1 } });
    await writeFile(`entrega-completa/capturas/interfaz-${width}.png`, Buffer.from(shot.data, 'base64'));
  }
  const snapshot = () => evaluate(`({estado: document.querySelector('#insignia').textContent,
    reservarDeshabilitado: document.querySelector('#reservar').disabled,
    cancelarDeshabilitado: document.querySelector('#cancelar').disabled,
    foco: document.activeElement.id, mensaje: document.querySelector('[role="status"]').textContent})`);
  let current = await snapshot();
  assert.equal(current.estado, 'Disponible');
  assert.equal(current.reservarDeshabilitado, false);
  assert.equal(current.cancelarDeshabilitado, true);
  results.interaccion.push(current);
  for (let i = 0; i < 8; i++) {
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    if ((await snapshot()).foco === 'reservar') break;
  }
  assert.equal((await snapshot()).foco, 'reservar');
  for (let cycle = 0; cycle < 2; cycle++) {
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', text: '\r', windowsVirtualKeyCode: 13 });
    await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    current = await snapshot();
    assert.equal(current.estado, 'Confirmada');
    assert.equal(current.reservarDeshabilitado, true);
    assert.equal(current.cancelarDeshabilitado, false);
    assert.equal(current.foco, 'cancelar');
    results.interaccion.push(current);
    await evaluate("document.querySelector('#reservar').click()");
    assert.deepEqual(await snapshot(), current);
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
    await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
    current = await snapshot();
    assert.equal(current.estado, 'Cancelada');
    assert.equal(current.reservarDeshabilitado, false);
    assert.equal(current.cancelarDeshabilitado, true);
    assert.equal(current.foco, 'reservar');
    results.interaccion.push(current);
  }
  results.resultado = 'Todas las comprobaciones automatizadas pasaron';
  await writeFile('entrega-completa/docs/resultados-pruebas.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await cdp('Browser.close').catch(() => {});
  socket.close();
}
