import type {StackNavigationProp} from '@react-navigation/stack';

export type Stock = {
  open: number;
  close: number;
  change: number;
  changePercent: number;
  currency: string;
  companyName: string;
  iexAskPrice: number | null;
  iexBidPrice: number | null;
  symbol: string;
  peRatio: number;
  ytdChange: number;
  week52High: number;
  week52Low: number;
  previousClose: number;
  low: number;
  high: number;
  iexRealtimePrice: number | null;
  primaryExchange: string;
  isUSMarketOpen: boolean;
};

export type PortfolioStock = {
  price: number;
  symbol: string;
  change: number;
  quantity: number;
  averageCost: number;
  quote: Stock;
};

export type RootStackParamList = {
  Home: undefined;
  BattlePortfolio: undefined;
  BuySellStock: {
    stock: Stock;
    shares_owned: number;
    average_cost: number;
    battle_id: string;
    user_id: string;
  };
  Login: undefined;
};

export type ProfileScreenNavigationProp =
  StackNavigationProp<RootStackParamList>;

export type User = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
};

export type Battle = {
  battle_id: string;
  battle_members: BattleMember[];
  start_date_timestamp: string;
  end_date_timestamp: string;
  battle_name: string;
};

export type BattleMember = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  photo: string;
  battles: string[];
  transactions: Transaction[];
};

export type Transaction = {
  transaction_id: string;
  battle_id: string;
  user_id: string;
  action: string;
  symbol: string;
  price: number;
  quantity: number;
  transaction_timestamp: string;
};
