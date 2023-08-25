import { useState } from "react";
import MinesField from "../utils/mineSweeper";
import React from "react";

export const CTX = React.createContext<ContextType | null>(null);

type ContextType = {
  update: Function;
  newGame: Function;
  minesField: MinesField;
};

type Props = {
  children: JSX.Element;
};
const AppContext = ({ children }: Props) => {
  const [minesField, setMinesField] = useState(new MinesField(10, 10, 10));
  const newGame = () => {
    setMinesField(new MinesField(10, 10, 10));
  };
  const update = () => {
    if (!minesField) return;
    setMinesField(Object.create(minesField));
  };

  return (
    <CTX.Provider
      value={{
        newGame,
        update,
        minesField,
      }}
    >
      {children}
    </CTX.Provider>
  );
};

export default AppContext;
