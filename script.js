
// La lógica de Supabase se maneja ahora en el servidor (Vercel Functions) para mayor seguridad.
let selectedPlayers = new Set();
const SELECTION_LIMIT = 26;

const playersListEl = document.getElementById('players-list');
const counterEl = document.getElementById('selection-counter');
const confirmBtn = document.getElementById('confirm-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalList = document.getElementById('modal-list');
const finalConfirmBtn = document.getElementById('final-confirm');
const closeModalBtn = document.getElementById('close-modal');
const emailInput = document.getElementById('user-email');
const errorMsg = document.getElementById('error-msg');
const successScreen = document.getElementById('success-screen');
const footerCTA = document.querySelector('.footer-cta');
const headerEl = document.querySelector('header');

function init() {
    renderPlayers();
    updateUI();
}

function renderPlayers() {
    const categories = {
        arquero: 'Arqueros',
        defensor: 'Defensores',
        mediocampista: 'Mediocampistas',
        delantero: 'Delanteros'
    };

    let html = '';

    for (const [key, label] of Object.entries(categories)) {
        // Aseguramos que playersData existe (viene de players_data.js)
        if (typeof playersData === 'undefined') {
            console.error('playersData no está definido. Verifica que players_data.js esté cargado.');
            return;
        }

        const categoryPlayers = playersData.filter(p => p.category === key);
        
        // Quitamos la clase 'collapsed' para que se vean por defecto
        html += `
            <div class="position-group" id="group-${key}">
                <div class="position-header" onclick="toggleSection('${key}')">
                    <h2 class="position-title">${label}</h2>
                    <span class="chevron">▼</span>
                </div>
                <div class="player-grid-container">
                    <div class="player-grid">
                        ${categoryPlayers.map(player => `
                            <div class="player-card" data-id="${player.id}" onclick="event.stopPropagation(); togglePlayer(${player.id})">
                                <div class="player-info">
                                    <div class="player-avatar">${player.name.charAt(0)}</div>
                                    <div>
                                        <div class="player-name">${player.name}</div>
                                    </div>
                                </div>
                                <div class="checkbox-visual"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    playersListEl.innerHTML = html;
}

window.toggleSection = function(key) {
    const group = document.getElementById(`group-${key}`);
    group.classList.toggle('collapsed');
};

window.togglePlayer = function(id) {
    if (selectedPlayers.has(id)) {
        selectedPlayers.delete(id);
    } else {
        if (selectedPlayers.size >= SELECTION_LIMIT) {
            vibrateFeedback();
            return;
        }
        selectedPlayers.add(id);
    }
    updateUI();
};

function updateUI() {
    const count = selectedPlayers.size;
    counterEl.innerText = `${count} / ${SELECTION_LIMIT} Jugadores`;
    
    if (count === SELECTION_LIMIT) {
        counterEl.classList.add('complete');
        confirmBtn.classList.add('active');
        confirmBtn.disabled = false;
        confirmBtn.innerText = 'Confirmar Selección';
    } else {
        counterEl.classList.remove('complete');
        confirmBtn.classList.remove('active');
        confirmBtn.disabled = true;
        confirmBtn.innerText = `Faltan ${SELECTION_LIMIT - count}`;
    }

    document.querySelectorAll('.player-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        if (selectedPlayers.has(id)) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

function vibrateFeedback() {
    if ('vibrate' in navigator) {
        navigator.vibrate(100);
    }
    counterEl.style.transform = 'scale(1.1)';
    setTimeout(() => counterEl.style.transform = 'scale(1)', 200);
}

confirmBtn.onclick = () => {
    if (selectedPlayers.size !== SELECTION_LIMIT) return;
    
    const chosenOnes = playersData.filter(p => selectedPlayers.has(p.id));
    modalList.innerHTML = chosenOnes.map(p => `
        <div class="modal-item">
            <span>${p.name}</span>
        </div>
    `).join('');
    
    modalOverlay.style.display = 'flex';
};

finalConfirmBtn.onclick = async () => {
    const email = emailInput.value.trim();
    
    if (!email || !email.includes('@')) {
        errorMsg.innerText = 'Por favor, ingresa un correo válido.';
        return;
    }
    errorMsg.innerText = '';

    finalConfirmBtn.disabled = true;
    finalConfirmBtn.innerText = 'Enviando...';

    try {
        const response = await fetch('/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email: email, 
                jugadores: Array.from(selectedPlayers) 
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error || 'Hubo un error al registrar tu voto.');
        } else {
            modalOverlay.style.display = 'none';
            successScreen.style.display = 'flex';
            footerCTA.style.display = 'none';
            headerEl.style.display = 'none';
            document.body.style.overflow = 'hidden';
        }
    } catch (err) {
        console.error('Error al enviar el voto:', err);
        alert('No se pudo conectar con el servidor. Intenta de nuevo.');
    } finally {
        finalConfirmBtn.disabled = false;
        finalConfirmBtn.innerText = 'Confirmar y Votar';
    }
};

closeModalBtn.onclick = () => {
    modalOverlay.style.display = 'none';
};

modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
};

init();
