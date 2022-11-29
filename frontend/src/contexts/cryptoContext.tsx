import { createContext, FC, ReactNode, useContext, useState } from "react";

interface CryptoProps {
  children?: ReactNode;
}

interface ICryptoContextValue {
  crypto: number;
  symbol: string;
  interval: string;
  limit: number;
  handleCrypto: (cvalue: number) => void;
  handleSymbol: (symbol: string) => void;
  handleInterval: (interval: string) => void;
  handleLimit: (limit: number) => void;
}

const CryptoContext = createContext({} as ICryptoContextValue);

export const useCryptoContext = () => {
  return useContext(CryptoContext);
};

export const AppCryptoProvider: FC<CryptoProps> = ({ children }) => {
  const [crypto, setCrypto] = useState(0.00001);
  const [symbol, setSymbol] = useState("XLMUSDT");
  const [interval, setInterval] = useState("5m");
  const [limit, setLimit] = useState(50);

  return (
    <CryptoContext.Provider
      value={{
        crypto,
        symbol,
        interval,
        limit,
        handleCrypto: setCrypto,
        handleSymbol: setSymbol,
        handleInterval: setInterval,
        handleLimit: setLimit,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
