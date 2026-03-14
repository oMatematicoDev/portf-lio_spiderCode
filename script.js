/* =======================================================
   SCRIPT PORTFÓLIO JAYMALA
   Contém: Partículas, Digitação, Scroll e MODAL DE VÍDEO
   =======================================================
*/

// 1. Configuração das Partículas
if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 40 },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 2, "random": true },
            "move": { "enable": true, "speed": 0.6, "direction": "none", "random": true }
        }
    });
}

// 2. Efeito de Digitação
const typedTextElement = document.getElementById('typed-text');

const translations = {
    pt: ["Programador Full Stack", "Especialista em UI/UX", "Soluções Digitais"],
    en: ["Full Stack Developer",   "UI/UX Specialist",     "Digital Solutions"]
};

let phrases = translations['pt'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

function type() {
    if (!typedTextElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    typingTimeout = setTimeout(type, typeSpeed);
}

// Chamada pelo botão de idioma no index.html
function updateTypingLang(lang) {
    if (typingTimeout) clearTimeout(typingTimeout);
    phrases = translations[lang];
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    if (typedTextElement) typedTextElement.textContent = '';
    type();
}

// 3. Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add("active");
    });
}

// 4. Modal de Vídeo
function abrirVideo(caminhoDoVideo) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('playerPrincipal');
    if (caminhoDoVideo) {
        player.src = caminhoDoVideo;
        modal.style.display = 'flex';
        player.play();
    }
}

function fecharVideo() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('playerPrincipal');
    player.pause();
    player.currentTime = 0;
    player.src = "";
    modal.style.display = 'none';
}

// 5. Inicialização
window.addEventListener("scroll", reveal);
window.onload = () => {
    type();
    reveal();
};