export const ApiClient = {
  getMyBattles: async (user_id: string) => {
    const myBattles = await fetch(
      `http://localhost:3000/battles/mybattles/${user_id}`,
    );

    return myBattles;
  },
};
