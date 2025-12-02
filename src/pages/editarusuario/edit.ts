// Importar Bootstrap CSS y JS como módulo ESM
import 'bootstrap/dist/css/bootstrap.min.css';
import './edit.css';   // 👈 esto es suficiente
import '../../appTypes'
import 'bootstrap'

document.addEventListener('DOMContentLoaded', async () => {
  interface User {
    id: number;
    name: string;
    email: string;
    status: number;
  }

  // Obtener el ID del usuario desde los query parameters
  const test = document.getElementById('test') as HTMLButtonElement;
  const params = new URLSearchParams(window.location.search);
  const userId = (params.get('userId'));
  const formContainer = document.getElementById('edit-form-container');
  const nameInput = document.getElementById('nameInput') as HTMLInputElement;
  const emailInput = document.getElementById('emailInput') as HTMLInputElement;
  const guardarBtn = document.getElementById('guardarBtn') as HTMLButtonElement;
  const cancelarBtn = document.getElementById('cancelarBtn') as HTMLButtonElement;

  if (!userId) {
    if (formContainer) formContainer.innerText = 'Error: No se especificó un usuario';
    return;
  }

  // Cargar datos del usuario
  async function cargarUsuario() {
    try {
      const res = await window.http.get(`http://localhost:3001/get-users`);
      
      // Normalizar respuesta
      let allUsers: User[] = [];
      if (res && typeof res === 'object' && ('ok' in res || 'status' in res)) {
        if (res.ok === false) throw new Error(`HTTP error ${res.status}`);
        allUsers = Array.isArray(res.body) ? res.body : (Array.isArray(res.data) ? res.data : []);
      } else {
        allUsers = Array.isArray(res) ? res : [];
      }

      // Encontrar el usuario por ID
      const user = allUsers.find(u => u.id === Number(userId));
      
      if (!user) {
        if (formContainer) formContainer.innerText = 'Usuario no encontrado';
        return;
      }

      // Llenar el formulario con los datos del usuario
      if (nameInput) nameInput.value = user.name;
      if (emailInput) emailInput.value = user.email;
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      if (formContainer) formContainer.innerText = 'Error al cargar los datos del usuario';
    }
  }

  // Guardar cambios
  guardarBtn?.addEventListener('click', async () => {
    try {
        const name = nameInput?.value?.trim();
        const email = emailInput?.value?.trim();

        if (!name || !email) {
            alert('Por favor completa todos los campos');
            return;
        }

  const res = await window.http.put(`http://localhost:3001/update-user/${userId}`, 
   { name, email },  // 👈 El body se envía directamente como string
  {
    headers: { 'Content-Type': 'application/json' }
  }
);
3
// leer respuesta JSON
const updatedUser = await res.json();  // 👈 así obtienes el body real

// Verificar si la respuesta es válida
if (!res.ok) {
  alert(`Error: ${updatedUser.error || 'No se pudo actualizar'}`);
  return;
}

alert('Usuario actualizado exitosamente');
await window.appNav.toAdmin();
    } catch (error) {
        console.error('Usuario actualizado exitosamente:', error);
        alert('Usuario actualizado exitosamente');
    }
  });

  // Cancelar edición
  cancelarBtn?.addEventListener('click', async () => {
    await window.appNav.toAdmin();
  });

  cargarUsuario();
});