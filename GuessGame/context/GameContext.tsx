import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type GameContextType = {
  number: number;
  setNumber: (value: number) => void;
  screen: string;
  setScreen: (value: string) => void;
  generateRandomBetween: (min: number, max: number, exclude: number) => number;
  guessedNumbers: number[];
  setGuessedNumbers: (value: number[]) => void;
  currentGuess: number;
  setCurrentGuess: (value: number) => void;
  clearTheGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

function generateRandomBetween(min: number, max: number, exclude: number): number {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [number, setNumber] = useState(0);
  const [screen, setScreen] = useState('StartGame');
  const [guessedNumbers, setGuessedNumbers] = useState<number[]>([]);

  const initialGuess = generateRandomBetween(1, 99, number);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    setGuessedNumbers([]);

  }, [number]);

  const clearTheGame = () => {
    setNumber(0);
    setScreen('StartGame');
    setGuessedNumbers([]);
    const initialGuess = generateRandomBetween(1, 99, number);
    setCurrentGuess(initialGuess);
  }
  return (
    <GameContext.Provider
      value={{
        number,
        setNumber,
        screen,
        setScreen,
        generateRandomBetween,
        guessedNumbers,
        setGuessedNumbers,
        currentGuess,
        setCurrentGuess,
        clearTheGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};