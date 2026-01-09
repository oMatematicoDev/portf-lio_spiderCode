/* =======================================================
   SCRIPT PORTFÓLIO JAYMALA
   Contém: Partículas, Digitação, Scroll e MODAL DE VÍDEO
   =======================================================
*/

// 1. Configuração das Partículas (Fundo animado)
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

// 2. Efeito de Digitação (Nome e Títulos)
const typedTextElement = document.getElementById('typed-text');
const phrases = ["Programador Full Stack", "Especialista em UI/UX", "Soluções Digitais"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

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
        typeSpeed = 2500; // Tempo de espera antes de apagar
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// 3. Scroll Reveal (Animação ao rolar a página)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) el.classList.add("active");
    });
}

// =======================================================
// 4. LÓGICA DO MODAL DE VÍDEO (AQUI É A CORREÇÃO)
// =======================================================

function abrirVideo(caminhoDoVideo) {
    // Pega os elementos do modal e do player
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('playerPrincipal');

    // Verifica se o caminho foi passado
    if (caminhoDoVideo) {
        player.src = caminhoDoVideo; // Carrega o vídeo novo
        modal.style.display = 'flex'; // Mostra a tela preta
        player.play(); // Começa a tocar
    } else {
        console.error("Erro: Caminho do vídeo não encontrado.");
    }
}

function fecharVideo() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('playerPrincipal');

    player.pause();         // Pausa o vídeo
    player.currentTime = 0; // Volta para o início
    player.src = "";        // Limpa a memória
    modal.style.display = 'none'; // Esconde a tela
}

// 5. Inicialização Geral
window.addEventListener("scroll", reveal);
window.onload = () => { 
    type(); 
    reveal(); 
};