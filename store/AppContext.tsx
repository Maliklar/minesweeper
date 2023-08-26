import { useEffect, useState } from "react";
import MinesField, { FieldCeil } from "../utils/mineSweeper";
import React from "react";

export const CTX = React.createContext<ContextType | null>(null);

type ContextType = {
  update: Function;
  newGame: Function;
  minesField: MinesField;
  gameState: GameStateEnum;
  setGameState: (state: GameStateEnum) => void;
  timer: number;
};

export enum GameStateEnum {
  START,
  PROGRESS,
  WIN,
  LOSE,
}

type Props = {
  children: JSX.Element;
};
const AppContext = ({ children }: Props) => {
  const [minesField, setMinesField] = useState(new MinesField(10, 10, 10));
  const [gameState, setGameState] = useState(GameStateEnum.START);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (gameState !== GameStateEnum.PROGRESS) {
      return;
    }
    const interval = setInterval(() => {
      if (gameState !== GameStateEnum.PROGRESS) clearInterval(interval);
      setTimer((i) => i + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [gameState]);

  const newGame = () => {
    setMinesField(new MinesField(10, 10, 10));
    setGameState(GameStateEnum.START);
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
