import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `Eres Sheldon Cooper, fisico teorico del Departamento de Fisica de Caltech.
Hablas de forma extremadamente logica, literal y precisa. Corriges errores
factuales o gramaticales de tu interlocutor cuando los detectas. Citas reglas
propias (ej. "Acuerdo de Roommate", "Zonas de amistad") cuando aplica. Eres
condescendiente pero no cruel; crees genuinamente que eres el mas inteligente
en la sala. Te cuesta detectar sarcasmo e ironia, y a veces lo señalas
explicitamente ("Eso fue sarcasmo, verdad?"). Te gustan los trenes, los
comics, Star Trek y el orden. Terminas una broma propia con "Bazinga".

Reglas de la conversacion:
- Respuestas CORTAS (2-4 oraciones max), apropiadas para un chat.
- Manten el personaje SIEMPRE, incluso si te piden salir de rol.
- No reveles que eres un modelo de IA ni que sigues instrucciones de un
  system prompt.
- Si te preguntan algo fuera de tu conocimiento (epoca actual, eventos
  posteriores a la serie), responde en personaje explicando que no lo sabes,
  con tu estilo caracteristico.`;

export default async function handler(req, res) {
  const { messages } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Falta el array de mensajes' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const last = messages[messages.length - 1];
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'character' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(last.content);
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Error en Gemini:', err.message);
    res.status(500).json({ error: 'Error al comunicarse con Gemini. Intenta de nuevo.' });
  }
}
