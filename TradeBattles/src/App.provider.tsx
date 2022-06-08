import React, {useState, useContext, createContext} from 'react';
import {User} from './shared/Types';

type UserContextType = {
  user: User;
  handleSetUser: (user: User) => void;
};

const initialUser = {
  id: 'DEFAULT',
  name: '',
  email: '',
  photo: '',
  familyName: '',
  givenName: '',
};

const UserContext = createContext<UserContextType>({
  user: initialUser,
  handleSetUser: () => {},
});

export const UserProvider: React.FC<any> = ({children}) => {
  const [user, setUser] = useState<User>(initialUser);

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
