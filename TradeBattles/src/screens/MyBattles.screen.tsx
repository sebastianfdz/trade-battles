import React, {useState} from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../themes';

type Battle = {
  battle_id: string;
  battle_members: BattleMember[];
  start_date_timestamp: string;
  end_date_timestamp: string;
  battle_name: string;
};

type BattleMember = {
  user_id: string;
  first_name: string;
  last_name: string;
  username: string;
  battles: string[];
  transactions: Transaction[];
};

type Transaction = {
  transaction_id: string;
  battle_id: string;
  user_id: string;
  action: string;
  symbol: string;
  price: number;
  quantity: number;
  transaction_timestamp: string;
};

export const MyBattles: React.FC = () => {
  const [myBattles, setMyBattles] = useState<Battle[]>([]);

  ApiClient.getMyBattles('c3e56754-7abb-43d8-811d-52186035e1be')
    .then(res => res.json())
    .then(data => setMyBattles(data));

  // console.warn(users);
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 50, fontSize: 40, fontWeight: '700'}}>
        My Battles
      </Text>
      {myBattles.map(battle => (
        <ScrollView horizontal={true}>
          <View style={styles.header_container}>
            <Text style={styles.header}>{battle.battle_name}</Text>
            <Text>$ 8,341.33</Text>
          </View>
          <View style={styles.body_container}>
            {battle.battle_members.map(member => (
              <View>
                <Text>
                  {member.first_name} {member.last_name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
  },
  header_container: {
    backgroundColor: theme.primary_yellow,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 275,
    marginTop: 50,
    height: 150,
  },
  body_container: {
    backgroundColor: theme.primary_grey,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 275,
    height: 300,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 5,
    shadowOpacity: 0.1,
  },
});
