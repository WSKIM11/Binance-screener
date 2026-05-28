// ─────────────────────────────────────────────
// UI — render & events
// ─────────────────────────────────────────────

// ── 카테고리 탭 렌더 ──────────────────────────
function renderCategoryTabs() {
  const wrap = document.getElementById('categoryTabs');
  wrap.innerHTML = '';

  // 전체 버튼
  const allBtn = makeTabBtn('all', '전체');
  wrap.appendChild(allBtn);

  CATEGORY_KEYS.forEach(key => {
    const btn = makeTabBtn(key, CATEGORIES[key].label);
    wrap.appendChild(btn);
  });

  // 기본 선택: tradefi
  wrap.querySelector('[data-cat="tradefi"]')?.classList.add('active');
}

function makeTabBtn(key, label) {
  const btn = document.createElement('button');
  btn.className   = 'cat-btn' + (key === STATE.currentCategory ? ' active' : '');
  btn.dataset.cat = key;
  btn.textContent = label;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    STATE.currentCategory = key;
    applyFilterSort();
    renderList();
  });
  return btn;
}

// ── 코인 목록 렌더 ────────────────────────────
function renderList() {
  const list = document.getElementById('coinList');
  if (!STATE.filteredTickers.length) {
    list.innerHTML = '<div class="list-empty">종목 없음</div>';
    return;
  }
  list.innerHTML = STATE.filteredTickers.map(t => {
    const up   = t.change >= 0;
    const chStr= (up ? '+' : '') + t.change.toFixed(2) + '%';
    const active = t.symbol === STATE.currentSymbol;
    return `<div class="coin-row${active ? ' active' : ''}" data-symbol="${t.symbol}">
      <div class="coin-name">
        <span class="coin-symbol">${t.base}</span>
        <span class="coin-base">USDT</span>
      </div>
      <div class="coin-price">${fmtPrice(t.price)}</div>
      <div class="coin-change ${up?'up':'dn'}">${chStr}</div>
      <div class="coin-vol">${fmtVol(t.volume)}</div>
    </div>`;
  }).join('');

  list.querySelectorAll('.coin-row').forEach(row =>
    row.addEventListener('click', () => selectCoin(row.dataset.symbol))
  );
}

// ── 코인 선택 ────────────────────────────────
async function selectCoin(symbol) {
  STATE.currentSymbol = symbol;
  renderList();
  updateChartHeader();
  await loadChart(symbol, STATE.currentTf);
}

function updateChartHeader() {
  const t = STATE.allTickers.find(x => x.symbol === STATE.currentSymbol);
  if (!t) return;
  const up = t.change >= 0;
  document.getElementById('chartSymbolName').textContent  = t.symbol;
  document.getElementById('chartPriceDisplay').textContent= fmtPrice(t.price);
  const chEl = document.getElementById('chartChangeDisplay');
  chEl.textContent = (up?'+':'') + t.change.toFixed(2) + '%';
  chEl.className   = 'chart-change-display ' + (up?'up':'dn');
  document.getElementById('chartStats').innerHTML = `
    <div class="stat-item">
      <span class="stat-label">24H HIGH</span>
      <span class="stat-value">${fmtPrice(t.high)}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">24H LOW</span>
      <span class="stat-value">${fmtPrice(t.low)}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">거래대금</span>
      <span class="stat-value">${fmtVol(t.volume)}</span>
    </div>`;
}

// ── 이벤트 바인딩 ─────────────────────────────
function bindEvents() {
  // 타임프레임
  document.querySelectorAll('.tf-btn').forEach(btn =>
    btn.addEventListener('click', async () => {
      document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.currentTf = btn.dataset.tf;
      if (STATE.currentSymbol) await loadChart(STATE.currentSymbol, STATE.currentTf);
    })
  );

  // 정렬
  const sortLabels = { vol:'거래량', change:'변화율', price:'가격' };
  document.querySelectorAll('.sort-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      const newSort = btn.dataset.sort;
      STATE.sortAsc = (STATE.sortMode === newSort) ? !STATE.sortAsc : false;
      STATE.sortMode = newSort;
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.textContent = sortLabels[newSort] + (STATE.sortAsc ? '↑' : '↓');
      applyFilterSort();
      renderList();
    })
  );

  // 검색
  document.getElementById('searchInput').addEventListener('input', () => {
    applyFilterSort();
    renderList();
  });
}

// ── 초기화 ───────────────────────────────────
async function init() {
  renderCategoryTabs();
  bindEvents();
  await fetchTickers();
  STATE.refreshTimer = setInterval(async () => {
    await fetchTickers();
    if (STATE.currentSymbol) updateChartHeader();
  }, REFRESH_MS);
}

window.addEventListener('DOMContentLoaded', init);
