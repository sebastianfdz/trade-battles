import type {PortfolioStock} from '../shared/Types';
import axios from 'axios';
import {Stock} from '../shared/Types';

export const ApiClient = {
  getMyBattles: async (user_id: string) => {
    const myBattles = await axios.get(
      `http://localhost:3000/battles/mybattles/${user_id}`,
    );

    return myBattles;
  },

  getUserPortfolio: async (user_id: string, battle_id: string) => {
    const portfolio = await axios.get<PortfolioStock[]>(
      `http://localhost:3000/users/portfolio/${user_id}/${battle_id}`,
    );
    return portfolio;
  },

  getQuote: async (ticker: string) => {
    const quote = await axios.get<Stock>(
      `http://localhost:3000/quote/${ticker}`,
    );
    return quote;
  },
};
