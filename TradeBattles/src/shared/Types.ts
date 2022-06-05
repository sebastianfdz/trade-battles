import type {StackNavigationProp} from '@react-navigation/stack';

export type Stock = {
  open: number;
  close: number;
  change: number;
  changePercent: number;
  currency: string;
  companyName: string;
  iexAskPrice: number;
  iexBidPrice: number;
  symbol: string;
  peRatio: number;
  ytdChange: number;
  week52High: number;
  week52Low: number;
  previousClose: number;
  low: number;
  high: number;
  iexRealtimePrice: number;
  primaryExchange: string;
  isUSMarketOpen: boolean;
};

export type PortfolioStock = {
  price: number;
  symbol: string;
  change: number;
  quantity: number;
  averageCost: number;
  quote?: Stock;
};

export type RootStackParamList = {
  Home: undefined;
  BattlePortfolio: undefined;
  BuySellStock: {
    stock: Stock;
    shares_owned: number;
  };
  Login: undefined;
};

export type ProfileScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;
