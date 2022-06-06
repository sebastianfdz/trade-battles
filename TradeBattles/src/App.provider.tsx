import React, {useState, useContext, createContext} from 'react';
import {User} from './shared/Types';

type UserContextType = {
  user: User;
  handleSetUser: (user: User) => void;
};
const UserContext = createContext<UserContextType>({
  user: {id: '', name: '', email: '', photo: '', familyName: '', givenName: ''},
  handleSetUser: () => {},
});

export const UserProvider: React.FC<any> = ({children}) => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    photo: '',
    familyName: '',
    givenName: '',
  });

  const handleSetUser = (user: User) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{user, handleSetUser}}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => useContext(UserContext);
