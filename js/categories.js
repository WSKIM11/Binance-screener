// ─────────────────────────────────────────────
// BINANCE CATEGORIES
// ─────────────────────────────────────────────
const CATEGORIES = {
  tradefi: {
    label: '🏦 TradeFi',
    symbols: [
      'AAVEUSDT','UNIUSDT','MKRUSDT','COMPUSDT','CRVUSDT','SUSHIUSDT',
      'BALUSDT','DYDXUSDT','SNXUSDT','RUNEUSDT','GMXUSDT','PERPUSDT',
      'KSMUSDT','EULUSDT','RADIANTUSDT','LQDUSDT','INSTAUSDT',
      'PENUSDT','JUPUSDT','RAYUSDT','ORCAUSDT','CAKEUSDT',
    ]
  },
  layer1: {
    label: '⛓ Layer 1',
    symbols: [
      'BTCUSDT','ETHUSDT','SOLUSDT','ADAUSDT','AVAXUSDT','DOTUSDT',
      'ATOMUSDT','NEARUSDT','ALGOUSDT','APTUSDT','SUIUSDT','SEIUSDT',
      'INJUSDT','TAOUSDT','TONUSDT','FTMUSDT','ONEUSDT','XLMUSDT',
      'VETUSDT','XRPUSDT','LTCUSDT','BCHUSDT','ETCUSDT','FILUSDT',
    ]
  },
  layer2: {
    label: '🔗 Layer 2',
    symbols: [
      'POLUSDT','MATICUSDT','ARBUSDT','OPUSDT','IMXUSDT','STRKUSDT',
      'ZKUSDT','METISUSDT','LRCUSDT','CELRUSDT','BORUSDT',
    ]
  },
  defi: {
    label: '💎 DeFi',
    symbols: [
      'LINKUSDT','AAVEUSDT','UNIUSDT','LOOKSUSDT','APEUSDT',
      'CRVUSDT','LDOUSDT','RPLУСДТ','STXUSDT','ICPUSDT',
      'EIGENUSDT','ENAUSDT','ETHFIUSDT','REZUSDT',
    ]
  },
  ai: {
    label: '🤖 AI',
    symbols: [
      'FETUSDT','AGIXUSDT','OCEANUSDT','RNDRУСДТ','WLDUSDT',
      'GRTUSDT','NFPUSDT','AIUSDT','ARKMUSDT','PHBUSDT',
      'TAOMUSDT','AITPUSDT','BIOUSDT',
    ]
  },
  gamefi: {
    label: '🎮 GameFi',
    symbols: [
      'AXSUSDT','SANDUSDT','MANAUSDT','ENJUSDT','GALAUSDT',
      'ILVIUSDT','YGGUSDT','GMTUSDT','STEPNUSDT','RONUSDT',
      'PIXELUSDT','ALTUSDT','PORTALUSDT','NOTUSDT',
    ]
  },
  meme: {
    label: '🐸 Meme',
    symbols: [
      'DOGEUSDT','SHIBUSDT','PEPEUSDT','FLOKIUSDT','BONKUSDT',
      'WIFUSDT','MEMEUSDT','1000XUSDT','BOMEUSDT','WOJAKUSDT',
      'TURBOUSDT','CATUSDT','POPCATUSDT',
    ]
  },
  new: {
    label: '🆕 신규상장',
    symbols: [] // 동적으로 채워짐 (상장 30일 이내 기준 없으므로 빈값)
  }
};

// 전체 목록용 키
const CATEGORY_KEYS = Object.keys(CATEGORIES);
