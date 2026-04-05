// ── State helpers ──────────────────────────────────────────────
const State = {
  get team()  { return localStorage.getItem('crisisTeam') || 'blue'; },
  get phase() { return parseInt(localStorage.getItem('crisisPhase') || '1'); },
  get step()  { return parseInt(localStorage.getItem('crisisStep') || '1'); },
  set phase(v){ localStorage.setItem('crisisPhase', v); },
  set step(v) { localStorage.setItem('crisisStep', v); },

  // Phase 3 race sync via BroadcastChannel
  broadcast: null,
  initRace() {
    if (!this.broadcast) this.broadcast = new BroadcastChannel('crisis_race');
  },
  signalFinish(team) {
    this.initRace();
    const ts = Date.now();
    localStorage.setItem(`race_finish_${team}`, ts);
    this.broadcast.postMessage({ type: 'finish', team, ts });
  },
  onRaceUpdate(cb) {
    this.initRace();
    this.broadcast.onmessage = cb;
  }
};

// ── Clock ──────────────────────────────────────────────────────
function startClock(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.textContent = now.toUTCString().replace('GMT', 'UTC').split(' ').slice(4,5).join(' ')
      + ' UTC — ' + now.toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'}).toUpperCase();
  };
  tick(); setInterval(tick, 1000);
}

// ── Top bar renderer ───────────────────────────────────────────
function renderTopBar(phaseNum, phaseName) {
  const team = State.team;
  const bar = document.getElementById('topBar');
  if (!bar) return;
  bar.innerHTML = `
    <div class="flex items-center gap2">
      <span class="team-badge ${team}">${team === 'blue' ? '◈ BLUE TEAM' : '◈ RED TEAM'}</span>
      <span>OPERATION CUTLINE</span>
    </div>
    <span>PHASE ${phaseNum} — ${phaseName}</span>
    <span id="clock"></span>
  `;
  startClock('clock');
}

// ── Step progress renderer ─────────────────────────────────────
function renderSteps(steps, currentIdx) {
  return steps.map((s, i) => {
    let cls = '';
    if (i < currentIdx) cls = 'done';
    else if (i === currentIdx) cls = 'active';
    return `<div class="step-item ${cls}">${s}</div>`;
  }).join('');
}

// ── Answer checker + feedback ──────────────────────────────────
function checkAnswer(inputEl, feedbackEl, correct, okMsg, errMsg, onSuccess) {
  const val = inputEl.value.trim().toUpperCase();
  const correctUp = correct.toString().toUpperCase();
  feedbackEl.classList.remove('ok','err');
  if (val === correctUp) {
    feedbackEl.textContent = '✓ ' + okMsg;
    feedbackEl.classList.add('show','ok');
    inputEl.disabled = true;
    if (onSuccess) setTimeout(onSuccess, 600);
    return true;
  } else {
    feedbackEl.textContent = '✗ ' + errMsg;
    feedbackEl.classList.add('show','err');
    inputEl.style.borderColor = 'var(--red)';
    setTimeout(() => { inputEl.style.borderColor = ''; }, 1200);
    return false;
  }
}

// ── Multiple choice checker ────────────────────────────────────
function setupMCQ(containerId, correctIndex, onSuccess) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const btns = container.querySelectorAll('.choice-btn');
  btns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.add('disabled'));
      if (i === correctIndex) {
        btn.classList.add('correct');
        setTimeout(onSuccess, 700);
      } else {
        btn.classList.add('wrong');
        btns[correctIndex].classList.add('correct');
      }
    });
  });
}

// ── Navigate to next step/phase ────────────────────────────────
function goTo(phase, step) {
  State.phase = phase;
  State.step = step;
  window.location.href = `phase${phase}.html`;
}

// ── Typewriter effect ──────────────────────────────────────────
function typeWriter(el, text, speed = 18, cb) {
  let i = 0;
  el.textContent = '';
  const iv = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) { clearInterval(iv); if (cb) cb(); }
  }, speed);
}

// ── Terminal append ────────────────────────────────────────────
function termAppend(termId, html, delay = 0) {
  setTimeout(() => {
    const t = document.getElementById(termId);
    if (!t) return;
    const line = document.createElement('div');
    line.innerHTML = html;
    t.appendChild(line);
    t.scrollTop = t.scrollHeight;
  }, delay);
}
