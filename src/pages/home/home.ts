// Importar Bootstrap CSS y JS como módulo ESM
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';   // 👈 esto es suficiente
import '../../appTypes'

document.addEventListener('DOMContentLoaded', () => {

  console.log('Home page loaded');  
  const btn = document.getElementById('btnHome');

    btn?.addEventListener('click', async () => {
      console.log('Hogin clickeado');
      await window.appNav.toLogin();
    });
  });