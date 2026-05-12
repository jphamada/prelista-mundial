const playersData = [
    // ARQUEROS
    { id: 1, name: 'EMILIANO MARTÍNEZ', position: 'Arquero', category: 'arquero' },
    { id: 2, name: 'GERÓNIMO RULLI', position: 'Arquero', category: 'arquero' },
    { id: 3, name: 'JUAN MUSSO', position: 'Arquero', category: 'arquero' },
    { id: 4, name: 'WALTER BENÍTEZ', position: 'Arquero', category: 'arquero' },
    { id: 5, name: 'FACUNDO CAMBESES', position: 'Arquero', category: 'arquero' },
    { id: 6, name: 'SANTIAGO BELTRAN', position: 'Arquero', category: 'arquero' },

    // DEFENSORES
    { id: 7, name: 'AGUSTÍN GIAY', position: 'Lateral derecho', category: 'defensor' },
    { id: 8, name: 'GONZALO MONTIEL', position: 'Lateral derecho', category: 'defensor' },
    { id: 9, name: 'NAHUEL MOLINA', position: 'Lateral derecho', category: 'defensor' },
    { id: 10, name: 'NICOLÁS CAPALDO', position: 'Lateral derecho', category: 'defensor' },
    { id: 11, name: 'KEVIN MAC ALLISTER', position: 'Lateral derecho', category: 'defensor' },
    { id: 12, name: 'LUCAS MARTINEZ QUARTA', position: 'Defensor central', category: 'defensor' },
    { id: 13, name: 'MARCOS SENESI', position: 'Defensor central', category: 'defensor' },
    { id: 14, name: 'LISANDRO MARTÍNEZ', position: 'Defensor central', category: 'defensor' },
    { id: 15, name: 'NICOLÁS OTAMENDI', position: 'Defensor central', category: 'defensor' },
    { id: 16, name: 'GERMÁN PEZZELLA', position: 'Defensor central', category: 'defensor' },
    { id: 17, name: 'LEONARDO BALERDI', position: 'Defensor central', category: 'defensor' },
    { id: 18, name: 'CRISTIAN ROMERO', position: 'Defensor central', category: 'defensor' },
    { id: 19, name: 'LAUTARO DI LOLLO', position: 'Defensor central', category: 'defensor' },
    { id: 20, name: 'ZAID ROMERO', position: 'Defensor central', category: 'defensor' },
    { id: 21, name: 'FACUNDO MEDINA', position: 'Defensor central', category: 'defensor' },
    { id: 22, name: 'MARCOS ACUÑA', position: 'Lateral izquierdo', category: 'defensor' },
    { id: 23, name: 'NICOLÁS TAGLIAFICO', position: 'Lateral izquierdo', category: 'defensor' },
    { id: 24, name: 'GABRIEL ROJAS', position: 'Lateral izquierdo', category: 'defensor' },

    // MEDIOCAMPISTAS
    { id: 25, name: 'MÁXIMO PERRONE', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 26, name: 'LEANDRO PAREDES', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 27, name: 'GUIDO RODRÍGUEZ', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 28, name: 'ANÍBAL MORENO', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 29, name: 'MILTON DELGADO', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 30, name: 'ALAN VARELA', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 31, name: 'EZEQUIEL FERNÁNDEZ', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 32, name: 'RODRIGO DE PAUL', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 33, name: 'EXEQUIEL PALACIOS', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 34, name: 'ENZO FERNÁNDEZ', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 35, name: 'ALEXIS MAC ALLISTER', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 36, name: 'GIOVANI LO CELSO', position: 'Mediocampista ofensivo', category: 'mediocampista' },
    { id: 37, name: 'NICOLÁS DOMÍNGUEZ', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 38, name: 'EMILIANO BUENDIA', position: 'Mediocampista ofensivo', category: 'mediocampista' },
    { id: 39, name: 'VALENTÍN BARCO', position: 'Lateral / Medio', category: 'mediocampista' },
    { id: 40, name: 'NICOLÁS PAZ', position: 'Mediocampista central', category: 'mediocampista' },
    { id: 41, name: 'FRANCO MASTANTUONO', position: 'Mediocampista ofensivo', category: 'mediocampista' },
    { id: 42, name: 'THIAGO ALMADA', position: 'Mediocampista ofensivo', category: 'mediocampista' },

    // DELANTEROS
    { id: 43, name: 'LIONEL MESSI', position: 'Extremo derecho', category: 'delantero' },
    { id: 44, name: 'TOMÁS ARANDA', position: 'Extremo', category: 'delantero' },
    { id: 45, name: 'NICOLÁS GONZÁLEZ', position: 'Extremo derecho', category: 'delantero' },
    { id: 46, name: 'ALEJANDRO GARNACHO', position: 'Extremo izquierdo', category: 'delantero' },
    { id: 47, name: 'GIULIANO SIMEONE', position: 'Extremo derecho', category: 'delantero' },
    { id: 48, name: 'MATÍAS SOULÉ', position: 'Extremo derecho', category: 'delantero' },
    { id: 49, name: 'CLAUDIO ECHEVERRI', position: 'Mediapunta', category: 'delantero' },
    { id: 50, name: 'GIANLUCA PRESTIANNI', position: 'Extremo', category: 'delantero' },
    { id: 51, name: 'SANTIAGO CASTRO', position: 'Delantero centro', category: 'delantero' },
    { id: 52, name: 'LAUTARO MARTÍNEZ', position: 'Delantero centro', category: 'delantero' },
    { id: 53, name: 'JOSÉ MANUEL LÓPEZ', position: 'Extremo izquierdo', category: 'delantero' },
    { id: 54, name: 'JULIÁN ÁLVAREZ', position: 'Delantero centro', category: 'delantero' },
    { id: 55, name: 'MATEO PELLEGRINO', position: 'Delantero centro', category: 'delantero' }
];

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
        const categoryPlayers = playersData.filter(p => p.category === key);
        
        // Let's keep them expanded initially for better UX, or collapsed? 
        // User said "it's too long", so let's collapse them.
        html += `
            <div class="position-group collapsed" id="group-${key}">
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
                                        <div style="font-size: 0.75rem; color: var(--arg-blue); opacity: 0.8">${player.position}</div>
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
            <span>${p.position}</span>
        </div>
    `).join('');
    
    modalOverlay.style.display = 'flex';
};

finalConfirmBtn.onclick = async () => {
    const email = emailInput.value.trim();
    
    // Validación básica de email
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
            alert('¡Selección confirmada y voto registrado con éxito! 🇦🇷🏆');
            modalOverlay.style.display = 'none';
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
