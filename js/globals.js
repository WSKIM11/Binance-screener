// ─────────────────────────────────────────────
// GLOBALS & CONFIG
// ─────────────────────────────────────────────
const API_BASE    = 'https://api.binance.com';
const CANDLE_LIMIT = 1000;
const REFRESH_MS  = 20000;

const STATE = {
  allTickers:      [],
  filteredTickers: [],
  currentSymbol:   null,
  currentTf:       '15m',
  currentCategory: 'tradefi',
  sortMode:        'vol',
  sortAsc:         false,
  refreshTimer:    null,
  chartInstance:   null,
  candleSeries:    null,
  volumeSeries:    null,
};
