const State = {
  get team()  { return localStorage.getItem('crisisTeam') || 'blue'; },
  get phase() { return parseInt(localStorage.getItem('crisisPhase') || '1'); },
  set phase(v){ localStorage.setItem('crisisPhase', v); },
  
  // Canal de communication pour la course Phase 3
  raceChannel: new BroadcastChannel('crisis_race_p3')
};

// Horloge UTC formatée "War Room"
function startClock(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.textContent = now.toUTCString().split(' ')[4] + ' UTC — ' + 
      now.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'}).toUpperCase();
  };
  tick(); setInterval(tick, 1000);
}

// Barre de navigation dynamique
function renderTopBar(phaseNum, phaseName) {
  const bar = document.getElementById('topBar');
  if (!bar) return;
  bar.innerHTML = `
    <div class="flex items-center gap2">
      <span class="team-badge ${State.team}">${State.team === 'blue' ? '◈ BLUE TEAM' : '◈ RED TEAM'}</span>
      <span>OPERATION CUTLINE</span>
    </div>
    <span>PHASE ${phaseNum} — ${phaseName}</span>
    <span id="clock"></span>
  `;
  startClock('clock');
}

// Rendu des étapes de progression
function renderSteps(steps, currentIdx) {
  return steps.map((s, i) => {
    let cls = i < currentIdx ? 'done' : (i === currentIdx ? 'active' : '');
    return `<div class="step-item ${cls}">${s}</div>`;
  }).join('');
}
