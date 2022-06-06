import type {PortfolioStock} from '../shared/Types';
import axios from 'axios';
import type {Stock} from '../shared/Types';
import type {User} from '../shared/Types';

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

  getUserById: async (id: string) => {
    const user = await axios.get<User>(`http://localhost:3000/users/${id}`);
    return user;
  },

  createUser: async (user: User) => {
    axios.post('http://localhost:3000/users/', {
      id: user.id,
      givenName: user.givenName,
      familyName: user.familyName,
      photo: user.photo,
      email: user.email,
    });
  },

  postTransaction: async (
    battle_id: string,
    user_id: string,
    action: string,
    symbol: string,
    price: number,
    quantity: number,
  ) => {
    axios.post('http://localhost:3000/transactions', {
      battle_id: battle_id,
      user_id: user_id,
      action: action,
      symbol: symbol,
      price: price,
      quantity: quantity,
    });
  },
};