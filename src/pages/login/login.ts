// Importar Bootstrap CSS y JS como módulo ESM
import 'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap'
import './login.css';   // 👈 esto es suficiente
import '../../appTypes'

document.addEventListener('DOMContentLoaded', () => {

  //console.log('Login page loaded');  
  const btnLogi = document.getElementById('btnLogin');

  btnLogi?.addEventListener('click', async () => {
    console.log('Login clickeado');
    await window.appNav.toHome();
  });

  const btnRegi = document.getElementById('btnRegister');

  btnRegi?.addEventListener('click', async () => {
    console.log('Resgister clickeado');
    await window.appNav.toRegister();
  });

});


//function showAlert(message: string, type: 'success' | 'danger' = 'success') {
  //alert(message);// Aquí puedes personalizar la forma en que muestras las alertas
//}



//document.addEventListener('DOMContentLoaded', () => {
  
  //console.log('Login page loaded');
  //const btn = document.getElementById('btnLogin');
  //const emailInput = (document.getElementById('inputEmail') as HTMLInputElement);
  //const passwordInput = (document.getElementById('inputPassword') as HTMLInputElement);


  //btn?.addEventListener('click', async () => {
    //console.log('Login clickeado');
    //const res = await window.http.post('http://localhost:3001/user-login', {
    //  email: emailInput.value,
    //  password: passwordInput.value
    //});
  //});

//});
       