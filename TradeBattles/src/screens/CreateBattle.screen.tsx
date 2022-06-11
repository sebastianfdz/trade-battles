import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {CustomInput} from '../components/CustomInput.component';
import {StartEndDatePicker} from '../components/StartEndDatePicker.component';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {BattleMember} from '../shared/Types';

export const CreateBattle = () => {
  const [addedMembers, setAddedMembers] = useState<string[]>([]);
  const [battleName, setBattleName] = useState('');
  const [search, setSearch] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [members, setMembers] = useState<BattleMember[]>();

  useEffect(() => {
    setStartDate(new Date(Date.now()));
    setEndDate(new Date(Date.now()));
  }, []);

  useEffect(() => {
    const getMembers = async () => {
      ApiClient.getAllUsers().then(res => {
        setMembers(res.data);
      });
    };

    getMembers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battle Name</Text>
      <CustomInput
        value={battleName}
        setValue={setBattleName}
        placeholder={'Choose a name for your battle...'}
        secureTextEntry={false}
      />
      <Text style={styles.title}>Members</Text>
      <CustomInput
        value={search}
        setValue={setSearch}
        placeholder={'Search for people here...'}
        secureTextEntry={false}
      />
      {members?.map(el =>
        el.first_name.toLowerCase().includes(search.toLowerCase()) &&
        search.length ? (
          <View
            key={el.email}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 30, height: 30, borderRadius: 50}}
              source={{uri: el.photo}}
            />
            <Text>
              {el.first_name} {el.last_name}
            </Text>
          </View>
        ) : undefined,
      )}
      {/* <MemberIcon /> */}

      <Text style={styles.title}>Select start and end dates</Text>
      <StartEndDatePicker
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        endDate={endDate}
        startDate={startDate}
      />

      {startDate.getTime() > Date.now() && (
        <Text>Battle will start on: {startDate.toDateString()}</Text>
      )}
      {endDate.getTime() > Date.now() && (
        <Text>Battle will end on: {endDate.toDateString()}</Text>
      )}

      <Pressable
        onPress={() => {
          ApiClient.createBattle(
            addedMembers,
            startDate.getTime(),
            endDate.getTime(),
            battleName,
          );
        }}>
        <Text>CREATE</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {fontSize: 20, fontWeight: '600'},
});
