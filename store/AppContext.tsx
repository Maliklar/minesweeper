import { useEffect, useState } from "react";
import MinesField from "../utils/mineSweeper";
import React from "react";

export const CTX = React.createContext<ContextType | null>(null);

type ContextType = {
  update: Function;
  newGame: Function;
  minesField: MinesField;
  gameState: "new" | "lose" | "win";
  setGameState: (state: "new" | "lose" | "win") => void;
  timer: number;
};

type Props = {
  children: JSX.Element;
};
const AppContext = ({ children }: Props) => {
  const [minesField, setMinesField] = useState(new MinesField(10, 10, 10));
  const [gameState, setGameState] = useState<"new" | "lose" | "win">("new");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    console.log("USE EFFECT", gameState);
    const interval = setInterval(() => {
      setTimer((i) => i + 1);
    }, 1000);

    if (gameState === "lose") clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [gameState]);
  const newGame = () => {
    setMinesField(new MinesField(10, 10, 10));
    setGameState("new");
    setTimer(0);
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
        gameState,
        setGameState,
        timer,
      }}
    >
      {children}
    </CTX.Provider>
  );
};

export default AppContext;
