document.addEventListener('DOMContentLoaded', async () => {
    const statsList = document.getElementById('stats-list');
    const totalVotersEl = document.getElementById('total-voters');

    try {
        const response = await fetch('/api/stats');
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        totalVotersEl.innerText = `${data.totalVotos} Votantes`;
        renderStats(data.stats);
    } catch (err) {
        console.error(err);
        statsList.innerHTML = `<p class="error">Error al cargar estadísticas: ${err.message}</p>`;
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
