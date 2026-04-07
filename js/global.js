// ═══════════════════════════════════════════════════
//  OPERATION CUTLINE — Global JS
// ═══════════════════════════════════════════════════

function renderTopBar(phaseNum, phaseTitle) {
  const team = localStorage.getItem('crisisTeam') || 'blue';
  const bar = document.getElementById('topBar');
  if (!bar) return;
  bar.innerHTML = `
    <span class="op-tag">▸ OP CUTLINE</span>
    <span class="dot">|</span>
    <span class="phase-tag">PHASE ${phaseNum}</span>
    <span class="dot">·</span>
    <span>${phaseTitle}</span>
    <span class="team-tag ${team}">${team.toUpperCase()} TEAM</span>
  `;
}

function renderSteps(steps, activeIdx) {
  return steps.map((s, i) => {
    let cls = 'step-pip';
    if (i < activeIdx) cls += ' done';
    else if (i === activeIdx) cls += ' current';
    return `<div class="${cls}">${i < activeIdx ? '✓ ' : ''}${s}</div>`;
  }).join('');
}
