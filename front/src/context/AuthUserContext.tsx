import React, { createContext, useContext } from "react";
import { useAuthUserReducer } from "../reducers";
import { AuthUserAction, AuthUserStore } from "../Types";

const AuthUserContext = createContext(
  {} as {
    authUserState: AuthUserStore;
    authUserDispatch: React.Dispatch<AuthUserAction>;
  }
);

const AuthUserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [authUserState, authUserDispatch] = useAuthUserReducer({}as AuthUserStore);

  return (
    <AuthUserContext.Provider value={{ authUserState, authUserDispatch }}>
      {children}
    </AuthUserContext.Provider>
  );
};

const useAuthUserContext = () => useContext(AuthUserContext);

export { AuthUserProvider, useAuthUserContext };
