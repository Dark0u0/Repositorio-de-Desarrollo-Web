// Importar Bootstrap CSS y JS como módulo ESM
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';   // 👈 esto es suficiente
import '../../appTypes'
import 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
  
  const btnLogi = document.getElementById('btnBackmainpg');

  btnLogi?.addEventListener('click', async () => {
    console.log('Login clickeado');
    await window.appNav.toLogin();
  });

  console.log('pagina de sesion iniciada');
  const btn = document.getElementById('btnCheckLogin');
  const emailInput = (document.getElementById('inputEmail') as HTMLInputElement);
  const passwordInput = (document.getElementById('inputPassword') as HTMLInputElement);


  btn?.addEventListener('click', async () => {
    console.log('Login clickeado');
    const res = await window.http.post('http://localhost:3001/user-login', {
      email: emailInput.value,
      password: passwordInput.value
    });

    console.log(res);
    
    if (!res.ok){
  showAlert('Usuario o contraseña incorrectos. Intenta nuevamente.', 'danger');
} else {
  showAlert('¡Bienvenido! Iniciaste sesión correctamente.', 'success');
  await window.appNav.toPrincipal();
}

      }
    );
        // Navegar a la ventana principal (home)
        // window.appNav.toHome();

// Función para mostrar alertas en pantalla
function showAlert(message: string, type = 'info') {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;

  document.body.appendChild(alertBox);

  // Desaparecer después de 3 segundos
  setTimeout(() => alertBox.remove(), 3000);
}


    //funcion para disparar alertas
  });
