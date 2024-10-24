import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
  theUser: any | null;
  handleSetUser: (user: any) => void;
  handleClearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<any | null>(null);

  const handleSetUser = (user: any) => {
    setUser(user);
  };

  const handleClearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ theUser: user, handleSetUser, handleClearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};