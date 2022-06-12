import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {CustomInput} from '../components/CustomInput.component';
import {StartEndDatePicker} from '../components/StartEndDatePicker.component';
import {ApiClient} from '../services/ApiClient.service';
import {theme} from '../shared/themes';
import {BattleMember} from '../shared/Types';
import {CustomModal} from '../components/CustomModal';
import {BattleMemberIcon} from '../components/BattleMemberIcon.component';
import {GoBack} from '../components/GoBack.component';

export const CreateBattle = () => {
  const [addedMembers, setAddedMembers] = useState<BattleMember[]>([]);
  const [battleName, setBattleName] = useState('');
  const [search, setSearch] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [members, setMembers] = useState<BattleMember[]>();
  const [errorMessage, setErrorMessage] = useState(false);
  const [successfulCreate, setSuccessfulCreate] = useState(false);

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

  const formIsValid = () => {
    return battleName.length > 0 &&
      startDate.getTime() > Date.now() &&
      endDate.getTime() > Date.now() &&
      startDate.getTime() < endDate.getTime() &&
      addedMembers.length > 0
      ? true
      : false;
  };
  return (
    <View style={styles.container}>
      {/* <GoBack /> */}
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
        (el.first_name.toLowerCase().includes(search.toLowerCase()) ||
          el.last_name.toLowerCase().includes(search.toLowerCase()) ||
          el.email.toLowerCase().includes(search.toLowerCase())) &&
        search.length ? (
          <View
            key={el.email}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
              marginVertical: 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Image
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{uri: el.photo}}
              />
              <Text>
                {el.first_name} {el.last_name}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                setAddedMembers(prevState => [...prevState, el]);
                setSearch('');
              }}
              style={styles.add_button}>
              <Text
                style={{
                  color: theme.light_mode_white,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                ADD
              </Text>
            </Pressable>
          </View>
        ) : undefined,
      )}

      <Text style={styles.title}>Select start and end dates</Text>
      <View style={{flexDirection: 'row'}}>
        {addedMembers.map(el => (
          <BattleMemberIcon key={el.email} photo={el.photo} />
        ))}
      </View>
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
          formIsValid()
            ? (ApiClient.createBattle(
                addedMembers.map(el => el.user_id),
                startDate.getTime(),
                endDate.getTime(),
                battleName,
              ),
              setSuccessfulCreate(true))
            : setErrorMessage(true);
        }}
        style={{
          backgroundColor: theme.colorPrimary,
          width: '80%',
          height: 50,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
        }}>
        <Text style={{color: theme.light_mode_white, fontWeight: '700'}}>
          CREATE
        </Text>
      </Pressable>
      <CustomModal
        viewable={errorMessage}
        setViewable={setErrorMessage}
        text="Please fill out all the fields"
      />
      <CustomModal
        viewable={successfulCreate}
        setViewable={setSuccessfulCreate}
        text="The battle has been succesfully created"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.light_mode_white,
  },
  title: {fontSize: 20, fontWeight: '600', marginBottom: 15, marginTop: 10},
  add_button: {
    backgroundColor: theme.colorPrimary,
    width: 45,
    height: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});