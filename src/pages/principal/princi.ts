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