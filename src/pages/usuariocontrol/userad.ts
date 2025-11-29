import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './userad.css';
import '../../appTypes.ts';


document.addEventListener('DOMContentLoaded', () => {
  interface User {
      id: number;
      name: string;
      email: string;
      status: number;
  }
  const dataContainer = document.getElementById('data-container');

  async function ObtenerUsers() {
      try {
          const res = await window.http.get('http://localhost:3001/get-users');

          let allUsers: User[] = [];
          if (res && typeof res === 'object' && ('ok' in res || 'status' in res)) {
              if (res.ok === false) throw new Error(`HTTP error ${res.status}`);
              allUsers = Array.isArray(res.body) ? res.body : (Array.isArray(res.data) ? res.data : []);
          } else {
              allUsers = Array.isArray(res) ? res : [];
          }

          // Filtrar usuarios activos
          const activeUsers: User[] = allUsers.filter(u => u.status === 1);
          console.log('Usuarios activos:', activeUsers); // Para depuración

          // renderizar como tarjetas en #user-list
          const list = document.getElementById('user-list');
          if (!list) {
            dataContainer!.innerText = activeUsers.length ? JSON.stringify(activeUsers, null, 2) : 'No hay usuarios activos';
          } else {
            list.innerHTML = ''; // limpiar
            if (activeUsers.length === 0) {
              list.innerHTML = '<div>No hay usuarios activos</div>';
            } else {
              activeUsers.forEach(u => {
                const item = document.createElement('div');
                item.className = 'user-item';
                item.innerHTML = `
                  <div class="user-name">${escapeHtml(u.name)}</div>
                  <div class="user-email">${escapeHtml(u.email)}</div>
                  <div class="user-actions">
                    <button class="editBtn" data-id="${u.id}">Editar</button>
                    <button class="deleteBtn" data-id="${u.id}">Eliminar</button>
                  </div>
                `;
                list.appendChild(item);
              });

              // listener delegado: manejar botones Editar/Eliminar
              (document.getElementById('user-list') as HTMLElement | null)?.addEventListener('click', async (ev) => {
                const target = ev.target as HTMLElement;
                const editBtn = target.closest('.editBtn') as HTMLButtonElement | null;
                const delBtn = target.closest('.deleteBtn') as HTMLButtonElement | null;

                if (editBtn) {
                  const id = editBtn.dataset.id;
                  console.log('Editar usuario id=', id);
                  await window.appNav.toEditUser(id);
                }

                if (delBtn) {
                  const userId = delBtn.dataset.id;
                  const state = 0
                  //const usuario = allUsers.find(u => u.id === Number(userId));
                  const res = await window.http.put(`http://localhost:3001/delete-user/${userId}`, {
                    body: JSON.stringify({ state }),
                    headers: { 'Content-Type': 'application/json' }
                  });
                  
                  // Verificar si la respuesta es válida
                  if (!res.ok) {
                      alert(`Error: ${res.body.error || 'No se pudo borrar el usuario'}`);
                      return; // Salir si hay un error
                  }
                  alert('Usuario eliminado exitosamente');
                }
              });
            }
          }
      } catch (error) {
          console.error('Error fetching data from server:', error);
          if (dataContainer) {
              dataContainer.innerText = 'Error al obtener usuarios';
          }
      }
  }
    ObtenerUsers();
});

function escapeHtml(s: string) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
}