// Importar Bootstrap CSS y JS como módulo ESM
import 'bootstrap/dist/css/bootstrap.min.css';
import './princi.css';   // 👈 esto es suficiente
import '../../appTypes'
import 'bootstrap'
document.addEventListener('DOMContentLoaded', () => {

  console.log('Home page loaded');  
  const btn = document.getElementById('btnAdminuser');

    btn?.addEventListener('click', async () => {
      console.log('Hogin clickeado');
      await window.appNav.toAdmin();
    });
  });

  // Guarda el tipo correcto para el timer (Node o Browser)
let alarmTimer: ReturnType<typeof setTimeout> | null = null;

const timeInput = document.getElementById("alarmInput") as HTMLInputElement;
const startBtn = document.getElementById("startAlarm") as HTMLButtonElement;
const stopBtn = document.getElementById("stopAlarm") as HTMLButtonElement;
const msg = document.getElementById("alertMsg") as HTMLElement;
const box = document.getElementById("alarmBox") as HTMLElement;

startBtn.addEventListener("click", () => {
  const sec = parseInt(timeInput.value, 10);

  if (!sec || sec < 1) {
    msg.textContent = "agregue un valor valido";
    return;
  }

  // Resetea si había alarma previa
  if (alarmTimer) clearTimeout(alarmTimer);

  box.style.background = "lightgray";

  msg.textContent = `La alarma sonara en ${sec} segundos`;

  alarmTimer = setTimeout(() => {
    msg.textContent = "Alarma sonando";
     box.style.background = "limegreen";
  }, sec * 1000);
});

stopBtn.addEventListener("click", () => {
  if (alarmTimer) {
    clearTimeout(alarmTimer);
    alarmTimer = null;
    msg.textContent = "Alarma apagada";
    box.style.background = "lightskyblue";
  } else {
    msg.textContent = "Sin alarma que detener";
  }
});
