// Array que guarda todos los mensajes de la sesion (se pierde al recargar)
const messages = [];

// Agrega un mensaje al array con rol, contenido y marca de tiempo
function addMessage(role, content) {
  messages.push({
    role,
    content,
    ts: new Date().toISOString(), 
  });
}


// Muestra todos los mensajes del array en el DOM con la clase segun el rol
function renderMessages() {
  const container = document.getElementById('messages');
  if (!container) return;

  container.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.role}`;
    div.textContent = msg.content;
    container.appendChild(div);
  });
}

// Hace scroll automatico al final del area de mensajes para ver el ultimo y no se quede arriba
function scrollToBottom() {
  const main = document.querySelector('main');
  if (main) main.scrollTop = main.scrollHeight;
}

// Captura el envio del formulario: agrega mensaje del usuario y respuesta mock
const form = document.getElementById('chat-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    if (!text) return;
    
    addMessage('user', text);
    renderMessages();
    scrollToBottom();
    input.value = '';

    // Respuesta placeholder del personaje (sin IA, se reemplaza en Fase 7)
    setTimeout(() => {
      addMessage('character', 'Bazinga! Soy Sheldon Cooper. (Respuesta de prueba sin IA)');
      renderMessages();
      scrollToBottom();
    }, 600);
  });
}
