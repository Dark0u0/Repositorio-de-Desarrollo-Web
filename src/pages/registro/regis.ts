// Importar Bootstrap CSS y JS como módulo ESM
import 'bootstrap/dist/css/bootstrap.min.css';
import './regis.css';   // 👈 esto es suficiente
import '../../appTypes'
import 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
  
  const btnLogi = document.getElementById('btnBackmainpg');

  btnLogi?.addEventListener('click', async () => {
    console.log('Login clickeado');
    await window.appNav.toLogin();
  });

  console.log('pagina de registro iniciada');
  const btn = document.getElementById('btnRegisterUser');
  const userRegister = (document.getElementById('inputUser') as HTMLInputElement);
  const emailRegister = (document.getElementById('inputEmail') as HTMLInputElement);
  const passwordRegister = (document.getElementById('inputPassword') as HTMLInputElement);
  const phoneRegister = (document.getElementById('inputNumber') as HTMLInputElement);
  
  btn?.addEventListener('click', async () => {
      const name = userRegister?.value?.trim()?? '';
      const email = emailRegister?.value?.trim()?? '';
      const password = passwordRegister?.value ?? '';
      const phone = phoneRegister?.value ?? '';
      const status = 1;

      if (!name || !email || !password || !phone) {
      showAlert('Completa todos los campos', 'danger');
      return;
      }
      if (password.length < 8) {
        showAlert('La contraseña debe tener al menos 6 caracteres', 'danger');
        return;
      }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
      showAlert('Email inválido', 'danger');
      return; 
      }

      try {
      const res = await window.http.post('http://localhost:3001/create-user', {
        name,
        email,
        password: password,
        phone,
        status: status
      });

      if (!res.ok) {
        const err = res.body?.error || `Error ${res.status}`;
        showAlert(err, 'danger');
        console.error('Error en la petición', res);
      } else {
        showAlert('Registro exitoso', 'success');
        await window.appNav.toLogin();
      }
    } catch (e) {
      console.error(e);
      showAlert('Error de red. Intenta de nuevo.', 'danger');
    }
    });

    function showAlert(message: string, type = 'info') {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 3000);
}

});