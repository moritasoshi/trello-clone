import { createContext, useContext } from "react";
import { useTokenReducer } from "../reducers";
import { TokenAction, TokenStore } from "../Types";

const TokenContext = createContext(
  {} as {
    tokenState: TokenStore;
    tokenDispatch: React.Dispatch<TokenAction>;
  }
);

const TokenProvider = ({ children }: { children: JSX.Element[] }) => {
  const [tokenState, tokenDispatch] = useTokenReducer({ token: "" });

  return (
    <TokenContext.Provider value={{ tokenState, tokenDispatch }}>
      {children}
    </TokenContext.Provider>
  );
};

const useTokenContext = () => useContext(TokenContext);

export { TokenProvider, useTokenContext };
