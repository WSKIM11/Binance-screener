// ─────────────────────────────────────────────
// DATA — fetch, filter, sort
// ─────────────────────────────────────────────

async function fetchTickers() {
  try {
    const res  = await fetch(`${API_BASE}/api/v3/ticker/24hr`);
    const data = await res.json();

    STATE.allTickers = data
      .filter(t =>
        t.symbol.endsWith('USDT') &&
        !t.symbol.includes('UP') && !t.symbol.includes('DOWN') &&
        !t.symbol.includes('BEAR') && !t.symbol.includes('BULL')
      )
      .map(t => ({
        symbol: t.symbol,
        base:   t.symbol.replace('USDT',''),
        price:  parseFloat(t.lastPrice),
        change: parseFloat(t.priceChangePercent),
        volume: parseFloat(t.quoteVolume),
        high:   parseFloat(t.highPrice),
        low:    parseFloat(t.lowPrice),
      }));

    setStatus(`${STATE.allTickers.length}개 · ${new Date().toLocaleTimeString('ko-KR')}`);
    applyFilterSort();
    renderList();
  } catch(e) {
    setStatus('데이터 오류');
    console.error(e);
  }
}

async function fetchKlines(symbol, interval) {
  const res = await fetch(
    `${API_BASE}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${CANDLE_LIMIT}`
  );
  return await res.json();
}

function applyFilterSort() {
  const cat = STATE.currentCategory;
  let pool  = [...STATE.allTickers];

  // 카테고리 필터
  if (cat !== 'all') {
    const syms = CATEGORIES[cat]?.symbols ?? [];
    pool = pool.filter(t => syms.includes(t.symbol));
  }

  // 검색 필터
  const q = document.getElementById('searchInput').value.trim().toUpperCase();
  if (q) pool = pool.filter(t => t.base.includes(q) || t.symbol.includes(q));

  // 정렬
  const f = STATE.sortAsc ? 1 : -1;
  if (STATE.sortMode === 'vol')    pool.sort((a,b) => f*(a.volume - b.volume));
  if (STATE.sortMode === 'change') pool.sort((a,b) => f*(a.change - b.change));
  if (STATE.sortMode === 'price')  pool.sort((a,b) => f*(a.price  - b.price));

  STATE.filteredTickers = pool;
}

// ─── helpers ───────────────────────────────
function fmtPrice(p) {
  if (p >= 1000) return p.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  if (p >= 1)    return p.toFixed(4);
  if (p >= 0.01) return p.toFixed(5);
  return p.toFixed(8);
}
function fmtVol(v) {
  if (v >= 1e9) return (v/1e9).toFixed(2)+'B';
  if (v >= 1e6) return (v/1e6).toFixed(1)+'M';
  if (v >= 1e3) return (v/1e3).toFixed(1)+'K';
  return v.toFixed(0);
}
function setStatus(txt) {
  document.getElementById('statusText').textContent = txt;
}
