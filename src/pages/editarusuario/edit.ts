// Importar Bootstrap CSS y módulos
import 'bootstrap/dist/css/bootstrap.min.css';
import './edit.css';
import '../../appTypes';
import 'bootstrap';

// Función para mostrar alertas en UI 
function showAlert(message: string, type = 'info') {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type}`;

  document.body.appendChild(alertBox);

  // temporizador
  setTimeout(() => alertBox.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', async () => {
  interface User {
    id: number;
    name: string;
    email: string;
    status: number;
  }

  // Elementos del DOM
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('userId');
  const formContainer = document.getElementById('edit-form-container');
  const nameInput = document.getElementById('nameInput') as HTMLInputElement;
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const guardarBtn = document.getElementById('saveBtn') as HTMLButtonElement;
  const cancelarBtn = document.getElementById('cancelBtn') as HTMLButtonElement;

  if (!userId) {
    formContainer && (formContainer.innerText = 'Error: No se especificó un usuario');
    return;
  }

  // Cargar usuario
  async function cargarUsuario() {
    try {
      const res = await window.http.get(`http://localhost:3001/get-users`);

      // Normalizar respuesta
      let allUsers: User[] = Array.isArray(res) ? res : (Array.isArray(res.body) ? res.body : []);
      const user = allUsers.find(u => u.id === Number(userId));

      if (!user) {
        formContainer && (formContainer.innerText = 'Usuario no encontrado');
        return;
      }

      nameInput.value = user.name;
      emailInput.value = user.email;
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      showAlert('Error al cargar los datos del usuario', 'danger');
    }
  }

  // Guardar cambios (sin editar lógica)
  guardarBtn?.addEventListener('click', async () => {
    try {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();

      if (!name || !email) {
        showAlert('Completa los campos', 'warning');
        return;
      }

      const res = await window.http.put(
        `http://localhost:3001/update-user/${userId}`,
        { name, email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Leer respuesta JSON 
      const updatedUser = await res.json();

      if (!res.ok) {
        showAlert(`${updatedUser.error || 'No se pudo actualizar'}`, 'danger');
        return;
      }

      showAlert('Usuario actualizado exitosamente', 'success');
      await window.appNav.toAdmin();

    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      showAlert('Usuario actualizado exitosamente', 'warning');
    }
  });

  // Cancelar edición 
  cancelarBtn?.addEventListener('click', async () => {
    await window.appNav.toAdmin();
  });

  cargarUsuario();
});
