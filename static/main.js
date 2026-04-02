const messagesEl = document.getElementById('messages');
  const inputEl = document.getElementById('input');
  const sendBtn = document.getElementById('sendBtn');
  const welcomeEl = document.getElementById('welcome');
  const API_URL = '/api/chat';
  let historial = [];
  let isLoading = false;

  inputEl.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  inputEl.addEventListener('input', () => {
    inputEl.style.height = 'auto';
    inputEl.style.height = Math.min(inputEl.scrollHeight, 120) + 'px';
  });

  function askQuick(text) {
    inputEl.value = text;
    sendMessage();
  }

  function appendMessage(role, text) {
    if (welcomeEl) welcomeEl.style.display = 'none';
    const msg = document.createElement('div');
    msg.className = `msg ${role}`;

    const avatar = document.createElement('div');
    avatar.className = `avatar ${role === 'bot' ? 'bot-av' : 'user-av'}`;
    avatar.textContent = role === 'bot' ? 'DF' : 'Tú';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = formatText(text);

    msg.appendChild(avatar);
    msg.appendChild(bubble);
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function showTyping() {
    if (welcomeEl) welcomeEl.style.display = 'none';
    const msg = document.createElement('div');
    msg.className = 'msg bot';
    msg.id = 'typing';
    const avatar = document.createElement('div');
    avatar.className = 'avatar bot-av';
    avatar.textContent = 'DF';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    msg.appendChild(avatar);
    msg.appendChild(bubble);
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing');
    if (t) t.remove();
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/•\s/g, '')
      .replace(/^\s*[-*]\s(.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^(.+)$/, '<p>$1</p>');
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text || isLoading) return;

    isLoading = true;
    sendBtn.disabled = true;
    inputEl.value = '';
    inputEl.style.height = 'auto';

    appendMessage('user', text);
    showTyping();

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: text, provider: 'gemini', historial })
      });

      const data = await res.json();
      removeTyping();

      if (res.ok) {
        const respuesta = data.respuesta;
        appendMessage('bot', respuesta);
        historial.push({ role: 'user', content: text });
        historial.push({ role: 'assistant', content: respuesta });
        if (historial.length > 20) historial = historial.slice(-20);
      } else {
        appendMessage('bot', 'Hubo un problema al procesar tu mensaje. Por favor intenta de nuevo.');
      }
    } catch (err) {
      removeTyping();
      appendMessage('bot', 'No pude conectarme al servidor. Verifica tu conexión e intenta de nuevo.');
    }

    isLoading = false;
    sendBtn.disabled = false;
    inputEl.focus();
  }
