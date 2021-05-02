import React, { createContext, useContext } from "react";
import { useAuthUserReducer } from "../reducers";
import { AuthUserAction, AuthUserStore } from "../Types";

const AuthUserContext = createContext(
  {} as {
    authUserState: AuthUserStore;
    authUserDispatch: React.Dispatch<AuthUserAction>;
  }
);

const AuthUserProvider = ({ children }: { children: JSX.Element }) => {
  const [authUserState, authUserDispatch] = useAuthUserReducer({
    auth_user: { email: "" },
  });

  return (
    <AuthUserContext.Provider value={{ authUserState, authUserDispatch }}>
      {children}
    </AuthUserContext.Provider>
  );
};

const useAuthUserContext = () => useContext(AuthUserContext);

export { AuthUserProvider, useAuthUserContext };
