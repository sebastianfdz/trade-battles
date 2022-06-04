import type {PortfolioStock} from '../shared/Types';

export const ApiClient = {
  getMyBattles: async (user_id: string) => {
    const myBattles = await fetch(
      `http://localhost:3000/battles/mybattles/${user_id}`,
    );

    return myBattles;
  },

  getUserPortfolio: async (
    user_id: string,
    battle_id: string,
  ): Promise<PortfolioStock[]> => {
    const portfolio = await fetch(
      `http://localhost:3000/users/portfolio/${user_id}/${battle_id}`,
    );
    return portfolio as unknown as PortfolioStock[];
  },
};
