import React, {useState, useContext, createContext} from 'react';
import {UserInitializer} from './shared/EmptyInitializers';
import {User} from './shared/Types';

type UserContextType = {
  user: User;
  handleSetUser: (user: User) => void;
};

const UserContext = createContext<UserContextType>({
  user: UserInitializer,
  handleSetUser: () => {},
});

export const UserProvider: React.FC<any> = ({children}) => {
  const [user, setUser] = useState<User>(UserInitializer);

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
