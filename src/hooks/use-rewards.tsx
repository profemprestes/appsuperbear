import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MissionStep {
  id: string;
  label: string;
  icon: string;
  coinReward: number;
  completed: boolean;
}

export interface RewardsContextType {
  steps: MissionStep[];
  progress: number;
  completeStep: (id: string) => void;
  // This will hook into game-store in actual component usage
}

const defaultContext: RewardsContextType = {
  steps: [],
  progress: 0,
  completeStep: () => {},
};

const RewardsContext = createContext<RewardsContextType>(defaultContext);

export const RewardsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<MissionStep[]>([
    { id: 'intro', label: 'Intro', icon: 'play', coinReward: 10, completed: false },
    { id: 'map', label: 'Mapa', icon: 'map', coinReward: 20, completed: false },
    { id: 'chest', label: 'Cofre', icon: 'box', coinReward: 50, completed: false },
    { id: 'rsvp', label: 'RSVP', icon: 'check', coinReward: 30, completed: false },
  ]);

  const completeStep = (id: string) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === id ? { ...step, completed: true } : step))
    );
  };

  const completedStepsCount = steps.filter((s) => s.completed).length;
  const progress = steps.length > 0 ? (completedStepsCount / steps.length) * 100 : 0;

  return (
    <RewardsContext.Provider value={{ steps, progress, completeStep }}>
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => useContext(RewardsContext);
