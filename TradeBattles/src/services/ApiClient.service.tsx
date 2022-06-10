import type {HistoricalData, PortfolioStock} from '../shared/Types';
import axios from 'axios';
import type {Stock} from '../shared/Types';
import type {User} from '../shared/Types';
import type {Transaction, GraphPoint} from '../shared/Types';

const port = 3000;
const baseUrl = `http://localhost:${port}`;
export const ApiClient = {
  getMyBattles: async (user_id: string) => {
    const myBattles = await axios.get(
      `${baseUrl}/battles/mybattles/${user_id}`,
    );
    return myBattles;
  },

  getUserPortfolio: async (user_id: string, battle_id: string) => {
    const portfolio = await axios.get<PortfolioStock[]>(
      `${baseUrl}/users/portfolio/${user_id}/${battle_id}`,
    );
    return portfolio;
  },

  getQuote: async (ticker: string) => {
    const quote = await axios.get<Stock>(`${baseUrl}/quote/${ticker}`);
    return quote;
  },

  getUserById: async (id: string) => {
    const user = await axios.get<User>(`${baseUrl}/users/${id}`);
    return user;
  },

  handleSignIn: async (user: User) => {
    const dbUser = await ApiClient.getUserById(user.id);

    if (!dbUser.data) {
      ApiClient.createUser(user);
      console.warn('User succesfully created');
    } else {
      console.warn('User succesfully logged in');
    }
  },

  createUser: async (user: User) => {
    axios.post(`${baseUrl}/users/`, {
      id: user.id,
      givenName: user.givenName,
      familyName: user.familyName,
      photo: user.photo,
      email: user.email,
    });
  },

  postTransaction: async (transaction: Transaction) => {
    axios.post(`${baseUrl}/transactions`, {
      battle_id: transaction.battle_id,
      user_id: transaction.user_id,
      action: transaction.action,
      symbol: transaction.symbol,
      price: transaction.price,
      quantity: transaction.quantity,
    });
  },

  getHistoricalData: async (
    ticker: string,
    periodicity: string,
    periodicity_unit: number,
    start_date: number,
    end_date: number,
  ) => {
    console.log('inside apicall client');
    const data = await axios.get<HistoricalData>(
      `${baseUrl}/quote/historical/data/${ticker}/${periodicity}/${periodicity_unit}/${start_date}/${end_date}`,
    );
    console.log(data);
    return data;
  },
};
