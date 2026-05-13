document.addEventListener('DOMContentLoaded', async () => {
    const statsList = document.getElementById('stats-list');
    const totalVotersEl = document.getElementById('total-voters');

    try {
        const response = await fetch('/api/stats');
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error del servidor (${response.status})`);
        }

        const data = await response.json();

        if (data.error) throw new Error(data.error);

        totalVotersEl.innerText = `${data.totalVotos || 0} Votantes`;
        
        if (!data.stats || data.stats.length === 0) {
            statsList.innerHTML = `
                <div style="text-align:center; padding: 50px; color: var(--arg-blue);">
                    <p>Aún no hay votos procesados.</p>
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
                <button onclick="location.reload()" class="stats-btn" style="margin-top:20px;">Reintentar</button>
            </div>
        `;
    }
});

function renderStats(stats) {
    const statsList = document.getElementById('stats-list');
    statsList.innerHTML = '';

    const categories = [
        { key: 'arquero', label: 'Arqueros', color: 'rgba(255, 193, 7, 0.1)' },
        { key: 'defensor', label: 'Defensores', color: 'rgba(33, 150, 243, 0.1)' },
        { key: 'mediocampista', label: 'Mediocampistas', color: 'rgba(156, 39, 176, 0.1)' },
        { key: 'delantero', label: 'Delanteros', color: 'rgba(233, 30, 99, 0.1)' }
    ];

    // Combinar datos de jugadores con sus estadísticas
    const allPlayersWithStats = playersData.map(player => {
        const playerStat = stats.find(s => s.id === player.id) || { percentage: 0, count: 0 };
        return { ...player, ...playerStat };
    });

    // Ordenar por porcentaje descendente y tomar los mejores 26
    const top26Players = allPlayersWithStats
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 26);

    categories.forEach(cat => {
        const catPlayers = top26Players.filter(p => p.category === cat.key);
        
        if (catPlayers.length === 0) return;

        const section = document.createElement('div');
        section.className = `player-section position-group-stat group-${cat.key}`;
        section.style.backgroundColor = cat.color;
        section.style.borderRadius = '24px';
        section.style.padding = '20px';
        section.style.marginBottom = '25px';
        
        section.innerHTML = `<h3 class="stat-category-title">${cat.label}</h3>`;
        
        const playersDiv = document.createElement('div');
        playersDiv.className = 'players-grid-stat';
        playersDiv.style.marginTop = '20px';

        catPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.className = 'player-card stat-card';
            playerCard.innerHTML = `
                <div class="player-info">
                    <span class="player-name">${player.name}</span>
                </div>
                <div class="stat-container">
                    <div class="stat-bar-bg">
                        <div class="stat-bar-fill" style="width: ${player.percentage}%"></div>
                    </div>
                    <span class="stat-percentage">${player.percentage}%</span>
                </div>
            `;
            playersDiv.appendChild(playerCard);
        });

        section.appendChild(playersDiv);
        statsList.appendChild(section);
    });
}
