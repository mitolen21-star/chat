// Datos del personaje: unico lugar donde se define, las vistas lo leen de aca
const CHARACTER = {
  name: 'Sheldon Cooper',
  role: 'Fisico teorico de Caltech',
  traits: 'logico, literal, pedante y sin filtro social',
};

// Mapa de rutas: cada URL apunta a una funcion para que muestre lo que corresponde
const routes = {
  '/home': renderHome,
  '/chat': renderChat,
  '/about': renderAbout,
};

// Vista de inicio: bienvenida, descripcion del personaje y boton para ir al chat
function renderHome() {
  document.querySelector('main').innerHTML = `
    <div class="view home-view">
      <h2>Bienvenido a ComicSansCon Chat</h2>
      <p>Chatea con <strong>${CHARACTER.name}</strong>, ${CHARACTER.role}.</p>
      <p>${CHARACTER.traits}.</p>
      <button id="start-chat-btn">Empezar a chatear</button>
    </div>
  `;
  document.querySelector('footer').style.display = 'none';

  document.getElementById('start-chat-btn').addEventListener('click', () => {
    navigate('/chat');
  });
}

// Vista del chat: contenedor de mensajes vacio (la logica va en chat.js)
function renderChat() {
  document.querySelector('main').innerHTML = '<div id="messages"></div>';
  document.querySelector('footer').style.display = '';
}

// Vista acerca de: info del proyecto, del personaje y registro de uso de IA
function renderAbout() {
  document.querySelector('main').innerHTML = `
    <div class="view about-view">
      <h2>Acerca del proyecto</h2>
      <p>SPA de chat que usa inteligencia artificial (Google Gemini) para simular una conversacion con <strong>${CHARACTER.name}</strong>.</p>
      <p>Desarrollado para ComicSansCon, agencia digital ficticia, como proyecto integrador academico.</p>
      <h3>Personaje</h3>
      <p><strong>${CHARACTER.name}</strong> — ${CHARACTER.role}. ${CHARACTER.traits}.</p>
      <h3>Registro de uso de IA</h3>
      <p>Gemini API actua como motor de conversacion. El system prompt define la personalidad del personaje y las reglas de interaccion. Las respuestas son generadas en tiempo real sin almacenamiento permanente.</p>
    </div>
  `;
  document.querySelector('footer').style.display = 'none';
}

// Cambia la URL sin recargar la pagina (History API) y pinta la vista
function navigate(path) {
  history.pushState({}, '', path);
  render(path);
}

// Busca la ruta y ejecuta su funcion para ver la vista (si no existe, va a /home)
function render(path) {
  const viewFn = routes[path] || routes['/home'];
  viewFn();
}

// Captura clicks en los links del nav: evita recarga y usa pushState
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigate(link.getAttribute('href'));
  });
});

// Detecta cuando el usuario usa los botones atras/adelante del navegador
window.addEventListener('popstate', () => {
  render(window.location.pathname);
});

// Al cargar la pagina por primera vez, pinta la vista que corresponde a la URL
render(window.location.pathname);