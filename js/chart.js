// ─────────────────────────────────────────────
// CHART — build & load
// ─────────────────────────────────────────────

async function loadChart(symbol, interval) {
  const container = document.getElementById('chartContainer');
  showLoading(container, true);
  hidePlaceholder();

  try {
    const raw     = await fetchKlines(symbol, interval);
    const candles = raw.map(k => ({
      time:  k[0] / 1000,
      open:  parseFloat(k[1]),
      high:  parseFloat(k[2]),
      low:   parseFloat(k[3]),
      close: parseFloat(k[4]),
    }));
    const volumes = raw.map(k => ({
      time:  k[0] / 1000,
      value: parseFloat(k[5]),
      color: parseFloat(k[4]) >= parseFloat(k[1])
        ? 'rgba(0,200,150,0.45)'
        : 'rgba(255,69,96,0.45)',
    }));
    buildChart(container, candles, volumes);
  } catch(e) {
    console.error('차트 로드 실패:', e);
  } finally {
    showLoading(container, false);
  }
}

function buildChart(container, candles, volumes) {
  // 기존 차트 제거
  if (STATE.chartInstance) {
    STATE.chartInstance.remove();
    STATE.chartInstance = null;
  }
  const old = container.querySelector('.lw-chart');
  if (old) old.remove();

  const div = document.createElement('div');
  div.className = 'lw-chart';
  div.style.cssText = 'position:absolute;inset:0;';
  container.appendChild(div);

  STATE.chartInstance = LightweightCharts.createChart(div, {
    autoSize: true,          // ← 핵심 수정: 컨테이너 크기 자동감지
    layout: {
      background: { type: 'solid', color: '#0a0c0f' },
      textColor:  '#5a6480',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize:    11,
    },
    grid: {
      vertLines: { color: '#1e2430', style: 1 },
      horzLines: { color: '#1e2430', style: 1 },
    },
    crosshair: {
      vertLine: { color: '#3d7eff', width: 1, style: 3, labelBackgroundColor: '#3d7eff' },
      horzLine: { color: '#3d7eff', width: 1, style: 3, labelBackgroundColor: '#3d7eff' },
    },
    rightPriceScale: { borderColor: '#1e2430' },
    timeScale:       { borderColor: '#1e2430', timeVisible: true, secondsVisible: false },
  });

  // 거래량 (하단 20%)
  STATE.volumeSeries = STATE.chartInstance.addHistogramSeries({
    priceFormat:  { type: 'volume' },
    priceScaleId: 'volume',
    scaleMargins: { top: 0.82, bottom: 0 },
  });
  STATE.volumeSeries.setData(volumes);

  // 캔들
  STATE.candleSeries = STATE.chartInstance.addCandlestickSeries({
    upColor:        '#00c896',
    downColor:      '#ff4560',
    borderUpColor:  '#00c896',
    borderDownColor:'#ff4560',
    wickUpColor:    '#00c896',
    wickDownColor:  '#ff4560',
    scaleMargins:   { top: 0.05, bottom: 0.2 },
  });
  STATE.candleSeries.setData(candles);
  STATE.chartInstance.timeScale().fitContent();
}

// ─── DOM helpers ───────────────────────────
function showLoading(container, show) {
  let ov = container.querySelector('.loading-overlay');
  if (show) {
    if (!ov) {
      ov = document.createElement('div');
      ov.className = 'loading-overlay';
      ov.innerHTML = '<div class="spinner"></div>';
      container.appendChild(ov);
    }
  } else {
    if (ov) ov.remove();
  }
}
function hidePlaceholder() {
  const ph = document.getElementById('placeholder');
  if (ph) ph.style.display = 'none';
}
