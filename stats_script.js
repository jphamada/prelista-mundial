document.addEventListener('DOMContentLoaded', async () => {
    const statsList = document.getElementById('stats-list');
    const totalVotersEl = document.getElementById('total-voters');

    try {
        console.log('Iniciando carga de estadísticas...');
        const response = await fetch('/api/stats');
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);

        if (data.error) throw new Error(data.error);

        totalVotersEl.innerText = `${data.totalVotos || 0} Votantes`;
        
        if (!data.stats || data.stats.length === 0) {
            statsList.innerHTML = `
                <div style="text-align:center; padding: 50px; color: var(--arg-blue);">
                    <p>Aún no hay votos procesados.</p>
                    <p style="font-size: 0.8rem; opacity: 0.6; margin-top: 10px;">
                        Filas en DB: ${data.debug ? data.debug.rows : '?'}<br>
                        Stats generados: ${data.stats ? data.stats.length : 0}
                    </p>
                    <button onclick="location.reload()" class="stats-btn" style="margin-top:20px;">Actualizar</button>
                </div>
            `;
        } else {
            renderStats(data.stats);
        }
    } catch (err) {
        console.error('Error detallado:', err);
        statsList.innerHTML = `
            <div class="error-container" style="text-align:center; padding: 40px;">
                <p class="error" style="color: var(--arg-gold); font-size: 1.2rem;">❌ Error al cargar estadísticas</p>
                <code style="display:block; margin:20px 0; color: #ff6b6b; font-size:0.8rem; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px;">${err.message}</code>
                <button onclick="location.reload()" class="stats-btn">Reintentar</button>
            </div>
        `;
    }
});

function renderStats(stats) {
    const statsList = document.getElementById('stats-list');
    statsList.innerHTML = '';

    const categories = [
        { key: 'arquero', label: 'Arqueros' },
        { key: 'defensor', label: 'Defensores' },
        { key: 'mediocampista', label: 'Mediocampistas' },
        { key: 'delantero', label: 'Delanteros' }
    ];

    categories.forEach(cat => {
        const catPlayers = playersData.filter(p => p.category === cat.key);
        
        const section = document.createElement('div');
        section.className = 'player-section';
        
        section.innerHTML = `<h3>${cat.label}</h3>`;
        
        const playersDiv = document.createElement('div');
        playersDiv.className = 'players-grid';

        catPlayers.forEach(player => {
            const playerStat = stats.find(s => s.id === player.id) || { percentage: 0, count: 0 };
            
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card stat-card';
            playerCard.innerHTML = `
                <div class="player-info">
                    <span class="player-name">${player.name}</span>
                    <span class="player-pos">${player.position}</span>
                </div>
                <div class="stat-container">
                    <div class="stat-bar-bg">
                        <div class="stat-bar-fill" style="width: ${playerStat.percentage}%"></div>
                    </div>
                    <span class="stat-percentage">${playerStat.percentage}%</span>
                </div>
            `;
            playersDiv.appendChild(playerCard);
        });

        section.appendChild(playersDiv);
        statsList.appendChild(section);
    });
}
